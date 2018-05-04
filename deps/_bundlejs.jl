# we expect build_dir and assets_dir to be defined here
cd(Pkg.dir()) do
    # Install NodeJS if it doesn't exist
    reqs = Pkg.Reqs.parse(IOBuffer("NodeJS"))
    Pkg.Entry.resolve(merge(Pkg.Reqs.parse("REQUIRE"), reqs))
end

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

cd(Pkg.dir()) do
    Pkg.Entry.resolve() # Uninstall NodeJS if it wasn't there before
end
