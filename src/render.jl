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
        return str_repr |> WebIO.encode_scripts
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
WebIO.render(obs::Observable)

Returns a WebIO Node whose contents are the richest version of the observable's
value, and which updates to display the observable's current value
"""
function render(obs::Observable)
    # setup output area which updates when `obs`'s value changes
    scope = Scope()

    # get the richest representation of obs's current value (as a string)
    html_contents_str = htmlstring(WebIO.render(obs[]))

    # Avoid nested <script> issues by initialising as an empty node and updating later
    scope.dom = dom"div#out"(; setInnerHtml=html_contents_str)

    # will store the string of html which the `obs` value is converted to
    scope["obs-output"] = Observable{Any}(html_contents_str)

    # ensure updates with the new html representation of obs when obs updates
    map!(htmlstring∘WebIO.render, scope["obs-output"], obs)

    # ensure the output area updates when output_obs updates (after obs updates)
    output_updater = js"""function (updated_htmlstr) {
        var el = this.dom.querySelector("#out");
        WebIO.propUtils.setInnerHtml(el, updated_htmlstr);
    }"""
    onjs(scope["obs-output"], output_updater)

    WebIO.render(scope)
end

render(w::AbstractWidget) = render(Widgets.layout(w)(w))
