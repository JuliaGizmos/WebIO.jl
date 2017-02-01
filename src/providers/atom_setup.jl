using Juno
using WebIO

setup_provider("blink")

function get_page(opts::Dict=Dict())
    Juno.isactive() ? Juno.Atom.blinkplot() : Window(opts).content
end

media(Node, Media.Graphical)
Media.render(::Juno.PlotPane, n::Node) = (body!(get_page(), n); nothing)
