using .JSON
using .AssetRegistry
using .Sockets
using .Base64: stringmime
export webio_serve

"""
    webio_serve(app, port=8000)

Serve a Mux app which might return a WebIO node.
"""
function webio_serve(app, args...)
    http = Mux.App(Mux.mux(
        Mux.defaults,
        app,
        Mux.notfound()
    ))
    webio_serve(http, args...)
end
function webio_serve(app::Mux.App, args...)
    websock = Mux.App(Mux.mux(
        Mux.wdefaults,
        Mux.route("/webio-socket", create_socket),
        Mux.wclose,
        Mux.notfound(),
    ))

    Mux.serve(app, websock, args...)
end


struct WebSockConnection{T} <: WebIO.AbstractConnection
    sock::T
end

function create_socket(req::Dict)
    sock = req[:socket]
    # Dispatch on the type of socket if needed
    _create_socket(sock)
end

function _create_socket(sock::Mux.HTTP.WebSockets.WebSocket)
    conn = WebSockConnection(sock)

    # Iteration ends when the socket is closed
    t = @async for data in sock
        msg = JSON.parse(String(data))
        WebIO.dispatch(conn, msg)
    end

    wait(t)
end

function Sockets.send(p::WebSockConnection, data)
    Mux.HTTP.WebSockets.send(p.sock, sprint(io->JSON.print(io,data)))
end

# May not be strictly true
Base.isopen(p::WebSockConnection) = !Mux.HTTP.WebSockets.isclosed(p.sock)

Mux.Response(o::AbstractWidget) = Mux.Response(Widgets.render(o))
function Mux.Response(content::Union{Node, Scope})
    script_url = try
        AssetRegistry.register(MUX_BUNDLE_PATH)
    catch exc
        @error(
            "Unable to register Mux bundle path: $MUX_BUNDLE_PATH.\n"
                * "Try rebuilding WebIO.",
            exception=exc,
        )
        rethrow()
    end
    Mux.Response(
        """
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8">
            <script src="$(WebIO.baseurl[])$(script_url)"></script>
          </head>
          <body>
            $(stringmime(MIME("text/html"), content))
          </body>
        </html>
        """
    )
end

function WebIO.register_renderable(::Type{T}, ::Val{:mux}) where {T}
    eval(:(Mux.Response(x::$T) = Mux.Response(WebIO.render(x))))
end

WebIO.setup_provider(::Val{:mux}) = nothing # Mux setup has no side-effects
WebIO.setup(:mux)
