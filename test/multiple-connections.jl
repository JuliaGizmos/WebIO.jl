using WebIO
using Test
using Blink, JSExpr

if !(@isdefined open_window)
    include("./test-utils.jl")
end

@testset "Test observable updates are sent to all connections" begin
    w1, w2 = open_window(), open_window()
    s = Scope(
        dom=node(
            :p,
            "initial",
            attributes=Dict(
                "data-testid" => "foobar",
            ),
        ),
    )
    obs = Observable{Any}(s, "obs", "")
    onjs(obs, @js function (value)
        _webIOScope.dom.querySelector("[data-testid=foobar]").innerText = value
    end)

    body!(w1, s)
    body!(w2, s)
    # Sleep to allow the JS to execute.
    sleep(0.25)

    value = (w) -> @js w document.querySelector("[data-testid=foobar]").innerText
    @test value(w1) == "initial"
    @test value(w2) == "initial"

    obs[] = "updated"
    # Sleep to allow the JS to execute.
    sleep(0.25)
    @test value(w1) == "updated"
    @test value(w2) == "updated"
end
