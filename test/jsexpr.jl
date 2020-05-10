using Test
using JSExpr
using Observables, WebIO

@testset "JSExpr integration" begin
    @testset "dereference observables (rvalue)" begin
        s = Scope()
        obs = Observable(s, "obs", "obs")
        expr_str = string(@js $obs[])
        @test expr_str == "WebIO.getObservableValue(\"$(obsid(obs))\")"
    end

    @testset "dereference observables (lvalue)" begin
        s = Scope()
        obs = Observable(s, "obs", "foo")
        expr_str = string(@js $obs[] = "bar")
        @test expr_str == "WebIO.setObservableValue(\"$(obsid(obs))\", \"bar\")"
    end
end
