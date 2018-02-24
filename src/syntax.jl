export @dom_str, @js, @js_str

# adapted from Hiccup.jl
function cssparse(s)
    # e.g. s = "img#theid.class1.class2[src=image.jpg, alt=great pic]"
    # parse props first
    p = match(r"\[[^\]]+\]", s)
    props = Dict()
    if p != nothing
        m = strip(p.match, ['[',']'])
        props[:attributes] = Dict(map(x->Pair(split(x,r"\s*=\s*", limit=2)...), split(m, r",\s*")))
        # s is now just the "img#class1.c2.thirdclass"
        s = s[1:p.offset-1]
    end
    trimfirst(str) = str[2:end]
    id = match(r"#-?[_a-zA-Z][_a-zA-Z0-9-]*", s)
    id == nothing || (props[:id] = trimfirst(id.match))
    classes = matchall(r"\.-?[_a-zA-Z][_a-zA-Z0-9-]*", s)
    isempty(classes) || (props[:className] = map(trimfirst, classes))
    tagm = match(r"^[^\.#\[\]]+", s)
    tagm == nothing && error("Invalid tag syntax $s")
    tag = tagm.match
    return tag, props
end

function makedom(tag, props)
    d = if contains(string(tag), ":")
        ns, t = split(string(tag), ":")
        DOM(Symbol(ns), Symbol(t))
    else
        DOM(:html, tag)
    end
    function dom(args...; kwargs...)
        n = Node(d, args...)(Dict(kwargs))
        isempty(props) ? n : n(props)
    end
end

"""
    dom"div.<class>#<id>[<prop>=<value>,...]"(x...; kw...)
"""
macro dom_str(sraw)
    str = parse(string('"', sraw, '"'))
    quote
        tagstr, props = WebIO.cssparse($(esc(str)))
        tag = Symbol(tagstr)
        WebIO.makedom(tag, props)
    end
end

# copied from Blink.jl by Mike Innes

using JSON, MacroTools
export JSString

immutable JSString
    s::String
end

Base.:(==)(x::JSString, y::JSString) = x.s==y.s

const JSONContext = JSON.Writer.StructuralContext
const JSONSerialization = JSON.Serializations.CommonSerialization

struct JSEvalSerialization <: JSONSerialization end

JSON.lower(x::JSString) = x.s

const verbose_json = Ref(false)

# adapted (very slightly) from JSON.jl test/serializer.jl
function JSON.show_json(io::JSONContext, ::JSEvalSerialization, x::JSString)
    if verbose_json[]
        first = true
        for line in split(x.s, '\n')
            !first && JSON.indent(io)
            first = false
            Base.print(io, line)
        end
    else
        Base.print(io, x.s)
    end
end

jsexpr(io, x) = JSON.show_json(io, JSEvalSerialization(), x)

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

function obs_get_expr(io, x)
    # empty [], special case to get value from an Observable
    print(io, "WebIO.getval(")
    jsexpr(io, x)
    print(io, ")")
end

function obs_set_expr(io, x, val)
    # empty [], special case to get value from an Observable
    print(io, "WebIO.setval(")
    jsexpr_joined(io, [x, val])
    print(io, ")")
end

function jsexpr(io, o::Observable)
    if !haskey(observ_id_dict, o)
        error("No scope associated with observer being interpolated")
    end
    _scope, name = observ_id_dict[o]
    _scope.value === nothing && error("Scope of the observable doesn't exist anymore.")
    scope = _scope.value

    obsobj = Dict("type" => "observable",
                  "scope" => scope.id,
                  "name" => name,
                  "id" => obsid(o))

    jsexpr(io, obsobj)
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
        args.args = args.args[2:end]
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
    xs = map(xs) do x
        if x.head == :(=) || x.head == :kw
            "$(jsexpr(x.args[1]).s):"*jsexpr(x.args[2]).s
        elseif x.head == :call && x.args[1] == :(=>)
            "$(jsexpr(x.args[2]).s):"*jsexpr(x.args[3]).s
        else
            error("Invalid pair separator in dict expression")
        end
    end
    join(io, xs, ",")
    print(io, "}")
end

function vect_expr(io, xs)
    print(io, "[")
    xs = [jsexpr(x).s for x in xs]
    join(io, xs, ",")
    print(io, "]")
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

function for_expr(io, i, start, to, body, step = 1)
    print(io, "for(var $i = $start; $i <= $to; $i = $i + $step){")
    block_expr(io, body)
    print(io, "}")
end

function jsexpr(io, x::Expr)
    isexpr(x, :block) && return block_expr(io, rmlines(x).args)
    x = rmlines(x)
    @match x begin
        d(xs__) => dict_expr(io, xs)
        $(Expr(:comparison, :_, :(==), :_)) => jsexpr_joined(io, [x.args[1], x.args[3]], "==")    # 0.4

        # must include this particular `:call` expr before the catchall below
        $(Expr(:call, :(==), :_, :_)) => jsexpr_joined(io, [x.args[2], x.args[3]], "==")    # 0.5+
        f_(xs__) => call_expr(io, f, xs...)
        (a_ -> b_) => func_expr(io, a, b)
        a_.b_ | a_.(b_) => jsexpr_joined(io, [a, b], ".")
        (a_[] = val_) => obs_set_expr(io, a, val)
        (a_ = b_) => jsexpr_joined(io, [a, b], "=")
        (a_ += b_) => jsexpr_joined(io, [a, b], "+=")
        (a_ && b_) => jsexpr_joined(io, [a, b], "&&")
        (a_ || b_) => jsexpr_joined(io, [a, b], "||")
        $(Expr(:if, :__)) => if_expr(io, x.args)
        $(Expr(:function, :__)) => func_expr(io, x.args...)
        a_[] => obs_get_expr(io, a)
        a_[i__] => ref_expr(io, a, i...)
        [xs__] => vect_expr(io, xs)
        (@m_ xs__) => jsexpr(io, macroexpand(WebIO, x))
        (for i_ = start_ : to_
            body__
        end) => for_expr(io, i, start, to, body)
        (for i_ = start_ : step_ : to_
            body__
        end) => for_expr(io, i, start, to, body, step)
        (return a__) => (print(io, "return "); !isempty(a) && a[1] !== nothing && jsexpr(io, a...))
        $(Expr(:new, :_)) => (print(io, "new "); jsexpr(io, x.args[1]))
        $(Expr(:var, :_)) => (print(io, "var "); jsexpr(io, x.args[1]))
        _ => error("JSExpr: Unsupported `$(x.head)` expression, $x")
    end
end

macro new(x) esc(Expr(:new, x)) end
macro var(x) esc(Expr(:var, x)) end
