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
    function WebIORenderer(options, webIO) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.webIO = webIO;
        log("WebIORenderer\u00ACconstructor", options, webIO);
        return _this;
    }
    WebIORenderer.prototype.renderModel = function (model) {
        log("WebIORenderer\u00ACrenderModel", model.data[MIME_TYPE]);
        this.webIO.mount(this.node, model.data[MIME_TYPE]);
        return Promise.resolve();
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
        this.webIO = new WebIO();
        log("WebIONotebookManager\u00ACconstructor");
    }
    /**
     * Connect to the Julia side of WebIO using a comm.
     *
     * This function is idempotent (_i.e._ calling it multiple times shouldn't
     * result on an error and it should only connect on the first call).
     */
    WebIONotebookManager.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var kernel;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log("WebIONotebookManager¬connect");
                        // Make sure the kernel is ready before we try to connect to it.
                        return [4 /*yield*/, this.context.session.ready];
                    case 1:
                        // Make sure the kernel is ready before we try to connect to it.
                        _a.sent();
                        log("WebIONotebookManager¬connect: Notebook session is ready.");
                        // It's important that everything below this is synchronous to avoid race
                        // conditions.
                        if (this.comm) {
                            log("WebIONotebookManager¬connect: WebIO is already connected.");
                            return [2 /*return*/];
                        }
                        kernel = this.context.session.kernel;
                        if (!kernel) {
                            // Shouldn't happen, but TypeScript complains if we don't do this check.
                            throw new Error("Kernel is not available!");
                        }
                        this.comm = kernel.connectToComm(COMM_TARGET);
                        this.comm.open();
                        this.webIO.setSendCallback(function (msg) { return _this.comm.send(msg); });
                        this.comm.onMsg = function (msg) {
                            log("Received WebIO comm message:", msg);
                            _this.webIO.dispatch(msg.content.data);
                        };
                        return [2 /*return*/];
                }
            });
        });
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
                return new WebIORenderer(options, webIONotebookManager.webIO);
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
