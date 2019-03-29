using AssetRegistry
using Base64: stringmime

const blinksetup = joinpath(
    dirname(@__FILE__), "..", "..",
    "packages", "blink-provider", "dist", "blink.js"
)

using Sockets

struct BlinkConnection <: WebIO.AbstractConnection
    page::Blink.Page
end

Blink.body!(p::Blink.Page, x::AbstractWidget) = Blink.body!(p, Widgets.render(x))
function Blink.body!(p::Blink.Page, x::Union{Node, Scope})
    wait(p)

    bs = AssetRegistry.register(blinksetup)
    Blink.loadjs!(p, bs)

    conn = BlinkConnection(p)
    Blink.handle(p, "webio") do msg
        WebIO.dispatch(conn, msg)
    end

    Blink.body!(p, stringmime(MIME"text/html"(), x))
end

Blink.body!(p::Blink.Window, x::AbstractWidget) = Blink.body!(p, Widgets.render(x))
function Blink.body!(p::Blink.Window, x::Union{Node, Scope})
    Blink.body!(p.content, x)
end

function Sockets.send(b::BlinkConnection, data)
    Blink.msg(b.page, Dict(:type=>"webio", :data=>data))
end

Base.isopen(b::BlinkConnection) = Blink.active(b.page)

function WebIO.register_renderable(T::Type, ::Val{:blink})
    eval(:(Blink.body!(p::Union{Blink.Window, Blink.Page}, x::$T) =
           Blink.body!(p, WebIO.render(x))))
end

WebIO.setup_provider(::Val{:blink}) = nothing  # blink setup has no side-effects
WebIO.setup(:blink)
