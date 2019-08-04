using Pkg.TOML

const WEBIO_VERSION = let
    project_file = normpath(joinpath(@__DIR__, "..", "Project.toml"))
    project = TOML.parsefile(project_file)
    VersionNumber(project["version"])
end

# Make sure that we're running tests for this repository, we don't want to do
# extra steps when testing other packages.  For the time being we run tests only
# on Travis, so isci() checks Travis-specific environment variables.
function isci()
    return get(ENV, "TRAVIS", "false") == "true" &&
        split(get(ENV, "TRAVIS_REPO_SLUG", "Foo/Bar.jl"), '/')[2] == "WebIO.jl"
end
isdev() = isci() || basename(dirname(dirname(@__DIR__))) == "dev"

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

const JUPYTER_NBEXTENSION_NAME = "webio-jupyter-notebook"
const JUPYTER_NBEXTENSION_PATH = joinpath(BUNDLES_PATH, "$(JUPYTER_NBEXTENSION_NAME).js")
const JUPYTER_NBEXTENSION_URL = bundleurl("jupyter-notebook-provider", "jupyter-notebook.bundle.js")

# Deprecated! Remove for WebIO version 1.0.0
const BLINK_BUNDLE_PATH = joinpath(BUNDLES_PATH, "blink.bundle.js")
const BLINK_BUNDLE_URL = bundleurl("blink-provider", "blink.bundle.js")

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
    download_bundle("jupyter-notebook", JUPYTER_NBEXTENSION_PATH, JUPYTER_NBEXTENSION_URL)
    download_bundle("blink", BLINK_BUNDLE_PATH, BLINK_BUNDLE_URL)

    # NOTE: we don't download JupyterLab files because that should just begin
    # installed directly from npm (à la the
    # `jupyter labextension install @webio/jupyter-lab-provider` command).
end
