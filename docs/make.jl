using Documenter
using WebIO

# We have to ensure that these modules are loaded because some functions are
# defined behind @require guards.
using IJulia, Mux, Blink

makedocs(
    sitename="WebIO",
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
        "Providers" => [
            "providers/ijulia.md",
            "providers/blink.md",
            "providers/mux.md",
        ],
        "Troubleshooting" => [
            "troubleshooting/not-detected.md",
        ],
        "extending.md",
    ],
)

deploydocs(
    repo="github.com/JuliaGizmos/WebIO.jl.git",
)
