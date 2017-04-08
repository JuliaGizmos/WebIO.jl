import WebIO: JSString

@testset "@js_str" begin
    @test js"x=y".s == "x=y"
    y = 1
    @test js"x=$y".s == "x=\$y"
end

@testset "@js" begin

    @test @js(nothing) == js"null"
    @test @js(x) == js"x"

    x = nothing
    @test @js($x) == js"null"

    @test @js(begin
        x
        y
    end) == js"x; y"

    @test @js(x[]) == js"x[]"
    @test @js(x[1]) == js"x[1]"
    @test @js(x["a"]) == js"x[\"a\"]"
    @test @js(x[1,"a"]) == js"x[1,\"a\"]"


    @test @js(d("x"=1)) == js"{x:1}" # special dict syntax

    @test @js(1==2) == js"1==2" # special in that it's not wrapped in ()

    @test @js(f()) == js"f()"
    @test @js(f(x)) == js"f(x)"
    @test @js(f(x,y)) == js"f(x,y)"
    @test @js(1+2) == js"(1+2)"

    @test @js(x=1) == js"x=1"

    @test @js(x->x) == js"(function (x){x})"
    @test @js(x->return x+1) == js"(function (x){return (x+1)})"
    @test @js(function (x) return x+1; end) == js"(function (x){return (x+1)})"
    
    @test @js(@new F()) == js"new F()"
    @test @js(@var x=1) == js"var x=1"

    @test @js(if x; y end) == js"x ? (y) : undefined"
    @test @js(if x; y; else z; end) == js"x ? (y) : (z)"
    @test @js(if x; y; y+1; else z; end) == js"x ? (y, (y+1)) : (z)"
    @test_throws ErrorException @js(if b; @var x=1; x end)
end
