using WebIO
using Test

if !(@isdefined DummyConnection)
    include("./test-utils.jl")
end

@testset "Observable updates" begin
    scope = Scope()
    count = Observable(scope, "count", 0)
    @test scope["count"][] == 0

    conn = DummyConnection(scope)
    wait(scope)
    WebIO.dispatch(conn, Dict(
        "type" => "command",
        "command" => "update_observable",
        "payload" => Dict(
            "observableId" => obsid(count),
            "value" => 1,
        )
    ))

    @test count[] == 1
end
