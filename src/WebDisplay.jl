module WebDisplay

immutable WebIO
    id::AbstractString
    io::IO
end

WebIO(io::IO=IOBuffer()) = WebIO(newid(), io)

function render end

function Base.show(io::WebIO, m::MIME"text/html", x)
    show(io.io, m, render(io, x))
end

using FunctionalCollections

include("util.jl")
include("context.jl")
include("node.jl")

end # module
