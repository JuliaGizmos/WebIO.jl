/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var is_array = __webpack_require__(11)
var arrays_equal = __webpack_require__(10)

function arrays_and_equal(arr1, arr2){
    return is_array(arr1) && is_array(arr2) && arrays_equal(arr1, arr2)
}

function makeScope(id, data, sendCallback, dom, handlers, observables)
{
    var scope = {
        type: "scope",
        id: id,
        data: data,
        sendCallback: sendCallback,
        dom: dom,
        handlers: handlers || {},
        observables: observables || {},
        promises: {}
    }

    if (typeof WebIO.scopes[id] !== "undefined") {
        console.warn("A scope with id '"+id+"' already exists.")
    }
    WebIO.scopes[id] = scope;
    if (observables){
        Object.keys(observables).forEach(function setobsscope(name) {
            var o = observables[name]
            if (typeof WebIO.obsscopes[o.id] === "undefined"){
                WebIO.obsscopes[o.id] = []
            }
            //obname is the name of the observable in this scope
            WebIO.obsscopes[o.id].push({scope: scope, obname: name})
        })
    }

    return scope;
}


function createNode(scope, data, parentNode)
{
    var nodeType = data.nodeType;
    return WebIO.NodeTypes[nodeType]
           .create(scope, data, parentNode)
}

function getHandlers(scope, cmd)
{
    var fs = scope.handlers[cmd];
    if (typeof fs !== "undefined") {
        return fs;
    }
    var parts = cmd.split('.');
    var inherit = WebIO.CommandSets;
    if (inherit && inherit[parts[0]]) {
        fs = inherit[parts[0]][parts[1]]
        if (typeof fs !== "undefined") {
            return [fs];
        }
    }
    return [function () {
        console.error("Invalid command ", cmd, "received for scope", scope)
    }]
}


function dispatch(msg)
{
    if (msg.type != "command") {
        console.warn("invalid message received", msg)
    } else {
        var scope = WebIO.scopes[msg.scope];
        var fs = getHandlers(scope, msg.command);
        for (var i=0, l=fs.length; i<l; i++) {
            var f = fs[i]
            f.call(scope, msg.data, false) // false for "not client-side"
        }
    }
}

function mount(target, data)
{
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }

    var opts = {sendCallback: WebIO.sendCallback}
    var node = createNode(opts, data, target);

    target.parentNode.replaceChild(node, target)

    return node
}

function send(scope, cmd, data)
{
    WebIO.sendCallback(message(scope, cmd, data));
}

function setval(ob, val, sync) {
    if (typeof sync == "undefined") {
        sync = true // compat
    }

    var allscopes = WebIO.obsscopes[ob.id] // all scopes this observable appears in
    var synced_julia = false               // have we synced with Julia yet?

    allscopes.forEach(function (oscopeinfo) {
        var scope = oscopeinfo.scope
        var name = oscopeinfo.obname // the name of the observable in oscope
        var observable = scope.observables[name]

        observable.value = val

        // fire any handlers for the given observable in this scope
        if (typeof scope.handlers[name] !== "undefined") {
            var fs = scope.handlers[name];
            for (var i=0, l=fs.length; i<l; i++) {
                var f = fs[i]
                f.call(scope, val, true) // true for "client-side"
            }
        }

        // sync the observable's value to julia if `sync` is true in any scope
        if (sync && observable.sync && !synced_julia) {
            WebIO.send(scope, name, val);
            synced_julia = true
        }
    })
}

function getval(ob) {
    var scope = WebIO.scopes[ob.scope]
    // NOTE: there maybe many scopes this observable is associated with
    // (as stored in obsscopes) but we assume all of them have the same value
    // this is an invariant that should be maintained by `setval`
    return scope.observables[ob.name].value
}

function message(scope, cmd, data)
{
    return {
        type: "message",
        scope: scope.id,
        command: cmd,
        data: data
    }
}

var connected_callbacks=[];
function onConnected(f) {
    if (WebIO._connected) {
        setTimeout(f, 0);
    } else {
        connected_callbacks[connected_callbacks.length]=f;
    }
}

function triggerConnected() {
    for (var i=0,l=connected_callbacks.length; i<l; i++) {
        connected_callbacks[i]()
    }
    WebIO._connected=true;
}

function sendNotSetUp()
{
    console.error("WebIO.sendCallback not set up")
}

//unescape closing script tags which cause problems in html documents
function unencode_scripts(htmlstr){
    if (typeof htmlstr !== "string") return htmlstr;
    return htmlstr.replace(new RegExp("</_script>", "g"), "</scr"+"ipt>")
}

// Add an html string as the contents of an element
// and ensure any scripts get run. Adding with innerHTML
// doesn't run scripts. Ref: https://stackoverflow.com/a/42628703
function setInnerHtml(elm, html) {
  // TODO fix indentation for this function
  html = unencode_scripts(html)
  elm.innerHTML = html;
  var scripts = elm.getElementsByTagName("script");
  // If we don't clone the results then "scripts"
  // will actually update live as we insert the new
  // tags, and we'll get caught in an endless loop
  var scriptsClone = [];
  for (var i = 0; i < scripts.length; i++) {
    scriptsClone.push(scripts[i]);
  }
  for (var i = 0; i < scriptsClone.length; i++) {
    var currentScript = scriptsClone[i];
    var s = document.createElement("script");
    // Copy all the attributes from the original script
    for (var j = 0; j < currentScript.attributes.length; j++) {
      var a = currentScript.attributes[j];
      s.setAttribute(a.name, a.value);
    }
    s.appendChild(document.createTextNode(currentScript.innerHTML));
    currentScript.parentNode.replaceChild(s, currentScript);
  }
}

var WebIO = {
    type: "WebIO",

    // For Base.show or a package to print an element.
    mount: mount,

    // Create Scope - for use by NodeTypes
    makeScope: makeScope,

    // createNode
    createNode: createNode,

    // For Providers to call when messages are received from Julia
    dispatch: dispatch,

    // Send a message back to the Scope on Julia
    send: send,

    // A variant of send which sets the value of an observable
    setval: setval,

    // Get the current value of an observable
    getval: getval,

    // given by Provider, to be called when JS needs to send a message to Julia
    sendCallback: sendNotSetUp,

    triggerConnected: triggerConnected,

    onConnected: onConnected,

    propUtils: {
        setInnerHtml: setInnerHtml
    },
    scopes: {},
    obsscopes: {}
};

if (window) {
    window.WebIO = WebIO;
}
module.exports = WebIO


/***/ }),
/* 2 */
/***/ (function(module, exports) {



/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(6)
var ieee754 = __webpack_require__(5)
var isArray = __webpack_require__(4)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, process, global, __filename) {var require;/*
 * SystemJS v0.21.0 Dev
 */
!function(){"use strict";function e(e){return rt?Symbol():"@@"+e}function t(e,t){Qe||(t=t.replace(et?/file:\/\/\//g:/file:\/\//g,""));var r,n=(e.message||e)+"\n  "+t;r=it&&e.fileName?new Error(n,e.fileName,e.lineNumber):new Error(n);var o=e.originalErr?e.originalErr.stack:e.stack;return r.stack=Ve?n+"\n  "+o:o,r.originalErr=e.originalErr||e,r}function r(e,t){throw new RangeError('Unable to resolve "'+e+'" to '+t)}function n(e,t){e=e.trim();var n=t&&t.substr(0,t.indexOf(":")+1),o=e[0],i=e[1];if("/"===o&&"/"===i)return n||r(e,t),n+e;if("."===o&&("/"===i||"."===i&&("/"===e[2]||2===e.length&&(e+="/"))||1===e.length&&(e+="/"))||"/"===o){var a,s=!n||"/"!==t[n.length];if(s?(void 0===t&&r(e,t),a=t):a="/"===t[n.length+1]?"file:"!==n?(a=t.substr(n.length+2)).substr(a.indexOf("/")+1):t.substr(8):t.substr(n.length+1),"/"===o){if(!s)return t.substr(0,t.length-a.length-1)+e;r(e,t)}for(var u=a.substr(0,a.lastIndexOf("/")+1)+e,l=[],c=-1,f=0;f<u.length;f++)if(-1===c)if("."!==u[f])c=f;else{if("."!==u[f+1]||"/"!==u[f+2]&&f+2!==u.length){if("/"!==u[f+1]&&f+1!==u.length){c=f;continue}f+=1}else l.pop(),f+=2;s&&0===l.length&&r(e,t)}else"/"===u[f]&&(l.push(u.substring(c,f+1)),c=-1);return-1!==c&&l.push(u.substr(c)),t.substr(0,t.length-a.length)+l.join("")}return-1!==e.indexOf(":")?Ve&&":"===e[1]&&"\\"===e[2]&&e[0].match(/[a-z]/i)?"file:///"+e.replace(/\\/g,"/"):e:void 0}function o(e){if(e.values)return e.values();if("undefined"==typeof Symbol||!Symbol.iterator)throw new Error("Symbol.iterator not supported in this browser");var t={};return t[Symbol.iterator]=function(){var t=Object.keys(e),r=0;return{next:function(){return r<t.length?{value:e[t[r++]],done:!1}:{value:void 0,done:!0}}}},t}function i(){this.registry=new u}function a(e){if(!(e instanceof l))throw new TypeError("Module instantiation did not return a valid namespace object.");return e}function s(e){if(void 0===e)throw new RangeError("No resolution found.");return e}function u(){this[ct]={}}function l(e){Object.defineProperty(this,ft,{value:e}),Object.keys(e).forEach(c,this)}function c(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[ft][e]}})}function f(){i.call(this);var e=this.registry.delete;this.registry.delete=function(r){var n=e.call(this,r);return t.hasOwnProperty(r)&&!t[r].linkRecord&&(delete t[r],n=!0),n};var t={};this[dt]={lastRegister:void 0,records:t},this.trace=!1}function d(e,t,r){return e.records[t]={key:t,registration:r,module:void 0,importerSetters:void 0,loadError:void 0,evalError:void 0,linkRecord:{instantiatePromise:void 0,dependencies:void 0,execute:void 0,executingRequire:!1,moduleObj:void 0,setters:void 0,depsInstantiatePromise:void 0,dependencyInstantiations:void 0}}}function p(e,t,r,n,o){var i=n[t];if(i)return Promise.resolve(i);var a=o.records[t];return a&&!a.module?a.loadError?Promise.reject(a.loadError):h(e,a,a.linkRecord,n,o):e.resolve(t,r).then(function(t){if(i=n[t])return i;if((a=o.records[t])&&!a.module||(a=d(o,t,a&&a.registration)),a.loadError)return Promise.reject(a.loadError);var r=a.linkRecord;return r?h(e,a,r,n,o):a})}function g(e,t,r){return function(){var e=r.lastRegister;return e?(r.lastRegister=void 0,t.registration=e,!0):!!t.registration}}function h(e,r,n,o,i){return n.instantiatePromise||(n.instantiatePromise=(r.registration?Promise.resolve():Promise.resolve().then(function(){return i.lastRegister=void 0,e[pt](r.key,e[pt].length>1&&g(e,r,i))})).then(function(t){if(void 0!==t){if(!(t instanceof l))throw new TypeError("Instantiate did not return a valid Module object.");return delete i.records[r.key],e.trace&&v(e,r,n),o[r.key]=t}var a=r.registration;if(r.registration=void 0,!a)throw new TypeError("Module instantiation did not call an anonymous or correctly named System.register.");return n.dependencies=a[0],r.importerSetters=[],n.moduleObj={},a[2]?(n.moduleObj.default=n.moduleObj.__useDefault={},n.executingRequire=a[1],n.execute=a[2]):y(e,r,n,a[1]),r}).catch(function(e){throw r.linkRecord=void 0,r.loadError=r.loadError||t(e,"Instantiating "+r.key)}))}function m(e,t,r,n,o,i){return e.resolve(t,r).then(function(r){i&&(i[t]=r);var a=o.records[r],s=n[r];if(s&&(!a||a.module&&s!==a.module))return s;if(a&&a.loadError)throw a.loadError;(!a||!s&&a.module)&&(a=d(o,r,a&&a.registration));var u=a.linkRecord;return u?h(e,a,u,n,o):a})}function v(e,t,r){e.loads=e.loads||{},e.loads[t.key]={key:t.key,deps:r.dependencies,dynamicDeps:[],depMap:r.depMap||{}}}function y(e,t,r,n){var o=r.moduleObj,i=t.importerSetters,a=!1,s=n.call(tt,function(e,t){if("object"==typeof e){var r=!1;for(var n in e)t=e[n],"__useDefault"===n||n in o&&o[n]===t||(r=!0,o[n]=t);if(!1===r)return t}else{if((a||e in o)&&o[e]===t)return t;o[e]=t}for(var s=0;s<i.length;s++)i[s](o);return t},new x(e,t.key));r.setters=s.setters,r.execute=s.execute,s.exports&&(r.moduleObj=o=s.exports,a=!0)}function b(e,r,n,o,i){if(n.depsInstantiatePromise)return n.depsInstantiatePromise;for(var a=Array(n.dependencies.length),s=0;s<n.dependencies.length;s++)a[s]=m(e,n.dependencies[s],r.key,o,i,e.trace&&n.depMap||(n.depMap={}));var u=Promise.all(a).then(function(e){if(n.dependencyInstantiations=e,n.setters)for(var t=0;t<e.length;t++){var o=n.setters[t];if(o){var i=e[t];if(i instanceof l)o(i);else{if(i.loadError)throw i.loadError;o(i.module||i.linkRecord.moduleObj),i.importerSetters&&i.importerSetters.push(o)}}}return r});return e.trace&&(u=u.then(function(){return v(e,r,n),r})),(u=u.catch(function(e){throw n.depsInstantiatePromise=void 0,t(e,"Loading "+r.key)})).catch(function(){}),n.depsInstantiatePromise=u}function w(e,t,r,n,o){return new Promise(function(r,i){function a(t){var r=t.linkRecord;r&&-1===u.indexOf(t)&&(u.push(t),c++,b(e,t,r,n,o).then(s,i))}function s(e){c--;var t=e.linkRecord;if(t)for(var n=0;n<t.dependencies.length;n++){var o=t.dependencyInstantiations[n];o instanceof l||a(o)}0===c&&r()}var u=[],c=0;a(t)})}function x(e,t){this.loader=e,this.key=this.id=t,this.meta={url:t}}function k(e,t,r,n,o,i){if(t.module)return t.module;if(t.evalError)throw t.evalError;if(i&&-1!==i.indexOf(t))return t.linkRecord.moduleObj;var a=O(e,t,r,n,o,r.setters?[]:i||[]);if(a)throw a;return t.module}function E(e,t,r,n,o,i,a){return function(s){for(var u=0;u<r.length;u++)if(r[u]===s){var c,f=n[u];return"__useDefault"in(c=f instanceof l?f:k(e,f,f.linkRecord,o,i,a))?c.__useDefault:c}throw new Error("Module "+s+" not declared as a System.registerDynamic dependency of "+t)}}function O(e,r,n,o,i,a){a.push(r);var s;if(n.setters)for(var u,c,f=0;f<n.dependencies.length;f++)if(!((u=n.dependencyInstantiations[f])instanceof l)&&((c=u.linkRecord)&&-1===a.indexOf(u)&&(s=u.evalError?u.evalError:O(e,u,c,o,i,c.setters?a:[])),s))return r.linkRecord=void 0,r.evalError=t(s,"Evaluating "+r.key),r.evalError;if(n.execute)if(n.setters)s=S(n.execute);else{var d={id:r.key},p=n.moduleObj;Object.defineProperty(d,"exports",{configurable:!0,set:function(e){p.default=p.__useDefault=e},get:function(){return p.__useDefault}});var g=E(e,r.key,n.dependencies,n.dependencyInstantiations,o,i,a);if(!n.executingRequire)for(f=0;f<n.dependencies.length;f++)g(n.dependencies[f]);s=j(n.execute,g,p.default,d),d.exports!==p.__useDefault&&(p.default=p.__useDefault=d.exports);var h=p.default;if(h&&h.__esModule)for(var m in h)Object.hasOwnProperty.call(h,m)&&(p[m]=h[m])}if(r.linkRecord=void 0,s)return r.evalError=t(s,"Evaluating "+r.key);if(o[r.key]=r.module=new l(n.moduleObj),!n.setters){if(r.importerSetters)for(f=0;f<r.importerSetters.length;f++)r.importerSetters[f](r.module);r.importerSetters=void 0}}function S(e){try{e.call(gt)}catch(e){return e}}function j(e,t,r,n){try{var o=e.call(tt,t,r,n);void 0!==o&&(n.exports=o)}catch(e){return e}}function _(){}function P(e){return e instanceof l?e:new l(e&&e.__esModule?e:{default:e,__useDefault:e})}function M(e,t){(t||this.warnings&&"undefined"!=typeof console&&console.warn)&&console.warn(e)}function R(e,t,r){var n=new Uint8Array(t);return 0===n[0]&&97===n[1]&&115===n[2]?WebAssembly.compile(t).then(function(t){var n=[],o=[],i={};return WebAssembly.Module.imports&&WebAssembly.Module.imports(t).forEach(function(e){var t=e.module;o.push(function(e){i[t]=e}),-1===n.indexOf(t)&&n.push(t)}),e.register(n,function(e){return{setters:o,execute:function(){e(new WebAssembly.Instance(t,i).exports)}}}),r(),!0}):Promise.resolve(!1)}function C(e,t){if("."===e[0])throw new Error("Node module "+e+" can't be loaded as it is not a package require.");if(!mt){var r=this._nodeRequire("module"),n=decodeURI(t.substr(et?8:7));(mt=new r(n)).paths=r._nodeModulePaths(n)}return mt.require(e)}function L(e,t){for(var r in t)Object.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}function A(e,t){for(var r in t)Object.hasOwnProperty.call(t,r)&&void 0===e[r]&&(e[r]=t[r]);return e}function I(e,t,r){for(var n in t)if(Object.hasOwnProperty.call(t,n)){var o=t[n];void 0===e[n]?e[n]=o:o instanceof Array&&e[n]instanceof Array?e[n]=[].concat(r?o:e[n]).concat(r?e[n]:o):"object"==typeof o&&null!==o&&"object"==typeof e[n]?e[n]=(r?A:L)(L({},e[n]),o):r||(e[n]=o)}}function F(e){if(kt||Et){var t=document.createElement("link");kt?(t.rel="preload",t.as="script"):t.rel="prefetch",t.href=e,document.head.appendChild(t)}else(new Image).src=e}function K(e,t,r){try{importScripts(e)}catch(e){r(e)}t()}function D(e,t,r,n,o){function i(){n(),s()}function a(t){s(),o(new Error("Fetching "+e))}function s(){u.removeEventListener("load",i,!1),u.removeEventListener("error",a,!1),document.head.removeChild(u)}if(e=e.replace(/#/g,"%23"),xt)return K(e,n,o);var u=document.createElement("script");u.type="text/javascript",u.charset="utf-8",u.async=!0,t&&(u.crossOrigin=t),r&&(u.integrity=r),u.addEventListener("load",i,!1),u.addEventListener("error",a,!1),u.src=e,document.head.appendChild(u)}function U(e,t){for(var r=e.split(".");r.length;)t=t[r.shift()];return t}function q(e,t,r){var o=z(t,r);if(o){var i=t[o]+r.substr(o.length),a=n(i,Ye);return void 0!==a?a:e+i}return-1!==r.indexOf(":")?r:e+r}function T(e){var t=this.name;if(t.substr(0,e.length)===e&&(t.length===e.length||"/"===t[e.length]||"/"===e[e.length-1]||":"===e[e.length-1])){var r=e.split("/").length;r>this.len&&(this.match=e,this.len=r)}}function z(e,t){if(Object.hasOwnProperty.call(e,t))return t;var r={name:t,match:void 0,len:0};return Object.keys(e).forEach(T,r),r.match}function N(e,t,r,n){return new Promise(function(r,o){function i(){r(n?s.response:s.responseText)}function a(){o(new Error("XHR error: "+(s.status?" ("+s.status+(s.statusText?" "+s.statusText:"")+")":"")+" loading "+e))}e=e.replace(/#/g,"%23");var s=new XMLHttpRequest;n&&(s.responseType="arraybuffer"),s.onreadystatechange=function(){4===s.readyState&&(0==s.status?s.response?i():(s.addEventListener("error",a),s.addEventListener("load",i)):200===s.status?i():a())},s.open("GET",e,!0),s.setRequestHeader&&(s.setRequestHeader("Accept","application/x-es-module, */*"),t&&("string"==typeof t&&s.setRequestHeader("Authorization",t),s.withCredentials=!0)),s.send(null)})}function J(){return{pluginKey:void 0,pluginArgument:void 0,pluginModule:void 0,packageKey:void 0,packageConfig:void 0,load:void 0}}function $(e,t,r){var n=J();if(r){var o;t.pluginFirst?-1!==(o=r.lastIndexOf("!"))&&(n.pluginArgument=n.pluginKey=r.substr(0,o)):-1!==(o=r.indexOf("!"))&&(n.pluginArgument=n.pluginKey=r.substr(o+1)),n.packageKey=z(t.packages,r),n.packageKey&&(n.packageConfig=t.packages[n.packageKey])}return n}function B(e,t){var r=Q(e.pluginFirst,t);if(r){var n=B.call(this,e,r.plugin);return V(e.pluginFirst,G.call(this,e,r.argument,void 0,!1,!1),n)}return G.call(this,e,t,void 0,!1,!1)}function W(e,t){var r=this[bt],n=J(),o=o||$(this,r,t),i=Q(r.pluginFirst,e);return i?(n.pluginKey=W.call(this,i.plugin,t),V(r.pluginFirst,H.call(this,r,i.argument,o.pluginArgument||t,n,o,!!n.pluginKey),n.pluginKey)):H.call(this,r,e,o.pluginArgument||t,n,o,!!n.pluginKey)}function G(e,t,r,o,i){var a=n(t,r||Ye);if(a)return q(e.baseURL,e.paths,a);if(o){var s=z(e.map,t);if(s&&(t=e.map[s]+t.substr(s.length),a=n(t,Ye)))return q(e.baseURL,e.paths,a)}if(this.registry.has(t))return t;if("@node/"===t.substr(0,6))return t;var u=i&&"/"!==t[t.length-1],l=q(e.baseURL,e.paths,u?t+"/":t);return u?l.substr(0,l.length-1):l}function H(e,t,r,n,o,i){if(o&&o.packageConfig&&"."!==t[0]){var a=o.packageConfig.map,s=a&&z(a,t);if(s&&"string"==typeof a[s]){var u=ne(this,e,o.packageConfig,o.packageKey,s,t,n,i);if(u)return u}}var l=G.call(this,e,t,r,!0,!0),c=se(e,l);if(n.packageKey=c&&c.packageKey||z(e.packages,l),!n.packageKey)return l;if(-1!==e.packageConfigKeys.indexOf(l))return n.packageKey=void 0,l;n.packageConfig=e.packages[n.packageKey]||(e.packages[n.packageKey]=me());var f=l.substr(n.packageKey.length+1);return te(this,e,n.packageConfig,n.packageKey,f,n,i)}function Z(e,t,r,n,o,i){var a=this;return vt.then(function(){if(o&&o.packageConfig&&"./"!==t.substr(0,2)){var r=o.packageConfig.map,s=r&&z(r,t);if(s)return ie(a,e,o.packageConfig,o.packageKey,s,t,n,i)}return vt}).then(function(o){if(o)return o;var s=G.call(a,e,t,r,!0,!0),u=se(e,s);return n.packageKey=u&&u.packageKey||z(e.packages,s),n.packageKey?-1!==e.packageConfigKeys.indexOf(s)?(n.packageKey=void 0,n.load=X(),n.load.format="json",n.load.loader="",Promise.resolve(s)):(n.packageConfig=e.packages[n.packageKey]||(e.packages[n.packageKey]=me()),(u&&!n.packageConfig.configured?ue(a,e,u.configPath,n):vt).then(function(){var t=s.substr(n.packageKey.length+1);return oe(a,e,n.packageConfig,n.packageKey,t,n,i)})):Promise.resolve(s)})}function X(){return{extension:"",deps:void 0,format:void 0,loader:void 0,scriptLoad:void 0,globals:void 0,nonce:void 0,integrity:void 0,sourceMap:void 0,exports:void 0,encapsulateGlobal:!1,crossOrigin:void 0,cjsRequireDetection:!0,cjsDeferDepsExecute:!1,esModule:!1}}function Y(e,t,r){r.load=r.load||X();var n,o=0;for(var i in e.meta)if(-1!==(n=i.indexOf("*"))&&i.substr(0,n)===t.substr(0,n)&&i.substr(n+1)===t.substr(t.length-i.length+n+1)){var a=i.split("/").length;a>o&&(o=a),I(r.load,e.meta[i],o!==a)}if(e.meta[t]&&I(r.load,e.meta[t],!1),r.packageKey){var s=t.substr(r.packageKey.length+1),u={};if(r.packageConfig.meta){o=0;le(r.packageConfig.meta,s,function(e,t,r){r>o&&(o=r),I(u,t,r&&o>r)}),I(r.load,u,!1)}!r.packageConfig.format||r.pluginKey||r.load.loader||(r.load.format=r.load.format||r.packageConfig.format)}}function Q(e,t){var r,n,o=e?t.indexOf("!"):t.lastIndexOf("!");if(-1!==o)return e?(r=t.substr(o+1),n=t.substr(0,o)):(r=t.substr(0,o),n=t.substr(o+1)||r.substr(r.lastIndexOf(".")+1)),{argument:r,plugin:n}}function V(e,t,r){return e?r+"!"+t:t+"!"+r}function ee(e,t,r,n,o){if(!n||!t.defaultExtension||"/"===n[n.length-1]||o)return n;var i=!1;if(t.meta&&le(t.meta,n,function(e,t,r){if(0===r||e.lastIndexOf("*")!==e.length-1)return i=!0}),!i&&e.meta&&le(e.meta,r+"/"+n,function(e,t,r){if(0===r||e.lastIndexOf("*")!==e.length-1)return i=!0}),i)return n;var a="."+t.defaultExtension;return n.substr(n.length-a.length)!==a?n+a:n}function te(e,t,r,n,o,i,a){if(!o){if(!r.main)return n;o="./"===r.main.substr(0,2)?r.main.substr(2):r.main}if(r.map){var s="./"+o,u=z(r.map,s);if(u||(s="./"+ee(t,r,n,o,a))!=="./"+o&&(u=z(r.map,s)),u){var l=ne(e,t,r,n,u,s,i,a);if(l)return l}}return n+"/"+ee(t,r,n,o,a)}function re(e,t,r){return!(t.substr(0,e.length)===e&&r.length>e.length)}function ne(e,t,r,n,o,i,a,s){"/"===i[i.length-1]&&(i=i.substr(0,i.length-1));var u=r.map[o];if("object"==typeof u)throw new Error("Synchronous conditional normalization not supported sync normalizing "+o+" in "+n);if(re(o,u,i)&&"string"==typeof u)return H.call(e,t,u+i.substr(o.length),n+"/",a,a,s)}function oe(e,t,r,n,o,i,a){if(!o){if(!r.main)return Promise.resolve(n);o="./"===r.main.substr(0,2)?r.main.substr(2):r.main}var s,u;return r.map&&(s="./"+o,(u=z(r.map,s))||(s="./"+ee(t,r,n,o,a))!=="./"+o&&(u=z(r.map,s))),(u?ie(e,t,r,n,u,s,i,a):vt).then(function(e){return e?Promise.resolve(e):Promise.resolve(n+"/"+ee(t,r,n,o,a))})}function ie(e,t,r,n,o,i,a,s){"/"===i[i.length-1]&&(i=i.substr(0,i.length-1));var u=r.map[o];if("string"==typeof u)return re(o,u,i)?Z.call(e,t,u+i.substr(o.length),n+"/",a,a,s).then(function(t){return de.call(e,t,n+"/",a)}):vt;var l=[],c=[];for(var d in u){var p=ce(d);c.push({condition:p,map:u[d]}),l.push(f.prototype.import.call(e,p.module,n))}return Promise.all(l).then(function(e){for(var t=0;t<c.length;t++){var r=c[t].condition,n=U(r.prop,"__useDefault"in e[t]?e[t].__useDefault:e[t]);if(!r.negate&&n||r.negate&&!n)return c[t].map}}).then(function(r){if(r)return re(o,r,i)?Z.call(e,t,r+i.substr(o.length),n+"/",a,a,s).then(function(t){return de.call(e,t,n+"/",a)}):vt})}function ae(e){var t=e.lastIndexOf("*"),r=Math.max(t+1,e.lastIndexOf("/"));return{length:r,regEx:new RegExp("^("+e.substr(0,r).replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^\\/]+")+")(\\/|$)"),wildcard:-1!==t}}function se(e,t){for(var r,n,o=!1,i=0;i<e.packageConfigPaths.length;i++){var a=e.packageConfigPaths[i],s=Rt[a]||(Rt[a]=ae(a));if(!(t.length<s.length)){var u=t.match(s.regEx);!u||r&&(o&&s.wildcard||!(r.length<u[1].length))||(r=u[1],o=!s.wildcard,n=r+a.substr(s.length))}}if(r)return{packageKey:r,configPath:n}}function ue(e,r,n,o,i){var a=e.pluginLoader||e;return-1===r.packageConfigKeys.indexOf(n)&&r.packageConfigKeys.push(n),a.import(n).then(function(e){ve(o.packageConfig,e,o.packageKey,!0,r),o.packageConfig.configured=!0}).catch(function(e){throw t(e,"Unable to fetch package configuration file "+n)})}function le(e,t,r){var n;for(var o in e){var i="./"===o.substr(0,2)?"./":"";if(i&&(o=o.substr(2)),-1!==(n=o.indexOf("*"))&&o.substr(0,n)===t.substr(0,n)&&o.substr(n+1)===t.substr(t.length-o.length+n+1)&&r(o,e[i+o],o.split("/").length))return}var a=e[t]&&Object.hasOwnProperty.call(e,t)?e[t]:e["./"+t];a&&r(a,a,0)}function ce(e){var t,r,n,o=e.lastIndexOf("|");return-1!==o?(t=e.substr(o+1),r=e.substr(0,o),"~"===t[0]&&(n=!0,t=t.substr(1))):(n="~"===e[0],t="default",r=e.substr(n),-1!==Ct.indexOf(r)&&(t=r,r=null)),{module:r||"@system-env",prop:t,negate:n}}function fe(e,t,r){return f.prototype.import.call(this,e.module,t).then(function(t){var n=U(e.prop,t);if(r&&"boolean"!=typeof n)throw new TypeError("Condition did not resolve to a boolean.");return e.negate?!n:n})}function de(e,t,r){var n=e.match(Lt);if(!n)return Promise.resolve(e);var o=ce.call(this,n[0].substr(2,n[0].length-3));return fe.call(this,o,t,!1).then(function(r){if("string"!=typeof r)throw new TypeError("The condition value for "+e+" doesn't resolve to a string.");if(-1!==r.indexOf("/"))throw new TypeError("Unabled to interpolate conditional "+e+(t?" in "+t:"")+"\n\tThe condition value "+r+' cannot contain a "/" separator.');return e.replace(Lt,r)})}function pe(e,t,r){for(var n=0;n<At.length;n++){var o=At[n];t[o]&&hr[o.substr(0,o.length-6)]&&r(t[o])}}function ge(e,t){var r={};for(var n in e){var o=e[n];t>1?o instanceof Array?r[n]=[].concat(o):"object"==typeof o?r[n]=ge(o,t-1):"packageConfig"!==n&&(r[n]=o):r[n]=o}return r}function he(e,t){var r=e[t];return r instanceof Array?e[t].concat([]):"object"==typeof r?ge(r,3):e[t]}function me(){return{defaultExtension:void 0,main:void 0,format:void 0,meta:void 0,map:void 0,packageConfig:void 0,configured:!1}}function ve(e,t,r,n,o){for(var i in t)"main"===i||"format"===i||"defaultExtension"===i||"configured"===i?n&&void 0!==e[i]||(e[i]=t[i]):"map"===i?(n?A:L)(e.map=e.map||{},t.map):"meta"===i?(n?A:L)(e.meta=e.meta||{},t.meta):Object.hasOwnProperty.call(t,i)&&M.call(o,'"'+i+'" is not a valid package configuration option in package '+r);return void 0===e.defaultExtension&&(e.defaultExtension="js"),void 0===e.main&&e.map&&e.map["."]?(e.main=e.map["."],delete e.map["."]):"object"==typeof e.main&&(e.map=e.map||{},e.map["./@main"]=e.main,e.main.default=e.main.default||"./",e.main="@main"),e}function ye(e){return It?qt+new Buffer(e).toString("base64"):"undefined"!=typeof btoa?qt+btoa(unescape(encodeURIComponent(e))):""}function be(e,t,r,n){var o=e.lastIndexOf("\n");if(t){if("object"!=typeof t)throw new TypeError("load.metadata.sourceMap must be set to an object.");t=JSON.stringify(t)}return(n?"(function(System, SystemJS) {":"")+e+(n?"\n})(System, System);":"")+("\n//# sourceURL="!=e.substr(o,15)?"\n//# sourceURL="+r+(t?"!transpiled":""):"")+(t&&ye(t)||"")}function we(e,t,r,n,o){Ft||(Ft=document.head||document.body||document.documentElement);var i=document.createElement("script");i.text=be(t,r,n,!1);var a,s=window.onerror;if(window.onerror=function(e){a=addToError(e,"Evaluating "+n),s&&s.apply(this,arguments)},xe(e),o&&i.setAttribute("nonce",o),Ft.appendChild(i),Ft.removeChild(i),ke(),window.onerror=s,a)return a}function xe(e){0==Tt++&&(Ut=tt.System),tt.System=tt.SystemJS=e}function ke(){0==--Tt&&(tt.System=tt.SystemJS=Ut)}function Ee(e,t,r,n,o,i,a){if(t){if(i&&zt)return we(e,t,r,n,i);try{xe(e),!Kt&&e._nodeRequire&&(Kt=e._nodeRequire("vm"),Dt=Kt.runInThisContext("typeof System !== 'undefined' && System")===e),Dt?Kt.runInThisContext(be(t,r,n,!a),{filename:n+(r?"!transpiled":"")}):(0,eval)(be(t,r,n,!a)),ke()}catch(e){return ke(),e}}}function Oe(e){e.set("@@cjs-helpers",e.newModule({requireResolve:_e.bind(e),getPathVars:Pe})),e.set("@@global-helpers",e.newModule({prepareGlobal:Le}))}function Se(e){function t(r,n,o,i){if("object"==typeof r&&!(r instanceof Array))return t.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof r&&"function"==typeof n&&(r=[r]),!(r instanceof Array)){if("string"==typeof r){var a=e.decanonicalize(r,i),s=e.get(a);if(!s)throw new Error('Module not already loaded loading "'+r+'" as '+a+(i?' from "'+i+'".':"."));return"__useDefault"in s?s.__useDefault:s}throw new TypeError("Invalid require")}for(var u=[],l=0;l<r.length;l++)u.push(e.import(r[l],i));Promise.all(u).then(function(e){n&&n.apply(null,e)},o)}function r(r,n,o){function i(r,i,l){for(var c=[],f=0;f<n.length;f++)c.push(r(n[f]));if(l.uri=l.id,l.config=_,-1!==u&&c.splice(u,0,l),-1!==s&&c.splice(s,0,i),-1!==a){var d=function(n,o,i){return"string"==typeof n&&"function"!=typeof o?r(n):t.call(e,n,o,i,l.id)};d.toUrl=function(t){return e.normalizeSync(t,l.id)},c.splice(a,0,d)}var p=tt.require;tt.require=t;var g=o.apply(-1===s?tt:i,c);tt.require=p,void 0!==g&&(l.exports=g)}"string"!=typeof r&&(o=n,n=r,r=null),n instanceof Array||(n=["require","exports","module"].splice(0,(o=n).length)),"function"!=typeof o&&(o=function(e){return function(){return e}}(o)),r||Bt&&(n=n.concat(Bt),Bt=void 0);var a,s,u;-1!==(a=n.indexOf("require"))&&(n.splice(a,1),r||(n=n.concat(Ae(o.toString(),a)))),-1!==(s=n.indexOf("exports"))&&n.splice(s,1),-1!==(u=n.indexOf("module"))&&n.splice(u,1),r?(e.registerDynamic(r,n,!1,i),$t?($t=void 0,tr=!0):tr||($t=[n,i])):e.registerDynamic(n,!1,rr?Ie(i):i)}r.amd={},e.amdDefine=r,e.amdRequire=t}function je(e){return"file:///"===e.substr(0,8)?e.substr(7+!!et):Nt&&e.substr(0,Nt.length)===Nt?e.substr(Nt.length):e}function _e(e,t){return je(this.normalizeSync(e,t))}function Pe(e){var t,r=e.lastIndexOf("!"),n=(t=-1!==r?e.substr(0,r):e).split("/");return n.pop(),n=n.join("/"),{filename:je(t),dirname:je(n)}}function Me(e){function t(e,t){for(var r=0;r<e.length;r++)if(e[r][0]<t.index&&e[r][1]>t.index)return!0;return!1}_t.lastIndex=Gt.lastIndex=Ht.lastIndex=0;var r,n=[],o=[],i=[];if(e.length/e.split("\n").length<200){for(;r=Ht.exec(e);)o.push([r.index,r.index+r[0].length]);for(;r=Gt.exec(e);)t(o,r)||i.push([r.index+r[1].length,r.index+r[0].length-1])}for(;r=_t.exec(e);)if(!t(o,r)&&!t(i,r)){var a=r[1].substr(1,r[1].length-2);if(a.match(/"|'/))continue;n.push(a)}return n}function Re(e){if(-1===Zt.indexOf(e)){try{var t=tt[e]}catch(t){Zt.push(e)}this(e,t)}}function Ce(e){if("string"==typeof e)return U(e,tt);if(!(e instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},r=0;r<e.length;r++)t[e[r].split(".").pop()]=U(e[r],tt);return t}function Le(e,t,r,n){var o=tt.define;tt.define=void 0;var i;if(r){i={};for(var a in r)i[a]=tt[a],tt[a]=r[a]}return t||(Jt={},Object.keys(tt).forEach(Re,function(e,t){Jt[e]=t})),function(){var e,r=t?Ce(t):{},a=!!t;if(t&&!n||Object.keys(tt).forEach(Re,function(o,i){Jt[o]!==i&&void 0!==i&&(n&&(tt[o]=void 0),t||(r[o]=i,void 0!==e?a||e===i||(a=!0):e=i))}),r=a?r:e,i)for(var s in i)tt[s]=i[s];return tt.define=o,r}}function Ae(e,t){var r=((e=e.replace(Gt,"")).match(Qt)[1].split(",")[t]||"require").replace(Vt,""),n=er[r]||(er[r]=new RegExp(Xt+r+Yt,"g"));n.lastIndex=0;for(var o,i=[];o=n.exec(e);)i.push(o[2]||o[3]);return i}function Ie(e){return function(t,r,n){e(t,r,n),"object"!=typeof(r=n.exports)&&"function"!=typeof r||"__esModule"in r||Object.defineProperty(n.exports,"__esModule",{value:!0})}}function Fe(e,t){Bt=e,rr=t,$t=void 0,tr=!1}function Ke(e){$t?e.registerDynamic(Bt?$t[0].concat(Bt):$t[0],!1,rr?Ie($t[1]):$t[1]):tr&&e.registerDynamic([],!1,_)}function De(e,t){!e.load.esModule||"object"!=typeof t&&"function"!=typeof t||"__esModule"in t||Object.defineProperty(t,"__esModule",{value:!0})}function Ue(e,t,r){return r.pluginKey?e.import(r.pluginKey).then(function(e){r.pluginModule=e,r.pluginLoad={name:t,address:r.pluginArgument,source:void 0,metadata:r.load},r.load.deps=r.load.deps||[]}):vt}function qe(e,t,r){var n=e.depCache[r];if(n)for(a=0;a<n.length;a++)t.normalize(n[a],r).then(F);else{var o=!1;for(var i in e.bundles){for(var a=0;a<e.bundles[i].length;a++){var s=e.bundles[i][a];if(s===r){o=!0;break}if(-1!==s.indexOf("*")){var u=s.split("*");if(2!==u.length){e.bundles[i].splice(a--,1);continue}if(r.substr(0,u[0].length)===u[0]&&r.substr(r.length-u[1].length,u[1].length)===u[1]){o=!0;break}}}if(o)return t.import(i)}}}function Te(e,t,r,n,o){return r.load.exports&&!r.load.format&&(r.load.format="global"),vt.then(function(){if(r.pluginModule&&r.pluginModule.locate)return Promise.resolve(r.pluginModule.locate.call(e,r.pluginLoad)).then(function(e){e&&(r.pluginLoad.address=e)})}).then(function(){return r.pluginModule?(o=!1,r.pluginModule.fetch?r.pluginModule.fetch.call(e,r.pluginLoad,function(e){return Mt(e.address,r.load.authorization,r.load.integrity,!1)}):Mt(r.pluginLoad.address,r.load.authorization,r.load.integrity,!1)):Mt(t,r.load.authorization,r.load.integrity,o)}).then(function(i){return o&&"string"!=typeof i?R(e,i,n).then(function(o){if(!o){var a=Qe?new TextDecoder("utf-8").decode(new Uint8Array(i)):i.toString();return ze(e,t,a,r,n)}}):ze(e,t,i,r,n)})}function ze(e,t,r,n,o){return Promise.resolve(r).then(function(t){return"detect"===n.load.format&&(n.load.format=void 0),Ge(t,n),n.pluginModule?(n.pluginLoad.source=t,n.pluginModule.translate?Promise.resolve(n.pluginModule.translate.call(e,n.pluginLoad,n.traceOpts)).then(function(e){if(n.load.sourceMap){if("object"!=typeof n.load.sourceMap)throw new Error("metadata.load.sourceMap must be set to an object.");$e(n.pluginLoad.address,n.load.sourceMap)}return"string"==typeof e?e:n.pluginLoad.source}):t):t}).then(function(r){return n.load.format||'"bundle"'!==r.substring(0,8)?"register"===n.load.format||!n.load.format&&Ne(r)?(n.load.format="register",r):"esm"===n.load.format||!n.load.format&&r.match(ar)?(n.load.format="esm",Be(e,r,t,n,o)):r:(n.load.format="system",r)}).then(function(t){if("string"!=typeof t||!n.pluginModule||!n.pluginModule.instantiate)return t;var r=!1;return n.pluginLoad.source=t,Promise.resolve(n.pluginModule.instantiate.call(e,n.pluginLoad,function(e){if(t=e.source,n.load=e.metadata,r)throw new Error("Instantiate must only be called once.");r=!0})).then(function(e){return r?t:P(e)})}).then(function(r){if("string"!=typeof r)return r;n.load.format||(n.load.format=Je(r));var i=!1;switch(n.load.format){case"esm":case"register":case"system":if(u=Ee(e,r,n.load.sourceMap,t,n.load.integrity,n.load.nonce,!1))throw u;if(!o())return yt;return;case"json":var a=JSON.parse(r);return e.newModule({default:a,__useDefault:a});case"amd":var s=tt.define;tt.define=e.amdDefine,Fe(n.load.deps,n.load.esModule);var u=Ee(e,r,n.load.sourceMap,t,n.load.integrity,n.load.nonce,!1);if((i=o())||(Ke(e),i=o()),tt.define=s,u)throw u;break;case"cjs":var l=n.load.deps,c=(n.load.deps||[]).concat(n.load.cjsRequireDetection?Me(r):[]);for(var f in n.load.globals)n.load.globals[f]&&c.push(n.load.globals[f]);e.registerDynamic(c,!0,function(o,i,a){if(o.resolve=function(t){return _e.call(e,t,a.id)},a.paths=[],a.require=o,!n.load.cjsDeferDepsExecute&&l)for(var s=0;s<l.length;s++)o(l[s]);var u=Pe(a.id),c={exports:i,args:[o,i,a,u.filename,u.dirname,tt,tt]},f="(function (require, exports, module, __filename, __dirname, global, GLOBAL";if(n.load.globals)for(var d in n.load.globals)c.args.push(o(n.load.globals[d])),f+=", "+d;var p=tt.define;tt.define=void 0,tt.__cjsWrapper=c,r=f+") {"+r.replace(cr,"")+"\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);";var g=Ee(e,r,n.load.sourceMap,t,n.load.integrity,n.load.nonce,!1);if(g)throw g;De(n,i),tt.__cjsWrapper=void 0,tt.define=p}),i=o();break;case"global":c=n.load.deps||[];for(var f in n.load.globals){var d=n.load.globals[f];d&&c.push(d)}e.registerDynamic(c,!1,function(o,i,a){var s;if(n.load.globals){s={};for(var u in n.load.globals)n.load.globals[u]&&(s[u]=o(n.load.globals[u]))}var l=n.load.exports;l&&(r+="\n"+ir+'["'+l+'"] = '+l+";");var c=Le(a.id,l,s,n.load.encapsulateGlobal),f=Ee(e,r,n.load.sourceMap,t,n.load.integrity,n.load.nonce,!0);if(f)throw f;var d=c();return De(n,d),d}),i=o();break;default:throw new TypeError('Unknown module format "'+n.load.format+'" for "'+t+'".'+("es6"===n.load.format?' Use "esm" instead here.':""))}if(!i)throw new Error("Module "+t+" detected as "+n.load.format+" but didn't execute correctly.")})}function Ne(e){var t=e.match(sr);return t&&"System.register"===e.substr(t[0].length,15)}function Je(e){return e.match(ur)?"amd":(lr.lastIndex=0,_t.lastIndex=0,_t.exec(e)||lr.exec(e)?"cjs":"global")}function $e(e,t){var r=e.split("!")[0];t.file&&t.file!=e||(t.file=r+"!transpiled"),(!t.sources||t.sources.length<=1&&(!t.sources[0]||t.sources[0]===e))&&(t.sources=[r])}function Be(e,r,n,o,i){if(!e.transpiler)throw new TypeError("Unable to dynamically transpile ES module\n   A loader plugin needs to be configured via `SystemJS.config({ transpiler: 'transpiler-module' })`.");if(o.load.deps){for(var a="",s=0;s<o.load.deps.length;s++)a+='import "'+o.load.deps[s]+'"; ';r=a+r}return e.import.call(e,e.transpiler).then(function(t){if(!(t=t.__useDefault||t).translate)throw new Error(e.transpiler+" is not a valid transpiler plugin.");return t===o.pluginModule?r:("string"==typeof o.load.sourceMap&&(o.load.sourceMap=JSON.parse(o.load.sourceMap)),o.pluginLoad=o.pluginLoad||{name:n,address:n,source:r,metadata:o.load},o.load.deps=o.load.deps||[],Promise.resolve(t.translate.call(e,o.pluginLoad,o.traceOpts)).then(function(e){var t=o.load.sourceMap;return t&&"object"==typeof t&&$e(n,t),"esm"===o.load.format&&Ne(e)&&(o.load.format="register"),e}))},function(e){throw t(e,"Unable to load transpiler to transpile "+n)})}function We(e,t,r){for(var n,o=t.split(".");o.length>1;)e=e[n=o.shift()]=e[n]||{};void 0===e[n=o.shift()]&&(e[n]=r)}function Ge(e,t){var r=e.match(fr);if(r)for(var n=r[0].match(dr),o=0;o<n.length;o++){var i=n[o],a=i.length,s=i.substr(0,1);if(";"==i.substr(a-1,1)&&a--,'"'==s||"'"==s){var u=i.substr(1,i.length-3),l=u.substr(0,u.indexOf(" "));if(l){var c=u.substr(l.length+1,u.length-l.length-1);"deps"===l&&(l="deps[]"),"[]"===l.substr(l.length-2,2)?(l=l.substr(0,l.length-2),t.load[l]=t.load[l]||[],t.load[l].push(c)):"use"!==l&&We(t.load,l,c)}else t.load[u]=!0}}}function He(){f.call(this),this._loader={},this[wt]={},this[bt]={baseURL:Ye,paths:{},packageConfigPaths:[],packageConfigKeys:[],map:{},packages:{},depCache:{},meta:{},bundles:{},production:!1,transpiler:void 0,loadedBundles:{},warnings:!1,pluginFirst:!1,wasm:!1},this.scriptSrc=or,this._nodeRequire=Wt,this.registry.set("@empty",yt),Ze.call(this,!1,!1),Oe(this),Se(this)}function Ze(e,t){this[bt].production=e,this.registry.set("@system-env",hr=this.newModule({browser:Qe,node:!!this._nodeRequire,production:!t&&e,dev:t||!e,build:t,default:!0}))}function Xe(e,t){M.call(e[bt],"SystemJS."+t+" is deprecated for SystemJS.registry."+t)}var Ye,Qe="undefined"!=typeof window&&"undefined"!=typeof document,Ve="undefined"!=typeof process&&process.versions&&process.versions.node,et="undefined"!=typeof process&&"string"==typeof process.platform&&process.platform.match(/^win/),tt="undefined"!=typeof self?self:global,rt="undefined"!=typeof Symbol;if("undefined"!=typeof document&&document.getElementsByTagName){if(!(Ye=document.baseURI)){var nt=document.getElementsByTagName("base");Ye=nt[0]&&nt[0].href||window.location.href}}else"undefined"!=typeof location&&(Ye=location.href);if(Ye){var ot=(Ye=Ye.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==ot&&(Ye=Ye.substr(0,ot+1))}else{if("undefined"==typeof process||!process.cwd)throw new TypeError("No environment baseURI");Ye="file://"+(et?"/":"")+process.cwd(),et&&(Ye=Ye.replace(/\\/g,"/"))}"/"!==Ye[Ye.length-1]&&(Ye+="/");var it="_"==new Error(0,"_").fileName,at=Promise.resolve();i.prototype.constructor=i,i.prototype.import=function(e,r){if("string"!=typeof e)throw new TypeError("Loader import method must be passed a module key string");var n=this;return at.then(function(){return n[ut](e,r)}).then(a).catch(function(n){throw t(n,"Loading "+e+(r?" from "+r:""))})};var st=i.resolve=e("resolve"),ut=i.resolveInstantiate=e("resolveInstantiate");i.prototype[ut]=function(e,t){var r=this;return r.resolve(e,t).then(function(e){return r.registry.get(e)})},i.prototype.resolve=function(e,r){var n=this;return at.then(function(){return n[st](e,r)}).then(s).catch(function(n){throw t(n,"Resolving "+e+(r?" to "+r:""))})};var lt="undefined"!=typeof Symbol&&Symbol.iterator,ct=e("registry");lt&&(u.prototype[Symbol.iterator]=function(){return this.entries()[Symbol.iterator]()},u.prototype.entries=function(){var e=this[ct];return o(Object.keys(e).map(function(t){return[t,e[t]]}))}),u.prototype.keys=function(){return o(Object.keys(this[ct]))},u.prototype.values=function(){var e=this[ct];return o(Object.keys(e).map(function(t){return e[t]}))},u.prototype.get=function(e){return this[ct][e]},u.prototype.set=function(e,t){if(!(t instanceof l))throw new Error("Registry must be set with an instance of Module Namespace");return this[ct][e]=t,this},u.prototype.has=function(e){return Object.hasOwnProperty.call(this[ct],e)},u.prototype.delete=function(e){return!!Object.hasOwnProperty.call(this[ct],e)&&(delete this[ct][e],!0)};var ft=e("baseObject");l.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(l.prototype,Symbol.toStringTag,{value:"Module"});var dt=e("register-internal");f.prototype=Object.create(i.prototype),f.prototype.constructor=f;var pt=f.instantiate=e("instantiate");f.prototype[f.resolve=i.resolve]=function(e,t){return n(e,t||Ye)},f.prototype[pt]=function(e,t){},f.prototype[i.resolveInstantiate]=function(e,t){var r=this,n=this[dt],o=this.registry[ct];return p(r,e,t,o,n).then(function(e){if(e instanceof l)return e;var t=e.linkRecord;if(!t){if(e.module)return e.module;throw e.evalError}return w(r,e,0,o,n).then(function(){return k(r,e,t,o,n,void 0)})})},f.prototype.register=function(e,t,r){var n=this[dt];void 0===r?n.lastRegister=[e,t,void 0]:(n.records[e]||d(n,e,void 0)).registration=[t,r,void 0]},f.prototype.registerDynamic=function(e,t,r,n){var o=this[dt];"string"!=typeof e?o.lastRegister=[e,t,r]:(o.records[e]||d(o,e,void 0)).registration=[t,r,n]},x.prototype.import=function(e){return this.loader.trace&&this.loader.loads[this.key].dynamicDeps.push(e),this.loader.import(e,this.key)};var gt={};Object.freeze&&Object.freeze(gt);var ht,mt,vt=Promise.resolve(),yt=new l({}),bt=e("loader-config"),wt=e("metadata"),xt="undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts,kt=!1,Et=!1;if(Qe&&function(){var e=document.createElement("link").relList;if(e&&e.supports){Et=!0;try{kt=e.supports("preload")}catch(e){}}}(),Qe){var Ot=window.onerror;window.onerror=function(e,t){Ot&&Ot.apply(this,arguments)}}var St,jt,_t=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)\s*\)/g,Pt="undefined"!=typeof XMLHttpRequest,Mt=jt="undefined"!=typeof self&&void 0!==self.fetch?function(e,t,r,n){if("file:///"===e.substr(0,8)){if(Pt)return N(e,t,0,n);throw new Error("Unable to fetch file URLs in this environment.")}e=e.replace(/#/g,"%23");var o={headers:{Accept:"application/x-es-module, */*"}};return r&&(o.integrity=r),t&&("string"==typeof t&&(o.headers.Authorization=t),o.credentials="include"),fetch(e,o).then(function(e){if(e.ok)return n?e.arrayBuffer():e.text();throw new Error("Fetch error: "+e.status+" "+e.statusText)})}:Pt?N:"undefined"!="function"&&"undefined"!=typeof process?function(e,t,r,n){return"file:///"!=e.substr(0,8)?Promise.reject(new Error('Unable to fetch "'+e+'". Only file URLs of the form file:/// supported running in Node.')):(St=St||__webpack_require__(2),e=et?e.replace(/\//g,"\\").substr(8):e.substr(7),new Promise(function(t,r){St.readFile(e,function(e,o){if(e)return r(e);if(n)t(o);else{var i=o+"";"\ufeff"===i[0]&&(i=i.substr(1)),t(i)}})}))}:function(){throw new Error("No fetch method is defined for this environment.")},Rt={},Ct=["browser","node","dev","build","production","default"],Lt=/#\{[^\}]+\}/,At=["browserConfig","nodeConfig","devConfig","buildConfig","productionConfig"],It="undefined"!=typeof Buffer;try{It&&"YQ=="!==new Buffer("a").toString("base64")&&(It=!1)}catch(e){It=!1}var Ft,Kt,Dt,Ut,qt="\n//# sourceMappingURL=data:application/json;base64,",Tt=0,zt=!1;Qe&&"undefined"!=typeof document&&document.getElementsByTagName&&(window.chrome&&window.chrome.extension||navigator.userAgent.match(/^Node\.js/)||(zt=!0));var Nt;"undefined"!=typeof window&&"undefined"!=typeof document&&window.location&&(Nt=location.protocol+"//"+location.hostname+(location.port?":"+location.port:""));var Jt,$t,Bt,Wt,Gt=/(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,Ht=/("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g,Zt=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"],Xt="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",Yt="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",Qt=/\(([^\)]*)\)/,Vt=/^\s+|\s+$/g,er={},tr=!1,rr=!1,nr=(Qe||xt)&&"undefined"!=typeof navigator&&navigator.userAgent&&!navigator.userAgent.match(/MSIE (9|10).0/);"undefined"=="function"||"undefined"==typeof process||process.browser||(Wt=require);var or,ir="undefined"!=typeof self?"self":"global",ar=/(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?(?!type)([^"'\(\)\n; ]+)\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/,sr=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/,ur=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/,lr=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/,cr=/^\#\!.*/,fr=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,dr=/\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;if("undefined"==typeof Promise)throw new Error("SystemJS needs a Promise polyfill.");if("undefined"!=typeof document){var pr=document.getElementsByTagName("script"),gr=pr[pr.length-1];document.currentScript&&(gr.defer||gr.async)&&(gr=document.currentScript),or=gr&&gr.src}else if("undefined"!=typeof importScripts)try{throw new Error("_")}catch(e){e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/,function(e,t){or=t})}else"undefined"!=typeof __filename&&(or=__filename);var hr;(He.prototype=Object.create(f.prototype)).constructor=He,He.prototype[He.resolve=f.resolve]=He.prototype.normalize=function(e,t){var r=this[bt],n=J(),o=$(this,r,t),i=this;return Promise.resolve().then(function(){var r=e.lastIndexOf("#?");if(-1===r)return Promise.resolve(e);var n=ce.call(i,e.substr(r+2));return fe.call(i,n,t,!0).then(function(t){return t?e.substr(0,r):"@empty"})}).then(function(e){var a=Q(r.pluginFirst,e);return a?(n.pluginKey=a.plugin,Promise.all([Z.call(i,r,a.argument,o&&o.pluginArgument||t,n,o,!0),i.resolve(a.plugin,t)]).then(function(e){if(n.pluginArgument=e[0],n.pluginKey=e[1],n.pluginArgument===n.pluginKey)throw new Error("Plugin "+n.pluginArgument+" cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.");return V(r.pluginFirst,e[0],e[1])})):Z.call(i,r,e,o&&o.pluginArgument||t,n,o,!1)}).then(function(e){return de.call(i,e,t,o)}).then(function(e){return Y.call(i,r,e,n),n.pluginKey||!n.load.loader?e:i.resolve(n.load.loader,e).then(function(t){return n.pluginKey=t,n.pluginArgument=e,e})}).then(function(e){return i[wt][e]=n,e})},He.prototype.load=function(e,t){return M.call(this[bt],"System.load is deprecated."),this.import(e,t)},He.prototype.decanonicalize=He.prototype.normalizeSync=He.prototype.resolveSync=W,He.prototype[He.instantiate=f.instantiate]=function(e,t){var r=this,n=this[bt];return(qe(n,this,e)||vt).then(function(){if(!t()){var o=r[wt][e];if("@node/"===e.substr(0,6)){if(!r._nodeRequire)throw new TypeError("Error loading "+e+". Can only load node core modules in Node.");return r.registerDynamic([],!1,function(){return C.call(r,e.substr(6),r.baseURL)}),void t()}return o.load.scriptLoad?!o.load.pluginKey&&nr||(o.load.scriptLoad=!1,M.call(n,'scriptLoad not supported for "'+e+'"')):!1!==o.load.scriptLoad&&!o.load.pluginKey&&nr&&(o.load.deps||o.load.globals||!("system"===o.load.format||"register"===o.load.format||"global"===o.load.format&&o.load.exports)||(o.load.scriptLoad=!0)),o.load.scriptLoad?new Promise(function(n,i){if("amd"===o.load.format&&tt.define!==r.amdDefine)throw new Error("Loading AMD with scriptLoad requires setting the global `"+ir+".define = SystemJS.amdDefine`");D(e,o.load.crossOrigin,o.load.integrity,function(){if(!t()){o.load.format="global";var e=o.load.exports&&Ce(o.load.exports);r.registerDynamic([],!1,function(){return De(o,e),e}),t()}n()},i)}):Ue(r,e,o).then(function(){return Te(r,e,o,t,n.wasm)})}}).then(function(t){return delete r[wt][e],t})},He.prototype.config=function(e,t){var r=this,o=this[bt];if("warnings"in e&&(o.warnings=e.warnings),"wasm"in e&&(o.wasm="undefined"!=typeof WebAssembly&&e.wasm),("production"in e||"build"in e)&&Ze.call(r,!!e.production,!!(e.build||hr&&hr.build)),!t){var i;pe(r,e,function(e){i=i||e.baseURL}),(i=i||e.baseURL)&&(o.baseURL=n(i,Ye)||n("./"+i,Ye),"/"!==o.baseURL[o.baseURL.length-1]&&(o.baseURL+="/")),e.paths&&L(o.paths,e.paths),pe(r,e,function(e){e.paths&&L(o.paths,e.paths)});for(var a in o.paths)-1!==o.paths[a].indexOf("*")&&(M.call(o,"Path config "+a+" -> "+o.paths[a]+" is no longer supported as wildcards are deprecated."),delete o.paths[a])}if(e.defaultJSExtensions&&M.call(o,"The defaultJSExtensions configuration option is deprecated.\n  Use packages defaultExtension instead.",!0),"boolean"==typeof e.pluginFirst&&(o.pluginFirst=e.pluginFirst),e.map)for(var a in e.map){var s=e.map[a];if("string"==typeof s){var u=G.call(r,o,s,void 0,!1,!1);"/"===u[u.length-1]&&":"!==a[a.length-1]&&"/"!==a[a.length-1]&&(u=u.substr(0,u.length-1)),o.map[a]=u}else{m=(m=G.call(r,o,"/"!==a[a.length-1]?a+"/":a,void 0,!0,!0)).substr(0,m.length-1);var l=o.packages[m];l||((l=o.packages[m]={defaultExtension:void 0,main:void 0,format:void 0,meta:void 0,map:void 0,packageConfig:void 0,configured:!1}).defaultExtension=""),ve(l,{map:s},m,!1,o)}}if(e.packageConfigPaths){for(var c=[],f=0;f<e.packageConfigPaths.length;f++){var d=e.packageConfigPaths[f],p=Math.max(d.lastIndexOf("*")+1,d.lastIndexOf("/")),g=G.call(r,o,d.substr(0,p),void 0,!1,!1);c[f]=g+d.substr(p)}o.packageConfigPaths=c}if(e.bundles)for(var a in e.bundles){for(var h=[],f=0;f<e.bundles[a].length;f++)h.push(r.normalizeSync(e.bundles[a][f]));o.bundles[a]=h}if(e.packages)for(var a in e.packages){if(a.match(/^([^\/]+:)?\/\/$/))throw new TypeError('"'+a+'" is not a valid package name.');var m=G.call(r,o,"/"!==a[a.length-1]?a+"/":a,void 0,!0,!0);m=m.substr(0,m.length-1),ve(o.packages[m]=o.packages[m]||{defaultExtension:void 0,main:void 0,format:void 0,meta:void 0,map:void 0,packageConfig:void 0,configured:!1},e.packages[a],m,!1,o)}if(e.depCache)for(var a in e.depCache)o.depCache[r.normalizeSync(a)]=[].concat(e.depCache[a]);if(e.meta)for(var a in e.meta)if("*"===a[0])L(o.meta[a]=o.meta[a]||{},e.meta[a]);else{var v=G.call(r,o,a,void 0,!0,!0);L(o.meta[v]=o.meta[v]||{},e.meta[a])}"transpiler"in e&&(o.transpiler=e.transpiler);for(var y in e)-1===mr.indexOf(y)&&-1===At.indexOf(y)&&(r[y]=e[y]);pe(r,e,function(e){r.config(e,!0)})},He.prototype.getConfig=function(e){if(e){if(-1!==mr.indexOf(e))return he(this[bt],e);throw new Error('"'+e+'" is not a valid configuration name. Must be one of '+mr.join(", ")+".")}for(var t={},r=0;r<mr.length;r++){var n=mr[r],o=he(this[bt],n);void 0!==o&&(t[n]=o)}return t},He.prototype.global=tt,He.prototype.import=function(){return f.prototype.import.apply(this,arguments).then(function(e){return"__useDefault"in e?e.__useDefault:e})};for(var mr=["baseURL","map","paths","packages","packageConfigPaths","depCache","meta","bundles","transpiler","warnings","pluginFirst","production","wasm"],vr="undefined"!=typeof Proxy,yr=0;yr<mr.length;yr++)!function(e){Object.defineProperty(He.prototype,e,{get:function(){var t=he(this[bt],e);return vr&&"object"==typeof t&&(t=new Proxy(t,{set:function(t,r){throw new Error("Cannot set SystemJS."+e+'["'+r+'"] directly. Use SystemJS.config({ '+e+': { "'+r+'": ... } }) rather.')}})),t},set:function(t){throw new Error("Setting `SystemJS."+e+"` directly is no longer supported. Use `SystemJS.config({ "+e+": ... })`.")}})}(mr[yr]);He.prototype.delete=function(e){return Xe(this,"delete"),this.registry.delete(e)},He.prototype.get=function(e){return Xe(this,"get"),this.registry.get(e)},He.prototype.has=function(e){return Xe(this,"has"),this.registry.has(e)},He.prototype.set=function(e,t){return Xe(this,"set"),this.registry.set(e,t)},He.prototype.newModule=function(e){return new l(e)},He.prototype.isModule=function(e){return void 0===ht&&(ht="undefined"!=typeof Symbol&&!!Symbol.toStringTag),e instanceof l||ht&&"[object Module]"==Object.prototype.toString.call(e)},He.prototype.register=function(e,t,r){return"string"==typeof e&&(e=B.call(this,this[bt],e)),f.prototype.register.call(this,e,t,r)},He.prototype.registerDynamic=function(e,t,r,n){return"string"==typeof e&&(e=B.call(this,this[bt],e)),f.prototype.registerDynamic.call(this,e,t,r,n)},He.prototype.version="0.21.0 Dev";var br=new He;(Qe||xt)&&(tt.SystemJS=tt.System=br),"undefined"!=typeof module&&module.exports&&(module.exports=br)}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7).Buffer, __webpack_require__(3), __webpack_require__(0), "/index.js"))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var SystemJS = __webpack_require__(8)
var WebIO = __webpack_require__(1)

var STYLE_KEY = 'style';
var EVENT_KEY = 'events';
var ATTR_KEY = 'attributes';
var ATTR_NS_KEY = 'attributes_ns';

function applyProps(scope, domNode, props)
{
    for (var key in props) {
        var value = props[key];

        switch (key)
        {
            case STYLE_KEY:
                applyStyles(domNode, value);
                break;

            case EVENT_KEY:
                applyEvents(domNode, scope, value);
                break;

            case ATTR_KEY:
                applyAttrs(domNode, value);
                break;

            case ATTR_NS_KEY:
                applyAttrsNS(domNode, value);
                break;

            case 'value':
                // special-case for updating value only
                // when it has changed.
                if (domNode[key] !== value)
                {
                    domNode[key] = value;
                }
                break;

            default:
                if (WebIO.propUtils[key]){
                    WebIO.propUtils[key](domNode, value);
                } else {
                    domNode[key] = value;
                }
                break;
        }
    }
}

function applyAttrs(domNode, attrs)
{
    for (var key in attrs)
    {
        var val = attrs[key];
        if (val === null) { // should be undefined
            domNode.removeAttribute(key);
        } else {
            domNode.setAttribute(key, val);
        }
    }
}

function applyAttrsNS(domNode, nsAttrs)
{
    for (var key in nsAttrs)
    {
        var attr = nsAttrs[key];
        var namespace = attr.namespace;
        var value = attr.value;

        if (value === null)
        {
            domNode.removeAttributeNS(namespace, key);
        }
        else
        {
            domNode.setAttributeNS(namespace, key, value);
        }
    }
}


function applyStyles(domNode, styles)
{
    var domNodeStyle = domNode.style;

    for (var key in styles)
    {
        domNodeStyle[key] = styles[key];
    }
}

function applyEvents(domNode, scope, events)
{
    var allHandlers = domNode.webio_handlers || {};

    for (var key in events)
    {
        var handler = allHandlers[key];
        var value   = events[key];

        if (typeof value === 'undefined')
        {
            domNode.removeEventListener(key, handler);
            allHandlers[key] = undefined;
        }
        else if (typeof handler === 'undefined')
        {
            // for loop doesn't create a new scope in js, only functions
            function bindHandler(handlerfn){
                domNode.addEventListener(key, function (event) {
                    handlerfn.call(domNode, event);
                });
            }
            allHandlers[key] = makeEventHandler(scope, value);
            bindHandler(allHandlers[key])
        }
        else
        {
            handler.options = value;
        }
    }

    domNode.webio_handlers = allHandlers;
}

var defaultEventOptions = {
    stopPropagation: true,
    preventDefault: false
}

function makeEventHandler(scope, value)
{
    if (typeof value == "function") {
        return makeEventHandler(scope, {
            code: value, options: defaultEventOptions
        })
    }

    var options = value.options;
    var f = value.code;

    function eventHandler(event) {
        if (options.stopPropagation) {
            event.stopPropagation();
        }
        if (options.preventDefault) {
            event.preventDefault();
        }

        // http://stackoverflow.com/questions/1271516/executing-anonymous-functions-created-using-javascript-eval
        f.call(this, event, scope); //XXX security!?
    }

    eventHandler.options = options;
    return eventHandler;
}

function appendChildren(options, parentNode, children) {
    if (children) {
        for (var nChildren=children.length, i=0; i<nChildren; i++) {
            if (typeof children[i] === "string") {
                parentNode.appendChild(document.createTextNode(children[i]));
            } else {
                var child = WebIO.createNode(options, children[i], parentNode);
                parentNode.appendChild(child);
            }
        }
    }

}

var namespaces = {svg: "http://www.w3.org/2000/svg"}

function createDOM(options, data, parentNode) {

    var args = data.instanceArgs;
    var dom;
    if (args.namespace == "html") {
        dom = document.createElement(args.tag);
    } else {
        var ns = namespaces[args.namespace] || args.namespace;
        dom = document.createElementNS(ns, args.tag);
    }

    applyProps(options, dom, data.props);
    appendChildren(options, dom, data.children)

    return dom;
}

function doImports(scope, imp) {
    // this function must return a promise which resolves to a
    // vector of modules or null values (null values for non-modules)
    switch (imp.type) {
        case "sync_block":
            // all imports in this block must be loaded one after the other
            // We create a single promise which accumulates the resolved
            // values of all the input promises into a vector
            var sync_imports = imp.data

            if (sync_imports.length == 0) {
                return undefined
            }

            // we chain promises to this empty promise
            var p = new Promise(function (acc, rej) { acc([]); })

            function makePromisClosure(sync_import) {
                return function (vec) {
                    // vec contains previously resolved modules
                    var y = doImports(scope, sync_import) // a promise
                    var flatten = (sync_import.type == "sync_block" ||
                                   sync_import.type == "async_block")

                    return new Promise(function (acc, rej) {
                        y.then(function (mod) {
                            if (typeof(mod) === "undefined") {
                            } else if (flatten) {
                                acc(vec.concat(mod))
                            } else {
                                vec.push(mod)
                                acc(vec)
                            }
                        })
                    })
                }
            }
            for (var i=0, l = sync_imports.length; i < l; i++) {
                p = p.then(makePromisClosure(sync_imports[i]))
            }
            return p;
        case "async_block":
            var ps = imp.data.map(function(x){return doImports(scope, x)})
            return Promise.all(ps).then(function (mods) {
                var mods2 = []
                for (var i=0, l=imp.data.length; i<l; i++) {
                    var x = imp.data[i]
                    if (x.type == "sync_block" || x.type == "async_block") {
                        mods2 = mods2.concat(mods[i])
                    } else {
                        mods2.push(mods[i])
                    }
                }
                return mods2
            })
        case "js":
            var cfg = {paths: {}}
            cfg.paths[imp.name] = imp.url
            if (imp.url.replace(/^https?:\/\//, "") == imp.url && imp.url.slice(0, 2) !== "//") { // this means the URL is relative
                cfg.meta = {};
                // forward cookies
                // see https://github.com/systemjs/systemjs/issues/1731
                cfg.meta[imp.url] = {authorization: true};
            }
            SystemJS.config(cfg)
            return SystemJS.import(imp.url).then(function (mod) {
                if (imp.name) {
                    scope[imp.name] = mod
                }
                return mod
            })
        case "css":
            var cssId = imp.url.split( "/" ).join("-");
            if (!document.getElementById(cssId))
            {
                var link  = document.createElement('link');
                link.id   = cssId;
                link.rel  = 'stylesheet';
                link.type = 'text/css';
                link.href = imp.url
                link.media = 'all';
                scope.dom.appendChild(link);
            }
            return undefined;
        case "html":
            var p = new Promise(function (accept, reject) {
                var link = document.createElement('link');
                if ('import' in link) {
                    link.rel = 'import';
                    link.href = imp.url;
                    link.setAttribute('async', '');
                    link.onload = accept;
                    link.onerror = reject;
                    document.head.appendChild(link);
                } else {
                    console.error("This browser doesn't support HTML " +
                                  "imports. Cannot import " + imp.url);
                    reject(imp);
                }
            });
            return p
        default:
            console.warn("Don't know how to load import of type " + imp.type);
            return undefined
    }
}

function createScope(options, data) {
    var fragment = document.createElement("div");
    fragment.className = "wio-scope";

    // var handlers = data.instanceArgs.handlers;
    var observables = data.instanceArgs.observables;
    var handlers = data.instanceArgs.handlers;

    var scope = WebIO.makeScope(data.instanceArgs.id, data,
                             options.sendCallback, fragment, handlers, observables);

    if (data.instanceArgs.systemjs_options)
        SystemJS.config(data.instanceArgs.systemjs_options)

    if (handlers["preDependencies"]) {
        var predepfns = handlers["preDependencies"]
        predepfns.map(function (f){ f(scope) })
    }

    var imports = data.instanceArgs.imports;

    var depsPromise = doImports(scope, imports);
    scope.promises.importsLoaded = depsPromise

    scope.promises.connected = new Promise(function (accept, reject) {
        WebIO.onConnected(function () {
            // internal message to notify julia
            WebIO.send(scope, "_setup_scope", {});
            accept(scope);
        })
    })

    depsPromise.then(function (deps) {
        appendChildren(scope, fragment, data.children);
    })

    if (handlers._promises !== undefined &&
        handlers._promises["importsLoaded"]){
        var onimportfns = handlers._promises["importsLoaded"]
        depsPromise.then(function(alldeps){
            onimportfns.map(function (f){ f.apply(scope, alldeps) })
        })
    }

    return fragment;
}

var style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = '.wio-scope { display:inherit; margin:inherit }'
document.getElementsByTagName('head')[0].appendChild(style)

WebIO.NodeTypes = {
    DOM: {
        namespaces: namespaces,
        create: createDOM
    },
    Scope: {
        create: createScope
    }
}

WebIO.CommandSets = {
    Basics: {
        // XXX security!?
        eval: function (code) {
            var f = new Function(code);
            f.call(this);
        }
    }
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {


module.exports = function equal(arr1, arr2) {
  var length = arr1.length
  if (length !== arr2.length) return false
  for (var i = 0; i < length; i++)
    if (arr1[i] !== arr2[i])
      return false
  return true
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

(function() {

    var webComponentsSupported = ('customElements' in window
        && 'import' in document.createElement('link')
        && 'content' in document.createElement('template'));

    function evalInContext(js, context) {
        return (function() { return eval(js); }).call(context);
    }

    function setup() {

        class UnsafeScript extends HTMLElement {
           constructor() {
              super()
           }
           connectedCallback () {
               evalInContext(this.textContent, this)
           }
        }

        window.customElements.define("unsafe-script", UnsafeScript);
        console.log("defining unsafe-script")
    }

    if (!webComponentsSupported) {
        var script = document.createElement('script');
        script.async = true;

        var webiojs_elem = document.querySelector("script[src*='webio/dist/bundle.js']")
        if (!webiojs_elem) {
            console.warn("WebIO cannot find webio/dist/bundle.js, so it cannot load the webcomponents-lite support. Widgets may be broken in this environment.");
        } else {
            script.src = webiojs_elem.src.replace("bundle.js", "webcomponents-lite.min.js")
        }

        document.head.appendChild(script);
        document.addEventListener("WebComponentsReady", function () {
            if (customElements.get("unsafe-script") === undefined) {
                setup()
            }
        })
    } else if (customElements.get("unsafe-script") === undefined) {
        if (document.readyState === "complete" || document.readyState === "loaded") {
            setup()
        } else {
            if (window.frameElement) {
                // DOMContentLoaded is never fired, we'll just do this now.
                setup();
            } else {
                // https://stackoverflow.com/questions/48498581/accessing-textcontent-within-connectedcallback-for-a-custom-htmlelement
                document.addEventListener("DOMContentLoaded", function () { setup(); })
            }
        }
    }
})();


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(12)
module.exports = __webpack_require__(1)
__webpack_require__(9)


/***/ })
/******/ ]);