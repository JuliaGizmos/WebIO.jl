"""
    render(x::MyType)

Generic function that defines how a Julia object is rendered. Should return a
`Node` object.
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

# TODO: this is awkward
function render_internal(child)
    render(child)
end
function render_internal(child::Observable)
    render_internal(observable_to_scope(child))
end
function render_internal(child::Node)
    return JSON.lower(child)
end
render_internal(child::Scope) = render_internal(node(child, child.dom))

function observable_to_scope(obs::Observable)



    # Create scope that will contain our output observable for rendering.
    scope = Scope()

    # Create output observable (stored rich html representation of input obs).
    # We must create output via the Observable(scope, ...) constructor so that
    # the onjs call below works (the js is attached to the scope, not the
    # observable itself).

    if isa(obs[], Node)
        #@info "Taking observable_to_scope Node route (scope.id=$(scope.id)). --travigd"
        output = Observable{Node}(
            scope,
            "obs-node",
            obs[],
        )
        # TODO: future values of obs might not be Nodes
        map!(output, obs) do value
            if !isa(value, Node)
                @warn "A rendered observable (scope.id=$(scope.id), obs.id=$(obs.id)) changed from a WebIO node to $(typeof(value))."
                return nothing
            end
            # @info "New node (scope.id=$(scope.id), obs.id=$(obs.id))! --travigd"
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

render(w::AbstractWidget) = render(Widgets.layout(w)(w))
