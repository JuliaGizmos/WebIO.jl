// A trivial importable module that simply produces "ok".
// Used for testing the WebIO Scope imports machinery.

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.amdWeb = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return {x: "ok"}
}));
