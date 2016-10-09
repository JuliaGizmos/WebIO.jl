export Node, class, children, props, key

immutable Node{T}
    class::Tuple
    key::Int

    children::AbstractArray
    props::Dict

    _descendants_count::Int
end

immutable DOM end

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

Node{T}(::Type{T}, class::Tuple, children=emptypvec, props=emptydict, key=0) =
    Node{T}(class, key, _pvec(children), props, descendants_count(children))

Node(T::Type, tag::Symbol, args...) = Node(T, (:vDOM, tag), args...)

Node(tag::Union{Symbol, Tuple}, args...) = Node(DOM, tag, args...)

######## getters and setters #######

const fields = [:class, :children, :props, :key]
const expr = :(Node{T}(n.class, n.children, n.props, n.key))

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


####### Rendering to HTML ########

function show(io::IO, m::MIME"text/html", x::Node)
    write(io, "<script>WebDisplay.create(")
    JSON.print(io, x)
    write(io, ")</script>")
end

