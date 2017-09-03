__precompile__()

module WebIO

using Observables
using Requires

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

const renderable_types = Type[]
"""
    WebIO.register_renderable(MyType::Type)

Registers that a WebIO.render method is available for instances of `MyType`.
Allows WebIO to hook into the display machinery of backends such as Atom and
IJulia to display the WebIO rendered version of the type as appropriate.
"""
function register_renderable(T)
    # When a provider is initialised, a new method for this function will be
    # created for T::Type, outspecialising this one. Until then  we store these
    # types so we can register them when the provider is setup.
    println("register_renderable(Any) called")
    if T isa Type
        push!(renderable_types, T)
        return true
    else
        ArgumentError("register_renderable should only be called with a Type. Was called with $T which is a $(typeof(T))")
    end
end

"""
Called after a provider is setup
"""
function re_register_renderables()
    foreach(T->Base.invokelatest(register_renderable, T), renderable_types)
end

function register_renderable_common(T::Type)
    Base.show(io::IO, m::MIME"text/html", x::T) =
        Base.show(io, m, WebIO.render(x))
end

function setup_provider(name)
    include(joinpath(dirname(@__FILE__), "providers", "$(name)_setup.jl"))
end

const providers_initialised = Set{String}()

function setup(provider)
    println("WebIO: setting up $provider")
    setup_provider(provider)
    push!(providers_initialised, provider)
    re_register_renderables()
end

# TODO check Juno since Blink might get loaded after/before?
@require Mux eval(Main, :(WebIO.setup("mux")))
@require Blink eval(Main, :(WebIO.setup("blink")))
@require Juno eval(Main, :(WebIO.setup("atom")))
@require IJulia eval(Main, :(WebIO.setup("ijulia")))

end # module
