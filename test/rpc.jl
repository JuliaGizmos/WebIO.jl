using Test
using Blink
using WebIO

if !(@isdefined DummyConnection)
    include("./test-utils.jl")
end

w = open_window()

@testset "RPCs work as expected" begin
    x = Ref{Any}(nothing)
    setx(newx) = x[] = newx

    onclick = js"""
    async function() {
        await $setx("foo");
    }
    """
    body!(w, dom"button#mybutton"(events=Dict("click" => onclick)))
    sleep(0.5)

    @js w document.getElementById("mybutton").click()
    sleep(0.1)

    @test x[] == "foo"
end

w = Window(Dict(:show => true))
opentools(w)
@testset "RPCs throw if Julia throws" begin
    @testset "Raised errors are propagated." begin
        wascalled = Ref(false)
        @js w window.lastException = nothing

        function throwjuliaerror(x)
            wascalled[] = true
            error(x)
        end

        onclick = js"""
        async function() {
            try {
                await $throwjuliaerror("this is my error");
            } catch (e) {
                window.lastException = e.message;
            }
        }
        """
        body!(w, dom"button#mybutton"(events=Dict("click" => onclick)))
        sleep(0.5)
        @js w document.getElementById("mybutton").click()
        sleep(0.5)
        @test wascalled[]
        @test occursin("this is my error", @js w window.lastException)
    end

    @testset "Invalid method invocations raise errors" begin
        wascalled = Ref(false)
        @js w window.lastException = nothing
        function takes3args(x, y, z)
            wascalled[] = true
            return x + y + z
        end
        onclick = js"""
        async function() {
            try {
                await $takes3args(1, 2);
            } catch (e) {
                window.lastException = e.message;
            }
        }
        """
        body!(w, dom"button#mybutton"(events=Dict("click" => onclick)))
        sleep(0.5)
        @js w document.getElementById("mybutton").click()
        sleep(0.5)
        # Should not have actually been invoked at all.
        @test wascalled[] == false
        @test occursin("no method matching", @js w window.lastException)
    end
end


@testset "RPC Request Handler" begin
    c = DummyConnection()
    # Force the split function to be inserted into the RPC map.
    js"$split"

    WebIO.dispatch(c, Dict(
        "type" => "request",
        "request" => "rpc",
        "requestId" => "foo",
        "rpcId" => string(hash(split)),
        "arguments" => ["foo bar"],
    ))
    r = take!(c)
    @test r["requestId"] == "foo"
    @test !haskey(r, "exception")
    @test r["result"] == ["foo", "bar"]

    WebIO.dispatch(c, Dict(
        "type" => "request",
        "request" => "rpc",
        "requestId" => "bar",
        "rpcId" => string(hash(split)),
        "arguments" => [123],
    ))
    r = take!(c)
    @test r["requestId"] == "bar"
    @test haskey(r, "exception")
    @test occursin("no method matching", r["exception"])
    @test !haskey(r, "result")

    WebIO.dispatch(c, Dict(
        "type" => "request",
        "request" => "rpc",
        "requestId" => "bar",
        "rpcId" => string(hash(split)),
        "arguments" => [123],
    ))
    r = take!(c)
    @test r["requestId"] == "bar"
    @test haskey(r, "exception")
    @test occursin("no method matching", r["exception"])
    @test !haskey(r, "result")

    @testset "Exception is returned when using unknown RPC" begin
    # unknown rpc
        WebIO.dispatch(c, Dict(
            "type" => "request",
            "request" => "rpc",
            "requestId" => "bar",
            "rpcId" => "1234",
            "arguments" => [123],
        ))
        r = take!(c)
        @test r["requestId"] == "bar"
        @test haskey(r, "exception")
        @test occursin("unknown rpc", r["exception"])
        @test !haskey(r, "result")
    end
end
