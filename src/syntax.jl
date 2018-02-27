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

immutable JSString
    s::String
end

macro js_str(s)
    :(JSString($(esc(s))))
end

Base.:(==)(x::JSString, y::JSString) = x.s==y.s

JSON.lower(x::JSString) = x.s

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
jsexpr(io, x) = JSON.show_json(io, JSEvalSerialization(), x)
