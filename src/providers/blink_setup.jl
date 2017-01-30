using Blink

immutable BlinkConnection <: AbstractConnection
    w::Window
end

function Blink.body!(w::Window, x::Node)
    loadjs!(w, "/pkg/WebIO/js/webio.js")
    loadjs!(w, "/pkg/WebIO/js/nodeTypes.js")
    loadjs!(w, "/pkg/WebIO/js/blink_setup.js")

    conn = BlinkConnection(w)
    Blink.handle(w, "webio") do msg
        WebIO.dispatch(conn, msg)
    end

    body!(w, stringmime(MIME"text/html"(), x))
end

function Base.send(p::BlinkConnection, data)
    Blink.msg(p.w, Dict(:type=>"webio", :data=>data))
end

