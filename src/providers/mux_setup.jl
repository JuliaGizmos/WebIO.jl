using Mux
using JSON
using WebIO

"""
    webio_serve(app, port=8000)

Serve a Mux app which might return a WebIO node.
"""
function webio_serve(app, port=8000)
    @app http = (
        Mux.defaults,
        app,
        Mux.notfound(),
    )

    @app websock = (
        Mux.wdefaults,
        route("/webio-socket", create_socket),
        Mux.wclose,
        Mux.notfound(),
    )

    serve(http, websock, port)
end

immutable WebSockConnection <: AbstractConnection
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


function Mux.Response(o::Union{Node, Scope})
    Mux.Response(
        """
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8">
            <script src="/pkg/WebIO/webio/bundle.js"></script>
            <script src="/pkg/WebIO/providers/mux_setup.js"></script>
          </head>
          <body>
            $(stringmime(MIME"text/html"(), o))
          </body>
        </html>
        """
    )
end

function WebIO.register_renderable(T::Type)
    Mux.Response(x::T) = Mux.Response(WebIO.render(x))
    WebIO.register_renderable_common(T)
end
