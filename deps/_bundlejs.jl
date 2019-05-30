using NodeJS

# Wrap in useless try/catch to avoid namespace pollution
try
    isdev = basename(dirname(dirname(dirname(@__FILE__)))) == "dev"
    if haskey(ENV, "CI") || isdev
        cd(joinpath(dirname(@__FILE__), "..", "packages")) do
            npm = NodeJS.npm_cmd()

            run(`$npm install --scripts-prepend-node-path=auto --unsafe-perm`)
            if haskey(ENV, "WEBIO_WEBPACK_ARGS")
                args = [ENV["WEBIO_WEBPACK_ARGS"]]
            else
                args =[]
            end
            run(`$npm run build-prod --scripts-prepend-node-path=auto --unsafe-perm -- $args`)
        end
    else
        @warn(
            "Can't build WebIO JS when not checkout out for development. "
            * "Try running Pkg.dev(\"WebIO\") if you want to rebuild JS."
        )
    end
catch
    rethrow()
end
