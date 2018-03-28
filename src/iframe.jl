export IFrame

struct IFrame
    dom::Any
end

function Base.show(io::IO, m::MIME"text/html", f::IFrame)
    str = stringmime(m, f.dom)
    
    s = Scope()
    s.dom = Node(:div,
        Node(:iframe, id="ifr", style=Dict("width"=>"100%", "height"=>"0", "border"=>0)),
        style=Dict("overflow"=>"hidden"),
    )
    onimport(s, js"""function () {
            var frame = this.dom.querySelector("#ifr");
            var doc = frame.contentDocument
            var win = frame.contentWindow
            var webio = doc.createElement("script")
            webio.src = "/pkg/WebIO/webio/dist/bundle.js"
            var parent = window

            function resizeIframe() {
                doc.body.style.padding = '0'
                doc.body.style.margin = '0'
            }

            webio.onload = function () {
                win.WebIO.sendCallback = parent.WebIO.sendCallback; // Share stuff
                win.WebIO.scopes = parent.WebIO.scopes
                win.WebIO.obsscopes = parent.WebIO.obsscopes
                doc.body.innerHTML = $str;
                resizeIframe()
            }

            doc.body.appendChild(webio)
        }""")

    show(io, m, WebIO.render(s))
end
