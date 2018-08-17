using JSON
using AssetRegistry
using Sockets
using Base64: stringmime
export webio_serve

"""
    webio_serve(app, port=8000)

Serve a Mux app which might return a WebIO node.
"""
function webio_serve(app, port=8000)
    http = Mux.App(Mux.mux(
        Mux.defaults,
        app,
        Mux.notfound()
    ))

    websock = Mux.App(Mux.mux(
        Mux.wdefaults,
        Mux.route("/webio-socket", create_socket),
        Mux.wclose,
        Mux.notfound(),
    ))

    Mux.serve(http, websock, port)
end

struct WebSockConnection <: WebIO.AbstractConnection
    sock
end

function create_socket(req)
    sock = req[:socket]
    conn = WebSockConnection(sock)

    t = @async while isopen(sock)
        data = read(sock)

        msg = JSON.parse(String(data))
        WebIO.dispatch(conn, msg)
    end

    wait(t)
end

function Sockets.send(p::WebSockConnection, data)
    write(p.sock, sprint(io->JSON.print(io,data)))
end

Base.isopen(p::WebSockConnection) = isopen(p.sock)


function Mux.Response(o::Union{Node, Scope, AbstractWidget})
    key = AssetRegistry.register(joinpath(@__DIR__, "..", "..", "assets"))
    Mux.Response(
        """
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8">
            <script src="$(WebIO.baseurl[])$key/webio/dist/bundle.js"></script>
            <script src="$(WebIO.baseurl[])$key/providers/mux_setup.js"></script>
          </head>
          <body>
            $(stringmime(MIME"text/html"(), o))
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
