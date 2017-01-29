using WebDisplay
using Blink
setup_provider("blink")

function counter(count=0)
    withcontext(Context()) do ctx

        handle!(ctx, :change) do d
            send(ctx, :set_count, count+=d)
        end

        handlejs!(ctx, :set_count, "function (ctx,msg) {ctx.dom.querySelector('#count').textContent = msg}")

        btn(label, change) = Node(:button, label,
                events=Dict(
                    "click"=>"function (event,ctx) { WebDisplay.send(ctx, 'change', $change) }"
                )
            )

        Node(:div,
            btn("increment", 1),
            btn("decrement", -1),
            Node(:div, string(count), id="count"),
        )
    end
end


w = Window()
body!(w, counter(1))

