var proto = Object.create(HTMLElement.prototype);
proto.style.display = "none"
proto.attachedCallback = function() {
    this.style.display = "none"
    eval(this.textContent)
};

var UnsafeScript = document.registerElement("unsafe-script", {
    prototype: proto
});

module.exports = UnsafeScript
