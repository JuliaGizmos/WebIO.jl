using WebIO
using JSExpr

function hue_app()
    scope = Scope()
    import!(scope, ["//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"])

    # Note: we explicitly qualify @js, @var, and @new with the JSExpr module
    # because Blink.jl exports macros with the same name.
    sketch = JSExpr.@js function (p5)
        JSExpr.@var s = function(p)
            JSExpr.@var barWidth = 20
            JSExpr.@var lastBar = -1

            p.setup = function ()
               p.createCanvas(720, 400)
               p.colorMode(p.HSB, p.height, p.height, p.height)
               p.noStroke()
               p.background(0)
            end

            p.draw = function ()
                JSExpr.@var whichBar = p.mouseX / barWidth
                JSExpr.@var barX = whichBar * barWidth;
                if whichBar != lastBar
                   p.fill(p.mouseY, p.height, p.height)
                   p.rect(barX, 0, barWidth, p.height)
                   lastBar = whichBar
               end
            end
        end
        this.dom.querySelector("#p5container").innerText = "";
        JSExpr.@new p5(s, "p5container");
    end
    onimport(scope, sketch)

    scope.dom = dom"div#p5container"("Loading p5...")

    scope
end

# Display in whatever frontend is avalaible
function main()
    if @isdefined(IJulia) || @isdefined(Juno)
        return hue_app()
    elseif @isdefined(Blink)
        win = Window()
        body!(win, hue_app())
        win
    elseif @isdefined(Mux)
        @sync webio_serve(page("/", req -> hue_app()), rand(8000:9000))
    else
        error("do one of using Mux, using Blink before running the
               example, or run it from within IJulia or Juno")
    end
end

main()
