using WebIO
using Test
using Sockets

import WebIO: DOM, instanceof
@testset "node" begin

    @test dom"div"().children == []

    n = dom"div"("hello")
    @test n.children == ["hello"]
    @test instanceof(n) == DOM(:html, :div)

    n = dom"div"("hello", prop1=1, prop2=Dict(:x=>1, :y=>2))
    @test n.props[:prop1] == 1
    @test n.props[:prop2] == Dict(:x=>1, :y=>2)

    # test immutability
    n2 = append(n, ["world"])
    @test n.children == ["hello"]
    @test n2.children == ["hello", "world"]

    n3 = mergeprops(n, Dict(:x=>:x, :prop1=>2, :prop2=>Dict(:x=>2)))
    @test n.children == ["hello"]
    @test n3.children == ["hello"]
    @test n3.props == Dict(:x=>:x, :prop1=>2, :prop2=>Dict(:x=>2, :y=>2))

    n4 = withchild(n2, 2) do x
        @test x == "world"
        "www"
    end

    @test n4.children[2] == "www"
end

@testset "syntax for extending Nodes" begin

    n = dom"div"()
    @test children(n("hello", "world")) == ["hello", "world"]
    @test props(n(prop="x")) == Dict(:prop=>"x")

    n1 = n("hello", "world", prop="x")
    @test children(n1) == ["hello", "world"]
    @test props(n1) == Dict(:prop=>"x")
end

function capture_plaintext(x)
    io = IOBuffer()
    show(io, MIME("text/plain"), x)
    seek(io, 0)
    read(io, String)
end

@testset "plaintext printing" begin
    @test capture_plaintext(node(:div)) == "(div)"
    @test capture_plaintext(node(:div, node(:ul))) == "(div\n  (ul))"
    @test capture_plaintext(node(:div, node(:ul, node(:li, "hello")))) == "(div\n  (ul\n    (li\n      \"hello\")))"
    @test capture_plaintext(node(:div, id="foo", class="bar")) == "(div { id=\"foo\" class=\"bar\" })"
    @test capture_plaintext(dom"ul"(dom"li"("hello"), dom"li"("world"))) == "(ul\n  (li\n    \"hello\")\n  (li\n    \"world\"))"
end

@testset "@js_str" begin
    @test js"x=y".s == "x=y"
    y = 1
    @test js"x=$y".s == "x=1"

    y = js"f(42)"
    @test js"x=$y" == js"x=f(42)"

    y = Dict()
    @test js"x=$y" == js"x={}"
end

include("communication.jl")
include("node.jl")
include("http-tests.jl")
include("mux-tests.jl")
include("blink-tests.jl")
include("util-tests.jl")
include("ijulia-tests.jl")
include("bundling.jl")
