module WebSocketsExt

using WebIO, JSON, AssetRegistry
using Sockets

using WebIO: WEBIO_APPLICATION_MIME, GENERIC_HTTP_BUNDLE_PATH, bundle_key, 
    global_server_config, WebIOServer, singleton_instance, routing_callback,
    webio_server_config
using WebSockets: WebSockets, HTTP, is_upgrade, upgrade, writeguarded

struct WSConnection{T} <: WebIO.AbstractConnection
    sock::T
end

Sockets.send(p::WSConnection, data) = writeguarded(p.sock, JSON.json(data))
Base.isopen(p::WSConnection) = isopen(p.sock)

include(joinpath(@__DIR__, "..", "deps", "mimetypes.jl"))

"""
Serve an asset from the asset registry.
"""
function serve_assets(req)
    if haskey(AssetRegistry.registry, req.target)
        filepath = AssetRegistry.registry[req.target]
        if isfile(filepath)
            return HTTP.Response(
                200,
                [
                    "Access-Control-Allow-Origin" => "*",
                    "Content-Type" => file_mimetype(filepath)
                ],
                body = read(filepath)
            )
        end
    end
    return HTTP.Response(404)
end

function websocket_handler(ws)
    conn = WSConnection(ws)
    while isopen(ws)
        data, success = WebSockets.readguarded(ws)
        !success && break
        msg = JSON.parse(String(data))
        WebIO.dispatch(conn, msg)
    end
end

kill!(server::WebIOServer) = put!(server.server.in, HTTP.Servers.KILL)

"""
Run the WebIO server.

# Examples
```
using WebSockets, WebIO
app = Ref{Any}(node(:div, "hi"))
function serve_app(req)
    req.target != "/" && return missing
    return sprint() do io
        print(io, \"\"\"
            <!doctype html><html><head>
            <meta charset="UTF-8"></head><body>
        \"\"\")
        show(io, WebIO.WEBIO_APPLICATION_MIME(), app[])
        print(io, "</body></html>")
    end
end
server = WebIO.WebIOServer(serve_app, verbose = true)
```
"""
function WebIO.WebIOServer(
        default_response::Function = (req)-> missing;
        baseurl::String = "127.0.0.1", http_port::Int = 8081,
        verbose = false, singleton = true,
        websocket_route = "/webio_websocket/",
        server_kw_args...
    )
    # TODO test if actually still running, otherwise restart even if singleton
    if !singleton || !isassigned(singleton_instance)
        function handler(req)
            response = default_response(req)
            response !== missing && return response
            return serve_assets(req)
        end
        function wshandler(req, sock)
            req.target == websocket_route && websocket_handler(sock)
        end
        server = WebSockets.ServerWS(handler, wshandler; server_kw_args...)
        server_task = @async WebSockets.serve(server, baseurl, http_port, verbose)
        singleton_instance[] = WebIOServer(server, server_task)
        bundle_url = get(ENV, "WEBIO_BUNDLE_URL") do
            webio_base = WebIO.baseurl[]
            base = if startswith(webio_base, "http") # absolute url
                webio_base
            else # relative url
                string("http://", baseurl, ":", http_port, WebIO.baseurl[])
            end
            string(base, bundle_key[])
        end
        wait_time = 5; start = time() # wait for max 5 s
        while time() - start < wait_time
            # Block as long as our server doesn't actually serve the bundle
            try
                resp = WebSockets.HTTP.get(bundle_url)
                resp.status == 200 && break
                sleep(0.1)
            catch e
            end
        end
    end
    return singleton_instance[]
end

"""
Fetches the global configuration for our http + websocket server from environment
variables. It will memoise the result, so after a first call, any update to
the environment will get ignored.
"""
function WebIO.global_server_config()
    if !isassigned(webio_server_config)

        WebIO.setbaseurl!(get(ENV, "JULIA_WEBIO_BASEURL", ""))

        url = get(ENV, "WEBIO_SERVER_HOST_URL", "127.0.0.1")
        http_port = parse(Int, get(ENV, "WEBIO_HTTP_PORT", "8081"))
        ws_default = string("ws://", url, ":", http_port, "/webio_websocket/")
        ws_url = get(ENV, "WEBIO_WEBSOCKT_URL", ws_default)
        # make it possible, to e.g. host the bundle online
        bundle_url = get(ENV, "WEBIO_BUNDLE_URL", string(WebIO.baseurl[], bundle_key[]))
        webio_server_config[] = (
            url = url, bundle_url = bundle_url,
            http_port = http_port, ws_url = ws_url
        )
    end
    webio_server_config[]
end

"""
Show a WebIO application.

This method ensures that the requisite asset server and WebSocket endpoints
are running and prints the required HTML scripts and WebIO mounting code.

# Examples
```
function Base.display(d::MyWebDisplay, m::MIME"application/webio", app)
    println(d.io, "outer html")
    show(io, m, app)
    println(d.io, "close outer html")
end
```
"""
function Base.show(io::IO, m::WEBIO_APPLICATION_MIME, app::Application)
    c = global_server_config()
    WebIOServer(routing_callback[], baseurl = c.url, http_port = c.http_port)
    println(io, "<script>window._webIOWebSocketURL = $(repr(c.ws_url));</script>")
    println(io, "<script src=$(repr(c.bundle_url))></script>")
    show(io, "text/html", app)
    return
end

function __init__()
    if !isfile(GENERIC_HTTP_BUNDLE_PATH)
        error(
            "Unable to find WebIO JavaScript bundle for generic HTTP provider; "
            * "try rebuilding WebIO (via `Pkg.build(\"WebIO\")`)."
            )
    end
    bundle_key[] = AssetRegistry.register(GENERIC_HTTP_BUNDLE_PATH)
end

end
