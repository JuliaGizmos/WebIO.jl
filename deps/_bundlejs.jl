using NodeJS

cd(joinpath(dirname(@__FILE__), "..", "packages")) do
    node = NodeJS.nodejs_cmd()
    npm = NodeJS.npm_cmd()

    @info "Running `npm install`..."
    run(`$npm install --scripts-prepend-node-path=auto --unsafe-perm`)
    @info "Completed `npm install`."
    run(`ls node_modules`)
    run(`ls webio/node_modules`)
    if haskey(ENV, "WEBIO_WEBPACK_ARGS")
        args = [ENV["WEBIO_WEBPACK_ARGS"]]
    else
        args =[]
    end

    @info "Running `npm run build-prod`..."
    run(`$npm run build-prod --scripts-prepend-node-path=auto --unsafe-perm -- $args`)
    @info "Completed `npm run build-prod`."
end
