__precompile__()

module WebIO

using Observables
using Requires

abstract type AbstractConnection end

include("util.jl")
include("node.jl")
include("syntax.jl")
include("scope.jl")
include("render.jl")
include("connection.jl")
include("iframe.jl")
include("devsetup.jl")

export setup_provider

function setup_provider(name)
    include(joinpath(dirname(@__FILE__), "providers", "$(name)_setup.jl"))
end

const providers_initialised = Set{String}()

function setup(provider)
    println("WebIO: setting up $provider")
    setup_provider(provider)
    push!(providers_initialised, provider)
    re_register_renderables()
end


# TODO check Juno since Blink might get loaded after/before?
@require Mux eval(Main, :(WebIO.setup("mux")))
@require Blink eval(Main, :(WebIO.setup("blink")))
@require Juno eval(Main, :(WebIO.setup("atom")))
@require IJulia eval(Main, :(WebIO.setup("ijulia")))

Requires.@init begin
    push!(Observables.addhandler_callbacks, WebIO.setup_comm)
end

end # module
