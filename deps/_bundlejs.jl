# This file is sometimes included as a standalone script, but we need some of
# the values from bundlepaths.jl
if !(@isdefined BUNDLES_PATH)
    include("./bundlepaths.jl")
end

# Avoid namespace pollution with let
let
    package_dir = dirname(@__DIR__)

    # Build the dang packages!
    package_dir = normpath(joinpath(@__DIR__, "..", "packages"))
    npm = `npm -C $(package_dir)`

    install_cmd = `$npm install --scripts-prepend-node-path=auto --unsafe-perm`
    @info "Installing NPM dependencies..." cmd=install_cmd
    run(install_cmd)

    args = (
        haskey(ENV, "WEBIO_WEBPACK_ARGS")
        ? [ENV["WEBIO_WEBPACK_ARGS"]]
        : []
    )
    build_cmd = `$npm run build-prod --scripts-prepend-node-path=auto --unsafe-perm -- $args`
    @info "Building packages..." cmd=build_cmd
    run(build_cmd)

    if isdir(BUNDLES_PATH)
        rm(BUNDLES_PATH, recursive=true)
    end
    mkdir(BUNDLES_PATH)

    # Copy important things to the right place
    core_bundle_out = joinpath(package_dir, "webio", "dist", "webio.bundle.js")
    if !isfile(core_bundle_out)
        @error "Cannot find WebIO core bundle: $core_bundle_out"
        error("WebIO core bundle was not built properly!")
    end
    @info "Copying $(core_bundle_out) to $(CORE_BUNDLE_PATH)..."
    cp(core_bundle_out, CORE_BUNDLE_PATH; force=true)

    generic_http_bundle_out = joinpath(package_dir, "generic-http-provider", "dist", "generic-http.bundle.js")
    @info "Copying $(generic_http_bundle_out) to $(GENERIC_HTTP_BUNDLE_PATH)..."
    cp(generic_http_bundle_out, GENERIC_HTTP_BUNDLE_PATH; force=true)

    mux_bundle_out = joinpath(package_dir, "mux-provider", "dist", "mux.bundle.js")
    @info "Copying $(mux_bundle_out) to $(MUX_BUNDLE_PATH)..."
    cp(mux_bundle_out, MUX_BUNDLE_PATH; force=true)

    blink_bundle_out = joinpath(package_dir, "blink-provider", "dist", "blink.bundle.js")
    @info "Copying $(blink_bundle_out) to $(BLINK_BUNDLE_PATH)..."
    cp(blink_bundle_out, BLINK_BUNDLE_PATH; force=true)
end
