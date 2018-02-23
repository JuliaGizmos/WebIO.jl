const ASSETS = joinpath(dirname(@__FILE__), "..", "assets")
const YARN_VERSION = "1.1.0"
function devsetup()
    cd(ASSETS) do
        if !isfile(".yarn/dist/bin/yarn")
            if !isfile("yarn.tar.gz")
                download("https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz", "yarn.tar.gz")
            end
            !isdir(".yarn") && mkdir(".yarn")
            run(`tar zvxf yarn.tar.gz -C .yarn`)
        end
        cd("webio") do
            run(`../.yarn/yarn-v$YARN_VERSION/bin/yarn install`)
        end
    end
end

function bundlejs(;watch=false)
    cd(joinpath(ASSETS, "webio")) do
        if watch
            run(`../webpack --watch`)
        else
            run(`../webpack`)
        end
    end
end
