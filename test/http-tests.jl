using WebIO
using HTTP, WebSockets
using JSExpr
using Test

@testset "HTTP provider" begin
    output = sprint(io-> show(io, MIME"application/webio"(), node(:div, "hi")))
    @test occursin("<script> var websocket_url = \"127.0.0.1:8081/webio_websocket/\" </script>", output)
    @test occursin("""{"props":{},"nodeType":"DOM","type":"node","instanceArgs":{"namespace":"html","tag":"div"},"children":["hi"]}""", output)
    @test WebIO.webio_server_config[] == (url = "127.0.0.1", http_port = 8081, ws_url = "127.0.0.1:8081/webio_websocket/")
    @test isassigned(WebIO.singleton_instance)
end
