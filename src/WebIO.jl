module WebIO

include("util.jl")
include("observable.jl")
include("node.jl")
include("syntax.jl")
include("context.jl")
include("connection.jl")
include("devsetup.jl")

export setup_provider

"""
    render(x::MyType)

Generic function that defines how a Julia object is rendered. Should return a
`Node` object.
"""
function render end
function setup_provider(name)
    include(joinpath(dirname(@__FILE__), "providers", "$(name)_setup.jl"))
end

function setup()
    if isdefined(Main, :IJulia)
        setup_provider("ijulia")
    elseif isdefined(Main, :Juno)
        setup_provider("atom")
    elseif isdefined(Main, :Blink)
        setup_provider("blink")
    elseif isdefined(Main, :Mux)
        setup_provider("mux")
    end
end

end # module
