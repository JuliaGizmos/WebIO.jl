using WebIO
using Blink
using Observables
using Base.Test

notinstalled = !AtomShell.isinstalled()

notinstalled && AtomShell.install()

@testset "Blink mocks" begin

    @test WebIO.setup()

    # open window and wait for it to initialize
    w = Window(Dict(:show => false))

    body!(w, dom"div"("hello, blink"))
    sleep(5) # wait for it to render.

    substrings = ["<div>hello, blink</div></div>",
    "<script>WebIO.mount(",
    """{"props":{},"nodeType":"DOM","type":"node","instanceArgs":{"namespace":"html","tag":"div"},"children":["hello, blink"]}"""]
    content = Blink.@js(w, document.body.innerHTML)
    @test all(x->contains(content, x), substrings)

    @testset "observable interpolation" begin
        w = Widget("testwidget2")
        ob = Observable(0)
        @test_throws ErrorException WebIO.@js $ob

        ob = Observable{Any}(w, :test, nothing)
        @test WebIO.@js($ob) == js"{\"command\":\"test\",\"context\":\"testwidget2\",\"type\":\"observable\"}"

        @test WebIO.@js($ob[]) == js"WebIO.getval({\"command\":\"test\",\"context\":\"testwidget2\",\"type\":\"observable\"})"
        @test WebIO.@js($ob[] = 1) == js"WebIO.setval({\"command\":\"test\",\"context\":\"testwidget2\",\"type\":\"observable\"},1)"
    end

end


notinstalled && AtomShell.remove()
