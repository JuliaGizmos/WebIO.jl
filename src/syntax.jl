export @dom_str, @js, @js_str

# adapted from Hiccup.jl
function cssparse(s)
    trimfirst(s) = s[2:end]
    props = Dict()
    id = match(r"#-?[_a-zA-Z][_a-zA-Z0-9-]*", s)
    id == nothing || (props[:id] = trimfirst(id.match))
    classes = matchall(r"\.-?[_a-zA-Z][_a-zA-Z0-9-]*", s)
    p = match(r"\[[^\]]+\]", s)
    if p != nothing
        m = strip(p.match, ['[',']'])
        props[:attributes] = Dict(map(x->Pair(split(x,"=")...), split(m, ",")))
    end
    isempty(classes) || (props[:className] = map(trimfirst, classes))
    tagm = match(r"^[^\.#\[\]]+", s)
    tagm == nothing && error("Invalid tag syntax $s")
    tag = tagm.match
    return tag, props
end

function makedom(tag, props)
    function dom(args...; kwargs...)
        mergeprops(Node(tag, [args...], props), Dict(kwargs))
    end
end

"""
    dom"div.<class>#<id>[<prop>=<value>,...]"(x...; kw...)
"""
macro dom_str(str)
    tagstr, props = cssparse(str)
    tag = Symbol(tagstr)
    makedom(tag, props)
end

# copied from Blink.jl by Mike Innes

using Lazy, JSON, MacroTools
export JSString

jsexpr(io, x) = JSON.print(io, x)

immutable JSString
    s::String
end

Base.:(==)(x::JSString, y::JSString) = x.s==y.s

JSON.lower(x::JSString) = x.s

jsexpr(x) = JSString(sprint(jsexpr, x))

jsstring(x) = jsexpr(x).s

macro js_str(s)
    :(JSString($(esc(s))))
end

macro js(expr)
    :(jsexpr($(Expr(:quote, expr))))
end


# Expressions

jsexpr(io, x::JSString) = print(io, x.s)
jsexpr(io, x::Symbol) = (x==:nothing ? print(io, "null") : print(io, x))
jsexpr(io, x::QuoteNode) = jsexpr(io, x.value)
jsexpr(io, x::LineNumberNode) = nothing

function jsexpr_joined(io::IO, xs, delim=",")
    isempty(xs) && return
    for i = 1:length(xs)-1
        jsexpr(io, xs[i])
        print(io, delim)
    end
    jsexpr(io, xs[end])
end

jsexpr_joined(xs, delim=",") = sprint(jsexpr_joined, xs, delim)

function block_expr(io, args, delim="; ")
    #print(io, "{")
    jsexpr_joined(io, rmlines(args), delim)
    #print(io, "}")
end

function call_expr(io, f, args...)
    if f in [:(=), :+, :-, :*, :/, :%, :(==), :(===),
             :(!=), :(!==), :(>), :(<), :(<=), :(>=)]
        return print(io, "(", jsexpr_joined(args, string(f)), ")")
    end
    jsexpr(io, f)
    print(io, "(")
    jsexpr_joined(io, args)
    print(io, ")")
end

function ref_expr(io, x, args...)
    jsexpr(io, x)
    print(io, "[")
    jsexpr_joined(io, args)
    print(io, "]")
end

function func_expr(io, args, body)
    named = isexpr(args, :call)
    named || print(io, "(")
    print(io, "function ")
    if named
        print(io, args.args[1])
        args = args.args[2]
    end
    print(io, "(")
    isexpr(args, Symbol) ? print(io, args) : join(io, args.args, ",")
    print(io, ")")
    print(io, "{")
    jsexpr(io, insert_return(body))
    print(io, "}")
    named || print(io, ")")
end

function insert_return(ex)
    if isa(ex, Symbol) || !isexpr(ex, :block)
        Expr(:return, ex)
    else
        isexpr(ex.args[end], :return) && return ex
        ex1 = copy(ex)
        ex1.args[end] = insert_return(ex.args[end])
        ex1
    end
end


function dict_expr(io, xs)
    print(io, "{")
    xs = ["$(x.args[1]::AbstractString):"*jsexpr(x.args[2]).s for x in xs]
    join(io, xs, ",")
    print(io, "}")
end

function if_block(io, ex)

    if isexpr(ex, :block)
        if any(x -> isexpr(x, :macrocall) && x.args[1] == Symbol("@var"), ex.args)
            error("@js expression error: @var inside an if statement is not supported")
        end
        print(io, "(")
        block_expr(io, rmlines(ex).args, ", ")
        print(io, ")")
    else
        jsexpr(io, ex)
    end
end

function if_expr(io, xs)
    if length(xs) >= 2    # we have an if
        jsexpr(io, xs[1])
        print(io, " ? ")
        if_block(io, xs[2])
    end

    if length(xs) == 3    # Also have an else
        print(io, " : ")
        if_block(io, xs[3])
    else
        print(io, " : undefined")
    end
end

function jsexpr(io, x::Expr)
    isexpr(x, :block) && return block_expr(io, rmlines(x).args)
    @match x begin
        d(xs__) => dict_expr(io, xs)
        $(Expr(:comparison, :_, :(==), :_)) => jsexpr_joined(io, [x.args[1], x.args[3]], "==")    # 0.4

        # must include this particular `:call` expr before the catchall below
        $(Expr(:call, :(==), :_, :_)) => jsexpr_joined(io, [x.args[2], x.args[3]], "==")    # 0.5+
        f_(xs__) => call_expr(io, f, xs...)
        (a_ -> b_) => func_expr(io, a, b)
        a_.b_ | a_.(b_) => jsexpr_joined(io, [a, b], ".")
        (a_ = b_) => jsexpr_joined(io, [a, b], "=")
        $(Expr(:if, :__)) => if_expr(io, x.args)
        $(Expr(:function, :__)) => func_expr(io, x.args...)
        a_[i__] => ref_expr(io, a, i...)
        (@m_ xs__) => jsexpr(io, macroexpand(WebIO, x))
        (return a_) => (print(io, "return "); jsexpr(io, a))
        $(Expr(:new, :_)) => (print(io, "new "); jsexpr(io, x.args[1]))
        $(Expr(:var, :_)) => (print(io, "var "); jsexpr(io, x.args[1]))
        _ => error("JSExpr: Unsupported `$(x.head)` expression, $x")
    end
end

macro new(x) esc(Expr(:new, x)) end
macro var(x) esc(Expr(:var, x)) end


## Element extension syntax

(n::Node)(x, args...) = append(n, (x, args...))
(n::Node)(;kwargs...) = mergeprops(n, kwargs)
(n::Node)(args...; kwargs...) = n(args...)(;kwargs...)
