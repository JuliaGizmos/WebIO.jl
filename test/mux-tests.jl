module WebIOServeTest
    using WebIO
    using Test

    using Mux
    # Test that webio_serve was defined
    @test isdefined(WebIO, :webio_serve)
    # Test that it was also exported
    @test isdefined(WebIOServeTest, :webio_serve)
end
