module WebIO

using Observables
using Requires
using AssetRegistry
using Base64: stringmime
import Widgets
import Widgets: node, AbstractWidget

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

const baseurl = Ref{String}("")
const assetpath = joinpath(@__DIR__, "..", "assets")
const bundlepath = joinpath(assetpath, "webio", "dist", "bundle.js")

function setbaseurl!(str)
    baseurl[] = str
    if :ijulia in providers_initialised
        # re-run IJulia setup with the new base URL
        WebIO.setup_provider(Val{:ijulia}())
    end
end

const providers_initialised = Set{Symbol}()

function setup(provider::Symbol)
    haskey(ENV, "WEBIO_DEBUG") && println("WebIO: setting up $provider")
    haskey(ENV, "JULIA_WEBIO_BASEURL") && (baseurl[] = ENV["JULIA_WEBIO_BASEURL"])
    setup_provider(provider)
    push!(providers_initialised, provider)
    re_register_renderables()
end
setup(provider::AbstractString) = setup(Symbol(provider))

function __init__()
    push!(Observables.addhandler_callbacks, WebIO.setup_comm)
    @require Mux="a975b10e-0019-58db-a62f-e48ff68538c9" begin
        include(joinpath("providers", "mux.jl"))
    end
    @require Juno="e5e0dc1b-0480-54bc-9374-aad01c23163d" begin
        include(joinpath("providers", "atom.jl"))
    end
    @require Blink="ad839575-38b3-5650-b840-f874b8c74a25" begin
        include(joinpath("providers", "blink.jl"))
    end
    @require IJulia="7073ff75-c697-5162-941a-fcdaad2a7d2a" begin
        include(joinpath("providers", "ijulia.jl"))
    end
    @require HTTP="cd3eb016-35fb-5094-929b-558a96fad6f3" begin
        @require WebSockets="104b5d7c-a370-577a-8038-80a2059c5097" begin
            include(joinpath("providers", "generic_http.jl"))
        end
    end

end

end # module
