using Test
using WebIO
using Random

using WebIO: kebab2camel, camel2kebab, newid

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

@testset "Scope ID uniqueness" begin
    prefix = ""
    # Verify that sequential IDs are not the same
    for i in 1:100
        @test newid(prefix) != newid(prefix)
    end

    # Verify that resetting the global random seed does not result in
    # scopes with the same ID
    Random.seed!(1)
    id1 = newid(prefix)
    Random.seed!(1)
    id2 = newid(prefix)
    @test id1 != id2
end

