using JSON
using Test
using WebIO

@testset "JSString Interpolations" begin
    @testset "Interpolations into JSStrings" begin
        text = "Hello, world!"
        js_text = js"console.log($text);"
        @test js_text.s == """console.log("Hello, world!");"""

        dict = Dict("foo" => "bar")
        js_dict = js"console.log($dict);"
        @test js_dict.s == "console.log({\"foo\":\"bar\"});"
    end

    @testset "Interpolations of JSStrings into (normal) Strings" begin
        js_log = js"""console.log("Hello!");"""
        script = "<script>$js_log</script>"
        @test script == """<script>console.log("Hello!");</script>"""
    end

    @testset "@js_str Escapes Correctly" begin
        @test js"this.\$refs".s == "this.\$refs"
        @test js"foo\$".s == "foo\$"
        @test js"\$('div.my-id')".s == "\$('div.my-id')"

        @test js"'foo\\bar'".s == "'foo\\bar'"

        foo = "foo"
        @test js"\\$foo".s == "\\\"foo\""

        # See note about Julia and weirdness with escaping when quotes are involved.
        @test js"""console.log("\\")""".s == """console.log(\"\\\")"""
        @test js"""console.log(\"\\\")""".s == """console.log(\"\\\")"""
        @test js"""foo = '\\\\'""".s == raw"""foo = '\\'"""
    end

    @testset "@js_str interpolates JSStrings correctly" begin
        myfunc = js"alert";
        @test js"$myfunc(123)".s == "alert(123)"

        myvalue = js"a + 1"
        @test js"x = $myvalue".s == "x = a + 1"
    end

    @testset "JSStrings nested in interpolated values" begin
        handler = Dict("onclick" => js"alert(1)")

        # Interpolating into a `js"..."` literal splices JSStrings in as raw
        # JavaScript, at any depth.
        @test js"f($handler)".s == "f({\"onclick\":alert(1)})"

        # The default JSON serialization instead quotes them, which is what
        # keeps node props such as event handlers valid JSON.
        @test JSON.json(handler) == "{\"onclick\":\"alert(1)\"}"
    end

    @testset "Non-finite floats interpolate as null" begin
        # JSON.jl v1 refuses to write NaN/Inf; interpolation into a `js"..."`
        # literal writes them as `null`, as JSON.jl < 1 does.
        data = [1.5, NaN, Inf, -Inf]
        @test js"$data".s == "[1.5,null,null,null]"
        trace = Dict("y" => data)
        @test js"f($trace)".s == "f({\"y\":[1.5,null,null,null]})"
    end
end
