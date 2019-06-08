"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var debug = debug_1.default("WebIO:ObservableNode");
var Node_1 = __importDefault(require("./Node"));
var createNode_1 = __importDefault(require("./createNode"));
exports.OBSERVABLE_NODE_TYPE = "ObservableNode";
/**
 * A special type of node/observable that contains a node.
 */
var WebIOObservableNode = /** @class */ (function (_super) {
    __extends(WebIOObservableNode, _super);
    function WebIOObservableNode(schema, context) {
        var _this = _super.call(this, schema, context) || this;
        _this.observable = null;
        _this.children = null;
        _this.onObservableUpdate = function () {
            _this.mountObservable();
        };
        debug("Creating WebIODomNode", { schema: schema, context: context });
        _this.element = document.createElement("div");
        _this.element.className = "webio-observable-node";
        _this.element.setAttribute("data-webio-observable-name", schema.instanceArgs.name);
        try {
            if (!context.scope) {
                throw new Error("Cannot render ObservableNode that has no parent scope.");
            }
            _this.observable = _this.scope.getObservable(schema.instanceArgs.name);
            _this.mountObservable();
            _this.scope.promises.connected.then(function () { return _this.observable.subscribe(_this.onObservableUpdate); });
        }
        catch (e) {
            _this.node = null;
            _this.element.innerHTML = "<strong>Caught exception while trying to render ObservableNode: " + e.message + "</strong>";
        }
        return _this;
    }
    WebIOObservableNode.prototype.mountObservable = function () {
        if (!this.observable) {
            throw new Error("Cannot mount null observable.");
        }
        debug("Mounting node within WebIOObservableNode.", { nodeSchema: this.observable.value });
        var newNode = createNode_1.default(this.observable.value, { webIO: this.webIO, scope: this.scope });
        if (this.node) {
            this.element.replaceChild(newNode.element, this.node.element);
        }
        else {
            this.element.appendChild(newNode.element);
        }
        this.node = newNode;
    };
    return WebIOObservableNode;
}(Node_1.default));
exports.default = WebIOObservableNode;
