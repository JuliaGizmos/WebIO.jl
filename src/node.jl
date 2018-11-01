using FunctionalCollections
using JSON

import FunctionalCollections: append
export Node, node, instanceof, props

const WEBIO_NODE_MIME = MIME"application/vnd.webio.node+json"
Base.Multimedia.istextmime(::WEBIO_NODE_MIME) = true

const WEBIO_APPLICATION_MIME = MIME"application/vnd.webio.application+html"
Base.Multimedia.istextmime(::WEBIO_APPLICATION_MIME) = true

struct Node{T}
    instanceof::T # if this changes the node must be *replaced*

    children::PersistentVector{Any}
    props::Dict{Symbol, Any}

    _descendants_count::Int

end

function Node(instanceof, children::AbstractVector, props::AbstractDict)
    inst = promote_instanceof(instanceof)
    Node{typeof(inst)}(inst, _pvec(children), kwargs2props(props), descendants_count(children))
end

function node(instanceof, children...; props...)
    Node(instanceof, PersistentVector{Any}(collect(children)), Dict(props))
end

promote_instanceof(x) = x
promote_instanceof(s::Symbol) = DOM(:html, s)
promote_instanceof(s::AbstractString) = promote_instanceof(Symbol(s))

nodetype(n::Node) = typename(n.instanceof)
typename(n::T) where {T} = string(T.name.name)

function kwargs2props(propkwargs)
    props = Dict{Symbol,Any}(propkwargs)
    props # XXX IJulia/JSON bug? kernel seems to crash if this is a String not a Dict (which is obviously silly but still, it shouldn't crash the IJulia kernel)
end

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

####### Rendering to HTML ########

function JSON.lower(n::Node)
    result = Dict{String, Any}(
        "type" => "node",
        "nodeType" => nodetype(n),
        "instanceArgs" => JSON.lower(n.instanceof),
        "children" => map!(render_internal,
                           Vector{Any}(undef, length(children(n))),
                           children(n)),
        "props" => props(n),
    )
    return result
end

"""
Escape characters for a "safe" representation of JSON.

In particular, we escape '/' characters to avoid the presence of "</" (and
especially "</script>") which cause the browser to break out of the current
<script /> tag.
"""
function escape_json(s::String)
    # Replace all "/" with "\/"'s.
    # This prevents the browser from interpreting "</" as a close tag; since
    # everything within the string is JSON, any appearances of "/" should be
    # within strings and when the JSON is parsed, the "\/"'s will be interpreted
    # as just normal "/"'s.
    return replace(s, "/" => "\\/")
end

escape_json(x::Any) = escape_json(JSON.json(x))

function Base.show(io::IO, m::MIME"text/html", x::Node)
    mountpoint_id = rand(UInt64)
    # Is there any way to only include the `require`-guard below for IJulia?
    # I think IJulia defines their own ::IO type.
    write(
        io,
        """
        <div
            class="webio-mountpoint"
            data-webio-mountpoint="$(mountpoint_id)"
        >
            <script>
            if (window.require && require.defined && require.defined("nbextensions/webio/main")) {
                console.log("Jupyter WebIO extension detected, not mounting.");
            } else if (window.WebIO) {
                WebIO.mount(
                    document.querySelector('[data-webio-mountpoint="$(mountpoint_id)"]'),
                    $(escape_json(x)),
                );
            } else {
                document
                    .querySelector('[data-webio-mountpoint="$(mountpoint_id)"]')
                    .innerHTML = '<strong>WebIO not detected.</strong>';
            }
            </script>
        </div>
        """
    )
end

function Base.show(io::IO, m::WEBIO_NODE_MIME, node::Node)
    write(io, JSON.json(node))
end

Base.show(io::IO, m::MIME"text/html", x::Observable) = show(io, m, WebIO.render(x))
Base.show(io::IO, m::WEBIO_NODE_MIME, x::Union{Observable, AbstractWidget}) = show(io, m, WebIO.render(x))
Base.show(io::IO, m::MIME"text/html", x::AbstractWidget) = show(io, m, WebIO.render(x))

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

## Element extension syntax

(n::Node)(x, args...) = append(n, (x, args...))
(n::Node)(props::AbstractDict...) = mergeprops(n, props...)
(n::Node)(;kwargs...) = mergeprops(n, kwargs)
(n::Node)(args...; kwargs...) = n(args...)(;kwargs...)


## Pretty printing

function showindent(io, level)
    for i=1:level
        write(io, "  ")
    end
end

function Base.show(io::IO, ::MIME"text/plain", el::Node)
    _show(io, el)
end

function showprops(io, dict)
    write(io, "{")
    write(io, ' ')
    for (k,v) in dict
        print(io, k)
        write(io, '=')
        show(io, v)
        write(io, ' ')
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
