using Test
using WebIO
using Mux
using Blink

@testset "Mux sanity" begin
    @test isdefined(WebIO, :webio_serve)
end

w = Window()
@testset "Mux + Blink" begin
    t = WebIO.webio_serve(page("/", req -> dom"div"("hello")), 8006)
    loadurl(w, "http://localhost:8006")
    @test !istaskfailed(t.task)
end

# TODO: real mux tests (possibly using Blink as a headless chrome)
