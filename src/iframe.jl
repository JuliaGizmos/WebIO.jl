struct IFrame
    dom::Any
end

function Base.show(io::IO, m::MIME"text/html", f::IFrame)
    str = ""
    iobuf = IOBuffer()
    show(iobuf, m, f.dom)
    str *= String(take!(iobuf))
    
    s = Scope()
    s.dom = Node(:iframe, id="ifr")
    onimport(s, js"""function () {
            var doc = this.dom.querySelector("#ifr").contentDocument
            var webio = doc.createElement("script")
            webio.src = "/pkg/WebIO/webio/dist/bundle.js"
            webio.onload = function () { doc.body.innerHTML = $str; }
            doc.body.appendChild(webio)
        }""")
    show(io, m, WebIO.render(s))
end
