function devsetup()
    Base.depwarn("WebIO.devsetup() is no longer required. You can simply run WebIO.bundlejs().", :webio_devesetup)
end

function bundlejs()
    include(joinpath(@__DIR__, "..", "deps", "_bundlejs.jl"))
end
