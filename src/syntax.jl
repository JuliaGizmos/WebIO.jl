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
    classes = collect(m.match for m in eachmatch(r"\.-?[_a-zA-Z][_a-zA-Z0-9-]*", s))
    isempty(classes) || (props[:className] = join(map(trimfirst, classes), " "))
    tagm = match(r"^[^\.#\[\]]+", s)
    tagm == nothing && error("Invalid tag syntax $s")
    tag = tagm.match
    return tag, props
end

function makedom(tag, props)
    d = if occursin(":", string(tag))
        ns, t = split(string(tag), ":")
        DOM(Symbol(ns), Symbol(t))
    else
        DOM(:html, tag)
    end
    function dom(args...; kwargs...)
        n = node(d, args...)(Dict(kwargs))
        isempty(props) ? n : n(props)
    end
end

"""
    dom"div.<class>#<id>[<prop>=<value>,...]"(x...; kw...)
"""
macro dom_str(sraw)
    str = Meta.parse(string('"', sraw, '"'))
    quote
        tagstr, props = WebIO.cssparse($(esc(str)))
        tag = Symbol(tagstr)
        WebIO.makedom(tag, props)
    end
end

struct JSString
    s::String
end

function str_interpolate(s, i0 = firstindex(s))
    l = lastindex(s)
    strs = []
    prev_c = '_'
    while i0 <= l
        c, i = iterate(s, i0)
        while !(prev_c != '\\' && c == '$') && i <= l
            prev_c = c
            c, i = iterate(s, i)
        end
        if i0 <= i
            j = c == '$' ? prevind(s, prevind(s, i)) : prevind(s, i)
            push!(strs, s[i0:j])
        end
        if i <= l
            expr, i = Meta.parse(s, i, greedy=false, raise=false)
            push!(strs, expr)
        end
        i0 = i
    end
    strs
end

"""
Generate a js_str representation for an object.

The value returned from this function should be a valid, JavaScript-parseable
representation of the input. For example,
js_str_repr(io, "foo") -> "foo"
js_str_repr(io, Dict("a" => "b")) -> {"a": "b"}

Any JSString's are passed through as-is to allow for interpolation of JSStrings
as expected.
"""
function js_str_repr end
js_str_repr(io, x::Any) = jsexpr(io, x)
js_str_repr(io, x::AbstractString) = write(io, JSON.json(x))
js_str_repr(io, x::JSString) = print(io, x.s)

macro js_str(s)
    # This is ugly and for that, I apologize.
    writes = [(
        # For every string or interpolated expression x...
        isa(x, AbstractString)
        # If x is a string, it was specified in the js"..." literal so let it
        # through as-is.
        ? :(write(io, $(esc(x))))
        # Otherwise, it's some kind of interpolation so we need to generate a
        # JavaScript representation of whatever it is/whatever it evaluates to.
        : :(js_str_repr(io, $(esc(x))))
    ) for x in str_interpolate(s)]

    :(JSString(sprint() do io
                   $(writes...)
                   end))
end

Base.string(s::JSString) = s.s
Base.:(==)(x::JSString, y::JSString) = x.s==y.s

JSON.lower(x::JSString) = JSON.lower(x.s)

const JSONContext = JSON.Writer.StructuralContext
const JSONSerialization = JSON.Serializations.CommonSerialization

struct JSEvalSerialization <: JSONSerialization end

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

# note: this function is different from JSExpr.jsexpr
# jsexpr(io, x) = JSON.show_json(io, JSEvalSerialization(), x)

# TRAVIGD: We actually want the JS expr's to be passed as normal JSON strings
# because that makes escaping millions of times easier.
jsexpr(io, x) = JSON.show_json(io, JSEvalSerialization(), x)
jsexpr(x) = sprint(jsexpr, x)
jsexpr(x::JSString) = x.s
