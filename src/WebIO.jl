module WebIO

include("util.jl")
include("node.jl")
include("context.jl")
include("syntax.jl")
include("devsetup.jl")


export render, setup_provider

"""
    render(x::MyType)

Generic function that defines how a Julia object is rendered. Should return a
`Node` object.
"""
function render end
function setup_provider(name)
    include(joinpath(dirname(@__FILE__), "providers", "$(name)_setup.jl"))
end

end # module
