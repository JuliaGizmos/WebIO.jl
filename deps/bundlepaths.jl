using Pkg.TOML

const WEBIO_VERSION = let
    project_file = normpath(joinpath(@__DIR__, "..", "Project.toml"))
    project = TOML.parsefile(project_file)
    return VersionNumber(project["version"])
end

const BUNDLES_PATH = normpath(joinpath(@__DIR__, "bundles"))

function bundleurl(pkg::String, filename::String)
    return "https://unpkg.com/@webio/$(pkg)@$(WEBIO_VERSION)/dist/$(path)"
end

const CORE_BUNDLE_PATH = joinpath(BUNDLES_PATH, "webio.bundle.js")
const CORE_BUNDLE_URL = bundleurl("webio", "webio.bundle.js")


function download_js_bundles()
    if haskey(ENV, "CI")
        # In CI, we always build the bundles from scratch.
        @info "Not downloading WebIO bundles in CI; building instead..."
        include("./_bundlejs.jl")
        return
    end

    mkpath(BUNDLES_PATH)
    if !isfile(CORE_BUNDLE_PATH)
        @info "Downloading WebIO core bundle from unpkg..."
        download(CORE_BUNDLE_URL, CORE_BUNDLE_PATH)
    end
end
