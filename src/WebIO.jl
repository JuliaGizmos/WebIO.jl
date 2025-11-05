module WebIO

using Observables
using AssetRegistry
using Base64: stringmime
import Widgets
import Widgets: node, AbstractWidget
using Logging
using UUIDs
using Base64

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

struct WebIOServer{S}
    server::S
    serve_task::Task

    function WebIOServer(server::S, serve_task::Task) where S
        # based on assert_extension from longemen3000/ExtensionsExt
        ext = Base.get_extension(@__MODULE__, :WebSocketsExt)
        if isnothing(ext)
            throw(error("Extension `WebSocketsExt` must be loaded to construct the type `WebIOServer`."))
        end
        return new{S}(server, serve_task)
    end
end

function webio_serve end
function global_server_config end

const bundle_key = Ref{String}()
const singleton_instance = Ref{WebIOServer}()
const routing_callback = Ref{Any}((req) -> missing)
const webio_server_config = Ref{typeof((url = "", bundle_url = "", http_port = 0, ws_url = ""))}()

function __init__()
    push!(Observables.addhandler_callbacks, WebIO.setup_comm)
end

end # module
