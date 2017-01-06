module WebDisplay

using FunctionalCollections

include("util.jl")

function render end

include("node.jl")
include("context.jl")

export setup_provider, setup_ijulia

function setup_provider(name)
    include(joinpath(dirname(@__FILE__), "providers", "$(name)_setup.jl"))
end

Base.@deprecate setup_ijulia() setup_provider("ijulia")

end # module
