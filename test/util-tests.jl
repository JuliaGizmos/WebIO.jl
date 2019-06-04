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
