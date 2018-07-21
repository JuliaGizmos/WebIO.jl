__precompile__()

module WebIO

using Observables
using Requires
using AssetRegistry
using Compat

abstract type AbstractConnection end

include("util.jl")
include("node.jl")
include("syntax.jl")
include("scope.jl")
include("render.jl")
include("connection.jl")
include("iframe.jl")
include("devsetup.jl")

"""
    setup_provider(s::Union{Symbol, AbstractString})

Perform any side-effects necessary to set up the given provider. For example,
in IJulia, this causes the frontend to load the webio javascript bundle.
"""
setup_provider(s::Union{Symbol, AbstractString}) = setup_provider(Val(Symbol(s)))
export setup_provider

include(joinpath("providers", "atom.jl"))
include(joinpath("providers", "blink.jl"))
include(joinpath("providers", "ijulia.jl"))

const providers_initialised = Set{Symbol}()
function setup(provider::Symbol)
    haskey(ENV, "WEBIO_DEBUG") && println("WebIO: setting up $provider")
    setup_provider(provider)
    push!(providers_initialised, provider)
    re_register_renderables()
end
setup(provider::AbstractString) = setup(Symbol(provider))

Requires.@init begin
    push!(Observables.addhandler_callbacks, WebIO.setup_comm)
    try
        include(joinpath(@__DIR__(), "src", "providers", "mux.jl"))
    catch
        include(joinpath(@__DIR__(), "..", "src", "providers", "mux.jl"))
    end
end
end # module
