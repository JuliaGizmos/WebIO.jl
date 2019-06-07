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

const renderable_types = Type[]
"""
    `WebIO.register_renderable(MyType::Type)`

Registers that a WebIO.render method is available for instances of `MyType`.
Allows WebIO to hook into the display machinery of backends such as Atom and
IJulia to display the WebIO rendered version of the type as appropriate.

Also defines a `Base.show(io::IO, m::MIME"text/html", x::MyType)` as
`Base.show(io, m, WebIO.render(x))`
"""
function register_renderable(::Type{T}) where T
    @eval Base.show(io::IO, m::MIME"text/html", x::$T) = Base.show(io, m, WebIO.render(x))
    push!(renderable_types, T)
    return true
end

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
            if (window.require && require.defined && require.defined("nbextensions/webio/main")) {
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
                    .innerHTML = '<strong>WebIO not detected.</strong>';
            }
            </script>
        </div>
        """
    )
end

"""
    @register_renderable <method declaration>
    @register_renderable MyType

Register a type as renderable by WebIO.
This enables your type to be displayed in the appropriate WebIO frontends
(e.g. Jupyter) without any additional work.

This macro may be called either with the definition of a `WebIO.render` method
for your type or just on the type alone (assuming a `WebIO.render` method has
already been defined).

# Examples
```julia
struct ScatterPlot
    x::Vector{Float64}
    y::Vector{Float64}
end

# All of the following are equivalent
WebIO.@register_renderable function WebIO.render(x::ScatterPlot)
    # Construct the scatter plot using DOM primitives...
    return node(...)
end

WebIO.@register_renderable WebIO.render(x::ScatterPlot) = node(...)

function WebIO.render(x::ScatterPlot)
    ...
end
WebIO.@register_renderable ScatterPlot
```
"""
macro register_renderable(ex::Union{Symbol, Expr})
    if isa(ex, Symbol) || ex.head == :(.)
        # Allow `@register_renderable MyModule.MyType` syntax
        return register_renderable_helper(ex)
    end

    # This is true if using `render(x) = ...` syntax
    is_short_form_def = (
        ex.head == :(=)
        && isa(ex.args[1], Expr) && ex.args[1].head == :call
        && isa(ex.args[2], Expr) && ex.args[2].head == :block
    )
    if ex.head != :function && !is_short_form_def
        error("Invalid expression (must be a method definition).")
    end

    call = ex.args[1]
    is_valid_call = (
        (call.args[1] == :render || call.args[1] == :(WebIO.render))
        && (length(call.args) == 2)
        && (isa(call.args[2], Expr))
        && (call.args[2].head == :(::))
    )
    if !is_valid_call
        error("Invalid expression (must be a method definition for WebIO.render).")
    end

    typename = call.args[2].args[2]
    return Expr(
        :block,
        esc(ex),
        register_renderable_helper(typename),
    )
end

function register_renderable_helper(typename::Union{Symbol, Expr})::Expr
    return :(
        begin
            function Base.show(
                    io::IO,
                    m::Union{MIME"text/html", WEBIO_NODE_MIME},
                    x::$(esc(typename)),
            )
                return Base.show(io, m, WebIO.render(x))
            end
        end
    )
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
