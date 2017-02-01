using Blink

immutable BlinkConnection <: AbstractConnection
    page::Page
end

    loadjs!(w, "/pkg/WebIO/js/webio.js")
    loadjs!(w, "/pkg/WebIO/js/nodeTypes.js")
    loadjs!(w, "/pkg/WebIO/js/blink_setup.js")
function Blink.body!(p::Page, x::Node)
    wait(p)

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

