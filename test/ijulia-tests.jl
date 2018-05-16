# Test for load-order-specific issues with WebIO and IJulia
# when running outside of Jupyter. 
#
# See: https://github.com/JuliaGizmos/WebIO.jl/issues/117
using WebIO 
using IJulia
@testset "IJulia initialization" begin
    @test :ijulia in WebIO.providers_initialised
end
