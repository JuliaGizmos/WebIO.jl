@testset "Issue 156" begin
    @test length(children(node(:div, rand(3, 3)))) == 1
end
