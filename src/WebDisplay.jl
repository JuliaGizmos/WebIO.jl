module WebDisplay

using FunctionalCollections

include("util.jl")

function render end

include("node.jl")
include("context.jl")

export setup_ijulia

function setup_ijulia()
    include(joinpath(dirname(@__FILE__), "ijulia_setup.jl"))
end

end # module
