using JSON

const LERNA_CONFIG = joinpath(@__DIR__, "..", "packages", "lerna.json")
const VERSION = open(LERNA_CONFIG, "r") do io
    VersionNumber(JSON.parse(io)["version"])
end
