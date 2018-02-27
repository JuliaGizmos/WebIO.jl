function devsetup()
    build_dir = joinpath(dirname(@__FILE__), "..", "deps")
    cd(build_dir) do
        include("_devsetup.jl")
    end
end

function bundlejs(;watch=false)
    build_dir = joinpath(dirname(@__FILE__), "..", "deps")
    cd(build_dir) do
        # how do I pass an argument into this?
        include("_bundlejs.jl")
    end
end
