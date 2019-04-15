using WebIO
using WebSockets
using Test

@testset "HTTP provider" begin
    output = sprint(io-> show(io, WebIO.WEBIO_APPLICATION_MIME(), node(:div, "hello, world")))
    @test occursin("_webIOWebSocketURL = ", output)
    @test occursin("ws://127.0.0.1:8081/webio_websocket/", output)
    @test occursin("""hello, world""", output)
    @test WebIO.webio_server_config[] == (url = "127.0.0.1", bundle_url = WebIO.bundle_key, http_port = 8081, ws_url = "ws://127.0.0.1:8081/webio_websocket/")
    @test isassigned(WebIO.singleton_instance)
end
