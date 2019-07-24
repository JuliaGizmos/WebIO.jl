#!/usr/bin/env julia

using Pkg
using Pkg.TOML

const PROJECT_FILENAME = normpath(joinpath(@__DIR__, "Project.toml"))
const PROJECT = TOML.parsefile(PROJECT_FILENAME)

const CURRENT_VERSION = VersionNumber(PROJECT["version"])
major, minor, patch = Int.(getfield.(CURRENT_VERSION, [:major, :minor, :patch]))

if length(ARGS) == 0 || ARGS[1] == "bump"
    target_version = VersionNumber("$(major).$(minor).$(patch + 1)")
    @info "Bumping WebIO version: $CURRENT_VERSION => $target_version"
else
    target_version = VersionNumber(ARGS[1])
    @info "Setting WebIO version: $CURRENT_VERSION => $target_version"
end

print("Continue with publishing [y/N]? ")
let
    confirmation = readline()
    if lowercase(confirmation) != "y"
        @info "Aborting."
        exit(1)
    end
end

const PACKAGES_DIR = normpath(joinpath(@__DIR__, "packages"))
@info "Removing previous build artifacts..."
run(`sh -c "rm -rf ./deps/bundles $(PACKAGES_DIR)/node_modules $(PACKAGES_DIR)/*/node_modules $(PACKAGES_DIR)/*/dist $(PACKAGES_DIR)/package-lock.json $(PACKAGES_DIR)/*/package-lock.json"`)

@info "Running tests..."
# Build JS in prod mode.
ENV["WEBIO_BUILD_PROD"] = true
Pkg.test("WebIO")

@info "Publishing NPM packages via Lerna..."
print("Please enter your NPM one-time-password (OTP): ")
otp = readline()
cd(PACKAGES_DIR)
run(`npm run lerna -- publish --otp $otp $target_version`)

@info "Making sure package download works...")
download_packages_code = """
    using WebIO
    rm(WebIO.BUNDLES_PATH, force=true)
    WebIO.download_js_bundles()
    """
run(`julia -e $download_packages_code`)

@info "Writing Project.toml..."
project = Dict(PROJECT)
project["version"] = string(target_version)
open(PROJECT_FILENAME, "w") do io
    TOML.print(io, project)
end
