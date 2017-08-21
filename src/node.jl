using FunctionalCollections

import FunctionalCollections: append
export Node, instanceof, props

immutable Node{T}
    instanceof::T # if this changes the node must be *replaced*

    children::AbstractArray
    props::Dict

    _descendants_count::Int

end

function Node(
        instanceof,
        children::AbstractArray,
        props::Associative
    )
    inst = promote_instanceof(instanceof)
    Node{typeof(inst)}(
        inst,
        _pvec(children),
        props,
        descendants_count(children),
    )
end

promote_instanceof(x) = x

nodetype(n::Node) = typename(n.instanceof)
typename{T}(n::T) = string(T.name.name)

"""
Any </script> tags in the js/html node representation can cause problems,
because if they are printed inside a <script> tag, even if they are in quotes in
a javascript string, the html parser will still read them as a closing script
tag, and thus end the script content prematurely, causing untold woe.
"""
encode_scripts(htmlstr::String) =
    replace(htmlstr, "</script>", "</_script>")

function kwargs2props(propkwargs)
    props = Dict{Symbol,Any}(propkwargs)
    Symbol("setInnerHtml") in keys(props) &&
        (props[:setInnerHtml] = encode_scripts(props[:setInnerHtml]))
    props # XXX IJulia/JSON bug? kernel seems to crash if this is a String not a Dict (which is obviously silly but still, it shouldn't crash the IJulia kernel)
end

function Node(instanceof, children::AbstractArray; props...)
    Node(instanceof, children, kwargs2props(props))
end

function Node(instanceof, children...; props...)
    # TODO: fix push on pvec to promote properly
    Node(instanceof, Any[children...], kwargs2props(props))
end

immutable DOM
    namespace::Symbol
    tag::Symbol
end

promote_instanceof(s::Symbol) = DOM(:html, s)

const fields = [:instanceof, :children, :props]
const expr = :(Node(n.instanceof, n.children, n.props))

for (i, f) in enumerate(fields)
    setf = Symbol("set" * string(f))
    args = expr.args[2:end]
    args[i] = f
    @eval begin
        export $f, $setf
        $f{T}(n::Node{T}) = n.$f
        function $setf{T}(n::Node{T}, $f)
            Node($(args...))
        end
    end
end

######## modifying an element #######

export append, setchild, withchild, withlastchild, mergeprops

append(n::Node, cs) = setchildren(n, append(children(n), cs))
setchild(n::Node, i, c) = setchildren(n, assoc(children(n), i, c))
withchild(f, n::Node, i) = setchild(n, i, f(children(n)[i]))
withlastchild(f, n::Node) = setchild(n, length(children(n)), f(children(n)[i]))
function mergeprops(n::Node, p, ps...)
    out = recmerge(props(n), p)
    for x in ps
        recmerge!(out, x)
    end
    setprops(n, out)
end

using JSON

####### Rendering to HTML ########

function JSON.lower(n::Node)
    Dict{String, Any}(
        "type" => "node",
        "nodeType" => nodetype(n),
        "instanceArgs" => JSON.lower(n.instanceof),
        "children" => children(n),
        "props" => props(n),
    )
end

function Base.show(io::IO, m::MIME"text/html", x::Node)
    id = newid("node")
    write(io, """<div id='$id'></div>
                 <script>WebIO.mount('$id', '#$id',""")
    jsexpr(io, x)
    write(io, ")</script>")
end


### Utility

descendants_count(t::String) = 0
descendants_count(el::Node) = el._descendants_count
function descendants_count(v::AbstractArray)
    s = 0
    for i in 1:length(v)
        @inbounds s +=_count(v[i])
    end
    s
end
_count(t) = 1
_count(el::Node) = el._descendants_count + 1

const emptypvec = pvec([])
const emptydict = Dict{Symbol,Any}()

## Element extension syntax

(n::Node)(x, args...) = append(n, (x, args...))
(n::Node)(props::Associative...) = mergeprops(n, props...)
(n::Node)(;kwargs...) = mergeprops(n, kwargs)
(n::Node)(args...; kwargs...) = n(args...)(;kwargs...)
