function get_page(opts::Dict=Dict())
    Juno.isactive() ? Juno.Atom.blinkplot() : Window(opts).content
end

Juno.render(::Juno.PlotPane, n::Union{Node, Scope, AbstractWidget}) =
    (body!(get_page(), n); nothing)

Juno.render(i::Juno.Editor, n::Union{Node, Scope, AbstractWidget}) =
    Juno.render(i, Text("$(n.instanceof) Node with $(n._descendants_count) descendent(s)"))

function WebIO.register_renderable(T::Type, ::Val{:atom})
    Juno.media(T, Juno.Media.Graphical)
    eval(:(Juno.Media.render(::Juno.PlotPane, x::$T) =
          (body!(get_page(), WebIO.render(x)); nothing)))
    if hasmethod(WebIO.render_inline, (T,))
        eval(:(Juno.render(i::Juno.Editor, x::$T) =
               Juno.render(i, WebIO.render_inline(x))))
    end
end

function WebIO.setup_provider(::Val{:atom})
    Juno.media(Node, Juno.Media.Graphical)
    Juno.media(Scope, Juno.Media.Graphical)
end
WebIO.setup(:atom)
