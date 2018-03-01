"""
    render(x::MyType)

Generic function that defines how a Julia object is rendered. Should return a
`Node` object.
"""
function render end
render(x::Union{Node, String}) = x
render(x::Text) = dom"pre"(x.content)
render(::Void) = ""
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


"""
Generic Conversion to Nodes
"""

const mime_order = map(MIME, [ "text/html", "text/latex", "image/svg+xml", "image/png", "image/jpeg", "text/markdown", "application/javascript", "text/plain" ])

function richest_mime(val)
    for mimetype in mime_order
        mimewritable(mimetype, val) && return mimetype
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

richest_html(::Void) = ""
