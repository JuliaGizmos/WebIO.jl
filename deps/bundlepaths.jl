using Pkg.TOML
using Pkg.Artifacts

# Fix the NPM version for now
# Now that we're not distributing Jupyter stuff via NPM, I'd rather just check
# in compiled assets (maybe using Artifacts if that's relatively easy, otherwise
# just as files in git).
const WEBIO_VERSION = "0.8.15"

const PACKAGES_PATH = normpath(joinpath(@__DIR__, "..", "packages"))
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

# Deprecated! Remove for WebIO version 1.0.0
const BLINK_BUNDLE_PATH = joinpath(BUNDLES_PATH, "blink.bundle.js")
const BLINK_BUNDLE_URL = bundleurl("blink-provider", "blink.bundle.js")

function download_bundle(name::String, path::String, url::String)
    if !isfile(path)
        @info "Downloading WebIO $(name) bundle from unpkg..."
        download(url, path)
    end
end


# TODO: this is all an ugly hack to avoid trying to build JS when other packages (that use WebIO)
# are just trying to run their own tests. It desperately needs to be restructured.
function isci()
    return (
        get(ENV, "CI", "false") == "true" &&
        split(get(ENV, "GITHUB_REPOSITORY", "Foo/Bar.jl"), '/')[2] == "WebIO.jl"
    )
end

function download_js_bundles()
    if isci()
        # In CI, we always build the bundles from scratch.
        @info "Not downloading WebIO bundles in CI; building instead..."
        include("./_bundlejs.jl")
        return
    end

    mkpath(BUNDLES_PATH)
    bundle_artifact_path = artifact"web"
    for asset in readdir(bundle_artifact_path)
        @debug("Copying", bundle_artifact_path, asset, BUNDLES_PATH)
        cp(joinpath(bundle_artifact_path, asset), joinpath(BUNDLES_PATH, asset); force = true)
    end
    # These commands are probably still useful if you want to create the artifact.
    # download_bundle("core", CORE_BUNDLE_PATH, CORE_BUNDLE_URL)
    # download_bundle("generic-http", GENERIC_HTTP_BUNDLE_PATH, GENERIC_HTTP_BUNDLE_URL)
    # download_bundle("mux", MUX_BUNDLE_PATH, MUX_BUNDLE_URL)
    # download_bundle("blink", BLINK_BUNDLE_PATH, BLINK_BUNDLE_URL)
end
