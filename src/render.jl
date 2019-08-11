"""
    render(x::MyType)

Generic function that defines how a Julia object is rendered.
Should return a `Node` object.

# Examples
```julia
struct MyPlot
    s::Scope
end

WebIO.render(p::MyPlot) = WebIO.render(p.s)
```
"""
function render end
render(x::Union{Node, String}) = x
render(x::Text) = dom"pre"(x.content)
render(::Nothing) = ""
render(x::Any) =
    dom"div"(; setInnerHtml=richest_html(x))

"""
Called after a provider is setup
"""
function re_register_renderables()
    for provider in providers_initialised
        for T in renderable_types
            register_renderable(T, Val(provider))
        end
    end
end


"""
Generic Conversion to Nodes
"""
const mime_order = map(MIME, [ "text/html", "text/latex", "image/svg+xml", "image/png", "image/jpeg", "text/markdown", "application/javascript", "text/plain" ])

function richest_mime(val)
    for mimetype in mime_order
        showable(mimetype, val) && return mimetype
    end
    error("value not writable for any mimetypes")
end

function richest_html(val)
    topmime = richest_mime(val)
    str_repr = stringmime(topmime, val)
    if topmime == MIME("text/html")
        return str_repr # |> WebIO.encode_scripts
    elseif topmime in map(MIME, ["image/png", "image/jpeg"])
        return "<img src='data:image/png;base64,$str_repr'></img>"
    elseif topmime == MIME("image/svg+xml")
        return str_repr
    else
        return "<pre>$str_repr</pre>"
    end
end

richest_html(::Nothing) = ""

function htmlstring(val)
    sprint() do io
        show(io, MIME"text/html"(), val)
    end
end

htmlstring(val::AbstractString) = val

"""
Wrap an observable in a scope to enable "live updating."

This method also contains distinct code paths for the cases where the observable
contains "non-simple" data types (in particular, observables that contain
Nodes, Scopes, or Widgets need specially handling).
"""
function observable_to_scope(obs::Observable)
    # Create scope that will contain our output observable for rendering.
    scope = Scope()

    # Create output observable (stored rich html representation of input obs).
    # We must create output via the Observable(scope, ...) constructor so that
    # the onjs call below works (the js is attached to the scope, not the
    # observable itself).

    # Do we need separate code paths for Scope/Widget and Node?
    if isa(obs[], Scope) || isa(obs[], AbstractWidget)
        output = Observable(scope, "obs-scope", render(obs[]))
        map!(render, output, obs)
        ensure_sync(scope, "obs-scope")
        scope.dom = node(ObservableNode(output.id, "obs-scope"))
        return scope
    end

    if isa(obs[], Node)
        output = Observable(
            scope,
            "obs-node",
            obs[],
        )
        map!(output, obs) do value
            if !isa(value, Node)
                @warn "A rendered observable (scopeid=$(scopeid(scope)), obs.id=$(obs.id)) changed from a WebIO node to $(typeof(value))."
                return nothing
            end
            return value
        end
        ensure_sync(scope, "obs-node")
        scope.dom = node(ObservableNode(output.id, "obs-node"))
        return scope
    end

    output = Observable{AbstractString}(
        scope,
        "obs-output",
        richest_html(obs[])
    )

    # Map new values of obs into the output observable and give it a label
    # within the scope.
    map!(output, obs) do data
        # data -> htmlstring(WebIO.render(data)),
        rich = richest_html(data)
        return rich
    end

    # Avoid not-executing <script> issues by initialising as an empty node and
    # updating later.
    scope.dom = dom"div.webio-observable"(; setInnerHtml=output[])
    onjs(
        output,
        js"""
        function (value, scope) {
            scope.setInnerHTML(value);
        }
        """,
    )


    # ensure the output area updates when output_obs updates (after obs updates)
    return scope
end

"""
WebIO.render(obs::Observable)

Generates a scope that contains the target observable and whose .dom attribute
is the richest representation of that observable (wrapped in a div).

Returns the WebIO node (via WebIO.render()) of that scope.
"""
function render(obs::Observable)
    scope = observable_to_scope(obs)
    return WebIO.render(scope)
end

render(w::AbstractWidget) = render(Widgets.render(w))

function JSON.lower(n::Node)
    result = Dict{String, Any}(
        "type" => "node",
        "nodeType" => nodetype(n),
        "instanceArgs" => JSON.lower(n.instanceof),
        "children" => map!(
            render,
            Vector{Any}(undef, length(children(n))),
            children(n),
        ),
        "props" => props(n),
    )
    return result
end

function Base.show(io::IO, m::MIME"text/html", x::Node)
    mountpoint_id = rand(UInt64)
    # Is there any way to only include the `require`-guard below for IJulia?
    # I think IJulia defines their own ::IO type.
    write(
        io,
        """
        <div
            class="webio-mountpoint"
            data-webio-mountpoint="$(mountpoint_id)"
        >
            <script>
            if (window.require && require.defined && require.defined("nbextensions/$(JUPYTER_NBEXTENSION_NAME)")) {
                console.log("Jupyter WebIO extension detected, not mounting.");
            } else if (window.WebIO) {
                WebIO.mount(
                    document.querySelector('[data-webio-mountpoint="$(mountpoint_id)"]'),
                    $(escape_json(x)),
                    window,
                );
            } else {
                document
                    .querySelector('[data-webio-mountpoint="$(mountpoint_id)"]')
                    .innerHTML = (
                        '<strong>WebIO not detected. Please read ' +
                        '<a href="https://juliagizmos.github.io/WebIO.jl/latest/troubleshooting/not-detected/">the troubleshooting guide</a> ' +
                        'for more information on how to resolve this issue.' +
                        '</strong>'
                    );
            }
            </script>
        </div>
        """
    )
end

"""
A vector of types that are renderable by WebIO.

This exists because for some providers, we need to create some methods when
certain providers are initialized to allow those providers to display custom
types.
This will be removed in the (hopefully near-term) future as we remove providers
out from WebIO and into the appropriate packages.
"""
const renderable_types = Type[]

"""
    @register_renderable(MyType)
    @register_renderable(MyType) do
        # Render definition
    end

Register a type as renderable by WebIO.
This enables your type to be displayed in the appropriate WebIO frontends
(e.g. Jupyter) without any additional work.

This macro may be called either with just the type that you wish to mark as
renderable or with the body of the [`WebIO.render`](@ref) method using do-block
syntax.

The do-block syntax requires parentheses around the typename.
Additionally, due to inconsistencies in the way macros are resolved, the
do-block syntax must be invoked using `@WebIO.register_renderable`
(**not** `WebIO.@register_renderable`).
If the `@WebIO.register_renderable` syntax looks ugly, it might be preferable
to directly import the macro and use it without qualifying its name.

This macro also defines a method for `Base.show` with the `text/html` MIME so
you should not need to define your own.

# Examples
```julia
struct ScatterPlot
    x::Vector{Float64}
    y::Vector{Float64}
end

# Do-block syntax
# Note that the `@` comes before `WebIO`
@WebIO.register_renderable(ScatterPlot) do plot
    # Construct the scatter plot using DOM primitives...
    return node(...)
end

# Do-block syntax with explicit import
using WebIO: @register_renderable
@register_renderable(ScatterPlot) do plot ... end

# Type name syntax
WebIO.render(plot::ScatterPlot) = node(...)
@WebIO.register_renderable ScatterPlot
```
"""
macro register_renderable(typename)
    return register_renderable_macro_helper(esc(typename))
end

macro register_renderable(f::Expr, typename)
    render_method_expr = quote
        local f = $(esc(f))
        WebIO.render(x::$(esc(typename))) = f(x)
    end

    result_expr = register_renderable_macro_helper(esc(typename))
    push!(result_expr.args, render_method_expr)
    return result_expr
end

function register_renderable_macro_helper(
        typename::Union{Symbol, Expr, Type}
)::Expr
    return quote
        push!(renderable_types, $typename)
        function Base.show(
                io::IO,
                m::Union{MIME"text/html", WEBIO_NODE_MIME},
                x::$typename,
        )
            return Base.show(io, m, WebIO.render(x))
        end
    end
end

"""
    register_renderable(MyType)

This function is deprecated. Please use [`WebIO.@register_renderable`](@ref)
instead.

This function was deprecated because it contained too much *magic* (since
*magic* is firmly within the domain of macros).
In particular, this function resorts to `eval`-ing new method definitions for
the types passed into it which is not what a normal function is supposed to do.
"""
function register_renderable(::Type{T}) where T
    Base.depwarn(
        "`WebIO.register_renderable(Type)` is deprecated; use the "
            * "`@WebIO.register_renderable Type` macro instead.",
        :webio_register_renderable_function,
    )
    @eval $(register_renderable_macro_helper(T))
end

function Base.show(io::IO, m::WEBIO_NODE_MIME, node::Node)
    write(io, JSON.json(node))
end

function Base.show(io::IO, m::MIME"text/html", x::Observable)
    show(io, m, WebIO.render(x))
end

function Base.show(io::IO, m::WEBIO_NODE_MIME, x::Union{Observable, AbstractWidget})
    show(io, m, WebIO.render(x))
end

@deprecate render_internal render
