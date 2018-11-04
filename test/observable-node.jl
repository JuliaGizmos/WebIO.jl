using WebIO
using Observables
using Test
using JSExpr

@testset "Afljashfjlsahf" begin
    w = Scope()
    counter = Observable(w, "counter", 0)
    domnode = map(x -> dom"span"("Counter is $counter[]!"), counter)
    w["domnode"] = domnode
    w(
        dom"div"(
            counter,
            domnode,
            dom"button"(
                "increment";
                events=Dict(
                    "click" => (@js function() $counter[] = $counter[] + 1),
                )
            )
        )
    )
end
