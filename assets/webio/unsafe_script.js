(function() {
    if ('registerElement' in document
        && 'import' in document.createElement('link')
        && 'content' in document.createElement('template')) {
      // platform is good!
    } else {
      // polyfill the platform!
      var e = document.createElement('script');
      e.src = '/pkg/WebIO/webio/node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js';
      document.body.appendChild(e);
    }
    function evalInContext(js, context) {
        return (function() { return eval(js); }).call(context);
    }
    if (document.createElement("unsafe-script").constructor === HTMLElement) {
        var proto = Object.create(HTMLElement.prototype);

        proto.attachedCallback = function() {
            evalInContext(this.textContent, this)
        }

        var UnsafeScript = document.registerElement("unsafe-script", {
            prototype: proto
        });
    }
})();
