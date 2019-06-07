using FunctionalCollections
using JSON

import FunctionalCollections: append
export Node, node, instanceof, props

"""
    Node(instanceof, children...; props...)
    Node(instanceof, children, props)

The building block of WebIO.
A `Node` is simply a wrapper around an _instance_ (some Julia object) together
with some child nodes and additional properties.

The most common type of `Node` is a DOM node. These can be constructed just by
specifying a symbol as the `instanceof` (they are promoted to an instance of
`WebIO.DOM` under the hood).
```jldoctest
julia> Node(:div, Node(:p, "I am a paragraph!", class="important"))
(div
  (p { class="important" }
    "I am a paragraph!"))
```

Nodes with custom (non-`DOM`) instances should have a corresponding
`WebIO.render` method defined.
"""
struct Node{T}
    instanceof::T
    children::PersistentVector{Any}
    props::Dict{Symbol, Any}

    # This needs to be an inner constructor to enforce the promotion of the
    # instanceof attribute.
    function Node(instanceof, children::AbstractVector, props::AbstractDict)
        instanceof = promote_instanceof(instanceof)
        return new{typeof(instanceof)}(
            promote_instanceof(instanceof),
            _pvec(children),
            kwargs2props(props),
        )
    end
end

function Node(instanceof, children...; props...)
    return Node(instanceof, collect(Any, children), Dict(props...))
end

# Can/should this be deprecated?
# The relationship between this and Widgets.jl doesn't make very much sense
# (WebIO extends `node` from Widgets but Widgets essentially relies on this
# implentation for things like `Widgets.div`).
node(args...; kwargs...) = Node(args...; kwargs...)

"""
    promote_instanceof(x)

Promotes an `instanceof` (when constructing a new `Node`) to the appropriate
type.

# Examples
```jldoctest
julia> repr(WebIO.promote_instanceof(:div))
"WebIO.DOM(:html, :div)"
```
"""
promote_instanceof(x) = x
promote_instanceof(s::Symbol) = DOM(:html, s)
promote_instanceof(s::AbstractString) = promote_instanceof(Symbol(s))

nodetype(n::Node) = typename(n.instanceof)
typename(n::T) where {T} = string(T.name.name)

"""
    kwargs2props(kwargs)

Convert keyword arguments (à la `kwargs...`) to a `props` dict.
"""
kwargs2props(kwargs) = Dict{Symbol, Any}(kwargs)

"""
    DOM(namespace, tag)

An instance (for `Node.instanceof`) that represents a specific DOM node type.
"""
struct DOM
    namespace::Symbol
    tag::Symbol
end


export children, setchildren, instanceof, setinstanceof, props, setprops

children(n::Node) = n.children
setchildren(n::Node, children) = Node(n.instanceof, PersistentVector{Any}(collect(children)), n.props)
instanceof(n::Node) = n.instanceof
setinstanceof(n::Node, instanceof) = Node(instanceof, n.children, n.props)
props(n::Node) = n.props
setprops(n::Node, props) = Node(n.instanceof, n.children, props)

# Modifications
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

# Element extension syntax
(n::Node)(x, args...) = append(n, (x, args...))
(n::Node)(props::AbstractDict...) = mergeprops(n, props...)
(n::Node)(;kwargs...) = mergeprops(n, kwargs)
(n::Node)(args...; kwargs...) = n(args...)(;kwargs...)

# Pretty printing
showindent(io, level) = write(io, repeat("  ", level))

function Base.show(io::IO, ::MIME"text/plain", el::Node)
    _show(io, el)
end

function showprops(io, dict)
    write(io, "{ ")
    for (k,v) in dict
        print(io, k, "=", repr(v), " ")
    end
    write(io, "}")
end

function showchildren(io, elems, indent_level)
    length(elems) == 0 && return
    write(io, "\n")
    l = length(elems)
    for i=1:l
        _show(io, elems[i], indent_level+1)
        i != l && write(io, "\n")
    end
end

function _show(io::IO, el::Node, indent_level=0)
    showindent(io, indent_level)
    write(io, "(")
    if !isa(el.instanceof, DOM)
        write(io, string(el.instanceof))
        write(io, ":")
    elseif el.instanceof.namespace != :html
        write(io, el.instanceof.namespace)
        write(io, ":")
        write(io, el.instanceof.tag)
    else
        write(io, el.instanceof.tag)
    end

    if !isempty(props(el))
        write(io, " ")
        showprops(io, props(el))
    end
    showchildren(io, children(el), indent_level)
    write(io, ")")
end

function _show(io::IO, el, indent_level)
    showindent(io, indent_level)
    show(io, el)
end
