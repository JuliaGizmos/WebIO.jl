"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var debug = debug_1.default("WebIO:DomNode");
var Node_1 = __importDefault(require("./Node"));
var events_1 = require("./events");
var createNode_1 = __importDefault(require("./createNode"));
exports.DOM_NODE_TYPE = "DOM";
var WebIODomNode = /** @class */ (function (_super) {
    __extends(WebIODomNode, _super);
    function WebIODomNode(nodeData, options) {
        var _this = _super.call(this, nodeData, options) || this;
        _this.eventListeners = {};
        debug("Creating WebIODomNode", { nodeData: nodeData, options: options });
        _this.element = WebIODomNode.createElement(nodeData);
        _this.applyProps(nodeData.props);
        // Recursively construct children.
        _this.children = nodeData.children.map(function (nodeData) {
            if (typeof nodeData === "string") {
                return nodeData;
            }
            return createNode_1.default(nodeData, { webIO: _this.webIO, scope: _this.scope });
        });
        // Append childrens' elements to this node's element.
        for (var _i = 0, _a = _this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (typeof child === "string") {
                _this.element.appendChild(document.createTextNode(child));
            }
            else {
                _this.element.appendChild(child.element);
            }
        }
        return _this;
    }
    WebIODomNode.createElement = function (data) {
        var _a = data.instanceArgs, namespace = _a.namespace, tag = _a.tag;
        switch (namespace.toLocaleLowerCase()) {
            case "html" /* HTML */:
                return document.createElement(tag);
            case "http://www.w3.org/2000/svg" /* SVG */:
            case "svg" /* SVG_SHORTHAND */:
                return document.createElementNS("http://www.w3.org/2000/svg" /* SVG */, tag);
            default:
                throw new Error("Unknown DOM namespace: " + namespace + ".");
        }
    };
    /**
     * Apply "props" to the underlying DOM element.
     *
     * @param props - The props to apply.
     */
    WebIODomNode.prototype.applyProps = function (props) {
        debug("applyProps", props);
        var style = props.style, events = props.events, attributes = props.attributes, attributesNS = props.attributesNS, setInnerHtml = props.setInnerHtml, rest = __rest(props, ["style", "events", "attributes", "attributesNS", "setInnerHtml"]);
        style && this.applyStyles(style);
        events && this.applyEvents(events);
        attributes && this.applyAttributes(attributes);
        attributesNS && this.applyAttributesNS(attributesNS);
        setInnerHtml && this.setInnerHTML(setInnerHtml);
        this.applyMiscellaneousProps(rest);
    };
    /**
     * Apply all props that don't have special meaning.
     *
     * This should really be refactored so that all these "miscellaneous" props
     * are delivered in a separate object (e.g. have props.miscProps on the same
     * level as props.style and props.events et al.).
     * @param props - The object of miscellaneous props and their values.
     */
    WebIODomNode.prototype.applyMiscellaneousProps = function (props) {
        debug("applyMiscellaneousProps", props);
        for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
            var propName = _a[_i];
            this.element[propName] = props[propName];
        }
    };
    WebIODomNode.prototype.applyStyles = function (styles) {
        if (!styles) {
            return;
        }
        for (var _i = 0, _a = Object.keys(styles); _i < _a.length; _i++) {
            var attributeName = _a[_i];
            this.element.style[attributeName] = styles[attributeName];
        }
    };
    /**
     * Apply (add/remove) event listeners to the underlying DOM element.
     *
     * @param events - A map object from event names to event listeners. If an
     *    event name is specified (e.g. `click`) that didn't exist before, the
     *    associated handler (e.g. `events["click"]`) is added as a listener; if
     *    the event name has already been specified (even if the listener function
     *    changed!), then nothing happens; if the event name is absent (or null) in
     *    the map, then any previously setup listeners (if any) are removed.
     */
    WebIODomNode.prototype.applyEvents = function (events) {
        for (var _i = 0, _a = Object.keys(events); _i < _a.length; _i++) {
            var eventName = _a[_i];
            var oldListener = this.eventListeners[eventName];
            var newListenerSource = events[eventName];
            var newListener = newListenerSource && events_1.evalWithWebIOContext(this.element, newListenerSource, { scope: this.scope, webIO: this.webIO });
            if (oldListener && !newListener) {
                // We want to just remove the old listener.
                this.element.removeEventListener(eventName, oldListener);
                delete this.eventListeners[eventName];
            }
            else if (!oldListener && newListener) {
                this.element.addEventListener(eventName, newListener);
                this.eventListeners[eventName] = newListener;
            }
            // If the listener is just changed, we don't really handle that.
        }
    };
    /**
     * Apply DOM attributes to the underlying DOM element.
     *
     * @param attributes - The map of attributes to apply.
     */
    WebIODomNode.prototype.applyAttributes = function (attributes) {
        for (var _i = 0, _a = Object.keys(attributes); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = attributes[key];
            if (value === null) {
                this.element.removeAttribute(key);
            }
            else {
                this.element.setAttribute(key, value);
            }
        }
    };
    /**
     * Apply namespaced DOM attributes to the underlying DOM element.
     *
     * @param attributes - The `{attributeName: {namespace, value}}` map to apply.
     */
    WebIODomNode.prototype.applyAttributesNS = function (attributes) {
        for (var _i = 0, _a = Object.keys(attributes); _i < _a.length; _i++) {
            var key = _a[_i];
            var _b = attributes[key], namespace = _b.namespace, value = _b.value;
            if (value === null) {
                this.element.removeAttributeNS(namespace, key);
            }
            else {
                this.element.setAttributeNS(namespace, key, value);
            }
        }
    };
    /**
     * Set the value associated with the node's element.
     *
     * This generally only works with `<input />` elements.
     *
     * @param value
     * @throws Will throw an error if the element doesn't have a `value` attribute.
     */
    WebIODomNode.prototype.setValue = function (value) {
        if ("value" in this.element) {
            // If the value hasn't changed, don't re-set it.
            if (this.element.value !== value) {
                this.element.value = value;
            }
        }
        else {
            throw new Error("Cannot set value on an HTMLElement that doesn't support it.");
        }
    };
    return WebIODomNode;
}(Node_1.default));
exports.default = WebIODomNode;
