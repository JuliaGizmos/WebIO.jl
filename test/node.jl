@testset "Issue 156" begin
    @test length(children(node(:div, rand(3, 3)))) == 1

    n = rand(10, 10) |> dom"div"
    @test length(children(n)) == 1  # should have one child, and that child should be the given array
    @test size(first(children(n))) == (10, 10)
end

# Nodes don't support equality tests currently, so
# we have to do our own comparison of their contents
function compare_nodes(n1::Node, n2::Node)
    (instanceof(n1) == instanceof(n2) &&
     all(compare_nodes(c1, c2) for (c1, c2) in zip(children(n1), children(n2))) &&
     props(n1) == props(n2))
end
compare_nodes(x1, x2) = x1 == x2

@testset "Setting node fields" begin
    n1 = node(:div, node(:div, "hello"), node(:div, "world"), foo="bar")
    n2 = node(:div, node(:div, "hello"), node(:div, "world"), foo="bar")

    n3 = setinstanceof(n1, :ul)
    # set... methods shouldn't mutate the original object, so
    # n1 and n2 are still the same
    @test compare_nodes(n1, n2)
    # but n1 and n3 are now different
    @test !compare_nodes(n1, n3)
    @test instanceof(n3) == WebIO.promote_instanceof(:ul)

    n3 = setchildren(n1, [node(:ul, "list"), node(:li, "item")])
    # set... methods shouldn't mutate the original object, so
    # n1 and n2 are still the same
    @test compare_nodes(n1, n2)
    # but n1 and n3 are now different
    @test !compare_nodes(n1, n3)
    @test length(children(n3)) == 2
    @test compare_nodes(children(n3)[1], node(:ul, "list"))
    @test compare_nodes(children(n3)[2], node(:li, "item"))

    n3 = setprops(n1, Dict(:one => 1, :two => 2))
    # set... methods shouldn't mutate the original object, so
    # n1 and n2 are still the same
    @test compare_nodes(n1, n2)
    # but n1 and n3 are now different
    @test !compare_nodes(n1, n3)
    @test props(n3) == Dict(:one => 1, :two => 2)
end

@testset "Node deprecations" begin
    # Verify that the deprecated Node(inst, vararg...) constructor
    # still works (until we delete it in the next release)

    @testset "one child" begin
        n1 = Node(:div, "hello world")
        n2 = node(:div, "hello world")
        @test compare_nodes(n1, n2)
    end
    @testset "multiple children" begin
        n1 = Node(:div, Node(:div, "hello"), Node(:div, "world"), foo="bar")
        n2 = node(:div, node(:div, "hello"), node(:div, "world"), foo="bar")
        @test compare_nodes(n1, n2)
    end
end


