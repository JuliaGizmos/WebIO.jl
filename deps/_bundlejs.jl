# we expect build_dir and assets_dir to be defined here
cd(Pkg.dir()) do
    # Install NodeJS if it doesn't exist
    reqs = Pkg.Reqs.parse(IOBuffer("NodeJS"))
    Pkg.Entry.resolve(merge(Pkg.Reqs.parse("REQUIRE"), reqs))
end

using NodeJS
node = NodeJS.nodejs_cmd()
npm = NodeJS.npm_cmd()

cd(joinpath(pwd(), "..", "assets", "webio")) do
    run(`$node ../../deps/node_modules/webpack-cli/bin/webpack.js --watch`)
end

cd(Pkg.dir()) do
    Pkg.Entry.resolve() # Uninstall NodeJS if it wasn't there before
end
