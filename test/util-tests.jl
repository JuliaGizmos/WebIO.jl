using Test
using WebIO
using Random

using WebIO: kebab2camel, camel2kebab

@testset "kebabs and camels" begin
    kebabstrs = ["vue-instance-17-node-18", "bum-two-three", "silly nanny", "nanny"]
    cameltrues = ["vueInstance17Node18", "bumTwoThree", "silly nanny", "nanny"]
    camelstrs = kebab2camel.(kebabstrs)
    for i in length(camelstrs)
        @test camelstrs[i] == cameltrues[i]
    end

    kebabstrs = camel2kebab.(cameltrues)
    kebab_also_trues = ["vue-instance17-node18", "bum-two-three", "silly nanny", "nanny"]
    for i in length(kebabstrs)
        @test camelstrs[i] == kebabstrs[i] || camelstrs[i] == kebab_also_trues[i]
    end
end

@testset "Non-finite floats serialize as null" begin
    # JSON.jl v1 refuses to write NaN/Inf; WebIO writes them as `null`, as
    # JSON.jl < 1 does.
    data = [1.5, NaN, Inf, -Inf]
    @test WebIO.jsonstring(data) == "[1.5,null,null,null]"
    @test WebIO.escape_json(Dict("x" => data)) == "{\"x\":[1.5,null,null,null]}"

    n = node(:div, style=Dict(:width => NaN))
    @test occursin("\"width\":null", sprint(show, WebIO.WEBIO_NODE_MIME(), n))

    s = Scope()
    s["obs"] = Observable(NaN)
    @test occursin("null", sprint(show, WebIO.WEBIO_NODE_MIME(), s))
end
