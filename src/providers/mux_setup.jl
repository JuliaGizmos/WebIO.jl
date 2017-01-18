using Mux
using JSON
using WebDisplay

"""
    wdserve(app, port=8000)

Serve a Mux app which might return a WebDisplay node.
"""
function wdserve(app, port=8000)
    @app http = (
        Mux.defaults,
        route("pkg/:pkg", packagefiles("assets"), Mux.notfound()),
        app,
        Mux.notfound(),
    )

    @app websock = (
        Mux.wdefaults,
        route("/wdsocket", create_socket),
        Mux.wclose,
        Mux.notfound(),
    )

    serve(http, websock, port)
end

immutable WebSockConnection <: AbstractConnection
    sock
end

function create_socket(req)
    @show sock = req[:socket]
    conn = WebSockConnection(sock)

    t = @async while isopen(sock)
        data = read(sock)

        msg = JSON.parse(String(data))
        WebDisplay.dispatch(conn, msg)
    end
    println("Communicating...")

    wait(t)
    println("No contact :(")
end

function Base.send(p::WebSockConnection, data)
    write(p.sock, sprint(io->JSON.print(io,data)))
end


function Mux.Response(o::Node)
    Mux.Response(
        """
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8">
            <script src="/pkg/WebDisplay/js/webdisplay.js"></script>
            <script src="/pkg/WebDisplay/js/nodeTypes.js"></script>
            <script src="/pkg/WebDisplay/js/mux_setup.js"></script>
          </head>
          <body>
            $(stringmime(MIME"text/html"(), o))
          </body>
        </html>
        """
    )
end

function packagefiles(dir, dirs=true)
    absdir(req) = @show Pkg.dir(req[:params][:pkg], dir)
    branch(req -> Mux.validpath(absdir(req), joinpath(req[:path]...), dirs=dirs),
           req -> Mux.fresp(joinpath(absdir(req), req[:path]...)))
end
