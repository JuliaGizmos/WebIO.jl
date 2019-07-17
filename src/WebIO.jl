module WebIO

using Observables
using Requires
using AssetRegistry
using Base64: stringmime
import Widgets
import Widgets: node, AbstractWidget
using Logging
using UUIDs

include("../deps/bundlepaths.jl")

"""
The filesystem path where the WebIO frontend packages lives.
"""
const packagepath = normpath(joinpath(@__DIR__, "..", "packages"))

"""
The path of the main WebIO JavaScript bundle file.
"""
const bundlepath = CORE_BUNDLE_PATH

"""
The MIME type for WebIO nodes.

This is used when serializing a WebIO node tree to a frontend.
For example, when using Jupyter, the frontend will render the serialized JSON
via this MIME bundle rather than using the data sent as `text/html`.
"""
const WEBIO_NODE_MIME = MIME"application/vnd.webio.node+json"
Base.Multimedia.istextmime(::WEBIO_NODE_MIME) = true

const WEBIO_APPLICATION_MIME = MIME"application/vnd.webio.application+html"
Base.Multimedia.istextmime(::WEBIO_APPLICATION_MIME) = true

include("util.jl")
include("connection.jl")
include("syntax.jl")
include("asset.jl")
include("node.jl")
include("iframe.jl")
include("observable.jl")
include("scope.jl")
include("render.jl")
include("messaging.jl")
include("rpc.jl")

# Extra "non-core" functionality
include("devsetup.jl")
include("../deps/jupyter.jl")


"""
    setup_provider(s::Union{Symbol, AbstractString})

Perform any side-effects necessary to set up the given provider. For example,
in IJulia, this causes the frontend to load the webio javascript bundle.
"""
setup_provider(s::Union{Symbol, AbstractString}) = setup_provider(Val(Symbol(s)))
export setup_provider

const baseurl = Ref{String}("")

"""
A union of all WebIO renderable types.
"""
const Application = Union{Scope, Node, AbstractWidget, Observable}
export Application

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
    @require Blink="ad839575-38b3-5650-b840-f874b8c74a25" begin
        # The latest version of Blink defines their own WebIO integration
        # (after https://github.com/JunoLab/Blink.jl/pull/201).
        if isdefined(Blink.AtomShell, :initwebio!)
            return
        end
        Base.depwarn(
            "Please upgrade Blink for a smoother integration with WebIO.",
            :webio_blink_upgrade,
        )
        include(joinpath("providers", "blink.jl"))
    end
    @require IJulia="7073ff75-c697-5162-941a-fcdaad2a7d2a" begin
        include(joinpath("providers", "ijulia.jl"))
    end
    @require WebSockets="104b5d7c-a370-577a-8038-80a2059c5097" begin
        include(joinpath("providers", "generic_http.jl"))
    end

end

end # module
