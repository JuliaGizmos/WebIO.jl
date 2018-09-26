using WebIO
using WebSockets
using JSExpr
using Test

@testset "HTTP provider" begin
    output = sprint(io-> show(io, MIME"application/webio"(), node(:div, "hi")))
    @test occursin("<script> var websocket_url = \"ws://127.0.0.1:8081/webio_websocket/\" </script>", output)
    @test occursin("""{"props":{},"nodeType":"DOM","type":"node","instanceArgs":{"namespace":"html","tag":"div"},"children":["hi"]}""", output)
    @test WebIO.webio_server_config[] == (url = "127.0.0.1", http_port = 8081, ws_url = "ws://127.0.0.1:8081/webio_websocket/")
    @test isassigned(WebIO.singleton_instance)
end


using WebSockets, WebIO

app = Ref{Any}(node(:div, "hi"))
function serve_app(req)
    if req.target == "/"
        return sprint() do io
            print(io, """
                <!doctype html>
                <html>
                <head>
                <meta charset="UTF-8">
                </head>
                <body>
            """)
            show(io, MIME"application/webio"(), app[])
            print(io, "
                </body>
                </html>
            ")
        end
    else
        return missing
    end
end
server = WebIO.WebIOServer(serve_app, logger = stdout, verbose = true)
using JSExpr
WebIO.wio_asseturl("/webio/dist/bundle.js")
server.serve_task

w = Scope()

obs = Observable(w, "rand-value", 0.0)

on(obs) do x
   println("JS sent $x")
end

app[] = w(
 dom"button"(
   "generate random",
   events=Dict("click"=>@js () -> $obs[] = Math.random()),
 ),
);
