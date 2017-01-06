using Mux
using WebDisplay

function packagefiles(dir, dirs=true)
    absdir(req) = Pkg.dir(req[:params][:pkg], dir)
    branch(req -> Mux.validpath(absdir(req), joinpath(req[:path]...), dirs=dirs),
           req -> Mux.fresp(joinpath(absdir(req), req[:path]...)))
end

function wdserve(intermediates)
    @app wdserver = (
      Mux.defaults,
      intermediates,
      route("pkg/:pkg", packagefiles("assets"), Mux.notfound()),
      Mux.notfound())

    serve(wdserver)
end

Mux.Response(o::Node) = Mux.Response(
        """
        <html>
          <head>
            <script src="/pkg/WebDisplay/webdisplay.js"></script>
            <script src="/pkg/WebDisplay/nodeTypes.js"></script>
          </head>
          <body>
            $(stringmime(MIME"text/html"(), o))
          </body>
        </html>
        """
    )
