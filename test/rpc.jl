using Test
using Blink
using WebIO

w = Window(Dict(:show => true))
opentools(w)
# Prime Blink and let WebIO load.
# body!(w, dom"div"())
# sleep(5)

@testset "RPCs work as expected" begin
    x = Ref{Any}(nothing)
    setx = RPC() do newx
        x[] = newx
    end

    setx(4)
    @test x[] == 4

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

        throwjuliaerror = RPC() do x
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
        takes3args = RPC() do x, y, z
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
