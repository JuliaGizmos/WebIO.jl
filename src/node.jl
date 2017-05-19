using FunctionalCollections
using AbstractTrees

import AbstractTrees: children
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

function Node(instanceof, children::AbstractArray; props...)
    Node(instanceof, children, Dict{Symbol,Any}(props))
end

function Node(instanceof, children...; props...)
    # TODO: fix push on pvec to promote properly
    Node(instanceof, Any[children...], Dict{Symbol,Any}(props))
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
mergeprops(n::Node, ps) = setprops(n, recmerge(props(n), ps))

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
    JSON.print(io, x)
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
_count(t::String) = 1
_count(el::Node) = el._descendants_count + 1

const emptypvec = pvec([])
const emptydict = Dict{Symbol,Any}()
