using WebIO
using Test

using JSExpr

if !(@isdefined DummyConnection)
    include("./test-utils.jl")
end

@testset "`evaljs` for Scopes" begin
    scope = Scope()
    conn = DummyConnection(scope)
    wait(scope)

    evaljs(scope, js"""console.log("hello!")""")
    # Sleep to allow asynchronous message sending to happen (remove this once
    # we have truly synchronous communication).
    sleep(0.01)
    msg = take!(conn)
    @test msg["type"] == "command" && msg["command"] == "evaljs"
    @test msg["payload"] == Dict(
        "expr" => """console.log("hello!")""",
        "scopeId" => WebIO.scopeid(scope),
    )
end
