"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var setInnerHTML_1 = __importDefault(require("./setInnerHTML"));
/**
 * A high-level "point-of-entry" under which WebIO "things" are rendered.
 *
 * A `WebIONode` has a root DOM element and some functionality for managing the
 * attributes (DOM attributes, CSS styles, event listeners, etc.) that are
 * applied to it.
 */
var WebIONode = /** @class */ (function () {
    function WebIONode(nodeData, options) {
        this.nodeData = nodeData;
        var scope = options.scope, webIO = options.webIO;
        this.scope = scope;
        this.webIO = webIO;
    }
    /**
     * Set the innerHTML of the node's DOM element.
     */
    WebIONode.prototype.setInnerHTML = function (html) {
        setInnerHTML_1.default(this.element, html);
    };
    return WebIONode;
}());
exports.default = WebIONode;
