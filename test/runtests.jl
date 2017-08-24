using WebIO
using Base.Test

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

WebIO.devsetup()
try
    WebIO.bundlejs(watch=false)
catch err
end

include("syntax.jl")
include("communication.jl")
include("blink-tests.jl")
include("util-tests.jl")
