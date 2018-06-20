using WebIO
using Test

@testset "bundling javascript" begin
    # TODO: if we want to be picky, we can even test that
    # bundlejs produces exactly the same output stored in the
    # current bundle. But that requires pinning down exact
    # versions of all the dependencies, which we don't currently do.
    WebIO.bundlejs()
end
