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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
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

var is_array = __webpack_require__(12)
var arrays_equal = __webpack_require__(11)

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
        Object.keys(observables).forEach(function setobsscope(name){
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
    scope.sendCallback(message(scope, cmd, data));
}

function setval(ob, val) {
    var allscopes = WebIO.obsscopes[ob.id]
    var synced_julia = false
    allscopes.forEach(function propagate_to_other_scopes(oscopeinfo){
        var scope = oscopeinfo.scope
        var name = oscopeinfo.obname // the name of the observable in oscope
        var x = scope.observables[name]
        if (val === x.value || arrays_and_equal(val, x.value) ||
                (val !== val && x.value !== x.value)) {
            // adapted from Vue.js reactiveSetter, avoids calling handlers if value
            // is unchanged. The second check is for arrays, since ["a"] !== ["a"].
            // The third check is for values like NaN, since, e.g., NaN !== NaN
            return
        }
        x.value = val
        if (typeof scope.handlers[name] !== "undefined") {
            var fs = scope.handlers[name];
            for (var i=0, l=fs.length; i<l; i++) {
                var f = fs[i]
                f.call(scope, val, true) // true for "client-side"
            }
        }

        // sync the observable's value to julia if `sync` is true in any scope
        if (x.sync && !synced_julia) {
            WebIO.send(scope, name, val);
            synced_julia = true
        }
    })
}

function getval(ob) {
    var scope = WebIO.scopes[ob.scope]
    var x = scope.observables[ob.name]
    return x.value
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

function webpackEmptyContext(req) {
	var e = new Error('Cannot find module "' + req + '".');
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 2;

/***/ }),
/* 3 */
/***/ (function(module, exports) {



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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, Buffer, __filename) {var require;/*
    * SystemJS v0.21.3 Dev
    */
!function(){"use strict";var y,p="undefined"!=typeof window&&"undefined"!=typeof document,c="undefined"!=typeof process&&process.versions&&process.versions.node,a="undefined"!=typeof process&&"string"==typeof process.platform&&process.platform.match(/^win/),E="undefined"!=typeof self?self:global,t="undefined"!=typeof Symbol;function e(e){return t?Symbol():"@@"+e}if("undefined"!=typeof document&&document.getElementsByTagName){if(!(y=document.baseURI)){var r=document.getElementsByTagName("base");y=r[0]&&r[0].href||window.location.href}}else"undefined"!=typeof location&&(y=location.href);if(y){var n=(y=y.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==n&&(y=y.substr(0,n+1))}else{if("undefined"==typeof process||!process.cwd)throw new TypeError("No environment baseURI");y="file://"+(a?"/":"")+process.cwd(),a&&(y=y.replace(/\\/g,"/"))}"/"!==y[y.length-1]&&(y+="/");var i="_"==new Error(0,"_").fileName;function O(e,t){p||(t=t.replace(a?/file:\/\/\//g:/file:\/\//g,""));var r,n=(e.message||e)+"\n  "+t;r=i&&e.fileName?new Error(n,e.fileName,e.lineNumber):new Error(n);var o=e.originalErr?e.originalErr.stack:e.stack;return r.stack=c?n+"\n  "+o:o,r.originalErr=e.originalErr||e,r}function f(e,t){throw new RangeError('Unable to resolve "'+e+'" to '+t)}function b(e,t){e=e.trim();var r=t&&t.substr(0,t.indexOf(":")+1),n=e[0],o=e[1];if("/"===n&&"/"===o)return r||f(e,t),r+e;if("."===n&&("/"===o||"."===o&&("/"===e[2]||2===e.length&&(e+="/"))||1===e.length&&(e+="/"))||"/"===n){var i,a=!r||"/"!==t[r.length];if(a?(void 0===t&&f(e,t),i=t):i="/"===t[r.length+1]?"file:"!==r?(i=t.substr(r.length+2)).substr(i.indexOf("/")+1):t.substr(8):t.substr(r.length+1),"/"===n){if(!a)return t.substr(0,t.length-i.length-1)+e;f(e,t)}for(var s=i.substr(0,i.lastIndexOf("/")+1)+e,u=[],l=-1,d=0;d<s.length;d++)if(-1===l)if("."!==s[d])l=d;else{if("."!==s[d+1]||"/"!==s[d+2]&&d+2!==s.length){if("/"!==s[d+1]&&d+1!==s.length){l=d;continue}d+=1}else u.pop(),d+=2;a&&0===u.length&&f(e,t)}else"/"===s[d]&&(u.push(s.substring(l,d+1)),l=-1);return-1!==l&&u.push(s.substr(l)),t.substr(0,t.length-i.length)+u.join("")}return-1!==e.indexOf(":")?c&&":"===e[1]&&"\\"===e[2]&&e[0].match(/[a-z]/i)?"file:///"+e.replace(/\\/g,"/"):e:void 0}var o=Promise.resolve();function s(r){if(r.values)return r.values();if("undefined"==typeof Symbol||!Symbol.iterator)throw new Error("Symbol.iterator not supported in this browser");var e={};return e[Symbol.iterator]=function(){var e=Object.keys(r),t=0;return{next:function(){return t<e.length?{value:r[e[t++]],done:!1}:{value:void 0,done:!0}}}},e}function u(){this.registry=new w}function l(e){if(!(e instanceof S))throw new TypeError("Module instantiation did not return a valid namespace object.");return e}(u.prototype.constructor=u).prototype.import=function(t,r){if("string"!=typeof t)throw new TypeError("Loader import method must be passed a module key string");var e=this;return o.then(function(){return e[g](t,r)}).then(l).catch(function(e){throw O(e,"Loading "+t+(r?" from "+r:""))})};var d=u.resolve=e("resolve"),g=u.resolveInstantiate=e("resolveInstantiate");function h(e){if(void 0===e)throw new RangeError("No resolution found.");return e}u.prototype[g]=function(e,t){var r=this;return r.resolve(e,t).then(function(e){return r.registry.get(e)})},u.prototype.resolve=function(t,r){var e=this;return o.then(function(){return e[d](t,r)}).then(h).catch(function(e){throw O(e,"Resolving "+t+(r?" to "+r:""))})};var m="undefined"!=typeof Symbol&&Symbol.iterator,v=e("registry");function w(){this[v]={}}m&&(w.prototype[Symbol.iterator]=function(){return this.entries()[Symbol.iterator]()},w.prototype.entries=function(){var t=this[v];return s(Object.keys(t).map(function(e){return[e,t[e]]}))}),w.prototype.keys=function(){return s(Object.keys(this[v]))},w.prototype.values=function(){var t=this[v];return s(Object.keys(t).map(function(e){return t[e]}))},w.prototype.get=function(e){return this[v][e]},w.prototype.set=function(e,t){if(!(t instanceof S))throw new Error("Registry must be set with an instance of Module Namespace");return this[v][e]=t,this},w.prototype.has=function(e){return Object.hasOwnProperty.call(this[v],e)},w.prototype.delete=function(e){return!!Object.hasOwnProperty.call(this[v],e)&&(delete this[v][e],!0)};var x=e("baseObject");function S(e){Object.defineProperty(this,x,{value:e}),Object.keys(e).forEach(k,this)}function k(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[x][e]}})}S.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(S.prototype,Symbol.toStringTag,{value:"Module"});var j=e("register-internal");function _(){u.call(this);var r=this.registry.delete;this.registry.delete=function(e){var t=r.call(this,e);return n.hasOwnProperty(e)&&!n[e].linkRecord&&(delete n[e],t=!0),t};var n={};this[j]={lastRegister:void 0,records:n},this.trace=!1}var P=((_.prototype=Object.create(u.prototype)).constructor=_).instantiate=e("instantiate");function M(e,t,r){return e.records[t]={key:t,registration:r,module:void 0,importerSetters:void 0,loadError:void 0,evalError:void 0,linkRecord:{instantiatePromise:void 0,dependencies:void 0,execute:void 0,executingRequire:!1,moduleObj:void 0,setters:void 0,depsInstantiatePromise:void 0,dependencyInstantiations:void 0}}}function R(d,c,f,p,g){return f.instantiatePromise||(f.instantiatePromise=(c.registration?Promise.resolve():Promise.resolve().then(function(){return g.lastRegister=void 0,d[P](c.key,1<d[P].length&&(t=c,r=g,function(){var e=r.lastRegister;return e?(r.lastRegister=void 0,t.registration=e,!0):!!t.registration}));var t,r})).then(function(e){if(void 0!==e){if(!(e instanceof S))throw new TypeError("Instantiate did not return a valid Module object.");return delete g.records[c.key],d.trace&&L(d,c,f),p[c.key]=e}var t,r,n,o,i,a,s,u,l=c.registration;if(c.registration=void 0,!l)throw new TypeError("Module instantiation did not call an anonymous or correctly named System.register.");return f.dependencies=l[0],c.importerSetters=[],f.moduleObj={},l[2]?(f.moduleObj.default=f.moduleObj.__useDefault={},f.executingRequire=l[1],f.execute=l[2]):(t=d,r=c,n=f,o=l[1],i=n.moduleObj,a=r.importerSetters,s=!1,u=o.call(E,function(e,t){if("object"==typeof e){var r=!1;for(var n in e)t=e[n],"__useDefault"===n||n in i&&i[n]===t||(r=!0,i[n]=t);if(!1===r)return t}else{if((s||e in i)&&i[e]===t)return t;i[e]=t}for(var o=0;o<a.length;o++)a[o](i);return t},new A(t,r.key)),n.setters=u.setters,n.execute=u.execute,u.exports&&(n.moduleObj=i=u.exports,s=!0)),c}).catch(function(e){throw c.linkRecord=void 0,c.loadError=c.loadError||O(e,"Instantiating "+c.key)}))}function C(o,i,e,a,s,u){return o.resolve(i,e).then(function(e){u&&(u[i]=e);var t=s.records[e],r=a[e];if(r&&(!t||t.module&&r!==t.module))return r;if(t&&t.loadError)throw t.loadError;(!t||!r&&t.module)&&(t=M(s,e,t&&t.registration));var n=t.linkRecord;return n?R(o,t,n,a,s):t})}function L(e,t,r){e.loads=e.loads||{},e.loads[t.key]={key:t.key,deps:r.dependencies,dynamicDeps:[],depMap:r.depMap||{}}}function A(e,t){this.loader=e,this.key=this.id=t,this.meta={url:t}}function K(e,t,r,n,o,i){if(t.module)return t.module;if(t.evalError)throw t.evalError;if(i&&-1!==i.indexOf(t))return t.linkRecord.moduleObj;var a=function e(t,r,n,o,i,a){a.push(r);var s;if(n.setters)for(var u,l,d=0;d<n.dependencies.length;d++)if(!((u=n.dependencyInstantiations[d])instanceof S)&&((l=u.linkRecord)&&-1===a.indexOf(u)&&(s=u.evalError?u.evalError:e(t,u,l,o,i,l.setters?a:[])),s))return r.linkRecord=void 0,r.evalError=O(s,"Evaluating "+r.key),r.evalError;if(n.execute)if(n.setters)s=function(e){try{e.call(I)}catch(e){return e}}(n.execute);else{var c={id:r.key},f=n.moduleObj;Object.defineProperty(c,"exports",{configurable:!0,set:function(e){f.default=f.__useDefault=e},get:function(){return f.__useDefault}});var p=(m=t,v=r.key,y=n.dependencies,b=n.dependencyInstantiations,w=o,x=i,k=a,function(e){for(var t=0;t<y.length;t++)if(y[t]===e){var r,n=b[t];return"__useDefault"in(r=n instanceof S?n:K(m,n,n.linkRecord,w,x,k))?r.__useDefault:r}throw new Error("Module "+e+" not declared as a System.registerDynamic dependency of "+v)});if(!n.executingRequire)for(var d=0;d<n.dependencies.length;d++)p(n.dependencies[d]);s=function(e,t,r,n){try{var o=e.call(E,t,r,n);void 0!==o&&(n.exports=o)}catch(e){return e}}(n.execute,p,f.default,c),c.exports!==f.__useDefault&&(f.default=f.__useDefault=c.exports);var g=f.default;if(g&&g.__esModule)for(var h in g)Object.hasOwnProperty.call(g,h)&&(f[h]=g[h])}var m,v,y,b,w,x,k;r.linkRecord=void 0;if(s)return r.evalError=O(s,"Evaluating "+r.key);o[r.key]=r.module=new S(n.moduleObj);if(!n.setters){if(r.importerSetters)for(var d=0;d<r.importerSetters.length;d++)r.importerSetters[d](r.module);r.importerSetters=void 0}}(e,t,r,n,o,r.setters?[]:i||[]);if(a)throw a;return t.module}_.prototype[_.resolve=u.resolve]=function(e,t){return b(e,t||y)},_.prototype[P]=function(e,t){},_.prototype[u.resolveInstantiate]=function(e,t){var n=this,o=this[j],i=this.registry[v];return function(r,e,t,n,o){var i=n[e];if(i)return Promise.resolve(i);var a=o.records[e];if(a&&!a.module)return a.loadError?Promise.reject(a.loadError):R(r,a,a.linkRecord,n,o);return r.resolve(e,t).then(function(e){if(i=n[e])return i;if((a=o.records[e])&&!a.module||(a=M(o,e,a&&a.registration)),a.loadError)return Promise.reject(a.loadError);var t=a.linkRecord;return t?R(r,a,t,n,o):a})}(n,e,t,i,o).then(function(e){if(e instanceof S)return e;var u,t,l,d,r=e.linkRecord;if(!r){if(e.module)return e.module;throw e.evalError}return(u=n,t=e,l=i,d=o,new Promise(function(o,r){var n=[],i=0;function a(e){var t=e.linkRecord;t&&-1===n.indexOf(e)&&(n.push(e),i++,function(e,o,i,t,r){if(i.depsInstantiatePromise)return i.depsInstantiatePromise;for(var n=Array(i.dependencies.length),a=0;a<i.dependencies.length;a++)n[a]=C(e,i.dependencies[a],o.key,t,r,e.trace&&i.depMap||(i.depMap={}));var s=Promise.all(n).then(function(e){if(i.dependencyInstantiations=e,i.setters)for(var t=0;t<e.length;t++){var r=i.setters[t];if(r){var n=e[t];if(n instanceof S)r(n);else{if(n.loadError)throw n.loadError;r(n.module||n.linkRecord.moduleObj),n.importerSetters&&n.importerSetters.push(r)}}}return o});return e.trace&&(s=s.then(function(){return L(e,o,i),o})),(s=s.catch(function(e){throw i.depsInstantiatePromise=void 0,O(e,"Loading "+o.key)})).catch(function(){}),i.depsInstantiatePromise=s}(u,e,t,l,d).then(s,r))}function s(e){i--;var t=e.linkRecord;if(t)for(var r=0;r<t.dependencies.length;r++){var n=t.dependencyInstantiations[r];n instanceof S||a(n)}0===i&&o()}a(t)})).then(function(){return K(n,e,r,i,o,void 0)})})},_.prototype.register=function(e,t,r){var n=this[j];void 0===r?n.lastRegister=[e,t,void 0]:(n.records[e]||M(n,e,void 0)).registration=[t,r,void 0]},_.prototype.registerDynamic=function(e,t,r,n){var o=this[j];"string"!=typeof e?o.lastRegister=[e,t,r]:(o.records[e]||M(o,e,void 0)).registration=[t,r,n]},A.prototype.import=function(e){return this.loader.trace&&this.loader.loads[this.key].dynamicDeps.push(e),this.loader.import(e,this.key)};var I={};Object.freeze&&Object.freeze(I);var D=Promise.resolve();function F(){}var q,U=new S({});var T,z=e("loader-config"),J=e("metadata"),N="undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts;function $(e,t){(t||this.warnings&&"undefined"!=typeof console&&console.warn)&&console.warn(e)}function B(e,t){for(var r in t)Object.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}function W(e,t){for(var r in t)Object.hasOwnProperty.call(t,r)&&void 0===e[r]&&(e[r]=t[r]);return e}function G(e,t,r){for(var n in t)if(Object.hasOwnProperty.call(t,n)){var o=t[n];void 0===e[n]?e[n]=o:o instanceof Array&&e[n]instanceof Array?e[n]=[].concat(r?o:e[n]).concat(r?e[n]:o):"object"==typeof o&&null!==o&&"object"==typeof e[n]?e[n]=(r?W:B)(B({},e[n]),o):r||(e[n]=o)}}var H=!1,Z=!1;function X(e){if(H||Z){var t=document.createElement("link");H?(t.rel="preload",t.as="script"):t.rel="prefetch",t.href=e,document.head.appendChild(t)}else{(new Image).src=e}}if(p&&function(){var e=document.createElement("link").relList;if(e&&e.supports){Z=!0;try{H=e.supports("preload")}catch(e){}}}(),p){var Y=window.onerror;window.onerror=function(e,t){Y&&Y.apply(this,arguments)}}function Q(t,e,r,n,o){if(t=t.replace(/#/g,"%23"),N)return function(e,t,r){try{importScripts(e)}catch(e){r(e)}t()}(t,n,o);var i=document.createElement("script");function a(){n(),u()}function s(e){u(),o(new Error("Fetching "+t))}function u(){i.removeEventListener("load",a,!1),i.removeEventListener("error",s,!1),document.head.removeChild(i)}i.type="text/javascript",i.charset="utf-8",i.async=!0,e&&(i.crossOrigin=e),r&&(i.integrity=r),i.addEventListener("load",a,!1),i.addEventListener("error",s,!1),i.src=t,document.head.appendChild(i)}function V(e,t){for(var r=e.split(".");r.length;)t=t[r.shift()];return t}function ee(e,t,r){var n=re(t,r);if(n){var o=t[n]+r.substr(n.length),i=b(o,y);return void 0!==i?i:e+o}return-1!==r.indexOf(":")?r:e+r}function te(e){var t=this.name;if(t.substr(0,e.length)===e&&(t.length===e.length||"/"===t[e.length]||"/"===e[e.length-1]||":"===e[e.length-1])){var r=e.split("/").length;r>this.len&&(this.match=e,this.len=r)}}function re(e,t){if(Object.hasOwnProperty.call(e,t))return t;var r={name:t,match:void 0,len:0};return Object.keys(e).forEach(te,r),r.match}var ne,oe=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)\s*\)/g;function ie(e,t,r,n){if("file:///"===e.substr(0,8)){if(se)return ae(e,t,r,n);throw new Error("Unable to fetch file URLs in this environment.")}e=e.replace(/#/g,"%23");var o={headers:{Accept:"application/x-es-module, */*"}};return r&&(o.integrity=r),t&&("string"==typeof t&&(o.headers.Authorization=t),o.credentials="include"),fetch(e,o).then(function(e){if(e.ok)return n?e.arrayBuffer():e.text();throw new Error("Fetch error: "+e.status+" "+e.statusText)})}function ae(i,a,e,s){return new Promise(function(e,t){i=i.replace(/#/g,"%23");var r=new XMLHttpRequest;function n(){e(s?r.response:r.responseText)}function o(){t(new Error("XHR error: "+(r.status?" ("+r.status+(r.statusText?" "+r.statusText:"")+")":"")+" loading "+i))}s&&(r.responseType="arraybuffer"),r.onreadystatechange=function(){4===r.readyState&&(0==r.status?r.response?n():(r.addEventListener("error",o),r.addEventListener("load",n)):200===r.status?n():o())},r.open("GET",i,!0),r.setRequestHeader&&(r.setRequestHeader("Accept","application/x-es-module, */*"),a&&("string"==typeof a&&r.setRequestHeader("Authorization",a),r.withCredentials=!0)),r.send(null)})}var se="undefined"!=typeof XMLHttpRequest,ue="undefined"!=typeof fetch,le="undefined"!=typeof self&&void 0!==self.fetch?ie:se?ae:"undefined"!="function"&&"undefined"!=typeof process?function(e,t,r,i){return"file:///"!=e.substr(0,8)?ue?ie(e,t,r,i):Promise.reject(new Error('Unable to fetch "'+e+'". Only file URLs of the form file:/// supported running in Node without fetch.')):(ne=ne||__webpack_require__(3),e=a?e.replace(/\//g,"\\").substr(8):e.substr(7),new Promise(function(n,o){ne.readFile(e,function(e,t){if(e)return o(e);if(i)n(t);else{var r=t+"";"\ufeff"===r[0]&&(r=r.substr(1)),n(r)}})}))}:function(){throw new Error("No fetch method is defined for this environment.")};function de(e,t,r){var n,o={pluginKey:void 0,pluginArgument:void 0,pluginModule:void 0,packageKey:void 0,packageConfig:void 0,load:void 0};r&&(t.pluginFirst?-1!==(n=r.lastIndexOf("!"))&&(o.pluginArgument=o.pluginKey=r.substr(0,n)):-1!==(n=r.indexOf("!"))&&(o.pluginArgument=o.pluginKey=r.substr(n+1)),o.packageKey=re(t.packages,r),o.packageKey&&(o.packageConfig=t.packages[o.packageKey]));return o}function ce(e,t){var r=me(e.pluginFirst,t);if(r){var n=ce.call(this,e,r.plugin);return ve(e.pluginFirst,fe.call(this,e,r.argument,void 0,!1,!1),n)}return fe.call(this,e,t,void 0,!1,!1)}function fe(e,t,r,n,o){var i=b(t,r||y);if(i)return ee(e.baseURL,e.paths,i);if(n){var a=re(e.map,t);if(a&&(i=b(t=e.map[a]+t.substr(a.length),y)))return ee(e.baseURL,e.paths,i)}if(this.registry.has(t))return t;if("@node/"===t.substr(0,6))return t;var s=o&&"/"!==t[t.length-1],u=ee(e.baseURL,e.paths,s?t+"/":t);return s?u.substr(0,u.length-1):u}function pe(e,t,r,n,o,i){if(o&&o.packageConfig&&"."!==t[0]){var a=o.packageConfig.map,s=a&&re(a,t);if(s&&"string"==typeof a[s]){var u=we(this,e,o.packageConfig,o.packageKey,s,t,n,i);if(u)return u}}var l=fe.call(this,e,t,r,!0,!0),d=Ee(e,l);if(n.packageKey=d&&d.packageKey||re(e.packages,l),!n.packageKey)return l;if(-1!==e.packageConfigKeys.indexOf(l))return n.packageKey=void 0,l;n.packageConfig=e.packages[n.packageKey]||(e.packages[n.packageKey]=Ae());var c=l.substr(n.packageKey.length+1);return function(e,t,r,n,o,i,a){if(!o){if(!r.main)return n;o="./"===r.main.substr(0,2)?r.main.substr(2):r.main}if(r.map){var s="./"+o,u=re(r.map,s);if(u||(s="./"+ye(t,r,n,o,a))!=="./"+o&&(u=re(r.map,s)),u){var l=we(e,t,r,n,u,s,i,a);if(l)return l}}return n+"/"+ye(t,r,n,o,a)}(this,e,n.packageConfig,n.packageKey,c,n,i)}function ge(n,o,i,a,r,s){var u=this;return D.then(function(){if(r&&r.packageConfig&&"./"!==o.substr(0,2)){var e=r.packageConfig.map,t=e&&re(e,o);if(t)return xe(u,n,r.packageConfig,r.packageKey,t,o,a,s)}return D}).then(function(e){if(e)return e;var t=fe.call(u,n,o,i,!0,!0),r=Ee(n,t);return a.packageKey=r&&r.packageKey||re(n.packages,t),a.packageKey?-1!==n.packageConfigKeys.indexOf(t)?(a.packageKey=void 0,a.load=he(),a.load.format="json",a.load.loader="",Promise.resolve(t)):(a.packageConfig=n.packages[a.packageKey]||(n.packages[a.packageKey]=Ae()),(r&&!a.packageConfig.configured?function(e,t,r,n,o){var i=e.pluginLoader||e;-1===t.packageConfigKeys.indexOf(r)&&t.packageConfigKeys.push(r);return i.import(r).then(function(e){Ke(n.packageConfig,e,n.packageKey,!0,t),n.packageConfig.configured=!0}).catch(function(e){throw O(e,"Unable to fetch package configuration file "+r)})}(u,n,r.configPath,a):D).then(function(){var e=t.substr(a.packageKey.length+1);return function(e,t,r,n,o,i,a){if(!o){if(!r.main)return Promise.resolve(n);o="./"===r.main.substr(0,2)?r.main.substr(2):r.main}var s,u;r.map&&(s="./"+o,(u=re(r.map,s))||(s="./"+ye(t,r,n,o,a))!=="./"+o&&(u=re(r.map,s)));return(u?xe(e,t,r,n,u,s,i,a):D).then(function(e){return e?Promise.resolve(e):Promise.resolve(n+"/"+ye(t,r,n,o,a))})}(u,n,a.packageConfig,a.packageKey,e,a,s)})):Promise.resolve(t)})}function he(){return{extension:"",deps:void 0,format:void 0,loader:void 0,scriptLoad:void 0,globals:void 0,nonce:void 0,integrity:void 0,sourceMap:void 0,exports:void 0,encapsulateGlobal:!1,crossOrigin:void 0,cjsRequireDetection:!0,cjsDeferDepsExecute:!1,esModule:!1}}function me(e,t){var r,n,o=e?t.indexOf("!"):t.lastIndexOf("!");if(-1!==o)return e?(r=t.substr(o+1),n=t.substr(0,o)):(r=t.substr(0,o),n=t.substr(o+1)||r.substr(r.lastIndexOf(".")+1)),{argument:r,plugin:n}}function ve(e,t,r){return e?r+"!"+t:t+"!"+r}function ye(e,t,r,n,o){if(!n||!t.defaultExtension||"/"===n[n.length-1]||o)return n;var i=!1;if(t.meta&&Oe(t.meta,n,function(e,t,r){if(0===r||e.lastIndexOf("*")!==e.length-1)return i=!0}),!i&&e.meta&&Oe(e.meta,r+"/"+n,function(e,t,r){if(0===r||e.lastIndexOf("*")!==e.length-1)return i=!0}),i)return n;var a="."+t.defaultExtension;return n.substr(n.length-a.length)!==a?n+a:n}function be(e,t,r){return!(t.substr(0,e.length)===e&&r.length>e.length)}function we(e,t,r,n,o,i,a,s){"/"===i[i.length-1]&&(i=i.substr(0,i.length-1));var u=r.map[o];if("object"==typeof u)throw new Error("Synchronous conditional normalization not supported sync normalizing "+o+" in "+n);if(be(o,u,i)&&"string"==typeof u)return pe.call(e,t,u+i.substr(o.length),n+"/",a,a,s)}function xe(t,r,e,n,o,i,a,s){"/"===i[i.length-1]&&(i=i.substr(0,i.length-1));var u=e.map[o];if("string"==typeof u)return be(o,u,i)?ge.call(t,r,u+i.substr(o.length),n+"/",a,a,s).then(function(e){return Me.call(t,e,n+"/",a)}):D;var l=[],d=[];for(var c in u){var f=je(c);d.push({condition:f,map:u[c]}),l.push(_.prototype.import.call(t,f.module,n))}return Promise.all(l).then(function(e){for(var t=0;t<d.length;t++){var r=d[t].condition,n=V(r.prop,"__useDefault"in e[t]?e[t].__useDefault:e[t]);if(!r.negate&&n||r.negate&&!n)return d[t].map}}).then(function(e){if(e)return be(o,e,i)?ge.call(t,r,e+i.substr(o.length),n+"/",a,a,s).then(function(e){return Me.call(t,e,n+"/",a)}):D})}var ke={};function Ee(e,t){for(var r,n,o,i,a,s=!1,u=0;u<e.packageConfigPaths.length;u++){var l=e.packageConfigPaths[u],d=ke[l]||(ke[l]=(void 0,i=(o=l).lastIndexOf("*"),{length:a=Math.max(i+1,o.lastIndexOf("/")),regEx:new RegExp("^("+o.substr(0,a).replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^\\/]+")+")(\\/|$)"),wildcard:-1!==i}));if(!(t.length<d.length)){var c=t.match(d.regEx);!c||r&&(s&&d.wildcard||!(r.length<c[1].length))||(r=c[1],s=!d.wildcard,n=r+l.substr(d.length))}}if(r)return{packageKey:r,configPath:n}}function Oe(e,t,r){var n;for(var o in e){var i="./"===o.substr(0,2)?"./":"";if(i&&(o=o.substr(2)),-1!==(n=o.indexOf("*"))&&o.substr(0,n)===t.substr(0,n)&&o.substr(n+1)===t.substr(t.length-o.length+n+1)&&r(o,e[i+o],o.split("/").length))return}var a=e[t]&&Object.hasOwnProperty.call(e,t)?e[t]:e["./"+t];a&&r(a,a,0)}var Se=["browser","node","dev","build","production","default"];function je(e){var t,r,n,o=e.lastIndexOf("|");return-1!==o?(t=e.substr(o+1),r=e.substr(0,o),"~"===t[0]&&(n=!0,t=t.substr(1))):(n="~"===e[0],t="default",r=e.substr(n),-1!==Se.indexOf(r)&&(t=r,r=null)),{module:r||"@system-env",prop:t,negate:n}}function _e(r,e,n){return _.prototype.import.call(this,r.module,e).then(function(e){var t=V(r.prop,e);if(n&&"boolean"!=typeof t)throw new TypeError("Condition did not resolve to a boolean.");return r.negate?!t:t})}var Pe=/#\{[^\}]+\}/;function Me(t,r,e){var n=t.match(Pe);if(!n)return Promise.resolve(t);var o=je.call(this,n[0].substr(2,n[0].length-3));return _e.call(this,o,r,!1).then(function(e){if("string"!=typeof e)throw new TypeError("The condition value for "+t+" doesn't resolve to a string.");if(-1!==e.indexOf("/"))throw new TypeError("Unabled to interpolate conditional "+t+(r?" in "+r:"")+"\n\tThe condition value "+e+' cannot contain a "/" separator.');return t.replace(Pe,e)})}var Re=["browserConfig","nodeConfig","devConfig","buildConfig","productionConfig"];function Ce(e,t,r){for(var n=0;n<Re.length;n++){var o=Re[n];t[o]&&Pt[o.substr(0,o.length-6)]&&r(t[o])}}function Le(e,t){var r=e[t];return r instanceof Array?e[t].concat([]):"object"==typeof r?function e(t,r){var n={};for(var o in t){var i=t[o];1<r?i instanceof Array?n[o]=[].concat(i):"object"==typeof i?n[o]=e(i,r-1):"packageConfig"!==o&&(n[o]=i):n[o]=i}return n}(r,3):e[t]}function Ae(){return{defaultExtension:void 0,main:void 0,format:void 0,meta:void 0,map:void 0,packageConfig:void 0,configured:!1}}function Ke(e,t,r,n,o){for(var i in t)"main"===i||"format"===i||"defaultExtension"===i||"configured"===i?n&&void 0!==e[i]||(e[i]=t[i]):"map"===i?(n?W:B)(e.map=e.map||{},t.map):"meta"===i?(n?W:B)(e.meta=e.meta||{},t.meta):Object.hasOwnProperty.call(t,i)&&$.call(o,'"'+i+'" is not a valid package configuration option in package '+r);return void 0===e.defaultExtension&&(e.defaultExtension="js"),void 0===e.main&&e.map&&e.map["."]?(e.main=e.map["."],delete e.map["."]):"object"==typeof e.main&&(e.map=e.map||{},e.map["./@main"]=e.main,e.main.default=e.main.default||"./",e.main="@main"),e}var Ie="undefined"!=typeof Buffer;try{Ie&&"YQ=="!==new Buffer("a").toString("base64")&&(Ie=!1)}catch(e){Ie=!1}var De,Fe,qe,Ue,Te="\n//# sourceMappingURL=data:application/json;base64,";function ze(e,t,r,n){var o,i=e.lastIndexOf("\n");if(t){if("object"!=typeof t)throw new TypeError("load.metadata.sourceMap must be set to an object.");t=JSON.stringify(t)}return(n?"(function(System, SystemJS) {":"")+e+(n?"\n})(System, System);":"")+("\n//# sourceURL="!=e.substr(i,15)?"\n//# sourceURL="+r+(t?"!transpiled":""):"")+(t&&(o=t,Ie?Te+new Buffer(o).toString("base64"):"undefined"!=typeof btoa?Te+btoa(unescape(encodeURIComponent(o))):"")||"")}var Je=0;function Ne(e){0==Je++&&(Ue=E.System),E.System=E.SystemJS=e}function $e(){0==--Je&&(E.System=E.SystemJS=Ue)}var Be,We=!1;function Ge(e,t,r,n,o,i,a){if(t){if(i&&We)return function(e,t,r,n,o){De||(De=document.head||document.body||document.documentElement);var i=document.createElement("script");i.text=ze(t,r,n,!1);var a,s=window.onerror;if(window.onerror=function(e){a=addToError(e,"Evaluating "+n),s&&s.apply(this,arguments)},Ne(e),o&&i.setAttribute("nonce",o),De.appendChild(i),De.removeChild(i),$e(),window.onerror=s,a)return a}(e,t,r,n,i);try{Ne(e),!Fe&&e._nodeRequire&&(Fe=e._nodeRequire("vm"),qe=Fe.runInThisContext("typeof System !== 'undefined' && System")===e),qe?Fe.runInThisContext(ze(t,r,n,!a),{filename:n+(r?"!transpiled":"")}):(0,eval)(ze(t,r,n,!a)),$e()}catch(e){return $e(),e}}}function He(p){function g(e,t,r,n){if("object"==typeof e&&!(e instanceof Array))return g.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof t&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var o=p.decanonicalize(e,n),i=p.get(o);if(!i)throw new Error('Module not already loaded loading "'+e+'" as '+o+(n?' from "'+n+'".':"."));return"__useDefault"in i?i.__useDefault:i}throw new TypeError("Invalid require")}for(var a=[],s=0;s<e.length;s++)a.push(p.import(e[s],n));Promise.all(a).then(function(e){t&&t.apply(null,e)},r)}function e(e,u,l){var t,d,c,f;function r(n,e,o){for(var t=[],r=0;r<u.length;r++)t.push(n(u[r]));if(o.uri=o.id,o.config=F,-1!==f&&t.splice(f,0,o),-1!==c&&t.splice(c,0,e),-1!==d){var i=function(e,t,r){return"string"==typeof e&&"function"!=typeof t?n(e):g.call(p,e,t,r,o.id)};i.toUrl=function(e){return p.normalizeSync(e,o.id)},t.splice(d,0,i)}var a=E.require;E.require=g;var s=l.apply(-1===c?E:e,t);E.require=a,void 0!==s&&(o.exports=s)}"string"!=typeof e&&(l=u,u=e,e=null),u instanceof Array||(u=["require","exports","module"].splice(0,(l=u).length)),"function"!=typeof l&&(t=l,l=function(){return t}),e||ft&&(u=u.concat(ft),ft=void 0),-1!==(d=u.indexOf("require"))&&(u.splice(d,1),e||(u=u.concat(function(e,t){var r=((e=e.replace(Qe,"")).match(st)[1].split(",")[t]||"require").replace(ut,""),n=lt[r]||(lt[r]=new RegExp(it+r+at,"g"));n.lastIndex=0;var o,i=[];for(;o=n.exec(e);)i.push(o[2]||o[3]);return i}(l.toString(),d)))),-1!==(c=u.indexOf("exports"))&&u.splice(c,1),-1!==(f=u.indexOf("module"))&&u.splice(f,1),e?(p.registerDynamic(e,u,!1,r),ct?pt=!(ct=void 0):pt||(ct=[u,r])):p.registerDynamic(u,!1,gt?dt(r):r)}e.amd={},p.amdDefine=e,p.amdRequire=g}function Ze(e){return"file:///"===e.substr(0,8)?e.substr(7+!!a):Be&&e.substr(0,Be.length)===Be?e.substr(Be.length):e}function Xe(e,t){return Ze(this.normalizeSync(e,t))}function Ye(e){var t,r=e.lastIndexOf("!"),n=(t=-1!==r?e.substr(0,r):e).split("/");return n.pop(),n=n.join("/"),{filename:Ze(t),dirname:Ze(n)}}p&&"undefined"!=typeof document&&document.getElementsByTagName&&(window.chrome&&window.chrome.extension||navigator.userAgent.match(/^Node\.js/)||(We=!0)),"undefined"!=typeof window&&"undefined"!=typeof document&&window.location&&(Be=location.protocol+"//"+location.hostname+(location.port?":"+location.port:""));var Qe=/(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,Ve=/("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g;var et,tt=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","mozPaintCount","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];function rt(t){if(-1===tt.indexOf(t)){try{var e=E[t]}catch(e){tt.push(t)}this(t,e)}}function nt(e){if("string"==typeof e)return V(e,E);if(!(e instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},r=0;r<e.length;r++)t[e[r].split(".").pop()]=V(e[r],E);return t}function ot(e,i,t,a){var s,u=E.define;if(E.define=void 0,t)for(var r in s={},t)s[r]=E[r],E[r]=t[r];return i||(et={},Object.keys(E).forEach(rt,function(e,t){et[e]=t})),function(){var r,n=i?nt(i):{},o=!!i;if(i&&!a||Object.keys(E).forEach(rt,function(e,t){et[e]!==t&&void 0!==t&&(a&&(E[e]=void 0),i||(n[e]=t,void 0!==r?o||r===t||(o=!0):r=t))}),n=o?n:r,s)for(var e in s)E[e]=s[e];return E.define=u,n}}var it="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",at="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",st=/\(([^\)]*)\)/,ut=/^\s+|\s+$/g,lt={};function dt(n){return function(e,t,r){n(e,t,r),"object"!=typeof(t=r.exports)&&"function"!=typeof t||"__esModule"in t||Object.defineProperty(r.exports,"__esModule",{value:!0})}}var ct,ft,pt=!1,gt=!1;var ht,mt=(p||N)&&"undefined"!=typeof navigator&&navigator.userAgent&&!navigator.userAgent.match(/MSIE (9|10).0/);function vt(e,t){!e.load.esModule||"object"!=typeof t&&"function"!=typeof t||"__esModule"in t||Object.defineProperty(t,"__esModule",{value:!0})}function yt(p,g,e,h,m){return Promise.resolve(e).then(function(e){return"detect"===h.load.format&&(h.load.format=void 0),function(e,t){var r=e.match(Mt);if(!r)return;for(var n=r[0].match(Rt),o=0;o<n.length;o++){var i=n[o],a=i.length,s=i.substr(0,1);if(";"==i.substr(a-1,1)&&a--,'"'==s||"'"==s){var u=i.substr(1,i.length-3),l=u.substr(0,u.indexOf(" "));if(l){var d=u.substr(l.length+1,u.length-l.length-1);"deps"===l&&(l="deps[]"),"[]"===l.substr(l.length-2,2)?(l=l.substr(0,l.length-2),t.load[l]=t.load[l]||[],t.load[l].push(d)):"use"!==l&&Ct(t.load,l,d)}else t.load[u]=!0}}}(e,h),h.pluginModule?(h.pluginLoad.source=e,h.pluginModule.translate?Promise.resolve(h.pluginModule.translate.call(p,h.pluginLoad,h.traceOpts)).then(function(e){if(h.load.sourceMap){if("object"!=typeof h.load.sourceMap)throw new Error("metadata.load.sourceMap must be set to an object.");jt(h.pluginLoad.address,h.load.sourceMap)}return"string"==typeof e?e:h.pluginLoad.source}):e):e}).then(function(e){return h.load.format||'"bundle"'!==e.substring(0,8)?"register"===h.load.format||!h.load.format&&kt(e)?(h.load.format="register",e):"esm"===h.load.format||!h.load.format&&e.match(wt)?(h.load.format="esm",function(t,r,n,o,e){if(!t.transpiler)throw new TypeError("Unable to dynamically transpile ES module\n   A loader plugin needs to be configured via `SystemJS.config({ transpiler: 'transpiler-module' })`.");if(o.load.deps){for(var i="",a=0;a<o.load.deps.length;a++)i+='import "'+o.load.deps[a]+'"; ';r=i+r}return t.import.call(t,t.transpiler).then(function(e){if(!(e=e.__useDefault||e).translate)throw new Error(t.transpiler+" is not a valid transpiler plugin.");return e===o.pluginModule?r:("string"==typeof o.load.sourceMap&&(o.load.sourceMap=JSON.parse(o.load.sourceMap)),o.pluginLoad=o.pluginLoad||{name:n,address:n,source:r,metadata:o.load},o.load.deps=o.load.deps||[],Promise.resolve(e.translate.call(t,o.pluginLoad,o.traceOpts)).then(function(e){var t=o.load.sourceMap;return t&&"object"==typeof t&&jt(n,t),"esm"===o.load.format&&kt(e)&&(o.load.format="register"),e}))},function(e){throw O(e,"Unable to load transpiler to transpile "+n)})}(p,e,g,h)):e:(h.load.format="system",e)}).then(function(r){if("string"!=typeof r||!h.pluginModule||!h.pluginModule.instantiate)return r;var n=!1;return h.pluginLoad.source=r,Promise.resolve(h.pluginModule.instantiate.call(p,h.pluginLoad,function(e){if(r=e.source,h.load=e.metadata,n)throw new Error("Instantiate must only be called once.");n=!0})).then(function(e){return n?r:(t=e)instanceof S?t:t&&t.__esModule?new S(t):new S({default:t,__useDefault:t});var t})}).then(function(d){if("string"!=typeof d)return d;var e;h.load.format||(h.load.format=(e=d).match(Et)?"amd":(Ot.lastIndex=0,oe.lastIndex=0,oe.exec(e)||Ot.exec(e)?"cjs":"global"));var t,r,n,o=!1;switch(h.load.format){case"esm":case"register":case"system":if(s=Ge(p,d,h.load.sourceMap,g,h.load.integrity,h.load.nonce,!1))throw s;return m()?void 0:U;case"json":var i=JSON.parse(d);return p.newModule({default:i,__useDefault:i});case"amd":var a=E.define;E.define=p.amdDefine,r=h.load.deps,n=h.load.esModule,ft=r,gt=n,ct=void 0,pt=!1;var s=Ge(p,d,h.load.sourceMap,g,h.load.integrity,h.load.nonce,!1);if((o=m())||(t=p,ct?t.registerDynamic(ft?ct[0].concat(ft):ct[0],!1,gt?dt(ct[1]):ct[1]):pt&&t.registerDynamic([],!1,F),o=m()),E.define=a,s)throw s;break;case"cjs":var c=h.load.deps,u=(h.load.deps||[]).concat(h.load.cjsRequireDetection?function(e){oe.lastIndex=Qe.lastIndex=Ve.lastIndex=0;var t,r=[],n=[],o=[];function i(e,t){for(var r=0;r<e.length;r++)if(e[r][0]<t.index&&e[r][1]>t.index)return!0;return!1}if(e.length/e.split("\n").length<200){for(;t=Ve.exec(e);)n.push([t.index,t.index+t[0].length]);for(;t=Qe.exec(e);)i(n,t)||o.push([t.index+t[1].length,t.index+t[0].length-1])}for(;t=oe.exec(e);)if(!i(n,t)&&!i(o,t)){var a=t[1].substr(1,t[1].length-2);if(a.match(/"|'/))continue;r.push(a)}return r}(d):[]);for(var l in h.load.globals)h.load.globals[l]&&u.push(h.load.globals[l]);p.registerDynamic(u,!0,function(e,t,r){if(e.resolve=function(e){return Xe.call(p,e,r.id)},r.paths=[],r.require=e,!h.load.cjsDeferDepsExecute&&c)for(var n=0;n<c.length;n++)e(c[n]);var o=Ye(r.id),i={exports:t,args:[e,t,r,o.filename,o.dirname,E,E]},a="(function (require, exports, module, __filename, __dirname, global, GLOBAL";if(h.load.globals)for(var s in h.load.globals)i.args.push(e(h.load.globals[s])),a+=", "+s;var u=E.define;E.define=void 0,E.__cjsWrapper=i,d=a+") {"+d.replace(St,"")+"\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);";var l=Ge(p,d,h.load.sourceMap,g,h.load.integrity,h.load.nonce,!1);if(l)throw l;vt(h,t),E.__cjsWrapper=void 0,E.define=u}),o=m();break;case"global":u=h.load.deps||[];for(var l in h.load.globals){var f=h.load.globals[l];f&&u.push(f)}p.registerDynamic(u,!1,function(e,t,r){var n;if(h.load.globals)for(var o in n={},h.load.globals)h.load.globals[o]&&(n[o]=e(h.load.globals[o]));var i=h.load.exports;i&&(d+="\n"+bt+'["'+i+'"] = '+i+";");var a=ot(r.id,i,n,h.load.encapsulateGlobal),s=Ge(p,d,h.load.sourceMap,g,h.load.integrity,h.load.nonce,!0);if(s)throw s;var u=a();return vt(h,u),u}),o=m();break;default:throw new TypeError('Unknown module format "'+h.load.format+'" for "'+g+'".'+("es6"===h.load.format?' Use "esm" instead here.':""))}if(!o)throw new Error("Module "+g+" detected as "+h.load.format+" but didn't execute correctly.")})}"undefined"=="function"||"undefined"==typeof process||process.browser||(ht=require);var bt="undefined"!=typeof self?"self":"global",wt=/(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?(?!type)([^"'\(\)\n; ]+)\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/,xt=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;function kt(e){var t=e.match(xt);if(!t)return!1;var r=t[0].length;return e.startsWith("System.register",r)||e.startsWith("SystemJS.register",r)}var Et=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/,Ot=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/,St=/^\#\!.*/;function jt(e,t){var r=e.split("!")[0];t.file&&t.file!=e||(t.file=r+"!transpiled"),(!t.sources||t.sources.length<=1&&(!t.sources[0]||t.sources[0]===e))&&(t.sources=[r])}var _t,Pt,Mt=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,Rt=/\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;function Ct(e,t,r){for(var n,o=t.split(".");1<o.length;)e=e[n=o.shift()]=e[n]||{};void 0===e[n=o.shift()]&&(e[n]=r)}if("undefined"==typeof Promise)throw new Error("SystemJS needs a Promise polyfill.");if("undefined"!=typeof document){var Lt=document.getElementsByTagName("script"),At=Lt[Lt.length-1];document.currentScript&&(At.defer||At.async)&&(At=document.currentScript),_t=At&&At.src}else if("undefined"!=typeof importScripts)try{throw new Error("_")}catch(e){e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/,function(e,t){_t=t})}else"undefined"!=typeof __filename&&(_t=__filename);function Kt(){var e;_.call(this),this._loader={},this[J]={},this[z]={baseURL:y,paths:{},packageConfigPaths:[],packageConfigKeys:[],map:{},packages:{},depCache:{},meta:{},bundles:{},production:!1,transpiler:void 0,loadedBundles:{},warnings:!1,pluginFirst:!1,wasm:!1},this.scriptSrc=_t,this._nodeRequire=__webpack_require__(2),this.registry.set("@empty",U),It.call(this,!1,!1),(e=this).set("@@cjs-helpers",e.newModule({requireResolve:Xe.bind(e),getPathVars:Ye})),e.set("@@global-helpers",e.newModule({prepareGlobal:ot})),He(this)}function It(e,t){this[z].production=e,this.registry.set("@system-env",Pt=this.newModule({browser:p,node:!!this._nodeRequire,production:!t&&e,dev:t||!e,build:t,default:!0}))}((Kt.prototype=Object.create(_.prototype)).constructor=Kt).prototype[Kt.resolve=_.resolve]=Kt.prototype.normalize=function(r,n){var o=this[z],i={pluginKey:void 0,pluginArgument:void 0,pluginModule:void 0,packageKey:void 0,packageConfig:void 0,load:void 0},a=de(0,o,n),s=this;return Promise.resolve().then(function(){var t=r.lastIndexOf("#?");if(-1===t)return Promise.resolve(r);var e=je.call(s,r.substr(t+2));return _e.call(s,e,n,!0).then(function(e){return e?r.substr(0,t):"@empty"})}).then(function(e){var t=me(o.pluginFirst,e);return t?(i.pluginKey=t.plugin,Promise.all([ge.call(s,o,t.argument,a&&a.pluginArgument||n,i,a,!0),s.resolve(t.plugin,n)]).then(function(e){if(i.pluginArgument=e[0],i.pluginKey=e[1],i.pluginArgument===i.pluginKey)throw new Error("Plugin "+i.pluginArgument+" cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.");return ve(o.pluginFirst,e[0],e[1])})):ge.call(s,o,e,a&&a.pluginArgument||n,i,a,!1)}).then(function(e){return Me.call(s,e,n,a)}).then(function(t){return function(e,t,r){r.load=r.load||{extension:"",deps:void 0,format:void 0,loader:void 0,scriptLoad:void 0,globals:void 0,nonce:void 0,integrity:void 0,sourceMap:void 0,exports:void 0,encapsulateGlobal:!1,crossOrigin:void 0,cjsRequireDetection:!0,cjsDeferDepsExecute:!1,esModule:!1};var n,o=0;for(var i in e.meta)if(-1!==(n=i.indexOf("*"))&&i.substr(0,n)===t.substr(0,n)&&i.substr(n+1)===t.substr(t.length-i.length+n+1)){var a=i.split("/").length;o<a&&(o=a),G(r.load,e.meta[i],o!==a)}if(e.meta[t]&&G(r.load,e.meta[t],!1),r.packageKey){var s=t.substr(r.packageKey.length+1),u={};if(r.packageConfig.meta){var o=0;Oe(r.packageConfig.meta,s,function(e,t,r){o<r&&(o=r),G(u,t,r&&r<o)}),G(r.load,u,!1)}!r.packageConfig.format||r.pluginKey||r.load.loader||(r.load.format=r.load.format||r.packageConfig.format)}}.call(s,o,t,i),i.pluginKey||!i.load.loader?t:s.resolve(i.load.loader,t).then(function(e){return i.pluginKey=e,i.pluginArgument=t})}).then(function(e){return s[J][e]=i,e})},Kt.prototype.load=function(e,t){return $.call(this[z],"System.load is deprecated."),this.import(e,t)},Kt.prototype.decanonicalize=Kt.prototype.normalizeSync=Kt.prototype.resolveSync=function e(t,r){var n=this[z],o={pluginKey:void 0,pluginArgument:void 0,pluginModule:void 0,packageKey:void 0,packageConfig:void 0,load:void 0},i=i||de(0,n,r),a=me(n.pluginFirst,t);return a?(o.pluginKey=e.call(this,a.plugin,r),ve(n.pluginFirst,pe.call(this,n,a.argument,i.pluginArgument||r,o,i,!!o.pluginKey),o.pluginKey)):pe.call(this,n,t,i.pluginArgument||r,o,i,!!o.pluginKey)},Kt.prototype[Kt.instantiate=_.instantiate]=function(i,d){var c=this,f=this[z];return(function(e,t,r){var n;if(p&&(n=e.depCache[r]))for(var o=0;o<n.length;o++)t.normalize(n[o],r).then(X);else{var i=!1;for(var a in e.bundles){for(var o=0;o<e.bundles[a].length;o++){var s=e.bundles[a][o];if(s===r){i=!0;break}if(-1!==s.indexOf("*")){var u=s.split("*");if(2!==u.length){e.bundles[a].splice(o--,1);continue}if(r.substr(0,u[0].length)===u[0]&&r.substr(r.length-u[1].length,u[1].length)===u[1]){i=!0;break}}}if(i)return t.import(a)}}}(f,this,i)||D).then(function(){if(!d()){var e,t,r,n=c[J][i];if("@node/"===i.substr(0,6)){if(!c._nodeRequire)throw new TypeError("Error loading "+i+". Can only load node core modules in Node.");return c.registerDynamic([],!1,function(){return function(e,t){if("."===e[0])throw new Error("Node module "+e+" can't be loaded as it is not a package require.");if(!T){var r=this._nodeRequire("module"),n=decodeURI(t.substr(a?8:7));(T=new r(n)).paths=r._nodeModulePaths(n)}return T.require(e)}.call(c,i.substr(6),c.baseURL)}),void d()}return n.load.scriptLoad?!n.load.pluginKey&&mt||(n.load.scriptLoad=!1,$.call(f,'scriptLoad not supported for "'+i+'"')):!1!==n.load.scriptLoad&&!n.load.pluginKey&&mt&&(n.load.deps||n.load.globals||!("system"===n.load.format||"register"===n.load.format||"global"===n.load.format&&n.load.exports)||(n.load.scriptLoad=!0)),n.load.scriptLoad?new Promise(function(t,e){if("amd"===n.load.format&&E.define!==c.amdDefine)throw new Error("Loading AMD with scriptLoad requires setting the global `"+bt+".define = SystemJS.amdDefine`");Q(i,n.load.crossOrigin,n.load.integrity,function(){if(!d()){n.load.format="global";var e=n.load.exports&&nt(n.load.exports);c.registerDynamic([],!1,function(){return vt(n,e),e}),d()}t()},e)}):(e=c,t=i,r=n,r.pluginKey?e.import(r.pluginKey).then(function(e){r.pluginModule=e,r.pluginLoad={name:t,address:r.pluginArgument,source:void 0,metadata:r.load},r.load.deps=r.load.deps||[]}):D).then(function(){return o=c,a=i,s=n,u=d,l=f.wasm,s.load.exports&&!s.load.format&&(s.load.format="global"),D.then(function(){if(s.pluginModule&&s.pluginModule.locate)return Promise.resolve(s.pluginModule.locate.call(o,s.pluginLoad)).then(function(e){e&&(s.pluginLoad.address=e)})}).then(function(){return s.pluginModule?(l=!1,s.pluginModule.fetch?s.pluginModule.fetch.call(o,s.pluginLoad,function(e){return le(e.address,s.load.authorization,s.load.integrity,!1)}):le(s.pluginLoad.address,s.load.authorization,s.load.integrity,!1)):le(a,s.load.authorization,s.load.integrity,l)}).then(function(r){return l&&"string"!=typeof r?(e=o,t=r,i=u,n=new Uint8Array(t),0===n[0]&&97===n[1]&&115===n[2]?WebAssembly.compile(t).then(function(t){var r=[],n=[],o={};return WebAssembly.Module.imports&&WebAssembly.Module.imports(t).forEach(function(e){var t=e.module;n.push(function(e){o[t]=e}),-1===r.indexOf(t)&&r.push(t)}),e.register(r,function(e){return{setters:n,execute:function(){e(new WebAssembly.Instance(t,o).exports)}}}),i(),!0}):Promise.resolve(!1)).then(function(e){if(!e){var t=p?new TextDecoder("utf-8").decode(new Uint8Array(r)):r.toString();return yt(o,a,t,s,u)}}):yt(o,a,r,s,u);var e,t,i,n});var o,a,s,u,l})}}).then(function(e){return delete c[J][i],e})},Kt.prototype.config=function(e,t){var r,n=this,o=this[z];if("warnings"in e&&(o.warnings=e.warnings),"wasm"in e&&(o.wasm="undefined"!=typeof WebAssembly&&e.wasm),("production"in e||"build"in e)&&It.call(n,!!e.production,!!(e.build||Pt&&Pt.build)),!t)for(var i in Ce(0,e,function(e){r=r||e.baseURL}),(r=r||e.baseURL)&&(o.baseURL=b(r,y)||b("./"+r,y),"/"!==o.baseURL[o.baseURL.length-1]&&(o.baseURL+="/")),e.paths&&B(o.paths,e.paths),Ce(0,e,function(e){e.paths&&B(o.paths,e.paths)}),o.paths)-1!==o.paths[i].indexOf("*")&&($.call(o,"Path config "+i+" -> "+o.paths[i]+" is no longer supported as wildcards are deprecated."),delete o.paths[i]);if(e.defaultJSExtensions&&$.call(o,"The defaultJSExtensions configuration option is deprecated.\n  Use packages defaultExtension instead.",!0),"boolean"==typeof e.pluginFirst&&(o.pluginFirst=e.pluginFirst),e.map)for(var i in e.map){var a=e.map[i];if("string"==typeof a){var s=fe.call(n,o,a,void 0,!1,!1);"/"===s[s.length-1]&&":"!==i[i.length-1]&&"/"!==i[i.length-1]&&(s=s.substr(0,s.length-1)),o.map[i]=s}else{h=(h=fe.call(n,o,"/"!==i[i.length-1]?i+"/":i,void 0,!0,!0)).substr(0,h.length-1);var u=o.packages[h];u||((u=o.packages[h]={defaultExtension:void 0,main:void 0,format:void 0,meta:void 0,map:void 0,packageConfig:void 0,configured:!1}).defaultExtension=""),Ke(u,{map:a},h,!1,o)}}if(e.packageConfigPaths){for(var l=[],d=0;d<e.packageConfigPaths.length;d++){var c=e.packageConfigPaths[d],f=Math.max(c.lastIndexOf("*")+1,c.lastIndexOf("/")),p=fe.call(n,o,c.substr(0,f),void 0,!1,!1);l[d]=p+c.substr(f)}o.packageConfigPaths=l}if(e.bundles)for(var i in e.bundles){var g=[];for(d=0;d<e.bundles[i].length;d++)g.push(n.normalizeSync(e.bundles[i][d]));o.bundles[i]=g}if(e.packages)for(var i in e.packages){if(i.match(/^([^\/]+:)?\/\/$/))throw new TypeError('"'+i+'" is not a valid package name.');var h;h=(h=fe.call(n,o,"/"!==i[i.length-1]?i+"/":i,void 0,!0,!0)).substr(0,h.length-1),Ke(o.packages[h]=o.packages[h]||{defaultExtension:void 0,main:void 0,format:void 0,meta:void 0,map:void 0,packageConfig:void 0,configured:!1},e.packages[i],h,!1,o)}if(e.depCache)for(var i in e.depCache)o.depCache[n.normalizeSync(i)]=[].concat(e.depCache[i]);if(e.meta)for(var i in e.meta)if("*"===i[0])B(o.meta[i]=o.meta[i]||{},e.meta[i]);else{var m=fe.call(n,o,i,void 0,!0,!0);B(o.meta[m]=o.meta[m]||{},e.meta[i])}for(var v in"transpiler"in e&&(o.transpiler=e.transpiler),e)-1===Dt.indexOf(v)&&-1===Re.indexOf(v)&&(n[v]=e[v]);Ce(0,e,function(e){n.config(e,!0)})},Kt.prototype.getConfig=function(e){if(e){if(-1!==Dt.indexOf(e))return Le(this[z],e);throw new Error('"'+e+'" is not a valid configuration name. Must be one of '+Dt.join(", ")+".")}for(var t={},r=0;r<Dt.length;r++){var n=Dt[r],o=Le(this[z],n);void 0!==o&&(t[n]=o)}return t},Kt.prototype.global=E,Kt.prototype.import=function(){return _.prototype.import.apply(this,arguments).then(function(e){return"__useDefault"in e?e.__useDefault:e})};for(var Dt=["baseURL","map","paths","packages","packageConfigPaths","depCache","meta","bundles","transpiler","warnings","pluginFirst","production","wasm"],Ft="undefined"!=typeof Proxy,qt=0;qt<Dt.length;qt++)!function(r){Object.defineProperty(Kt.prototype,r,{get:function(){var e=Le(this[z],r);return Ft&&"object"==typeof e&&(e=new Proxy(e,{set:function(e,t){throw new Error("Cannot set SystemJS."+r+'["'+t+'"] directly. Use SystemJS.config({ '+r+': { "'+t+'": ... } }) rather.')}})),e},set:function(e){throw new Error("Setting `SystemJS."+r+"` directly is no longer supported. Use `SystemJS.config({ "+r+": ... })`.")}})}(Dt[qt]);function Ut(e,t){$.call(e[z],"SystemJS."+t+" is deprecated for SystemJS.registry."+t)}Kt.prototype.delete=function(e){return Ut(this,"delete"),this.registry.delete(e)},Kt.prototype.get=function(e){return Ut(this,"get"),this.registry.get(e)},Kt.prototype.has=function(e){return Ut(this,"has"),this.registry.has(e)},Kt.prototype.set=function(e,t){return Ut(this,"set"),this.registry.set(e,t)},Kt.prototype.newModule=function(e){return new S(e)},Kt.prototype.isModule=function(e){return void 0===q&&(q="undefined"!=typeof Symbol&&!!Symbol.toStringTag),e instanceof S||q&&"[object Module]"==Object.prototype.toString.call(e)},Kt.prototype.register=function(e,t,r){return"string"==typeof e&&(e=ce.call(this,this[z],e)),_.prototype.register.call(this,e,t,r)},Kt.prototype.registerDynamic=function(e,t,r,n){return"string"==typeof e&&(e=ce.call(this,this[z],e)),_.prototype.registerDynamic.call(this,e,t,r,n)},Kt.prototype.version="0.21.3 Dev";var Tt=new Kt;(p||N)&&(E.SystemJS=E.System=Tt),"undefined"!=typeof module&&module.exports&&(module.exports=Tt)}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8), __webpack_require__(0), __webpack_require__(7).Buffer, "/index.js"))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var SystemJS = __webpack_require__(9)
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
            cfg.meta = {};
            cfg.meta[imp.url] = {authorization: true};
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
                var head  = document.getElementsByTagName('head')[0];
                var link  = document.createElement('link');
                link.id   = cssId;
                link.rel  = 'stylesheet';
                link.type = 'text/css';
                link.href = imp.url
                link.media = 'all';
                head.appendChild(link);
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
/* 11 */
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
/* 12 */
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
/* 13 */
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

        if ( document.getElementsByTagName("base").length === 0 ) {
          script.src = '/pkg/WebIO/webio/dist/webcomponents-lite.min.js';
        } else {
          script.src = 'pkg/WebIO/webio/dist/webcomponents-lite.min.js';
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13)
module.exports = __webpack_require__(1)
__webpack_require__(10)


/***/ })
/******/ ]);