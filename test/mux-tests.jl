module WebIOServeTest
    using WebIO
    using Test

    using Mux
    # Test that webio_serve was defined
    @test isdefined(WebIO, :webio_serve)
end
