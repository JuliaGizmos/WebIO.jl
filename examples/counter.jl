using WebIO
using JSExpr # you may need to install this package

function counter(start=0)
    scope = Scope()

    # updates to this update the UI
    count = Observable(scope, "count", start)

    onjs(count, # listen on JavaScript
         JSExpr.@js x->this.dom.querySelector("#count").textContent = x)

    on(count) do n # listen on Julia
        println(n > 0 ? "+"^n : "-"^abs(n))
    end

    btn(label, d) = dom"button"(
        label,
        events=Dict(
            "click" => JSExpr.@js () -> $count[] = $count[] + $d
        )
    )

    scope.dom = dom"div"(
        btn("increment", 1),
        btn("decrement", -1),
        dom"div#count"(string(count[])),
    )

    scope
end

# Display in whatever frontend is avalaible
function main()
    if @isdefined(IJulia) || @isdefined(Juno)
        return counter(1)
    elseif @isdefined(Blink)
        win = Window()
        body!(win, counter(1))
    elseif @isdefined(Mux)
        @sync webio_serve(page("/", req -> counter(1)), rand(8000:9000))
    else
        error("do one of using Mux, using Blink before running the
               example, or run it from within IJulia or Juno")
    end
end

main()
