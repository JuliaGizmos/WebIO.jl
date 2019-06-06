using WebIO
using Test

@testset "Scope id deprecations" begin
    @test_deprecated Scope("manual-ids-are-deprecated")
    @test_deprecated Scope(; id="still-deprecated")
end
