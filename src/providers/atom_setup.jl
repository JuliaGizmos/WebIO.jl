using Juno
using WebIO

function get_page(opts::Dict=Dict())
    Juno.isactive() ? Juno.Atom.blinkplot() : Window(opts).content
end

media(Node, Media.Graphical)
Juno.render(::Juno.PlotPane, n::Union{Node, Scope}) =
    (body!(get_page(), n); nothing)

Juno.render(i::Juno.Editor, n::Union{Node, Scope}) =
    Juno.render(i, Text("$(n.instanceof) Node with $(n._descendants_count) descendent(s)"))

function WebIO.register_renderable(T::Type)
    media(T, Media.Graphical)
    Media.render(::Juno.PlotPane, x::T) =
        (body!(get_page(), WebIO.render(x)); nothing)
    if method_exists(WebIO.render_inline, (T,))
        Juno.render(i::Juno.Editor, x::T) =
            Juno.render(i, WebIO.render_inline(x))
    end
    WebIO.register_renderable_common(T)
end
