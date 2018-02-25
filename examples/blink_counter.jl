using Blink
using WebIO

function counter(start=0)
    w = Scope()

    # updates to this update the UI
    count = Observable(w, "count", start)
    onjs(count,
         WebIO.@js x->this.dom.querySelector("#count").textContent = x)

    # button clicks send changes to Julia via this,
    # we update count
    change = Observable(w, "change", 0)
    on(x->count[] = x, change)

    btn(label, d) = dom"button"(label,
                                events=Dict("click" => WebIO.@js () -> $change[] = $d))

    w(
      dom"div"(
        btn("increment", 1),
        btn("decrement", -1),
        dom"div#count"(string(count[])),
       )
     )
end


win = Window()
body!(win, counter(1))

