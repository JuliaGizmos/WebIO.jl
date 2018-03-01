function evalInContext(js, context) {
    return (function() { return eval(js); }).call(context);
}
if (document.createElement("unsafe-script").constructor === HTMLElement) {
    var proto = Object.create(HTMLElement.prototype);
    proto.createdCallback = function() {
        this.style.display = "none"
    }
    proto.attachedCallback = function() {
        evalInContext(this.innerHTML, this)
    }

    var UnsafeScript = document.registerElement("unsafe-script", {
        prototype: proto
    });
}
