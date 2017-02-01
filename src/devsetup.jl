const ASSETS = joinpath(dirname(@__FILE__), "..", "assets")
function devsetup()
    cd(ASSETS) do
        if !isfile(".yarn/dist/bin/yarn")
            if !isfile("yarn.tar.gz")
                download("https://yarnpkg.com/latest.tar.gz", "yarn.tar.gz")
            end
            !isdir(".yarn") && mkdir(".yarn")
            run(`tar zvxf yarn.tar.gz -C .yarn`)
        end
        run(`./.yarn/dist/bin/yarn install`)
    end
end

function bundlejs(;watch=false)
    cd(ASSETS) do
        if watch
            run(`./webpack --watch`)
        else
            run(`./webpack`)
        end
    end
end
