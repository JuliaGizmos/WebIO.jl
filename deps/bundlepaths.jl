using Pkg.TOML

const WEBIO_VERSION = let
    project_file = normpath(joinpath(@__DIR__, "..", "Project.toml"))
    project = TOML.parsefile(project_file)
    VersionNumber(project["version"])
end

isci() = haskey(ENV, "CI")
isdev() = isci() || basename(dirname(dirname(@__DIR__))) == "dev"

const BUNDLES_PATH = normpath(joinpath(@__DIR__, "bundles"))

function bundleurl(pkg::String, filename::String)
    return "https://unpkg.com/@webio/$(pkg)@$(WEBIO_VERSION)/dist/$(filename)"
end

const CORE_BUNDLE_PATH = joinpath(BUNDLES_PATH, "webio.bundle.js")
const CORE_BUNDLE_URL = bundleurl("webio", "webio.bundle.js")
const GENERIC_HTTP_BUNDLE_PATH = joinpath(BUNDLES_PATH, "generic-http.bundle.js")
const GENERIC_HTTP_BUNDLE_URL = bundleurl("generic-http-provider", "generic-http.bundle.js")
const MUX_BUNDLE_PATH = joinpath(BUNDLES_PATH, "mux.bundle.js")
const MUX_BUNDLE_URL = bundleurl("mux-provider", "mux.bundle.js")

function download_bundle(name::String, path::String, url::String)
    if !isfile(path)
        @info "Downloading WebIO $(name) bundle from unpkg..."
        download(url, path)
    end
end

function download_js_bundles()
    if isci()
        # In CI, we always build the bundles from scratch.
        @info "Not downloading WebIO bundles in CI; building instead..."
        include("./_bundlejs.jl")
        return
    end

    mkpath(BUNDLES_PATH)
    download_bundle("core", CORE_BUNDLE_PATH, CORE_BUNDLE_URL)
    download_bundle("generic-http", GENERIC_HTTP_BUNDLE_PATH, GENERIC_HTTP_BUNDLE_URL)
    download_bundle("mux", MUX_BUNDLE_PATH, MUX_BUNDLE_URL)
end
