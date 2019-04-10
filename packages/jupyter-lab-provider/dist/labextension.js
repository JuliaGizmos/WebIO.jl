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
import debug from "debug";
import { Panel } from "@phosphor/widgets";
import { DisposableDelegate } from "@phosphor/disposable";
import WebIO from "@webio/webio";
var log = debug("WebIO:jupyter-lab");
var MIME_TYPE = "application/vnd.webio.node+json";
var COMM_TARGET = "webio_comm";
var WEBIO_METADATA_KEY = "@webio";
var WEBIO_OLD_KERNEL_MESSAGE = ("This WebIO widget was rendered for a Jupyter kernel that is no longer running. "
    + "Re-run this cell to regenerate this widget.");
/*
 * The rank of a renderer determines the order in which renderers are invoked.
 * A lower rank means that the Renderer has a higher priority.
 *
 * It shouldn't actually mean anything since there shouldn't(?) be any other
 * renderers that try to render the WebIO MIME type.
 */
var RENDERER_RANK = 0;
log("@webio/jupyter-lab-provider");
/**
 * A Jupyter renderer class that mounts a WebIO node.
 *
 * The JupyterLab machinery creates an instance of this class every time WebIO
 * data is displayed in the notebook. It is passed a {@link WebIO} instance by
 * the renderer-factory which is set up in
 * {@link WebIONotebookExtension#createNew}. The {@link WebIO} instance is also
 * managed by a {@link WebIONotebookManager} but that is handles outside of this
 * class (_i.e._ this class just gets a WebIO instance which may or may not be
 * connected to the Julia kernel yet).
 */
var WebIORenderer = /** @class */ (function (_super) {
    __extends(WebIORenderer, _super);
    function WebIORenderer(options, webIOManager) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.webIOManager = webIOManager;
        log("WebIORenderer\u00ACconstructor", options, webIOManager);
        return _this;
    }
    Object.defineProperty(WebIORenderer.prototype, "webIO", {
        get: function () {
            return this.webIOManager.webIO;
        },
        enumerable: true,
        configurable: true
    });
    WebIORenderer.prototype.renderModel = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var kernelId, currentKernelId, div, p, strong;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.warn("Setting window.lastWebIORenderer");
                        kernelId = this.getModelMetadata(model).kernelId;
                        if (!kernelId) {
                            return [2 /*return*/, this.setModelMetadata(model)];
                        }
                        return [4 /*yield*/, this.webIOManager.getKernel()];
                    case 1:
                        currentKernelId = (_a.sent()).id;
                        if (kernelId !== currentKernelId) {
                            log("WebIORenderer\u00ACrenderModel: output was generate for kernelId \"" + kernelId + "\", "
                                + ("but we're currently running using kernel \"" + currentKernelId + "\"."));
                            div = document.createElement("div");
                            p = document.createElement("p");
                            strong = document.createElement("strong");
                            strong.innerText = WEBIO_OLD_KERNEL_MESSAGE;
                            p.appendChild(strong);
                            div.appendChild(p);
                            this.node.appendChild(div);
                            return [2 /*return*/];
                        }
                        window.lastWebIORenderer = this;
                        this.lastModel = model;
                        log("WebIORenderer\u00ACrenderModel", model.data[MIME_TYPE]);
                        this.webIO.mount(this.node, model.data[MIME_TYPE]);
                        return [2 /*return*/];
                }
            });
        });
    };
    WebIORenderer.prototype.getModelMetadata = function (model) {
        return (model.metadata[WEBIO_METADATA_KEY] || {});
    };
    WebIORenderer.prototype.setModelMetadata = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _c = (_b = model).setData;
                        _d = {};
                        _e = [{}, model.metadata];
                        _a = {};
                        _f = WEBIO_METADATA_KEY;
                        _g = {};
                        return [4 /*yield*/, this.webIOManager.getKernel()];
                    case 1:
                        _c.apply(_b, [(_d.metadata = __assign.apply(void 0, _e.concat([(_a[_f] = (_g.kernelId = (_h.sent()).id,
                                    _g), _a)])),
                                _d)]);
                        return [2 /*return*/];
                }
            });
        });
    };
    return WebIORenderer;
}(Panel));
/**
 * A manager that is responsible for maintaining the WebIO instance for a single
 * notebook panel.
 *
 * An instance of this class exists for every notebook open in the JupyterLab
 * session (i.e. for every notebook tab).
 *
 * This class is necessary to facilitate lazy-initialization. We could just
 * create a new {@link WebIO} instance in {@link WebIONotebookExtension#createNew}
 * but we won't be sure that WebIO has been loaded on the kernel side yet (i.e.
 * we try to open the comm before `using WebIO` has been executed); even if
 * WebIO is initialized on the kernel later, the comm will never connect.
 */
var WebIONotebookManager = /** @class */ (function () {
    function WebIONotebookManager(notebook, context) {
        this.notebook = notebook;
        this.context = context;
        this._webIO = new WebIO();
        window.webIONotebookManager = this;
        log("WebIONotebookManager\u00ACconstructor");
    }
    Object.defineProperty(WebIONotebookManager.prototype, "webIO", {
        /**
         * We lazy-connect WebIO. This ensures that we don't try to connect to WebIO
         * before the kernel is ready.
         *
         * IMPORTANT: This also depends upon how the WebIORenderer won't try to render
         * WebIO nodes that were created for a different kernel; because we know that
         * the node was generated using the current kernel, we're sure that it's ready
         * for comm connections (since it's already been answering code execution
         * requests).
         */
        get: function () {
            this.connect();
            return this._webIO;
        },
        enumerable: true,
        configurable: true
    });
    WebIONotebookManager.prototype.getKernel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var kernel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Make sure the kernel is ready before we try to connect to it.
                    return [4 /*yield*/, this.context.session.ready];
                    case 1:
                        // Make sure the kernel is ready before we try to connect to it.
                        _a.sent();
                        kernel = this.context.session.kernel;
                        if (!kernel) {
                            throw new Error("Session is ready but kernel isn't available!");
                        }
                        return [4 /*yield*/, kernel.ready];
                    case 2:
                        _a.sent();
                        log("WebIONotebookManager\u00ACconnect: Notebook kernel is ready; status is " + kernel.status + ".");
                        return [2 /*return*/, kernel];
                }
            });
        });
    };
    /**
     * Connect to the Julia side of WebIO using a comm.
     *
     * This function is idempotent (_i.e._ calling it multiple times shouldn't
     * result on an error and it should only connect on the first call).
     */
    WebIONotebookManager.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var kernel, _a, lastKernelId, lastCommId, shouldReuseCommId;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log("WebIONotebookManager¬connect");
                        return [4 /*yield*/, this.getKernel()];
                    case 1:
                        kernel = _b.sent();
                        // It's important that everything below this is synchronous to avoid race
                        // conditions.
                        if (this.comm) {
                            log("WebIONotebookManager¬connect: WebIO is already connected.");
                            return [2 /*return*/];
                        }
                        _a = this.getWebIOMetadata(), lastKernelId = _a.lastKernelId, lastCommId = _a.lastCommId;
                        shouldReuseCommId = (
                        // To re-use the comm id, we need to be using the same kernel.
                        lastKernelId === kernel.id
                            // We need to know what the last comm id *was*
                            && !!lastCommId);
                        log("WebIONotebookManager\u00ACconnect: Last WebIO connection was for kernelId=\"" + lastKernelId + "\", commId=\"" + lastCommId + "\".");
                        log("WebIONotebookManager\u00ACconnect: We're " + (shouldReuseCommId ? "definitely" : "not") + " re-using the old commId.");
                        this.comm = kernel.connectToComm(COMM_TARGET, shouldReuseCommId ? lastCommId : undefined);
                        this.comm.open();
                        this._webIO.setSendCallback(function (msg) { return _this.comm.send(msg); });
                        this.comm.onMsg = function (msg) {
                            log("Received WebIO comm message:", msg);
                            _this._webIO.dispatch(msg.content.data);
                        };
                        this.setWebIOMetadata(kernel.id, this.comm.commId);
                        return [2 /*return*/];
                }
            });
        });
    };
    WebIONotebookManager.prototype.getWebIOMetadata = function () {
        return (this.notebook.model.metadata.get(WEBIO_METADATA_KEY) || {});
    };
    WebIONotebookManager.prototype.setWebIOMetadata = function (kernelId, commId) {
        var metadata = {
            lastKernelId: kernelId,
            lastCommId: commId,
        };
        log("Setting WebIO notebook metadata.", metadata);
        this.notebook.model.metadata.set(WEBIO_METADATA_KEY, metadata);
    };
    return WebIONotebookManager;
}());
/**
 * The JupyterLab WebIO notebook extension.
 *
 * Essentially, every time a new {@link NotebookPanel} instance is created
 * (_i.e._ when a new notebook tab is opened), JupyterLab will call the
 * {@link WebIONotebookExtension#createNew} method which creates a new
 * {@link WebIO} instance (specific to the new notebook) and hooks up the
 * {@link WebIORenderer} using this notebook-specific instance of {@link WebIO}.
 */
var WebIONotebookExtension = /** @class */ (function () {
    function WebIONotebookExtension() {
    }
    WebIONotebookExtension.prototype.createNew = function (notebook, context) {
        log("WebIONotebookExtension\u00ACcreateNew", notebook, context);
        var webIONotebookManager = new WebIONotebookManager(notebook, context);
        notebook.rendermime.addFactory({
            safe: false,
            mimeTypes: [MIME_TYPE],
            createRenderer: function (options) {
                webIONotebookManager.connect();
                return new WebIORenderer(options, webIONotebookManager);
            },
        }, RENDERER_RANK);
        return new DisposableDelegate(function () {
            notebook.rendermime.removeMimeType(MIME_TYPE);
        });
    };
    return WebIONotebookExtension;
}());
var extension = {
    id: "@webio/jupyter-lab-provider:plugin",
    activate: function (app) {
        log("Activating WebIO JupyterLab plugin.");
        app.docRegistry.addWidgetExtension("Notebook", new WebIONotebookExtension());
    },
    autoStart: true,
};
export default extension;
