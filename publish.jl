#!/usr/bin/env julia

using Pkg
using Pkg.TOML

const PROJECT_FILENAME = normpath(joinpath(@__DIR__, "Project.toml"))
const PROJECT = TOML.parsefile(PROJECT_FILENAME)
const CURRENT_VERSION = VersionNumber(PROJECT["version"])
major, minor, patch = Int.(getfield.(CURRENT_VERSION, [:major, :minor, :patch]))

const NPM_OTP = get(ENV, "NPM_OTP", "")
if NPM_OTP == ""
    # We require a one-time-password to publish packages to NPM.
    @error(
		"A one-time-password is required to publish packages in the @webio org.\n"
        * "Please specify the NPM_OTP environment variable:\n"
        * "    NPM_OTP=123456 ./publish.jl"
    )
    exit(1)
end

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
run(`sh -c "rm -rf ./deps/bundles $(PACKAGES_DIR)/node_modules $(PACKAGES_DIR)/*/node_modules $(PACKAGES_DIR)/*/dist"`)

@info "Running tests..."
# Build JS in prod mode.
ENV["WEBIO_BUILD_PROD"] = true
Pkg.test("WebIO")

@info "Publishing NPM packages via Lerna..."
cd(PACKAGES_DIR)
run(`npm run lerna -- publish --otp $NPM_OTP $target_version`)
