module BlinkProvider

using Blink
using AssetRegistry
using WebIO
using Base64: stringmime

const bundlepath = joinpath(dirname(@__FILE__), "..", "..",
                            "assets", "webio", "dist",
                            "bundle.js")
const blinksetup = joinpath(dirname(@__FILE__), "..", "..",
                            "assets", "providers",
                            "blink_setup.js")

using Blink: Page, loadjs!, body!, Window
using Sockets

struct BlinkConnection <: WebIO.AbstractConnection
    page::Page
end

function Blink.body!(p::Page, x::Union{Node, Scope})
    wait(p)

    bp = AssetRegistry.register(bundlepath)
    bs = AssetRegistry.register(blinksetup)

    loadjs!(p, bp)
    loadjs!(p, bs)

    conn = BlinkConnection(p)
    Blink.handle(p, "webio") do msg
        WebIO.dispatch(conn, msg)
    end

    body!(p, stringmime(MIME"text/html"(), x))
end

function Blink.body!(p::Window, x::Union{Node, Scope})
    body!(p.content, x)
end

function Sockets.send(b::BlinkConnection, data)
    Blink.msg(b.page, Dict(:type=>"webio", :data=>data))
end

Base.isopen(b::BlinkConnection) = Blink.active(b.page)

function WebIO.register_renderable(T::Type, ::Val{:blink})
    eval(:(Blink.body!(p::Union{Window, Page}, x::$T) =
           Blink.body!(p, WebIO.render(x))))
end

WebIO.setup_provider(::Val{:blink}) = nothing  # blink setup has no side-effects
WebIO.setup(:blink)

end
