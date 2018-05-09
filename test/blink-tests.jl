using WebIO
using Blink
using Observables
using JSExpr
using Base.Test

notinstalled = !AtomShell.isinstalled()

notinstalled && AtomShell.install()

"""
Execute function f() with a timeout of `timeout` seconds. Returns the
result of f() or `nothing` in the case of a timeout.
"""
function with_timeout(f::Function, timeout)
    c = Channel{Any}(1)
    @async begin
        put!(c, f())
    end
    @async begin
        sleep(timeout)
        put!(c, nothing)
    end
    take!(c)
end

@testset "Blink mocks" begin

    # open window and wait for it to initialize
    w = Window(Dict(:show => false))

    body!(w, dom"div"("hello, blink"))
    sleep(5) # wait for it to render.

    substrings = ["<div>hello, blink</div>", r"\<unsafe-script.+", "WebIO.mount\(",
    """{"props":{},"nodeType":"DOM","type":"node","instanceArgs":{"namespace":"html","tag":"div"},"children":["hello, blink"]}"""]
    content = Blink.@js(w, document.body.innerHTML)
    @test all(x->contains(content, x), substrings)

    @testset "round-trip communication" begin
        scope = Scope()
        js_to_julia = Observable(scope, "inbox", "")
        output = Channel{String}(1)
        on(js_to_julia) do x
            # Put the result in a channel so we can watch for it
            put!(output, x)
        end

        julia_to_js = Observable(scope, "outbox", "")
        onjs(julia_to_js, @JSExpr.js function (val)
            $js_to_julia[] = val
        end)

        # Render the scope into the Blink window
        body!(w, scope)

        # Send a message and make sure we get it back from JS
        julia_to_js[] = "hello Blink"
        @test with_timeout(() -> take!(output), 5) == "hello Blink"
    end

    function scope_import(w::Window, url::AbstractString)
        scope = Scope(
            imports=[url]
        )
        js_to_julia = Observable{Any}(scope, "inbox", "")
        output = Channel{Any}(1)
        on(js_to_julia) do x
            # Put the result in a channel so we can watch for it
            put!(output, x)
        end
        onimport(scope, @JSExpr.js function (x)
            $js_to_julia[] = x
        end)
        body!(w, scope)

        return with_timeout(() -> take!(output), 5)
    end

    @testset "scope imports" begin
        @testset "local package, absolute" begin
            @test scope_import(w, "/pkg/WebIO/webio/test/trivial_import.js") == "ok"
        end

        @testset "local package, relative" begin
            @test scope_import(w, "pkg/WebIO/webio/test/trivial_import.js") == "ok"
        end

        @testset "global URL, no http:" begin
            @test scope_import(w, "//people.csail.mit.edu/rdeits/trivial_import.js") == "ok"
        end

        @testset "global URL, with http:" begin
            @test scope_import(w, "http://people.csail.mit.edu/rdeits/trivial_import.js") == "ok"
        end
    end
end

notinstalled && AtomShell.uninstall()
