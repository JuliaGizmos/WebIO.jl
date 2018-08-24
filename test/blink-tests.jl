using WebIO
using Blink
using Observables
using JSExpr
using Test

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

    substrings = ["<div>hello, blink</div>", r"\<unsafe-script.+", "WebIO.mount(",
    """{"props":{},"nodeType":"DOM","type":"node","instanceArgs":{"namespace":"html","tag":"div"},"children":["hello, blink"]}"""]
    content = Blink.@js(w, document.body.innerHTML)
    @test all(x->occursin(x, content), substrings)

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

    function scope_import(w::Window, url::AbstractString, use_iframe=false)
        scope = Scope(
            imports=[url]
        )
        js_to_julia = Observable{Any}(scope, "inbox", "")
        output = Channel{Any}(1)
        on(js_to_julia) do x
            # Put the result in a channel so we can watch for it
            put!(output, x)
        end
        onimport(scope, @JSExpr.js function (mod)
            $js_to_julia[] = mod.x
        end)
        if use_iframe
            body!(w, iframe(scope))
        else
            body!(w, scope)
        end

        return with_timeout(() -> take!(output), 5)
    end

    @testset "scope imports" begin
        for use_iframe in (false, true)
            @testset "local package, AssetRegistry" begin
                @test scope_import(w, joinpath(@__DIR__, "..", "assets", "webio", "test", "trivial_import.js"), use_iframe) == "ok"
            end

            @testset "global URL, no http:" begin
                # TODO: change this to a permanent URL because this CSAIL account
                # will eventually expire.
                @test scope_import(w, "//people.csail.mit.edu/rdeits/webio_tests/trivial_import.js", use_iframe) == "ok"
            end

            @testset "global URL, with http:" begin
                # TODO: change this to a permanent URL because this CSAIL account
                # will eventually expire.
                @test scope_import(w, "http://people.csail.mit.edu/rdeits/webio_tests/trivial_import.js", use_iframe) == "ok"
            end
        end
    end
end


example_renderable_was_rendered = false

struct ExampleRenderableType
end

function WebIO.render(::ExampleRenderableType)
    global example_renderable_was_rendered
    example_renderable_was_rendered = true
    node(:div, "hello world")
end

WebIO.register_renderable(ExampleRenderableType)

@testset "register_renderable" begin
    w = Window(Dict(:show => false))
    body!(w, ExampleRenderableType())
    @test example_renderable_was_rendered
end

notinstalled && AtomShell.uninstall()
