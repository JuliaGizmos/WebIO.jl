export iframe

function iframe(dom)
    str = stringmime("text/html", dom)
    key = AssetRegistry.register(assetpath)
    bundle_url = string(baseurl[], key, "/webio/dist/bundle.js")
    s = Scope()
    s.dom = node(:div,
                 node(:iframe, id="ifr", style=Dict("width"=>"100%"),
                      attributes=Dict("src"=>"javascript:void(0)","frameborder"=>0, "scrolling"=>"no", "height"=>"100%")),
                style=Dict("overflow"=>"hidden"),
    )
    onimport(s,
        js"""function () {
            var frame = this.dom.querySelector("#ifr");
            var doc = frame.contentDocument
            var win = frame.contentWindow

            // Ensure that the iframe's baseURI matches the baseURI of the
            // outer document. This is necessary to resolve
            // https://github.com/JuliaGizmos/WebIO.jl/issues/167
            var base = doc.createElement("base");
            base.setAttribute("href", document.baseURI);
            doc.head.appendChild(base);

            var webio = doc.createElement("script")
            webio.src = $bundle_url
            var parent = window

            function resizeIframe() {
                doc.body.style.padding = '0'
                doc.body.style.margin = '0'
                doc.documentElement.height = '100%'
                doc.body.height = '100%'
            }

            webio.onload = function () {
                win.WebIO.sendCallback = parent.WebIO.sendCallback; // Share stuff
                win.WebIO.scopes = parent.WebIO.scopes
                win.WebIO.obsscopes = parent.WebIO.obsscopes
                win.WebIO._connected = true
                doc.body.innerHTML = "<html><body>" + $str + "</body></html>";
                setTimeout(function () { resizeIframe() }, 0)
            }

            doc.body.appendChild(webio)
        }""")
    s
end
