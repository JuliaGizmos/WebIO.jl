using WebIO
using Test

if !(@isdefined DummyConnection)
    include("./test-utils.jl")
end

@testset "Scope reaping" begin
    scope = Scope()
    id = scopeid(scope)
    conn = DummyConnection(scope)
    wait(scope)
    @debug "Scope connected!" scope conn
    @test WebIO.lookup_scope(id) === scope

    WebIO.dispatch(conn, Dict(
        "type" => "command",
        "command" => "teardown_scope",
        "payload" => Dict(
            "scopeId" => id,
        ),
    ))
    @test WebIO.lookup_scope(id) === scope
    @test !haskey(WebIO.global_scope_refcounts, id)

    # We have to do a large number of these so that there exists enough memory
    # pressure for Julia to actually GC anything.
    scopes = WeakRef[]
    n_scopes = 1000
    for _ in 1:n_scopes
        scope = Scope()
        push!(scopes, WeakRef(scope))
        conn = DummyConnection(scope)
        wait(scope)
        WebIO.dispatch(conn, Dict(
            "type" => "command",
            "command" => "teardown_scope",
            "payload" => Dict(
                "scopeId" => scopeid(scope)
            )
        ))
    end

    # Force garbage collection.
    # We do it three times to ensure that things are actually GC'd. :^)
    Base.GC.gc(true)
    Base.GC.gc(true)
    Base.GC.gc(true)
    filter!(s -> s.value !== nothing, scopes)
    @test length(scopes) < n_scopes
end
