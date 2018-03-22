using Blink
using WebIO

immutable BlinkConnection <: WebIO.AbstractConnection
    page::Page
end

function Blink.body!(p::Page, x::Union{Node, Scope})
    wait(p)
    loadjs!(p, "/pkg/WebIO/webio/dist/bundle.js")
    loadjs!(p, "/pkg/WebIO/providers/blink_setup.js")

    conn = BlinkConnection(p)
    Blink.handle(p, "webio") do msg
        WebIO.dispatch(conn, msg)
    end

    body!(p, stringmime(MIME"text/html"(), x))
end

function Blink.body!(p::Window, x::Union{Node, Scope})
    body!(p.content, x)
end

function Base.send(b::BlinkConnection, data)
    Blink.msg(b.page, Dict(:type=>"webio", :data=>data))
end

# TODO: I'm not sure what to check here
Base.isopen(b::BlinkConnection) = true

function WebIO.register_renderable(T::Type)
    Blink.body!(p::Union{Window, Page}, x::T) =
        Blink.body!(p, WebIO.render(x))
    WebIO.register_renderable_common(T)
end
