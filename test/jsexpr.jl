using Test
using JSExpr
using Observables, WebIO

@testset "WebIO" begin
    @testset "dereference observables" begin
        s = Scope()
        obs = Observable(s, "obs", "obs")
        expr_str = string(@js($obs[]))
        @test startswith(expr_str, "WebIO.getval({")
        @test occursin("\"id\":\"$(WebIO.obsid(obs))\"", expr_str)
    end

    @testset "update observables" begin
        s = Scope()
        obs = Observable(s, "obs", "foo")
        expr_str = string(@js($obs[] = "bar"))
        @test startswith(expr_str, "WebIO.setval({")
        @test occursin("\"id\":\"$(WebIO.obsid(obs))\"", expr_str)
        @test endswith(expr_str, ", \"bar\")")
    end
end
