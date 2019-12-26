using Test
# using Blink
using WebIO

if !(@isdefined DummyConnection)
    include("./test-utils.jl")
end

# @testset "RPCs work as expected" begin
#     x = Ref{Any}(nothing)
#     setx(newx) = x[] = newx
#
#     onclick = js"""
#     async function() {
#         await $setx("foo");
#     }
#     """
#     body!(w, dom"button#mybutton"(events=Dict("click" => onclick)))
#     sleep(0.5)
#
#     @js w document.getElementById("mybutton").click()
#     sleep(0.1)
#
#     @test x[] == "foo"
# end

# w = Window(Dict(:show => true))
# opentools(w)
# @testset "RPCs throw if Julia throws" begin
#     @testset "Raised errors are propagated." begin
#         wascalled = Ref(false)
#         @js w window.lastException = nothing
#
#         function throwjuliaerror(x)
#             wascalled[] = true
#             error(x)
#         end
#
#         onclick = js"""
#         async function() {
#             try {
#                 await $throwjuliaerror("this is my error");
#             } catch (e) {
#                 window.lastException = e.message;
#             }
#         }
#         """
#         body!(w, dom"button#mybutton"(events=Dict("click" => onclick)))
#         sleep(0.5)
#         @js w document.getElementById("mybutton").click()
#         sleep(0.5)
#         @test wascalled[]
#         @test occursin("this is my error", @js w window.lastException)
#     end
#
#     @testset "Invalid method invocations raise errors" begin
#         wascalled = Ref(false)
#         @js w window.lastException = nothing
#         function takes3args(x, y, z)
#             wascalled[] = true
#             return x + y + z
#         end
#         onclick = js"""
#         async function() {
#             try {
#                 await $takes3args(1, 2);
#             } catch (e) {
#                 window.lastException = e.message;
#             }
#         }
#         """
#         body!(w, dom"button#mybutton"(events=Dict("click" => onclick)))
#         sleep(0.5)
#         @js w document.getElementById("mybutton").click()
#         sleep(0.5)
#         # Should not have actually been invoked at all.
#         @test wascalled[] == false
#         @test occursin("no method matching", @js w window.lastException)
#     end
# end


@testset "RPC" begin
    # Force the split function to be inserted into the RPC map.
    js"$split"

    @testset "RPC success" begin
        c = DummyConnection()
        WebIO.dispatch(c, Dict(
            "type" => "request",
            "request" => "rpc",
            "requestId" => "foo",
            "payload" => Dict(
                "rpcId" => string(hash(split)),
                "arguments" => ["foo bar"],
            ),
        ))
        response = take!(c)
        @test response["requestId"] == "foo"
        @test haskey(response, "payload")
        payload = response["payload"]
        @test !haskey(payload, "exception")
        @test haskey(payload, "result")
        @test payload["result"] == ["foo", "bar"]
    end

    @testset "RPC with invalid arguments (MethodError)" begin
        c = DummyConnection()
        WebIO.dispatch(c, Dict(
            "type" => "request",
            "request" => "rpc",
            "requestId" => "bar",
            "payload" => Dict(
                "rpcId" => string(hash(split)),
                "arguments" => [123],
            ),
        ))
        response = take!(c)
        @test response["requestId"] == "bar"
        @test haskey(response, "payload")
        payload = response["payload"]
        @test haskey(payload, "exception")
        exc = payload["exception"]
        @test occursin("no method matching", exc)
        @test !haskey(payload, "result")
    end

    @testset "Unknown RPC (UnknownRPCError)" begin
        c = DummyConnection()
        WebIO.dispatch(c, Dict(
            "type" => "request",
            "request" => "rpc",
            "requestId" => "bar",
            "payload" => Dict(
                "rpcId" => "1234",
                "arguments" => [123],
            ),
        ))
        response = take!(c)
        @test response["requestId"] == "bar"
        @test haskey(response, "exception")
        exc = response["exception"]
        @test occursin("UnknownRPCError", exc)
        @test !haskey(response, "payload")
    end
end
