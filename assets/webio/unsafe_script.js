(function() {

    var webComponentsSupported = ('customElements' in window
        && 'import' in document.createElement('link')
        && 'content' in document.createElement('template'));

    function evalInContext(js, context) {
        return (function() { return eval(js); }).call(context);
    }

    function setup() {

        class UnsafeScript extends HTMLElement {
           constructor() {
              super()
           }
           connectedCallback () {
               evalInContext(this.textContent, this)
           }
        }

        window.customElements.define("unsafe-script", UnsafeScript);
        console.log("defining unsafe-script")
    }

    if (!webComponentsSupported) {
        var script = document.createElement('script');
        script.async = true;

        var webiojs_elem = document.querySelector("script[src*='webio/dist/bundle.js']")
        if (!webiojs_elem) {
            console.warn("WebIO cannot find webio/dist/bundle.js, so it cannot load the webcomponents-lite support. Widgets may be broken in this environment.");
        } else {
            script.src = webiojs_elem.src.replace("bundle.js", "webcomponents-lite.min.js")
        }

        document.head.appendChild(script);
        document.addEventListener("WebComponentsReady", function () {
            if (customElements.get("unsafe-script") === undefined) {
                setup()
            }
        })
    } else if (customElements.get("unsafe-script") === undefined) {
        if (document.readyState === "complete" || document.readyState === "loaded") {
            setup()
        } else {
            if (window.frameElement) {
                // DOMContentLoaded is never fired, we'll just do this now.
                setup();
            } else {
                // https://stackoverflow.com/questions/48498581/accessing-textcontent-within-connectedcallback-for-a-custom-htmlelement
                document.addEventListener("DOMContentLoaded", function () { setup(); })
            }
        }
    }
})();
