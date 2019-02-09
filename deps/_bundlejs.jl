using NodeJS

cd(joinpath(dirname(@__FILE__), "..", "packages")) do
    node = NodeJS.nodejs_cmd()
    npm = NodeJS.npm_cmd()

    @info "NPM version information:"
    run(`$npm version`)

    @info "Current directory:"
    run(`sh -c 'echo $(pwd) && ls'`)

    @info "Running `npm install`..."
    try
        run(`$npm install --scripts-prepend-node-path=auto --unsafe-perm .`)
    catch (e)
        @error "`npm install` failed!"
        try
            logsdir = joinpath(homedir(), ".npm", "_logs")
            logfiles = readdir(logsdir)
            for logfile in logfiles
                @info "NPM log file: $logfile"
                run(`cat $(joinpath(logsdir, logfile))`)
            end
        catch (e)
            @warn "Unable to read error logs."
        end
        rethrow()
    end

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
