using WebIO
setup_provider("mux")

function myapp(req)
    withcontext(Scope()) do scope
        adddeps!(scope, ["//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"])
        sketch = @js function (p5)
            @var s = function(p)
                @var barWidth = 20
                @var lastBar = -1

                p.setup = function ()
                   p.createCanvas(720, 400)
                   p.colorMode(p.HSB, p.height, p.height, p.height)
                   p.noStroke()
                   p.background(0)
                end

                p.draw = function ()
                    @var whichBar = p.mouseX / barWidth
                    @var barX = whichBar * barWidth;
                    if whichBar != lastBar
                       p.fill(p.mouseY, p.height, p.height)
                       p.rect(barX, 0, barWidth, p.height)
                       lastBar = whichBar
                   end
                end
            end
            this.dom.querySelector("#p5container").innerText = "";
            @new p5(s, "p5container");
        end
        ondependencies(scope, sketch)

        dom"div#p5container"("Loading p5...")
    end
end

webio_serve(page("/", req -> myapp(req)))
