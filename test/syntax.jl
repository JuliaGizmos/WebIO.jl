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
    end
end
