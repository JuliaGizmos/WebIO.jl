using WebIO
using Test

@testset "Asset" begin
    @testset "Asset name and url constructor" begin
        asset = Asset("foolib", "foo.js")
        @test asset.filetype == "js"
        @test asset.name == "foolib"
        @test asset.url == "foo.js"
    end

    @testset "Asset pair constructor" begin
        asset = Asset("foolib" => "foo.js")
        @test asset.filetype == "js"
        @test asset.name == "foolib"
        @test asset.url == "foo.js"
    end

    @testset "Asset identity constructor" begin
        asset = Asset("foolib" => "foo.js")
        @test Asset(asset) == asset
    end

    @testset "Asset url constructor" begin
        asset = Asset("foo.js")
        @test asset.filetype == "js"
        @test asset.url == "foo.js"
    end

    @testset "Asset deprecated dict constructor" begin
        asset = @test_deprecated Asset(Dict(
            :url => "https://unpkg.com/react@16/umd/react.development.js",
        ))
        @test asset.filetype == "js"
        @test asset.url == "https://unpkg.com/react@16/umd/react.development.js"

        asset = @test_deprecated Asset(Dict(
            :type => "js",
            :url => "https://unpkg.com/react@16/umd/react.development.js",
            :name => "foo",
        ))
        @test asset.filetype == "js"
        @test asset.name == "foo"
        @test asset.url == "https://unpkg.com/react@16/umd/react.development.js"
    end

    @testset "Sync constructor" begin
        single = Sync("foo.js")
        @test typeof(single) === Sync
        @test single.imports[1] == Asset("foo.js")

        double = Sync("foo" => "foo.js", Asset("bar.css"))
        @test typeof(double) === Sync
        @test double.imports[1] == Asset("foo" => "foo.js")
        @test double.imports[2] == Asset("bar.css")

        nested = Sync(Sync("stepone.js", "steptwo.js"), "bar.css")
        @test typeof(nested) === Sync
        @test nested.imports[1].imports[1] == Asset("stepone.js")
        @test nested.imports[1].imports[2] == Asset("steptwo.js")
        @test nested.imports[2] == Asset("bar.css")
    end

    @testset "Async constructor" begin
        single = Async("foo.js")
        @test typeof(single) === Async
        @test single.imports[1] == Asset("foo.js")

        double = Async("foo" => "foo.js", Asset("bar.css"))
        @test typeof(double) === Async
        @test double.imports[1] == Asset("foo" => "foo.js")
        @test double.imports[2] == Asset("bar.css")

        nested = Async(Sync("stepone.js", "steptwo.js"), "bar.css")
        @test typeof(nested) === Async
        @test nested.imports[1].imports[1] == Asset("stepone.js")
        @test nested.imports[1].imports[2] == Asset("steptwo.js")
        @test nested.imports[2] == Asset("bar.css")
    end
end
