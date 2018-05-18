@require Juno begin

using Juno

function get_page(opts::Dict=Dict())
    Juno.isactive() ? Juno.Atom.blinkplot() : Window(opts).content
end

Juno.render(::Juno.PlotPane, n::Union{Node, Scope}) =
    (body!(get_page(), n); nothing)

Juno.render(i::Juno.Editor, n::Union{Node, Scope}) =
    Juno.render(i, Text("$(n.instanceof) Node with $(n._descendants_count) descendent(s)"))

function WebIO.register_renderable(T::Type, ::Val{:atom})
    media(T, Media.Graphical)
    Media.render(::Juno.PlotPane, x::T) =
        (body!(get_page(), WebIO.render(x)); nothing)
    if method_exists(WebIO.render_inline, (T,))
        Juno.render(i::Juno.Editor, x::T) =
            Juno.render(i, WebIO.render_inline(x))
    end
end

function WebIO.setup_provider(::Val{:atom})
    media(Node, Media.Graphical)
    media(Scope, Media.Graphical)
end
WebIO.setup(:atom)

end
