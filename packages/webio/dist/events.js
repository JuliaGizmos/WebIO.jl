"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var log = debug_1.default("WebIO:events");
/**
 * Create a WebIO event listener.
 *
 * This function returns an event listener function that will operate in the
 * correct WebIO scope (i.e. WebIO will refer to the right instance and `this`
 * will be bound to the DOM node specified).
 *
 * Note that we use _webIO-prefixed variable names to avoid any possible clashes
 * with user-code.
 *
 * @param _webIOThis - the DOM node that `this` should be bound to.
 * @param _webIOListenerSource - the source (preferably as a string) of the listener
 *    function; if not a string, the function will be converted to a string and
 *    then re-eval'd to ensure that WebIO and this refer to the correct objects.
 * @param _webIOContext - the context handler should be evaluated in.
 */
exports.createWebIOEventListener = function (_webIOThis, _webIOListenerSource, _webIOContext) {
    var WebIO = _webIOContext.webIO, _webIOScope = _webIOContext.scope;
    log("Creating event listener.", { context: _webIOThis, scope: _webIOScope, source: _webIOListenerSource });
    // Wrap the source in parens so that eval returns the function instance
    // (so that eval treats it as an expression rather than a top-level function
    // declaration).
    return eval("(" + _webIOListenerSource + ")").bind(_webIOThis);
};
exports.evalWithWebIOContext = function (_webIOThis, _webIOListenerSource, _webIOContext) {
    var WebIO = _webIOContext.webIO, _webIOScope = _webIOContext.scope;
    var _wrappedFunction = function () {
        return eval("" + _webIOListenerSource);
    };
    return _wrappedFunction.apply(_webIOThis);
};
