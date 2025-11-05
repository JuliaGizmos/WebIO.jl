using Documenter, SHA
using WebIO

# Copy or update trivial_import.js
docs_trivial_path = joinpath(@__DIR__, "src/assets/trivial_import.js")
test_trivial_path = joinpath(@__DIR__, "../test/assets/trivial_import.js")
if isfile(docs_trivial_path)
    test_sha = open(test_trivial_path) do io
        sha1(io)
    end
    docs_sha = open(docs_trivial_path) do io
        sha1(io)
    end
    if test_sha != docs_sha
        cp(test_trivial_path, docs_trivial_path; force=true)
    end
else
    mkdir(dirname(docs_trivial_path))
    cp(test_trivial_path, docs_trivial_path)
end

# We have to ensure that these modules are loaded because some functions are
# defined behind @require guards.
using IJulia, Mux, Blink

DocMeta.setdocmeta!(WebIO, :DocTestSetup, :(using WebIO); recursive=true)

makedocs(
    sitename="WebIO",
    warnonly=true,
    format=Documenter.HTML(),
    modules=[WebIO],
    pages=[
        "index.md",
        "gettingstarted.md",
        "API Reference" => [
            "api/about.md",
            "api/node.md",
            "api/scope.md",
            "api/render.md",
            "api/asset.md",
            "api/jsstring.md",
            "api/observable.md",
        ],
        "Frontends" => [
            "providers/ijulia.md",
            "providers/blink.md",
            "providers/mux.md",
        ],
        "extending.md",
    ],
)

deploydocs(
    repo="github.com/JuliaGizmos/WebIO.jl.git",
)
