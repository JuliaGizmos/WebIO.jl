__precompile__()

module WebIO

using Observables

include("util.jl")
include("node.jl")
include("syntax.jl")
include("widget.jl")
include("connection.jl")
include("devsetup.jl")

export setup_provider

"""
    render(x::MyType)

Generic function that defines how a Julia object is rendered. Should return a
`Node` object.
"""
function render end
render(x::Node) = x
render(x::Text) = dom"span"(x.content)
render(x::String) = render(Text(x))

function render_inline end

"""
    WebIO.register_renderable(MyType::Type)

Registers that a WebIO.render method is available for instances of `MyType`.
Allows WebIO to hook into the display machinery of backends such as Atom and
IJulia to display the WebIO rendered version of the type as appropriate.
"""
function register_renderable end
function register_renderable_common(T::Type)
    Base.show(io::IO, m::MIME"text/html", x::T) =
        Base.show(io, m, WebIO.render(x))
end

function setup_provider(name)
    include(joinpath(dirname(@__FILE__), "providers", "$(name)_setup.jl"))
end

const butdoesitwork = Ref(false)

function setup()
    if isdefined(Main, :IJulia)
        setup_provider("ijulia")
    elseif isdefined(Main, :Juno)
        setup_provider("atom")
    elseif isdefined(Main, :Blink)
        setup_provider("blink")
    elseif isdefined(Main, :Mux)
        setup_provider("mux")
    else
        return
    end
    butdoesitwork[] = true
end

end # module
