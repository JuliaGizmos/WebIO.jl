module WebDisplay

function render end

Base.show(io::IO, m::MIME"text/html", x) = show(io, m, render(x))

function Base.mimewritable(m::MIME"text/html", x) # ¯\_(ツ)_/¯
    method_exists(render, x) ||
        ismorespecific(
            show,
            (IO, typeof(m), typeof(x)),
            (IO, typeof(m), Any)
        )
end


using FunctionalCollections

include("util.jl")
include("context.jl")
include("node.jl")

end # module
