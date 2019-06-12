using WebIO
using Test

@testset "Scope id deprecations" begin
    @test_deprecated Scope("manual-ids-are-deprecated")
    @test_deprecated Scope(; id="still-deprecated")
end

@testset "register_renderable function deprecation" begin
    MyTypeName = gensym()
    @eval struct $MyTypeName end
    @eval WebIO.render(x::$MyTypeName) = x.dom
    @test_deprecated @eval WebIO.register_renderable($MyTypeName)
    @test hasmethod(Base.show, (IO, MIME"text/html", @eval($MyTypeName)))
end
