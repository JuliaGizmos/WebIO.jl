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
        script.src = '/pkg/WebIO/webio/node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js';
        document.head.appendChild(script);
        document.addEventListener("WebComponentsReady", function () {
            setup()
        })
    } else {
        if (!(document.createElement("unsafe-script") instanceof HTMLElement)) {
            setup()
        }
    }
})();
