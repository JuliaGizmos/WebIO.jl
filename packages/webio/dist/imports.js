"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var systemjs_1 = __importDefault(require("systemjs"));
var debug_1 = __importDefault(require("debug"));
var debug = debug_1.default("WebIO:imports");
var URL_PROTOCOL_REGEX = /[A-Za-z]+:\/\//;
var isRelativeUrl = function (url) {
    return !(URL_PROTOCOL_REGEX.test(url) || url.startsWith("//"));
};
var _lastImportNumber = 0;
var uniqueImportName = function () { return "import_" + (_lastImportNumber += 1); };
exports.importJSUrl = function (name, url) {
    var _a, _b;
    debug("Importing JavaScript resource (" + name + ") from url (" + url + ").");
    systemjs_1.default.config({
        paths: (_a = {},
            _a[name] = url,
            _a),
        meta: (_b = {},
            _b[name] = {
                authorization: isRelativeUrl(url),
            },
            _b)
    });
    return systemjs_1.default.import(url);
};
exports.importJS = function (importData) {
    debug("Importing JavaScript resource.", importData);
    var url = importData.url, blob = importData.blob;
    var name = importData.name || uniqueImportName();
    if (blob) {
        throw new Error("Importing JS blob is not yet implemented.");
    }
    else if (url) {
        return exports.importJSUrl(name, url);
    }
    else {
        throw new Error("One of blob or url must be specified in call to importJS.");
    }
};
/**
 * Import some href/url in a `<link />` tag.
 * @param url
 */
exports.importLink = function (url, options) {
    if (document.querySelector("link[data-webio-import=\"" + url + "\"]")) {
        debug("CSS resource (${url}) is already imported.");
        // This actually has a slight race condition where if the import actually
        // is still loading, we'll resolve immediately. Probably(?) not a big deal.
        return Promise.resolve();
    }
    return new Promise(function (resolve, reject) {
        var link = document.createElement("link");
        // Apply options
        var rel = options.rel, type = options.type, media = options.media;
        rel && (link.rel = rel);
        type && (link.type = type);
        media && (link.media = media);
        link.href = url;
        link.setAttribute("async", "");
        link.onload = function () { return resolve(); };
        link.onerror = function () {
            link.remove();
            reject();
        };
        document.head.appendChild(link);
    });
};
exports.importCSS = function (importData) {
    debug("Importing CSS resource.", importData);
    var url = importData.url, blob = importData.blob;
    if (url) {
        return exports.importLink(url, {
            rel: "stylesheet",
            type: "text/css",
            media: "all"
        });
    }
    else if (blob) {
        throw new Error("Imports CSS blob is not yet implemented.");
    }
    else {
        throw new Error("One of blob or url must be specified in call to importCSS.");
    }
};
exports.importSyncBlock = function (importData) { return __awaiter(_this, void 0, void 0, function () {
    var results, _i, _a, importItem, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                debug("Importing synchronous block.", importData);
                results = [];
                _i = 0, _a = importData.data;
                _d.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                importItem = _a[_i];
                _c = (_b = results).push;
                return [4 /*yield*/, exports.importResource(importItem)];
            case 2:
                _c.apply(_b, [_d.sent()]);
                _d.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, results];
        }
    });
}); };
exports.importAsyncBlock = function (importData) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        debug("Importing asynchronous block.", importData);
        return [2 /*return*/, Promise.all(importData.data.map(exports.importResource))];
    });
}); };
/**
 * Import a _thing_.
 * @param importData
 */
exports.importResource = function (importData) {
    switch (importData.type) {
        case "js" /* JS */:
            return exports.importJS(importData);
        case "css" /* CSS */:
            return exports.importCSS(importData);
        default:
            throw new Error("Importing resource of type \"" + importData.type + "\" not supported.");
    }
};
exports.importBlock = function (importData, config) {
    if (config) {
        systemjs_1.default.config(config);
    }
    switch (importData.type) {
        case "sync_block" /* SYNC_BLOCK */:
            return exports.importSyncBlock(importData);
        case "async_block" /* ASYNC_BLOCK */:
            return exports.importAsyncBlock(importData);
        default:
            throw new Error("Cannot import unknown block type: " + importData.type + ".");
    }
};
console.warn("WebIO is registering SystemJS window global.");
window.SystemJS = systemjs_1.default;
if (systemjs_1.default._nodeRequire) {
    // Fixes https://github.com/systemjs/systemjs/issues/1817
    // SystemJS basically will try to detect if it should use NodeJS's built-in
    // require to load things if it can, but because Webpack (sometimes, depending
    // on the settings/target I think?) defines `require`, SystemJS can get
    // confused. When it gets confused, it tries to use Webpack's require (which
    // then complains since the things we're trying to load dynamically weren't
    // loaded by Webpack). This is our hack to un-confuse SystemJS.
    console.warn("Monkey-patchings SystemJS._nodeRequire to undefined.");
    systemjs_1.default._nodeRequire = undefined;
}
