var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() {
    this.style.display = "none"
}
proto.attachedCallback = function() {
    eval(this.textContent)
};

var UnsafeScript = document.registerElement("unsafe-script", {
    prototype: proto
});

module.exports = UnsafeScript
