function evalInContext(js, context) {
    return (function() { return eval(js); }).call(context);
}
if (document.createElement("unsafe-script").constructor === HTMLElement) {
    var proto = Object.create(HTMLScriptElement.prototype);

    proto.attachedCallback = function() {
        evalInContext(this.textContent, this)
    }

    var UnsafeScript = document.registerElement("unsafe-script", {
        prototype: proto
    });
}
