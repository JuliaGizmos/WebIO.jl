# Avoid namespace pollution with let
let
    package_dir = dirname(@__DIR__)
    isdev = basename(dirname(package_dir)) == "dev"

    # NodeJS isn't a hard requirement of WebIO, but is needed to build packages,
    # so we need to install it in CI.
    if haskey(ENV, "CI")
        isdev = true
        @info "CI detected, installing NodeJS..."

        using Pkg
        Pkg.add("NodeJS")
    end

    # Don't build packages outside of a dev environment (or CI).
    if !isdev
        @warn(
            "Can't build WebIO JS when not checked out for development. "
            * "Run `Pkg.dev(\"WebIO\")` if you want to build JS."
        )
        return
    end

    # Build the dang packages!
    cd(joinpath(dirname(@__FILE__), "..", "packages")) do
        npm = NodeJS.npm_cmd()

        run(`$npm install --scripts-prepend-node-path=auto --unsafe-perm`)

        args = (
            haskey(ENV, "WEBIO_WEBPACK_ARGS")
            ? [ENV["WEBIO_WEBPACK_ARGS"]]
            : []
        )
        run(`$npm run build-prod --scripts-prepend-node-path=auto --unsafe-perm -- $args`)
    end
    end
end
