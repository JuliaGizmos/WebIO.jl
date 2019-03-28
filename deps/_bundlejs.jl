using NodeJS

cd(joinpath(dirname(@__FILE__), "..", "packages")) do
    node = NodeJS.nodejs_cmd()
    npm = NodeJS.npm_cmd()

    run(`$npm install --scripts-prepend-node-path=auto --unsafe-perm`)
    if haskey(ENV, "WEBIO_WEBPACK_ARGS")
        args = [ENV["WEBIO_WEBPACK_ARGS"]]
    else
        args =[]
    end
    run(`$npm run build-prod --scripts-prepend-node-path=auto --unsafe-perm -- $args`)
end
