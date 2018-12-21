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
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var debug = debug_1.default("WebIO:IFrame");
var Node_1 = __importDefault(require("./Node"));
var setInnerHTML_1 = __importDefault(require("./setInnerHTML"));
exports.IFRAME_NODE_TYPE = "IFrame";
/**
 * A WebIO IFrame node.
 *
 * This renders WebIO content within a (mostly) isolate IFrame. Both the IFrame
 * and the parent page share the same WebIO instance.
 *
 * IMPORANT: IFrames have **huge** overhead on a browser page because they
 * require a whole new page context (it's pretty much the same as opening a
 * new tab). Using many IFrames will result in huge memory usage.
 *
 * NOTE: We don't have a good way to style IFrames such that they're exactly the
 * size of the content within them. RIP.
 */
var WebIOIFrame = /** @class */ (function (_super) {
    __extends(WebIOIFrame, _super);
    function WebIOIFrame(iframeData, options) {
        var _this = _super.call(this, iframeData, options) || this;
        _this.children = null;
        debug("Creating new WebIOIFrame.", iframeData);
        var iframe = _this.element = document.createElement("iframe");
        iframe.className = "webio-iframe";
        iframe.src = "about:blank";
        iframe.frameBorder = "0";
        iframe.scrolling = "no";
        iframe.height = "100%";
        iframe.width = "100%";
        iframe.style.display = "block";
        var innerHTML = iframeData.instanceArgs.innerHTML;
        iframe.onload = function () { return _this.initializeIFrame(innerHTML); };
        return _this;
    }
    /**
     * Initialize the IFrame after the onload event has been fired.
     * @param innerHTML
     */
    WebIOIFrame.prototype.initializeIFrame = function (innerHTML) {
        return __awaiter(this, void 0, void 0, function () {
            var iframe, iframeWindow, iframeDocument, baseTag;
            return __generator(this, function (_a) {
                iframe = this.element;
                iframeWindow = iframe.contentWindow;
                iframeDocument = iframe.contentDocument;
                // Set WebIO window global.
                iframeWindow.WebIO = this.webIO;
                baseTag = document.createElement("base");
                baseTag.href = document.baseURI;
                iframeDocument.head.appendChild(baseTag);
                // Apply some styling.
                // It seems that there's not an easy way to get the iframe to have the
                // "correct" size (i.e. exactly the size of its contents, as if it were
                // just a normal <div> element). This currently doesn't really work.
                iframeDocument.body.style.cssText = "\n      margin: 0;\n      padding: 0;\n      height: 100%;\n    ";
                // Set inner html of body.
                setInnerHTML_1.default(iframeDocument.body, innerHTML);
                return [2 /*return*/];
            });
        });
    };
    return WebIOIFrame;
}(Node_1.default));
exports.default = WebIOIFrame;
