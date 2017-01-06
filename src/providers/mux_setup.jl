using Mux
using WebDisplay

function packagefiles(dir, dirs=true)
    absdir(req) = Pkg.dir(req[:params][:pkg], dir)
    branch(req -> Mux.validpath(absdir(req), joinpath(req[:path]...), dirs=dirs),
           req -> Mux.fresp(joinpath(absdir(req), req[:path]...)))
end

immutable WebSockProvider
    socks::Dict()
end

function wd_socket(req)
    sock = req[:socket]

    t = @async while isopen(sock)
        data = read(sock)

        msg = JSON.parse(String(data))
        WebDisplay.dispatch(msg)
    end
    WebDisplay.push_provider!(WebSockProvider(sock))

    wait(t)
end

function Base.send(p::WebSockProvider, data)
    write(
        p.sock,
        data
    )
end

function wdserve(intermediates, port=8000)
    @app http = (
        Mux.defaults,
        route("pkg/:pkg", packagefiles("assets"), Mux.notfound()),
        intermediates,
        Mux.wclose,
        Mux.notfound(),
    )

    @app websock = (
        Mux.wdefaults,
        route("/wdsocket", wd_socket),
        Mux.wclose,
        Mux.notfound(),
    )

    serve(http, websock, port)
end

Mux.Response(o::Node) = Mux.Response(
        """
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8">
            <script src="/pkg/WebDisplay/webdisplay.js"></script>
            <script src="/pkg/WebDisplay/nodeTypes.js"></script>
            <script src="/pkg/WebDisplay/mux_setup.js"></script>
          </head>
          <body>
            $(stringmime(MIME"text/html"(), o))
          </body>
        </html>
        """
    )
