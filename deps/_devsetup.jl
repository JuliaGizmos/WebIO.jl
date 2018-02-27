# we expect build_dir and assets_dir to be defined here
cd(Pkg.dir()) do
    # Install NodeJS if it doesn't exist
    reqs = Pkg.Reqs.parse(IOBuffer("NodeJS"))
    Pkg.Entry.resolve(merge(Pkg.Reqs.parse("REQUIRE"), reqs))
end

using NodeJS
node = NodeJS.nodejs_cmd()
npm = NodeJS.npm_cmd()

# it's faster to install yarn and then use that
# to install webpack!
run(`$npm install yarn`)
run(`$node node_modules/yarn/bin/yarn.js add webpack-cli`)

cd(Pkg.dir()) do
    Pkg.Entry.resolve() # Uninstall NodeJS if it wasn't there before
end
