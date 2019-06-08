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
var debug = debug_1.default("WebIO:Scope");
var Node_1 = __importDefault(require("./Node"));
var Observable_1 = __importDefault(require("./Observable"));
var utils_1 = require("./utils");
var events_1 = require("./events");
var createNode_1 = __importDefault(require("./createNode"));
var imports_1 = require("./imports");
exports.SCOPE_NODE_TYPE = "Scope";
var WebIOScope = /** @class */ (function (_super) {
    __extends(WebIOScope, _super);
    function WebIOScope(schema, context) {
        var _this = _super.call(this, schema, context) || this;
        _this.children = null;
        debug("Creating new WebIOScope.", schema);
        _this.element = document.createElement("div");
        _this.element.className = "webio-scope";
        _this.element.setAttribute("data-webio-scope-id", schema.instanceArgs.id);
        var _a = schema.instanceArgs, id = _a.id, _b = _a.observables, observables = _b === void 0 ? {} : _b, _c = _a.handlers, handlers = _c === void 0 ? {} : _c;
        _this.id = id;
        // Create WebIOObservables.
        _this.observables = {};
        Object.keys(observables).forEach(function (name) {
            var observable = new Observable_1.default(name, observables[name], _this);
            _this.observables[name] = observable;
            observable.subscribe(function (value) { return _this.evokeObservableHandlers(name, value); });
        });
        _this.handlers = {};
        // TODO: refactor registerScope as described elsewhere
        _this.webIO.registerScope(_this);
        // TODO: this following is super messy and needs to be refactored.
        /**
         * The issue here is that we need to have this.promises hooked up before
         * we create children... and we have to do the imports **after** we create
         * the children. There's definitely a cleaner way to do this but my brain
         * is a little bit fried right now.
         *
         * Currently, we just have a "dummy promise" that we create and then
         * "manually" resolve **after** the imports are done, so that
         * `this.promises` is set when we call `initialize` -- which we need since
         * `initialize` creates children which might in turn (e.g. in the case of
         * {@link WebIOObservableNode}) rely on `this.promises`.
         */
        var resolveImportsLoaded;
        var rejectImportsLoaded;
        var importsLoadedPromise = new Promise(function (resolve, reject) {
            resolveImportsLoaded = resolve;
            rejectImportsLoaded = reject;
        });
        _this.promises = {
            connected: _this.webIO.connected.then(function () { return _this; }),
            importsLoaded: importsLoadedPromise,
        };
        // This is super messy and should be refactored.
        // We must do `setupScope` after imports are loaded (see pull #217).
        _this.initialize(schema)
            .then(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return resolveImportsLoaded(args);
        })
            .then(function () { return _this.setupScope(); })
            .catch(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return rejectImportsLoaded(args);
        });
        return _this;
    }
    Object.defineProperty(WebIOScope.prototype, "dom", {
        get: function () { return this.element; },
        enumerable: true,
        configurable: true
    });
    /**
     * Perform asynchronous initialization tasks.
     */
    WebIOScope.prototype.initialize = function (schema) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, handlers, imports, systemJSConfig, _c, preDependencies, _d, _promises, restHandlers, resources, _e, _i, _f, child, importsLoadedHandlers, handlers_1, callbacks;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = schema.instanceArgs, _b = _a.handlers, handlers = _b === void 0 ? {} : _b, imports = _a.imports, systemJSConfig = _a.systemjs_options;
                        _c = handlers.preDependencies, preDependencies = _c === void 0 ? [] : _c, _d = handlers._promises, _promises = _d === void 0 ? {} : _d, restHandlers = __rest(handlers, ["preDependencies", "_promises"]);
                        preDependencies
                            .map(function (functionString) { return events_1.createWebIOEventListener(_this, functionString, { scope: _this, webIO: _this.webIO }); })
                            .forEach(function (handler) { return handler.call(_this); });
                        // Map the function strings into handlers which have `this` bound to the scope's
                        // element and which have access to the _webIOScope resources variable (via closure).
                        Object.keys(restHandlers).forEach(function (observableName) {
                            _this.handlers[observableName] = handlers[observableName].map(function (handlerString) {
                                return events_1.createWebIOEventListener(_this, handlerString, { scope: _this, webIO: _this.webIO });
                            });
                        });
                        if (!imports) return [3 /*break*/, 2];
                        return [4 /*yield*/, imports_1.importBlock(imports, systemJSConfig)];
                    case 1:
                        _e = _g.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _e = null;
                        _g.label = 3;
                    case 3:
                        resources = _e;
                        // Create children WebIONodes.
                        debug("Creating children for scope (id: " + this.id + ").");
                        this.children = schema.children.map(function (nodeData) {
                            if (typeof nodeData === "string") {
                                return nodeData;
                            }
                            return createNode_1.default(nodeData, { webIO: _this.webIO, scope: _this });
                        });
                        // Append children elements to our element.
                        for (_i = 0, _f = this.children; _i < _f.length; _i++) {
                            child = _f[_i];
                            if (typeof child === "string") {
                                this.element.appendChild(document.createTextNode(child));
                            }
                            else {
                                this.element.appendChild(child.element);
                            }
                        }
                        importsLoadedHandlers = _promises.importsLoaded;
                        if (resources && importsLoadedHandlers) {
                            debug("Invoking importsLoaded handlers for scope (" + this.id + ").", { scope: this, importsLoadedHandlers: importsLoadedHandlers, resources: resources });
                            handlers_1 = importsLoadedHandlers.map(function (handler) {
                                return events_1.createWebIOEventListener(_this, handler, { scope: _this, webIO: _this.webIO });
                            });
                            // `as any` is necessary because createWebIOEventListener normally returns
                            // a function which is expected to be an event listener... but this is
                            // kind of a special case of that.
                            handlers_1.forEach(function (handler) { return handler.apply(void 0, resources); });
                        }
                        if (schema.instanceArgs.mount_callbacks) {
                            callbacks = schema.instanceArgs.mount_callbacks.map(function (src) { return events_1.createWebIOEventListener(_this, src, { scope: _this, webIO: _this.webIO }); });
                            callbacks.forEach(function (callback) { return callback(); });
                        }
                        // This isn't super clean, but this function is used to create the
                        // importsLoaded promise, so we need to return the promises.
                        // TODO: refactor this
                        return [2 /*return*/, resources];
                }
            });
        });
    };
    WebIOScope.prototype.getLocalObservable = function (observableName) {
        // Only return a "local" observable
        var obs = this.observables[observableName];
        if (!obs) {
            throw new Error("Scope(id=" + this.id + ") has no observable named \"" + observableName + "\".");
        }
        return obs;
    };
    WebIOScope.prototype.getObservable = function (observable) {
        if (typeof observable === "string" || observable.scope === this.id) {
            return this.getLocalObservable(utils_1.getObservableName(observable));
        }
        // Otherwise, let the root WebIO instance find the correct scope and
        // observable.
        return this.webIO.getObservable(observable);
    };
    WebIOScope.prototype.getObservableValue = function (observable) {
        return this.getObservable(observable).value;
    };
    /**
     * Update an observable within the scope.
     * @param observable - The name (or specifier) of the observable to modify.
     * @param value - The value to set the observable to.
     * @param sync - Whether or not to sync the value to Julia. This should always be
     *    false if the update originated from Julia and is just being propogated into
     *    the browser.
     */
    WebIOScope.prototype.setObservableValue = function (observable, value, sync) {
        if (sync === void 0) { sync = true; }
        debug("WebIOScope¬setObservableValue", { scope: this, observable: observable, value: value, sync: sync });
        var observableName = utils_1.getObservableName(observable);
        if (!(observableName in this.observables)) {
            throw new Error("Scope(id=" + this.id + ") has no observable named \"" + observableName + "\".");
        }
        debug("Setting Observable (name: " + observableName + ") to \"" + value + "\" in WebIOScope (id: " + this.id + ").");
        this.observables[observableName].setValue(value, sync);
    };
    /**
     * Send a message to the WebIO Julia machinery.
     *
     * Sets the scope id if not specified.
     */
    WebIOScope.prototype.send = function (message) {
        return this.webIO.send(message);
    };
    /**
     * Evoke the listeners for an observable with the current value of
     * that observable.
     *
     * @param name - The name of the observable whose listeners should be evoked.
     * @param value - The current value of the observable.
     */
    WebIOScope.prototype.evokeObservableHandlers = function (name, value) {
        var _this = this;
        var listeners = this.handlers[name] || [];
        debug("Evoking " + listeners.length + " observable handlers for observable \"" + name + "\".");
        listeners.forEach(function (listener) {
            listener.call(_this, value, _this);
        });
    };
    /**
     * Send the setup-scope message.
     *
     * This informs Julia/WebIO that we want to listen to changes associated
     * with this scope.
     */
    WebIOScope.prototype.setupScope = function () {
        return this.send({
            type: "command",
            command: "setup_scope" /* SETUP_SCOPE */,
            scope: this.id,
        });
    };
    return WebIOScope;
}(Node_1.default));
exports.default = WebIOScope;
