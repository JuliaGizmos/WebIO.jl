export iframe

function iframe(dom)
    str = stringmime("text/html", dom)
    
    s = Scope()
    s.dom = Node(:div,
                 Node(:iframe, id="ifr", style=Dict("width"=>"100%"),
                      attributes=Dict("src"=>"javascript:void(0)","frameborder"=>0, "scrolling"=>"no", "height"=>"100%")),
                style=Dict("overflow"=>"hidden"),
    )
    onimport(s,
        js"""function () {
            var frame = this.dom.querySelector("#ifr");
            var doc = frame.contentDocument
            var win = frame.contentWindow

            // Determine if we're running on a Jupyter hosting service
            // that requires a base URL when retrieving assets
            var curMatch = 
                window.location.href
                .match(/(.*)\/notebooks\/.*\.ipynb/);
            curMatch = curMatch ||
                window.location.href
                .match(/(.*)\/apps\/.*\.ipynb/);
            if (curMatch) {
                var base = doc.createElement("base");
                base.setAttribute("href", curMatch[1] + '/');
                doc.head.appendChild(base);
            }

            var webio = doc.createElement("script")
            webio.src = "pkg/WebIO/webio/dist/bundle.js"
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
