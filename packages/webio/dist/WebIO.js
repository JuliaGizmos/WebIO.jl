"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import isArray from "is-array";
// import arrayEqual from "array-equal";
var debug_1 = __importDefault(require("debug"));
var createNode_1 = __importStar(require("./createNode"));
var log = debug_1.default("WebIO");
var WebIO = /** @class */ (function () {
    function WebIO() {
        var _this = this;
        /**
         * A map from `scopeId` to the corresponding {@link WebIOScope} instance.
         */
        this.scopes = {};
        /**
         * A map from `observableId` to an array of corresponding
         * {@link WebIOObservable} instances. We have an array of these instances
         * since an observable may appear within several different scopes. Also note
         * that we identify observables by id here, rather than by name, since the
         * name may be different in different scopes; the ids are usually of the form
         * `obs_123`.
         */
        this.observables = {};
        // We have to use the !-postfix on {resolve,reject}Connected because TypeScript
        // thinks that the body of the promise below isn't immediately executed (it is).
        this.connected = new Promise(function (resolve, reject) {
            _this.resolveConnected = resolve;
            _this.rejectConnected = reject;
        });
    }
    /**
     * Dispatch a message into the WebIO JavaScript machinery.
     *
     * The message usually comes from the comm (e.g. WebSocket) that WebIO is
     * using to communicate.
     *
     * @param message - The message to dispatch.
     */
    WebIO.prototype.dispatch = function (message) {
        log("Dispatching message (command: " + message.command + ").", message);
        switch (message.command) {
            case "Basics.eval" /* EVAL */: {
                console.error("Dispatching command \"" + message.command + "\" not implemented.");
                return;
            }
            default: {
                // TODO: see notes in interface definition of WebIOMessage
                var scopeId = message.scope, observableName = message.command, data = message.data;
                var scope = this.scopes[scopeId];
                if (!scope) {
                    throw new Error("WebIO has no such scope (id: " + scopeId + ").");
                }
                // Set (but don't sync) the value..
                scope.setObservableValue(observableName, data, false);
            }
        }
    };
    /**
     * Set the send callback that WebIO will use.
     *
     * This method, when called for the first time, will also resolve the WebIO
     * connected promise and send any messages that are waiting.
     */
    WebIO.prototype.setSendCallback = function (sendCallback) {
        log("Setting WebIO sendCallback.");
        this.sendCallback = sendCallback;
        this.resolveConnected();
    };
    /**
     * A method called by scopes to register themselves so that messages
     * can be routed appropriately.
     *
     * @todo This should probably be changed so that this method is used to
     *    create a new `WebIOScope` and have it registered then instead of
     *    asking the scope to register itself.
     *    tl;dr; change
     *    `scope = new WebIOScope(...); webIO.registerScope(scope)`
     *    to `scope = webio.createScope(...);`.
     *
     * @param scope
     */
    WebIO.prototype.registerScope = function (scope) {
        log("Registering WebIO scope (id: " + scope.id + ").");
        this.scopes[scope.id] = scope;
    };
    /**
     * A method called by observables to register themselves. This is used to
     * ensure that observables are in a consistent state within the browser.
     * @param observable
     */
    WebIO.prototype.registerObservable = function (observable) {
        var id = observable.id;
        log("Registering WebIO observable (id: " + observable.id + ").");
        if (!this.observables[id]) {
            this.observables[id] = [];
        }
        this.observables[observable.id].push(observable);
    };
    /**
     * Ensure that all observable instances have the value off the
     * `sourceObservable`.
     *
     * @param sourceObservable - The observable whose values are synchronized with
     *    all other registered observables of the same id.
     */
    WebIO.prototype.reconcileObservables = function (sourceObservable) {
        var id = sourceObservable.id, name = sourceObservable.name, value = sourceObservable.value;
        var observables = this.observables[id] || [];
        log("Reconciling " + observables.length + " observables (id: " + id + ").");
        if (observables.length < 1) {
            console.warn("Tried to reconcile observables (id: " + id + ", name: " + name + ") but we don't know"
                + "about any observables with that id.");
            return;
        }
        for (var _i = 0, observables_1 = observables; _i < observables_1.length; _i++) {
            var observable = observables_1[_i];
            // Don't re-set the value of the observable that triggered the
            // reconciliation.
            if (observable === sourceObservable)
                continue;
            log("Reconciling observable \"" + observable.name + "\" in scope \"" + observable.scope.id + "\".");
            observable.setValue(value, false);
        }
    };
    ;
    /**
     * Send a message to the WebIO Julia machinery.
     *
     * Sets `type: "message"` before passing to the send callback.
     */
    WebIO.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connected];
                    case 1:
                        _a.sent();
                        log("Sending WebIO message (command: " + message.command + ").", message);
                        return [2 /*return*/, this.sendCallback(__assign({ type: "message" }, message))];
                }
            });
        });
    };
    /**
     * Mount a WebIO node into the specified element.
     *
     * This method overwrites the content of the element.
     *
     * @param element - The element to be replaced with the WebIO node.
     * @param nodeSchema - The data associated with the WebIO node.
     */
    WebIO.prototype.mount = function (element, nodeSchema) {
        if (!element) {
            console.error("WebIO cannot mount node into element.", { element: element, nodeData: nodeSchema });
            throw new Error("WebIO cannot mount node into element.");
        }
        log("Mounting WebIO node.", { nodeData: nodeSchema, element: element });
        var node = createNode_1.default(nodeSchema, { webIO: this });
        // Reset the contents of the node we're mounting into.
        element.innerHTML = "";
        element.classList.add("webio-mountpoint");
        // Temporary hack for @piever
        // https://github.com/JuliaGizmos/WebIO.jl/pull/211#issuecomment-429672805
        element.classList.add("interactbulma");
        element.appendChild(node.element);
    };
    WebIO.prototype.getScope = function (scopeId) {
        var scope = this.scopes[scopeId];
        if (!scope) {
            throw new Error("WebIO has no scope (id: " + scopeId + ").");
        }
        return scope;
    };
    /**
     * Get an {@link WebIOObservable} object.
     *
     * @throws Will throw an error if the scope does not exist or there is no
     *    such observable within the scope.
     */
    WebIO.prototype.getObservable = function (_a) {
        var scope = _a.scope, name = _a.name;
        return this.getScope(scope).getLocalObservable(name);
    };
    /**
     * Get the value of some observable.
     *
     * @deprecated This method is a shim for old WebIO functionally which relied
     * on a global WebIO instance.
     *
     * @throws Will throw an error if the scope does not exist or there is no
     *    such observable within the scope.
     */
    WebIO.prototype.getval = function (_a) {
        var scope = _a.scope, name = _a.name;
        return this.getScope(scope).getObservableValue(name);
    };
    /**
     * Set the value of some observable.
     *
     * @deprecated This method is a shim for old WebIO functionally which relied
     * on a global WebIO instance.
     *
     * @throws Will throw an error if the scope does not exist or there is no
     *    such observable within the scope.
     */
    WebIO.prototype.setval = function (_a, value, sync) {
        var scope = _a.scope, name = _a.name;
        if (sync === void 0) { sync = true; }
        return this.getScope(scope).setObservableValue(name, value, sync);
    };
    /**
     * A reference to {@link NODE_CLASSES} to allow for extension.
     */
    WebIO.NODE_CLASSES = createNode_1.NODE_CLASSES;
    return WebIO;
}());
exports.default = WebIO;
