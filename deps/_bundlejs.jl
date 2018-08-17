using NodeJS

cd(joinpath(dirname(@__FILE__), "..", "assets", "webio")) do
    node = NodeJS.nodejs_cmd()
    npm = NodeJS.npm_cmd()

    run(`$npm install --scripts-prepend-node-path`)
    if haskey(ENV, "WEBIO_WEBPACK_ARGS")
        args = [ENV["WEBIO_WEBPACK_ARGS"]]
    else
        args =[]
    end
    run(`$npm run build --scripts-prepend-node-path -- $args`)
end
