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
end
