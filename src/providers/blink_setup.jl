using Blink

immutable BlinkConnection <: AbstractConnection
    page::Page
end

function Blink.body!(p::Page, x::Node)
    wait(p)
    loadjs!(p, "/pkg/WebIO/webio.bundle.js")
    loadjs!(p, "/pkg/WebIO/providers/blink_setup.js")

    conn = BlinkConnection(p)
    Blink.handle(p, "webio") do msg
        WebIO.dispatch(conn, msg)
    end

    body!(p, stringmime(MIME"text/html"(), x))
end

function Blink.body!(p::Window, x::Node)
    body!(p.content, x)
end

function Base.send(b::BlinkConnection, data)
    Blink.msg(b.page, Dict(:type=>"webio", :data=>data))
end

