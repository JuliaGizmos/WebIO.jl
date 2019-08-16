#!/usr/bin/env julia

const USAGE = """
USAGE:
./publish.jl [--skip-tests] version

Publish NPM packages at the specified version (after running tests), update
the version in Project.toml, and upload to GitHub.
"""

function errorwithusage()
    @error USAGE
    exit(1)
end

using Pkg
using Pkg.TOML
using LibGit2: GitRepo, branch, isdirty, tag_list

const REPO = GitRepo(@__DIR__)
const PROJECT_FILENAME = normpath(joinpath(@__DIR__, "Project.toml"))
const PROJECT = TOML.parsefile(PROJECT_FILENAME)

if branch(REPO) != "master"
    @error(
        "The publish.jl script must be run on the master branch.\n"
        * "Please `git checkout master && git pull` and re-run.",
    )
    exit(1)
end

if isdirty(REPO)
    @error(
        "The Git repository is dirty. Please make sure all changes are "
        * "commmited and pushed to GitHub. To reset any changes (e.g. if "
        * "publish.jl failed and left the repo dirty), run `git reset --hard`."
    )
    exit(1)
end

const VERSION = let
    if isempty(ARGS) || startswith(last(ARGS), "-")
        errorwithusage()
    end
    VersionNumber(last(ARGS))
end

if "v$(VERSION)" in tag_list(REPO)
    @error(
        "WebIO@$(VERSION) has already been tagged. Did you forget "
        * "to increment the version before running this script?",
    )
    exit(1)
end

if !in("--skip-tests", ARGS)
    @info "Running tests..."
    # Build JS in prod mode.
    ENV["WEBIO_BUILD_PROD"] = true
    Pkg.test("WebIO")

    # Running tests should not make the repo dirty.
    @assert !isdirty(REPO)
end

@info "Publishing WebIO@$(VERSION); this will upload packages to NPM."
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

const npm = `npm -C $PACKAGES_DIR`

@info "Building production (i.e. minified) JavaScript bundles..."
run(`$npm install`)
run(`$npm run lerna -- run build-prod`)

@info "Setting NPM package versions to $VERSION..."
run(`$npm run lerna -- version --no-git-tag-version --no-push --exact --force-publish="*" $VERSION`)

commitmsg = "v$VERSION"
@info "Creating git commit..."
run(`git add .`)
run(`git commit -m $commitmsg`)

print("Please enter your NPM one-time-password (OTP): ")
otp = readline()
run(`$npm run lerna -- publish --otp $otp from-package`)

@info "Making sure package download works..."
download_packages_code = """
    using WebIO
    rm(WebIO.BUNDLES_PATH, force=true, recursive=true)
    WebIO.download_js_bundles()
    """
try
    run(`julia -e $download_packages_code`)
catch exc
    @error(
        "Oh no! Failed to download packages. Packages were already uploaded "
        * "to NPM and can't be overwritten, so you might need to skip this "
        * "version and bump the minor version once the issue is fixed.",
        exception=exc
    )
    rethrow()
end

@info "Setting WebIO Project.toml version to $VERSION..."
PROJECT["version"] = VERSION
open(PROJECT_FILENAME, "w") do io
    TOML.print(io, PROJECT)
end

@info "Pushing to GitHub..."
run(`git push`)

@info(
    "Success!\n"
    * "Comment on the latest commit "
)
