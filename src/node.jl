using AbstractTrees

import AbstractTrees: children
export Node, class, props, key

immutable Node{T}
    instanceof::T # if this changes the node must be *replaced*

    children::AbstractArray
    props::Dict

    key::Any
    _descendants_count::Int

end

function Node(
        instanceof,
        children::AbstractArray,
        props::Associative;
        key=nothing
    )
    inst = promote_instanceof(instanceof)
    Node{typeof(inst)}(
        inst,
        _pvec(children),
        props,
        key,
        descendants_count(children),
    )
end

promote_instanceof(x) = x

nodetype(n::Node) = typename(n.instanceof)
typename{T}(n::T) = string(T.name.name)

function Node(instanceof, children::AbstractArray; key=nothing, props...)
    Node(instanceof, children, Dict(props), key=key)
end

function Node(instanceof, children...; props...)
    Node(instanceof, [children...], Dict(props))
end

immutable DOM
    namespace::Symbol
    tag::Symbol
end

promote_instanceof(s::Symbol) = DOM(:html, s)

const fields = [:class, :children, :props, :key]
const expr = :(Node{T}(n.instanceof, n.children, n.props, key=n.key))

for (i, f) in enumerate(fields)
    setf = Symbol("set" * string(f))
    args = expr.args[2:end]
    args[i] = f
    @eval begin
        export $f, $setf
        $f{T}(n::Node{T}) = n.$f
        $setf{T}(n::Node{T}, $f) = Node(T, $(args...))
    end
end

######## modifying an element #######

export setchild, withchild, withlastchild, mergeprops

append(n::Node, cs) = setchildren(n, append(children(n), cs))
setchild(n::Node, i, c) = setchildren(n, assoc(children(n), i, c))
withchild(f, n::Node, i) = setchild(n, i, f(c[i]))
withlastchild(f, n::Node) = setchild(n, length(children(n)), f(c[i]))
mergeprops(n::Node, ps) = setprops(n, recmerge(props(n), ps))

######## macro sugar ########

using JSON

####### Rendering to HTML ########

function JSON.lower(n::Node)
    Dict{String, Any}(
        "type" => "node",
        "nodeType" => nodetype(n),
        "instanceArgs" => JSON.lower(n.instanceof),
        "children" => JSON.lower(children(n)),
        "props" => JSON.lower(props(n)),
        "key" => JSON.lower(key(n)),
    )
end

function Base.show(io::IO, m::MIME"text/html", x::Node)
    id = newid("node")
    write(io, """<div id='$id'></div>
                 <script>WebDisplay.mount('#$id',""")
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
