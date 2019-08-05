using WebIO
using Test

@testset "Build JavaScript" begin
    if haskey(ENV, "WEBIO_SKIP_BUNDLEJS")
        @info "Skipping building JavaScript."
        return
    end
    WebIO.bundlejs()
end
