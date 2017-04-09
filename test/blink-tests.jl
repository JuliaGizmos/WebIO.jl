using WebIO
using Blink
using Base.Test

notinstalled = !AtomShell.isinstalled()

notinstalled && AtomShell.install()

@testset "Blink mocks" begin

    @test WebIO.setup()

    # open window and wait for it to initialize
    w = Window(Dict(:show => false))

    body!(w, dom"div"("hello, blink"))
    yield()
    sleep(1) # wait for it to render.

    substrings = ["<div>hello, blink</div></div>",
    "<script>WebIO.mount(",
    """{"props":{},"nodeType":"DOM","type":"node","instanceArgs":{"namespace":"html","tag":"div"},"children":["hello, blink"]}"""]
    content = Blink.@js(w, document.body.innerHTML)
    @test all(x->contains(content, x), substrings)

end

notinstalled && AtomShell.remove()
