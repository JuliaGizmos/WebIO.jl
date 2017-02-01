function devsetup()
    cd(joinpath(dirname(@__FILE__), "..", "assets")) do
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

