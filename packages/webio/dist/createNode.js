"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var DomNode_1 = __importStar(require("./DomNode"));
var Scope_1 = __importStar(require("./Scope"));
var IFrame_1 = __importStar(require("./IFrame"));
var ObservableNode_1 = __importStar(require("./ObservableNode"));
/**
 * Map from node type to node class.
 *
 * The node class should extends WebIONode and take the same arguments in its
 * constructor.
 */
exports.NODE_CLASSES = (_a = {},
    _a[DomNode_1.DOM_NODE_TYPE] = DomNode_1.default,
    _a[Scope_1.SCOPE_NODE_TYPE] = Scope_1.default,
    _a[IFrame_1.IFRAME_NODE_TYPE] = IFrame_1.default,
    _a[ObservableNode_1.OBSERVABLE_NODE_TYPE] = ObservableNode_1.default,
    _a);
/**
* Create a new WebIO node (a scope or a DOM node).
* @param schema
* @param context
*/
var createNode = function (schema, context) {
    var NodeClass = exports.NODE_CLASSES[schema.nodeType];
    if (NodeClass) {
        // We need any here to tell TypeScript that NodeClass isn't an abstract
        // class (because WebIONode **is** an abstract class but we will only have
        // subclasses in our NODE_CLASSES map).
        return new NodeClass(schema, context);
    }
    throw new Error("Unknown WebIO node type: " + schema.nodeType + ".");
};
exports.default = createNode;
