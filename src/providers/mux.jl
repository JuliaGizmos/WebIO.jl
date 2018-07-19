@require Mux="a975b10e-0019-58db-a62f-e48ff68538c9" begin
using Mux
using JSON
using AssetRegistry

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
        route("/webio-socket", create_socket),
        Mux.wclose,
        Mux.notfound(),
    ))

    serve(http, websock, port)
end

struct WebSockConnection <: AbstractConnection
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

function Base.send(p::WebSockConnection, data)
    write(p.sock, sprint(io->JSON.print(io,data)))
end

Base.isopen(p::WebSockConnection) = isopen(p.sock)


function Mux.Response(o::Union{Node, Scope})
    key = AssetRegistry.register(joinpath(@__DIR__, "..", "..", "assets"))
    Mux.Response(
        """
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8">
            <script src="$(baseurl[])$key/webio/dist/bundle.js"></script>
            <script src="$(baseurl[])$key/providers/mux_setup.js"></script>
          </head>
          <body>
            $(stringmime(MIME"text/html"(), o))
          </body>
        </html>
        """
    )
end

#function WebIO.register_renderable(T::Type, ::Val{:mux})
Mux.Response(x::T) = Mux.Response(WebIO.render(x))
#end

WebIO.setup_provider(::Val{:mux}) = nothing # Mux setup has no side-effects
WebIO.setup(:mux)

end
