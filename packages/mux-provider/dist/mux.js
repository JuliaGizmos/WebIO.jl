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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/@babel/polyfill/lib/index.js":
/*!*****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/@babel/polyfill/lib/index.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/es6 */ "../../node_modules/core-js/es6/index.js");

__webpack_require__(/*! core-js/fn/array/includes */ "../../node_modules/core-js/fn/array/includes.js");

__webpack_require__(/*! core-js/fn/string/pad-start */ "../../node_modules/core-js/fn/string/pad-start.js");

__webpack_require__(/*! core-js/fn/string/pad-end */ "../../node_modules/core-js/fn/string/pad-end.js");

__webpack_require__(/*! core-js/fn/symbol/async-iterator */ "../../node_modules/core-js/fn/symbol/async-iterator.js");

__webpack_require__(/*! core-js/fn/object/get-own-property-descriptors */ "../../node_modules/core-js/fn/object/get-own-property-descriptors.js");

__webpack_require__(/*! core-js/fn/object/values */ "../../node_modules/core-js/fn/object/values.js");

__webpack_require__(/*! core-js/fn/object/entries */ "../../node_modules/core-js/fn/object/entries.js");

__webpack_require__(/*! core-js/fn/promise/finally */ "../../node_modules/core-js/fn/promise/finally.js");

__webpack_require__(/*! core-js/web */ "../../node_modules/core-js/web/index.js");

__webpack_require__(/*! regenerator-runtime/runtime */ "../../node_modules/regenerator-runtime/runtime.js");

if (global._babelPolyfill && typeof console !== "undefined" && console.warn) {
  console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
}

global._babelPolyfill = true;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/base64-js/index.js":
/*!*******************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/base64-js/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
} // Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications


revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens(b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42


  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
} // base64 is 4/3 + up to two characters of the original data


function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;

  for (var i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }

  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3
  // go through the array every three bytes, we'll deal with trailing stuff later

  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
  }

  return parts.join('');
}

/***/ }),

/***/ "../../node_modules/buffer/index.js":
/*!****************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/buffer/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

/* eslint-disable no-proto */


var base64 = __webpack_require__(/*! base64-js */ "../../node_modules/base64-js/index.js");

var ieee754 = __webpack_require__(/*! ieee754 */ "../../node_modules/ieee754/index.js");

var isArray = __webpack_require__(/*! isarray */ "../../node_modules/isarray/index.js");

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
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

Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
/*
 * Export kMaxLength after typed array support is determined.
 */

exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function foo() {
        return 42;
      }
    };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }

    that.length = length;
  }

  return that;
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


function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  } // Common case.


  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }

    return allocUnsafe(this, arg);
  }

  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.

Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
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
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;

  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);

  if (size <= 0) {
    return createBuffer(that, size);
  }

  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }

  return createBuffer(that, size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/


Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }

  return that;
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */


Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */


Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }

  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }

  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }

  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }

  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;
  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
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
      return true;

    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0; // Use a for loop to avoid recursion

  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;

      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;

      case 'hex':
        return len >>> 1;

      case 'base64':
        return base64ToBytes(string).length;

      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}

Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

  if (start === undefined || start < 0) {
    start = 0;
  } // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.


  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
} // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.


Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;

  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }

  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;

  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }

  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;

  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }

  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;

  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }

  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = target ? target.length : 0;
  }

  if (thisStart === undefined) {
    thisStart = 0;
  }

  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }

  if (thisStart >= thisEnd) {
    return -1;
  }

  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf


function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1; // Normalize byteOffset

  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }

  byteOffset = +byteOffset; // Coerce to Number.

  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  } // Normalize byteOffset: negative offsets start from the end of the buffer


  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  } // Normalize val


  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  } // Finally, search either indexOf (if dir is true) or lastIndexOf


  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }

    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]

    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }

    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();

    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }

      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;

  if (dir) {
    var foundIndex = -1;

    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

    for (i = byteOffset; i >= 0; i--) {
      var found = true;

      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }

      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;

  if (!length) {
    length = remaining;
  } else {
    length = Number(length);

    if (length > remaining) {
      length = remaining;
    }
  } // must be an even number of digits


  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }

  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    } // legacy write(string, encoding, offset, length) - remove in v0.13

  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';
  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;

  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }

          break;

        case 2:
          secondByte = buf[i + 1];

          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }

      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety


var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;

  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  } // Decode in chunks to avoid "call stack size exceeded".


  var res = '';
  var i = 0;

  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }

  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }

  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }

  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';

  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }

  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';

  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }

  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */


function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;

  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];

  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }

  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }

  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
}; // Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])


Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }

    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }

    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
}; // HELPER FUNCTIONS
// ================


var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

  while (str.length % 4 !== 0) {
    str = str + '=';
  }

  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }

  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/core-js/es6/index.js":
/*!*********************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/es6/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.symbol */ "../../node_modules/core-js/modules/es6.symbol.js");

__webpack_require__(/*! ../modules/es6.object.create */ "../../node_modules/core-js/modules/es6.object.create.js");

__webpack_require__(/*! ../modules/es6.object.define-property */ "../../node_modules/core-js/modules/es6.object.define-property.js");

__webpack_require__(/*! ../modules/es6.object.define-properties */ "../../node_modules/core-js/modules/es6.object.define-properties.js");

__webpack_require__(/*! ../modules/es6.object.get-own-property-descriptor */ "../../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js");

__webpack_require__(/*! ../modules/es6.object.get-prototype-of */ "../../node_modules/core-js/modules/es6.object.get-prototype-of.js");

__webpack_require__(/*! ../modules/es6.object.keys */ "../../node_modules/core-js/modules/es6.object.keys.js");

__webpack_require__(/*! ../modules/es6.object.get-own-property-names */ "../../node_modules/core-js/modules/es6.object.get-own-property-names.js");

__webpack_require__(/*! ../modules/es6.object.freeze */ "../../node_modules/core-js/modules/es6.object.freeze.js");

__webpack_require__(/*! ../modules/es6.object.seal */ "../../node_modules/core-js/modules/es6.object.seal.js");

__webpack_require__(/*! ../modules/es6.object.prevent-extensions */ "../../node_modules/core-js/modules/es6.object.prevent-extensions.js");

__webpack_require__(/*! ../modules/es6.object.is-frozen */ "../../node_modules/core-js/modules/es6.object.is-frozen.js");

__webpack_require__(/*! ../modules/es6.object.is-sealed */ "../../node_modules/core-js/modules/es6.object.is-sealed.js");

__webpack_require__(/*! ../modules/es6.object.is-extensible */ "../../node_modules/core-js/modules/es6.object.is-extensible.js");

__webpack_require__(/*! ../modules/es6.object.assign */ "../../node_modules/core-js/modules/es6.object.assign.js");

__webpack_require__(/*! ../modules/es6.object.is */ "../../node_modules/core-js/modules/es6.object.is.js");

__webpack_require__(/*! ../modules/es6.object.set-prototype-of */ "../../node_modules/core-js/modules/es6.object.set-prototype-of.js");

__webpack_require__(/*! ../modules/es6.object.to-string */ "../../node_modules/core-js/modules/es6.object.to-string.js");

__webpack_require__(/*! ../modules/es6.function.bind */ "../../node_modules/core-js/modules/es6.function.bind.js");

__webpack_require__(/*! ../modules/es6.function.name */ "../../node_modules/core-js/modules/es6.function.name.js");

__webpack_require__(/*! ../modules/es6.function.has-instance */ "../../node_modules/core-js/modules/es6.function.has-instance.js");

__webpack_require__(/*! ../modules/es6.parse-int */ "../../node_modules/core-js/modules/es6.parse-int.js");

__webpack_require__(/*! ../modules/es6.parse-float */ "../../node_modules/core-js/modules/es6.parse-float.js");

__webpack_require__(/*! ../modules/es6.number.constructor */ "../../node_modules/core-js/modules/es6.number.constructor.js");

__webpack_require__(/*! ../modules/es6.number.to-fixed */ "../../node_modules/core-js/modules/es6.number.to-fixed.js");

__webpack_require__(/*! ../modules/es6.number.to-precision */ "../../node_modules/core-js/modules/es6.number.to-precision.js");

__webpack_require__(/*! ../modules/es6.number.epsilon */ "../../node_modules/core-js/modules/es6.number.epsilon.js");

__webpack_require__(/*! ../modules/es6.number.is-finite */ "../../node_modules/core-js/modules/es6.number.is-finite.js");

__webpack_require__(/*! ../modules/es6.number.is-integer */ "../../node_modules/core-js/modules/es6.number.is-integer.js");

__webpack_require__(/*! ../modules/es6.number.is-nan */ "../../node_modules/core-js/modules/es6.number.is-nan.js");

__webpack_require__(/*! ../modules/es6.number.is-safe-integer */ "../../node_modules/core-js/modules/es6.number.is-safe-integer.js");

__webpack_require__(/*! ../modules/es6.number.max-safe-integer */ "../../node_modules/core-js/modules/es6.number.max-safe-integer.js");

__webpack_require__(/*! ../modules/es6.number.min-safe-integer */ "../../node_modules/core-js/modules/es6.number.min-safe-integer.js");

__webpack_require__(/*! ../modules/es6.number.parse-float */ "../../node_modules/core-js/modules/es6.number.parse-float.js");

__webpack_require__(/*! ../modules/es6.number.parse-int */ "../../node_modules/core-js/modules/es6.number.parse-int.js");

__webpack_require__(/*! ../modules/es6.math.acosh */ "../../node_modules/core-js/modules/es6.math.acosh.js");

__webpack_require__(/*! ../modules/es6.math.asinh */ "../../node_modules/core-js/modules/es6.math.asinh.js");

__webpack_require__(/*! ../modules/es6.math.atanh */ "../../node_modules/core-js/modules/es6.math.atanh.js");

__webpack_require__(/*! ../modules/es6.math.cbrt */ "../../node_modules/core-js/modules/es6.math.cbrt.js");

__webpack_require__(/*! ../modules/es6.math.clz32 */ "../../node_modules/core-js/modules/es6.math.clz32.js");

__webpack_require__(/*! ../modules/es6.math.cosh */ "../../node_modules/core-js/modules/es6.math.cosh.js");

__webpack_require__(/*! ../modules/es6.math.expm1 */ "../../node_modules/core-js/modules/es6.math.expm1.js");

__webpack_require__(/*! ../modules/es6.math.fround */ "../../node_modules/core-js/modules/es6.math.fround.js");

__webpack_require__(/*! ../modules/es6.math.hypot */ "../../node_modules/core-js/modules/es6.math.hypot.js");

__webpack_require__(/*! ../modules/es6.math.imul */ "../../node_modules/core-js/modules/es6.math.imul.js");

__webpack_require__(/*! ../modules/es6.math.log10 */ "../../node_modules/core-js/modules/es6.math.log10.js");

__webpack_require__(/*! ../modules/es6.math.log1p */ "../../node_modules/core-js/modules/es6.math.log1p.js");

__webpack_require__(/*! ../modules/es6.math.log2 */ "../../node_modules/core-js/modules/es6.math.log2.js");

__webpack_require__(/*! ../modules/es6.math.sign */ "../../node_modules/core-js/modules/es6.math.sign.js");

__webpack_require__(/*! ../modules/es6.math.sinh */ "../../node_modules/core-js/modules/es6.math.sinh.js");

__webpack_require__(/*! ../modules/es6.math.tanh */ "../../node_modules/core-js/modules/es6.math.tanh.js");

__webpack_require__(/*! ../modules/es6.math.trunc */ "../../node_modules/core-js/modules/es6.math.trunc.js");

__webpack_require__(/*! ../modules/es6.string.from-code-point */ "../../node_modules/core-js/modules/es6.string.from-code-point.js");

__webpack_require__(/*! ../modules/es6.string.raw */ "../../node_modules/core-js/modules/es6.string.raw.js");

__webpack_require__(/*! ../modules/es6.string.trim */ "../../node_modules/core-js/modules/es6.string.trim.js");

__webpack_require__(/*! ../modules/es6.string.iterator */ "../../node_modules/core-js/modules/es6.string.iterator.js");

__webpack_require__(/*! ../modules/es6.string.code-point-at */ "../../node_modules/core-js/modules/es6.string.code-point-at.js");

__webpack_require__(/*! ../modules/es6.string.ends-with */ "../../node_modules/core-js/modules/es6.string.ends-with.js");

__webpack_require__(/*! ../modules/es6.string.includes */ "../../node_modules/core-js/modules/es6.string.includes.js");

__webpack_require__(/*! ../modules/es6.string.repeat */ "../../node_modules/core-js/modules/es6.string.repeat.js");

__webpack_require__(/*! ../modules/es6.string.starts-with */ "../../node_modules/core-js/modules/es6.string.starts-with.js");

__webpack_require__(/*! ../modules/es6.string.anchor */ "../../node_modules/core-js/modules/es6.string.anchor.js");

__webpack_require__(/*! ../modules/es6.string.big */ "../../node_modules/core-js/modules/es6.string.big.js");

__webpack_require__(/*! ../modules/es6.string.blink */ "../../node_modules/core-js/modules/es6.string.blink.js");

__webpack_require__(/*! ../modules/es6.string.bold */ "../../node_modules/core-js/modules/es6.string.bold.js");

__webpack_require__(/*! ../modules/es6.string.fixed */ "../../node_modules/core-js/modules/es6.string.fixed.js");

__webpack_require__(/*! ../modules/es6.string.fontcolor */ "../../node_modules/core-js/modules/es6.string.fontcolor.js");

__webpack_require__(/*! ../modules/es6.string.fontsize */ "../../node_modules/core-js/modules/es6.string.fontsize.js");

__webpack_require__(/*! ../modules/es6.string.italics */ "../../node_modules/core-js/modules/es6.string.italics.js");

__webpack_require__(/*! ../modules/es6.string.link */ "../../node_modules/core-js/modules/es6.string.link.js");

__webpack_require__(/*! ../modules/es6.string.small */ "../../node_modules/core-js/modules/es6.string.small.js");

__webpack_require__(/*! ../modules/es6.string.strike */ "../../node_modules/core-js/modules/es6.string.strike.js");

__webpack_require__(/*! ../modules/es6.string.sub */ "../../node_modules/core-js/modules/es6.string.sub.js");

__webpack_require__(/*! ../modules/es6.string.sup */ "../../node_modules/core-js/modules/es6.string.sup.js");

__webpack_require__(/*! ../modules/es6.date.now */ "../../node_modules/core-js/modules/es6.date.now.js");

__webpack_require__(/*! ../modules/es6.date.to-json */ "../../node_modules/core-js/modules/es6.date.to-json.js");

__webpack_require__(/*! ../modules/es6.date.to-iso-string */ "../../node_modules/core-js/modules/es6.date.to-iso-string.js");

__webpack_require__(/*! ../modules/es6.date.to-string */ "../../node_modules/core-js/modules/es6.date.to-string.js");

__webpack_require__(/*! ../modules/es6.date.to-primitive */ "../../node_modules/core-js/modules/es6.date.to-primitive.js");

__webpack_require__(/*! ../modules/es6.array.is-array */ "../../node_modules/core-js/modules/es6.array.is-array.js");

__webpack_require__(/*! ../modules/es6.array.from */ "../../node_modules/core-js/modules/es6.array.from.js");

__webpack_require__(/*! ../modules/es6.array.of */ "../../node_modules/core-js/modules/es6.array.of.js");

__webpack_require__(/*! ../modules/es6.array.join */ "../../node_modules/core-js/modules/es6.array.join.js");

__webpack_require__(/*! ../modules/es6.array.slice */ "../../node_modules/core-js/modules/es6.array.slice.js");

__webpack_require__(/*! ../modules/es6.array.sort */ "../../node_modules/core-js/modules/es6.array.sort.js");

__webpack_require__(/*! ../modules/es6.array.for-each */ "../../node_modules/core-js/modules/es6.array.for-each.js");

__webpack_require__(/*! ../modules/es6.array.map */ "../../node_modules/core-js/modules/es6.array.map.js");

__webpack_require__(/*! ../modules/es6.array.filter */ "../../node_modules/core-js/modules/es6.array.filter.js");

__webpack_require__(/*! ../modules/es6.array.some */ "../../node_modules/core-js/modules/es6.array.some.js");

__webpack_require__(/*! ../modules/es6.array.every */ "../../node_modules/core-js/modules/es6.array.every.js");

__webpack_require__(/*! ../modules/es6.array.reduce */ "../../node_modules/core-js/modules/es6.array.reduce.js");

__webpack_require__(/*! ../modules/es6.array.reduce-right */ "../../node_modules/core-js/modules/es6.array.reduce-right.js");

__webpack_require__(/*! ../modules/es6.array.index-of */ "../../node_modules/core-js/modules/es6.array.index-of.js");

__webpack_require__(/*! ../modules/es6.array.last-index-of */ "../../node_modules/core-js/modules/es6.array.last-index-of.js");

__webpack_require__(/*! ../modules/es6.array.copy-within */ "../../node_modules/core-js/modules/es6.array.copy-within.js");

__webpack_require__(/*! ../modules/es6.array.fill */ "../../node_modules/core-js/modules/es6.array.fill.js");

__webpack_require__(/*! ../modules/es6.array.find */ "../../node_modules/core-js/modules/es6.array.find.js");

__webpack_require__(/*! ../modules/es6.array.find-index */ "../../node_modules/core-js/modules/es6.array.find-index.js");

__webpack_require__(/*! ../modules/es6.array.species */ "../../node_modules/core-js/modules/es6.array.species.js");

__webpack_require__(/*! ../modules/es6.array.iterator */ "../../node_modules/core-js/modules/es6.array.iterator.js");

__webpack_require__(/*! ../modules/es6.regexp.constructor */ "../../node_modules/core-js/modules/es6.regexp.constructor.js");

__webpack_require__(/*! ../modules/es6.regexp.to-string */ "../../node_modules/core-js/modules/es6.regexp.to-string.js");

__webpack_require__(/*! ../modules/es6.regexp.flags */ "../../node_modules/core-js/modules/es6.regexp.flags.js");

__webpack_require__(/*! ../modules/es6.regexp.match */ "../../node_modules/core-js/modules/es6.regexp.match.js");

__webpack_require__(/*! ../modules/es6.regexp.replace */ "../../node_modules/core-js/modules/es6.regexp.replace.js");

__webpack_require__(/*! ../modules/es6.regexp.search */ "../../node_modules/core-js/modules/es6.regexp.search.js");

__webpack_require__(/*! ../modules/es6.regexp.split */ "../../node_modules/core-js/modules/es6.regexp.split.js");

__webpack_require__(/*! ../modules/es6.promise */ "../../node_modules/core-js/modules/es6.promise.js");

__webpack_require__(/*! ../modules/es6.map */ "../../node_modules/core-js/modules/es6.map.js");

__webpack_require__(/*! ../modules/es6.set */ "../../node_modules/core-js/modules/es6.set.js");

__webpack_require__(/*! ../modules/es6.weak-map */ "../../node_modules/core-js/modules/es6.weak-map.js");

__webpack_require__(/*! ../modules/es6.weak-set */ "../../node_modules/core-js/modules/es6.weak-set.js");

__webpack_require__(/*! ../modules/es6.typed.array-buffer */ "../../node_modules/core-js/modules/es6.typed.array-buffer.js");

__webpack_require__(/*! ../modules/es6.typed.data-view */ "../../node_modules/core-js/modules/es6.typed.data-view.js");

__webpack_require__(/*! ../modules/es6.typed.int8-array */ "../../node_modules/core-js/modules/es6.typed.int8-array.js");

__webpack_require__(/*! ../modules/es6.typed.uint8-array */ "../../node_modules/core-js/modules/es6.typed.uint8-array.js");

__webpack_require__(/*! ../modules/es6.typed.uint8-clamped-array */ "../../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js");

__webpack_require__(/*! ../modules/es6.typed.int16-array */ "../../node_modules/core-js/modules/es6.typed.int16-array.js");

__webpack_require__(/*! ../modules/es6.typed.uint16-array */ "../../node_modules/core-js/modules/es6.typed.uint16-array.js");

__webpack_require__(/*! ../modules/es6.typed.int32-array */ "../../node_modules/core-js/modules/es6.typed.int32-array.js");

__webpack_require__(/*! ../modules/es6.typed.uint32-array */ "../../node_modules/core-js/modules/es6.typed.uint32-array.js");

__webpack_require__(/*! ../modules/es6.typed.float32-array */ "../../node_modules/core-js/modules/es6.typed.float32-array.js");

__webpack_require__(/*! ../modules/es6.typed.float64-array */ "../../node_modules/core-js/modules/es6.typed.float64-array.js");

__webpack_require__(/*! ../modules/es6.reflect.apply */ "../../node_modules/core-js/modules/es6.reflect.apply.js");

__webpack_require__(/*! ../modules/es6.reflect.construct */ "../../node_modules/core-js/modules/es6.reflect.construct.js");

__webpack_require__(/*! ../modules/es6.reflect.define-property */ "../../node_modules/core-js/modules/es6.reflect.define-property.js");

__webpack_require__(/*! ../modules/es6.reflect.delete-property */ "../../node_modules/core-js/modules/es6.reflect.delete-property.js");

__webpack_require__(/*! ../modules/es6.reflect.enumerate */ "../../node_modules/core-js/modules/es6.reflect.enumerate.js");

__webpack_require__(/*! ../modules/es6.reflect.get */ "../../node_modules/core-js/modules/es6.reflect.get.js");

__webpack_require__(/*! ../modules/es6.reflect.get-own-property-descriptor */ "../../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js");

__webpack_require__(/*! ../modules/es6.reflect.get-prototype-of */ "../../node_modules/core-js/modules/es6.reflect.get-prototype-of.js");

__webpack_require__(/*! ../modules/es6.reflect.has */ "../../node_modules/core-js/modules/es6.reflect.has.js");

__webpack_require__(/*! ../modules/es6.reflect.is-extensible */ "../../node_modules/core-js/modules/es6.reflect.is-extensible.js");

__webpack_require__(/*! ../modules/es6.reflect.own-keys */ "../../node_modules/core-js/modules/es6.reflect.own-keys.js");

__webpack_require__(/*! ../modules/es6.reflect.prevent-extensions */ "../../node_modules/core-js/modules/es6.reflect.prevent-extensions.js");

__webpack_require__(/*! ../modules/es6.reflect.set */ "../../node_modules/core-js/modules/es6.reflect.set.js");

__webpack_require__(/*! ../modules/es6.reflect.set-prototype-of */ "../../node_modules/core-js/modules/es6.reflect.set-prototype-of.js");

module.exports = __webpack_require__(/*! ../modules/_core */ "../../node_modules/core-js/modules/_core.js");

/***/ }),

/***/ "../../node_modules/core-js/fn/array/includes.js":
/*!*****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/fn/array/includes.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.array.includes */ "../../node_modules/core-js/modules/es7.array.includes.js");

module.exports = __webpack_require__(/*! ../../modules/_core */ "../../node_modules/core-js/modules/_core.js").Array.includes;

/***/ }),

/***/ "../../node_modules/core-js/fn/object/entries.js":
/*!*****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/fn/object/entries.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.object.entries */ "../../node_modules/core-js/modules/es7.object.entries.js");

module.exports = __webpack_require__(/*! ../../modules/_core */ "../../node_modules/core-js/modules/_core.js").Object.entries;

/***/ }),

/***/ "../../node_modules/core-js/fn/object/get-own-property-descriptors.js":
/*!**************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/fn/object/get-own-property-descriptors.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.object.get-own-property-descriptors */ "../../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js");

module.exports = __webpack_require__(/*! ../../modules/_core */ "../../node_modules/core-js/modules/_core.js").Object.getOwnPropertyDescriptors;

/***/ }),

/***/ "../../node_modules/core-js/fn/object/values.js":
/*!****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/fn/object/values.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.object.values */ "../../node_modules/core-js/modules/es7.object.values.js");

module.exports = __webpack_require__(/*! ../../modules/_core */ "../../node_modules/core-js/modules/_core.js").Object.values;

/***/ }),

/***/ "../../node_modules/core-js/fn/promise/finally.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/fn/promise/finally.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ../../modules/es6.promise */ "../../node_modules/core-js/modules/es6.promise.js");

__webpack_require__(/*! ../../modules/es7.promise.finally */ "../../node_modules/core-js/modules/es7.promise.finally.js");

module.exports = __webpack_require__(/*! ../../modules/_core */ "../../node_modules/core-js/modules/_core.js").Promise['finally'];

/***/ }),

/***/ "../../node_modules/core-js/fn/string/pad-end.js":
/*!*****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/fn/string/pad-end.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.string.pad-end */ "../../node_modules/core-js/modules/es7.string.pad-end.js");

module.exports = __webpack_require__(/*! ../../modules/_core */ "../../node_modules/core-js/modules/_core.js").String.padEnd;

/***/ }),

/***/ "../../node_modules/core-js/fn/string/pad-start.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/fn/string/pad-start.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.string.pad-start */ "../../node_modules/core-js/modules/es7.string.pad-start.js");

module.exports = __webpack_require__(/*! ../../modules/_core */ "../../node_modules/core-js/modules/_core.js").String.padStart;

/***/ }),

/***/ "../../node_modules/core-js/fn/symbol/async-iterator.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/fn/symbol/async-iterator.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ "../../node_modules/core-js/modules/es7.symbol.async-iterator.js");

module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ "../../node_modules/core-js/modules/_wks-ext.js").f('asyncIterator');

/***/ }),

/***/ "../../node_modules/core-js/modules/_a-function.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_a-function.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_a-number-value.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_a-number-value.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ "../../node_modules/core-js/modules/_cof.js");

module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_add-to-unscopables.js":
/*!***************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_add-to-unscopables.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('unscopables');

var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});

module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_an-instance.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_an-instance.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }

  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_an-object.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_an-object.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_array-copy-within.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_array-copy-within.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "../../node_modules/core-js/modules/_to-absolute-index.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

module.exports = [].copyWithin || function copyWithin(target
/* = 0 */
, start
/* = 0, end = @length */
) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;

  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }

  while (count-- > 0) {
    if (from in O) O[to] = O[from];else delete O[to];
    to += inc;
    from += inc;
  }

  return O;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_array-fill.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_array-fill.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "../../node_modules/core-js/modules/_to-absolute-index.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

module.exports = function fill(value
/* , start = 0, end = @length */
) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

  while (endPos > index) {
    O[index++] = value;
  }

  return O;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_array-includes.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_array-includes.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "../../node_modules/core-js/modules/_to-absolute-index.js");

module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }
    return !IS_INCLUDES && -1;
  };
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_array-methods.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_array-methods.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ "../../node_modules/core-js/modules/_ctx.js");

var IObject = __webpack_require__(/*! ./_iobject */ "../../node_modules/core-js/modules/_iobject.js");

var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var asc = __webpack_require__(/*! ./_array-species-create */ "../../node_modules/core-js/modules/_array-species-create.js");

module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;

    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);

        if (TYPE) {
          if (IS_MAP) result[index] = res; // map
          else if (res) switch (TYPE) {
              case 3:
                return true;
              // some

              case 5:
                return val;
              // find

              case 6:
                return index;
              // findIndex

              case 2:
                result.push(val);
              // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_array-reduce.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_array-reduce.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ "../../node_modules/core-js/modules/_a-function.js");

var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var IObject = __webpack_require__(/*! ./_iobject */ "../../node_modules/core-js/modules/_iobject.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }

    index += i;

    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }

  for (; isRight ? index >= 0 : length > index; index += i) {
    if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
  }

  return memo;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_array-species-constructor.js":
/*!**********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_array-species-constructor.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var isArray = __webpack_require__(/*! ./_is-array */ "../../node_modules/core-js/modules/_is-array.js");

var SPECIES = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;

  if (isArray(original)) {
    C = original.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;

    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? Array : C;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_array-species-create.js":
/*!*****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_array-species-create.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ "../../node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_bind.js":
/*!*************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_bind.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(/*! ./_a-function */ "../../node_modules/core-js/modules/_a-function.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var invoke = __webpack_require__(/*! ./_invoke */ "../../node_modules/core-js/modules/_invoke.js");

var arraySlice = [].slice;
var factories = {};

var construct = function construct(F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) {
      n[i] = 'a[' + i + ']';
    } // eslint-disable-next-line no-new-func


    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }

  return factories[len](F, args);
};

module.exports = Function.bind || function bind(that
/* , ...args */
) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);

  var bound = function bound()
  /* args... */
  {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };

  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_classof.js":
/*!****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_classof.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "../../node_modules/core-js/modules/_cof.js");

var TAG = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('toStringTag'); // ES3 wrong here


var ARG = cof(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {
    /* empty */
  }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case
  : ARG ? cof(O) // ES3 arguments fallback
  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_cof.js":
/*!************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_cof.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_collection-strong.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_collection-strong.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f;

var create = __webpack_require__(/*! ./_object-create */ "../../node_modules/core-js/modules/_object-create.js");

var redefineAll = __webpack_require__(/*! ./_redefine-all */ "../../node_modules/core-js/modules/_redefine-all.js");

var ctx = __webpack_require__(/*! ./_ctx */ "../../node_modules/core-js/modules/_ctx.js");

var anInstance = __webpack_require__(/*! ./_an-instance */ "../../node_modules/core-js/modules/_an-instance.js");

var forOf = __webpack_require__(/*! ./_for-of */ "../../node_modules/core-js/modules/_for-of.js");

var $iterDefine = __webpack_require__(/*! ./_iter-define */ "../../node_modules/core-js/modules/_iter-define.js");

var step = __webpack_require__(/*! ./_iter-step */ "../../node_modules/core-js/modules/_iter-step.js");

var setSpecies = __webpack_require__(/*! ./_set-species */ "../../node_modules/core-js/modules/_set-species.js");

var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js");

var fastKey = __webpack_require__(/*! ./_meta */ "../../node_modules/core-js/modules/_meta.js").fastKey;

var validate = __webpack_require__(/*! ./_validate-collection */ "../../node_modules/core-js/modules/_validate-collection.js");

var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function getEntry(that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index]; // frozen object case

  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type

      that._i = create(null); // index

      that._f = undefined; // first entry

      that._l = undefined; // last entry

      that[SIZE] = 0; // size

      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }

        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function _delete(key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);

        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        }

        return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn
      /* , that = undefined */
      ) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;

        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this); // revert to the last existing entry

          while (entry && entry.r) {
            entry = entry.p;
          }
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function get() {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var entry = getEntry(that, key);
    var prev, index; // change existing entry

    if (entry) {
      entry.v = value; // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true),
        // <- index
        k: key,
        // <- key
        v: value,
        // <- value
        p: prev = that._l,
        // <- previous entry
        n: undefined,
        // <- next entry
        r: false // <- removed

      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++; // add to index

      if (index !== 'F') that._i[index] = entry;
    }

    return that;
  },
  getEntry: getEntry,
  setStrong: function setStrong(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target

      this._k = kind; // kind

      this._l = undefined; // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l; // revert to the last existing entry

      while (entry && entry.r) {
        entry = entry.p;
      } // get next entry


      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      } // return step by kind


      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

    setSpecies(NAME);
  }
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_collection-weak.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_collection-weak.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefineAll = __webpack_require__(/*! ./_redefine-all */ "../../node_modules/core-js/modules/_redefine-all.js");

var getWeak = __webpack_require__(/*! ./_meta */ "../../node_modules/core-js/modules/_meta.js").getWeak;

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var anInstance = __webpack_require__(/*! ./_an-instance */ "../../node_modules/core-js/modules/_an-instance.js");

var forOf = __webpack_require__(/*! ./_for-of */ "../../node_modules/core-js/modules/_for-of.js");

var createArrayMethod = __webpack_require__(/*! ./_array-methods */ "../../node_modules/core-js/modules/_array-methods.js");

var $has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var validate = __webpack_require__(/*! ./_validate-collection */ "../../node_modules/core-js/modules/_validate-collection.js");

var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0; // fallback for uncaught frozen keys

var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function UncaughtFrozenStore() {
  this.a = [];
};

var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function get(key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function has(key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function set(key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.a.push([key, value]);
  },
  'delete': function _delete(key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};
module.exports = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type

      that._i = id++; // collection id

      that._l = undefined; // leak store for uncaught frozen objects

      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function _delete(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_collection.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_collection.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var redefine = __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js");

var redefineAll = __webpack_require__(/*! ./_redefine-all */ "../../node_modules/core-js/modules/_redefine-all.js");

var meta = __webpack_require__(/*! ./_meta */ "../../node_modules/core-js/modules/_meta.js");

var forOf = __webpack_require__(/*! ./_for-of */ "../../node_modules/core-js/modules/_for-of.js");

var anInstance = __webpack_require__(/*! ./_an-instance */ "../../node_modules/core-js/modules/_an-instance.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var $iterDetect = __webpack_require__(/*! ./_iter-detect */ "../../node_modules/core-js/modules/_iter-detect.js");

var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "../../node_modules/core-js/modules/_set-to-string-tag.js");

var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "../../node_modules/core-js/modules/_inherit-if-required.js");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};

  var fixMethod = function fixMethod(KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);
      return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);
      return this;
    });
  };

  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly

    var ACCEPT_ITERABLES = $iterDetect(function (iter) {
      new C(iter);
    }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same

    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;

      while (index--) {
        $instance[ADDER](index, index);
      }

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);
  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);
  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
  return C;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_core.js":
/*!*************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_core.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = {
  version: '2.5.7'
};
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),

/***/ "../../node_modules/core-js/modules/_create-property.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_create-property.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $defineProperty = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js");

var createDesc = __webpack_require__(/*! ./_property-desc */ "../../node_modules/core-js/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_ctx.js":
/*!************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_ctx.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "../../node_modules/core-js/modules/_a-function.js");

module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_date-to-iso-string.js":
/*!***************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_date-to-iso-string.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function lz(num) {
  return num > 9 ? num : '0' + num;
}; // PhantomJS / old WebKit has a broken implementations


module.exports = fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
}) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

/***/ }),

/***/ "../../node_modules/core-js/modules/_date-to-primitive.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_date-to-primitive.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../../node_modules/core-js/modules/_to-primitive.js");

var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_defined.js":
/*!****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_defined.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_descriptors.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_descriptors.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ "../../node_modules/core-js/modules/_dom-create.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_dom-create.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var document = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js").document; // typeof document.createElement is 'object' in old IE


var is = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_enum-bug-keys.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_enum-bug-keys.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),

/***/ "../../node_modules/core-js/modules/_enum-keys.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_enum-keys.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "../../node_modules/core-js/modules/_object-keys.js");

var gOPS = __webpack_require__(/*! ./_object-gops */ "../../node_modules/core-js/modules/_object-gops.js");

var pIE = __webpack_require__(/*! ./_object-pie */ "../../node_modules/core-js/modules/_object-pie.js");

module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;

  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;

    while (symbols.length > i) {
      if (isEnum.call(it, key = symbols[i++])) result.push(key);
    }
  }

  return result;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_export.js":
/*!***************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_export.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var core = __webpack_require__(/*! ./_core */ "../../node_modules/core-js/modules/_core.js");

var hide = __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js");

var redefine = __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js");

var ctx = __webpack_require__(/*! ./_ctx */ "../../node_modules/core-js/modules/_ctx.js");

var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;

  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

    out = (own ? target : source)[key]; // bind timers to global for call from export context

    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out; // extend global

    if (target) redefine(target, key, out, type & $export.U); // export

    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};

global.core = core; // type bitmap

$export.F = 1; // forced

$export.G = 2; // global

$export.S = 4; // static

$export.P = 8; // proto

$export.B = 16; // bind

$export.W = 32; // wrap

$export.U = 64; // safe

$export.R = 128; // real proto method for `library`

module.exports = $export;

/***/ }),

/***/ "../../node_modules/core-js/modules/_fails-is-regexp.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_fails-is-regexp.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('match');

module.exports = function (KEY) {
  var re = /./;

  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) {
      /* empty */
    }
  }

  return true;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_fails.js":
/*!**************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_fails.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_fix-re-wks.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_fix-re-wks.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hide = __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js");

var redefine = __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js");

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var defined = __webpack_require__(/*! ./_defined */ "../../node_modules/core-js/modules/_defined.js");

var wks = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];

  if (fails(function () {
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return rxfn.call(string, this, arg);
    } // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return rxfn.call(string, this);
    });
  }
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_flags.js":
/*!**************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_flags.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 21.2.5.3 get RegExp.prototype.flags

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_for-of.js":
/*!***************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_for-of.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "../../node_modules/core-js/modules/_ctx.js");

var call = __webpack_require__(/*! ./_iter-call */ "../../node_modules/core-js/modules/_iter-call.js");

var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "../../node_modules/core-js/modules/_is-array-iter.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "../../node_modules/core-js/modules/core.get-iterator-method.js");

var BREAK = {};
var RETURN = {};

var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () {
    return iterable;
  } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!'); // fast case for arrays with default iterator

  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};

exports.BREAK = BREAK;
exports.RETURN = RETURN;

/***/ }),

/***/ "../../node_modules/core-js/modules/_global.js":
/*!***************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_global.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),

/***/ "../../node_modules/core-js/modules/_has.js":
/*!************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_has.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_hide.js":
/*!*************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_hide.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js");

var createDesc = __webpack_require__(/*! ./_property-desc */ "../../node_modules/core-js/modules/_property-desc.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_html.js":
/*!*************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_html.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js").document;

module.exports = document && document.documentElement;

/***/ }),

/***/ "../../node_modules/core-js/modules/_ie8-dom-define.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_ie8-dom-define.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "../../node_modules/core-js/modules/_dom-create.js")('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ "../../node_modules/core-js/modules/_inherit-if-required.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_inherit-if-required.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ "../../node_modules/core-js/modules/_set-proto.js").set;

module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;

  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  }

  return that;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_invoke.js":
/*!***************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_invoke.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;

  switch (args.length) {
    case 0:
      return un ? fn() : fn.call(that);

    case 1:
      return un ? fn(args[0]) : fn.call(that, args[0]);

    case 2:
      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

    case 3:
      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

    case 4:
      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
  }

  return fn.apply(that, args);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_iobject.js":
/*!****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_iobject.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "../../node_modules/core-js/modules/_cof.js"); // eslint-disable-next-line no-prototype-builtins


module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_is-array-iter.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_is-array-iter.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "../../node_modules/core-js/modules/_iterators.js");

var ITERATOR = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('iterator');

var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_is-array.js":
/*!*****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_is-array.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "../../node_modules/core-js/modules/_cof.js");

module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_is-integer.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_is-integer.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var floor = Math.floor;

module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_is-object.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_is-object.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function (it) {
  return _typeof(it) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_is-regexp.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_is-regexp.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var cof = __webpack_require__(/*! ./_cof */ "../../node_modules/core-js/modules/_cof.js");

var MATCH = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('match');

module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_iter-call.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_iter-call.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_iter-create.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_iter-create.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = __webpack_require__(/*! ./_object-create */ "../../node_modules/core-js/modules/_object-create.js");

var descriptor = __webpack_require__(/*! ./_property-desc */ "../../node_modules/core-js/modules/_property-desc.js");

var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "../../node_modules/core-js/modules/_set-to-string-tag.js");

var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

__webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, {
    next: descriptor(1, next)
  });
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_iter-define.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_iter-define.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(/*! ./_library */ "../../node_modules/core-js/modules/_library.js");

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var redefine = __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js");

var hide = __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js");

var Iterators = __webpack_require__(/*! ./_iterators */ "../../node_modules/core-js/modules/_iterators.js");

var $iterCreate = __webpack_require__(/*! ./_iter-create */ "../../node_modules/core-js/modules/_iter-create.js");

var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "../../node_modules/core-js/modules/_set-to-string-tag.js");

var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "../../node_modules/core-js/modules/_object-gpo.js");

var ITERATOR = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('iterator');

var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);

  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];

    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };

      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }

    return function entries() {
      return new Constructor(this, kind);
    };
  };

  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype; // Fix native

  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));

    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;

    $default = function values() {
      return $native.call(this);
    };
  } // Define iterator


  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  } // Plug for library


  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;

  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }

  return methods;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_iter-detect.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_iter-detect.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('iterator');

var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();

  riter['return'] = function () {
    SAFE_CLOSING = true;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {
  /* empty */
}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;

  try {
    var arr = [7];
    var iter = arr[ITERATOR]();

    iter.next = function () {
      return {
        done: safe = true
      };
    };

    arr[ITERATOR] = function () {
      return iter;
    };

    exec(arr);
  } catch (e) {
    /* empty */
  }

  return safe;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_iter-step.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_iter-step.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return {
    value: value,
    done: !!done
  };
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_iterators.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_iterators.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),

/***/ "../../node_modules/core-js/modules/_library.js":
/*!****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_library.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),

/***/ "../../node_modules/core-js/modules/_math-expm1.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_math-expm1.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = !$expm1 // Old FF bug
|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168 // Tor Browser bug
|| $expm1(-2e-17) != -2e-17 ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),

/***/ "../../node_modules/core-js/modules/_math-fround.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_math-fround.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ "../../node_modules/core-js/modules/_math-sign.js");

var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function roundTiesToEven(n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs); // eslint-disable-next-line no-self-compare

  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_math-log1p.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_math-log1p.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_math-sign.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_math-sign.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_meta.js":
/*!*************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_meta.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var META = __webpack_require__(/*! ./_uid */ "../../node_modules/core-js/modules/_uid.js")('meta');

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var setDesc = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f;

var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var FREEZE = !__webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});

var setMeta = function setMeta(it) {
  setDesc(it, META, {
    value: {
      i: 'O' + ++id,
      // object ID
      w: {} // weak collections IDs

    }
  });
};

var fastKey = function fastKey(it, create) {
  // return primitive with prefix
  if (!isObject(it)) return _typeof(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F'; // not necessary to add metadata

    if (!create) return 'E'; // add missing metadata

    setMeta(it); // return object ID
  }

  return it[META].i;
};

var getWeak = function getWeak(it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true; // not necessary to add metadata

    if (!create) return false; // add missing metadata

    setMeta(it); // return hash weak collections IDs
  }

  return it[META].w;
}; // add metadata on freeze-family methods calling


var onFreeze = function onFreeze(it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};

var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_microtask.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_microtask.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var macrotask = __webpack_require__(/*! ./_task */ "../../node_modules/core-js/modules/_task.js").set;

var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ "../../node_modules/core-js/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();

    while (head) {
      fn = head.fn;
      head = head.next;

      try {
        fn();
      } catch (e) {
        if (head) notify();else last = undefined;
        throw e;
      }
    }

    last = undefined;
    if (parent) parent.enter();
  }; // Node.js


  if (isNode) {
    notify = function notify() {
      process.nextTick(flush);
    }; // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339

  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, {
      characterData: true
    }); // eslint-disable-line no-new

    notify = function notify() {
      node.data = toggle = !toggle;
    }; // environments with maybe non-completely correct, but existent Promise

  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);

    notify = function notify() {
      promise.then(flush);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = {
      fn: fn,
      next: undefined
    };
    if (last) last.next = task;

    if (!head) {
      head = task;
      notify();
    }

    last = task;
  };
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_new-promise-capability.js":
/*!*******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_new-promise-capability.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 25.4.1.5 NewPromiseCapability(C)

var aFunction = __webpack_require__(/*! ./_a-function */ "../../node_modules/core-js/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-assign.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-assign.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 19.1.2.1 Object.assign(target, source, ...)

var getKeys = __webpack_require__(/*! ./_object-keys */ "../../node_modules/core-js/modules/_object-keys.js");

var gOPS = __webpack_require__(/*! ./_object-gops */ "../../node_modules/core-js/modules/_object-gops.js");

var pIE = __webpack_require__(/*! ./_object-pie */ "../../node_modules/core-js/modules/_object-pie.js");

var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var IObject = __webpack_require__(/*! ./_iobject */ "../../node_modules/core-js/modules/_iobject.js");

var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

module.exports = !$assign || __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;

  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }

  return T;
} : $assign;

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-create.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-create.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var dPs = __webpack_require__(/*! ./_object-dps */ "../../node_modules/core-js/modules/_object-dps.js");

var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "../../node_modules/core-js/modules/_enum-bug-keys.js");

var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "../../node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

var Empty = function Empty() {
  /* empty */
};

var PROTOTYPE = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "../../node_modules/core-js/modules/_dom-create.js")('iframe');

  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';

  __webpack_require__(/*! ./_html */ "../../node_modules/core-js/modules/_html.js").appendChild(iframe);

  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);

  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;

  while (i--) {
    delete _createDict[PROTOTYPE][enumBugKeys[i]];
  }

  return _createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = _createDict();

  return Properties === undefined ? result : dPs(result, Properties);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-dp.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-dp.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "../../node_modules/core-js/modules/_ie8-dom-define.js");

var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../../node_modules/core-js/modules/_to-primitive.js");

var dP = Object.defineProperty;
exports.f = __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-dps.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-dps.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var getKeys = __webpack_require__(/*! ./_object-keys */ "../../node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;

  while (length > i) {
    dP.f(O, P = keys[i++], Properties[P]);
  }

  return O;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-gopd.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-gopd.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "../../node_modules/core-js/modules/_object-pie.js");

var createDesc = __webpack_require__(/*! ./_property-desc */ "../../node_modules/core-js/modules/_property-desc.js");

var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../../node_modules/core-js/modules/_to-primitive.js");

var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "../../node_modules/core-js/modules/_ie8-dom-define.js");

var gOPD = Object.getOwnPropertyDescriptor;
exports.f = __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) {
    /* empty */
  }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-gopn-ext.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-gopn-ext.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var gOPN = __webpack_require__(/*! ./_object-gopn */ "../../node_modules/core-js/modules/_object-gopn.js").f;

var toString = {}.toString;
var windowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function getWindowNames(it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-gopn.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-gopn.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "../../node_modules/core-js/modules/_object-keys-internal.js");

var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "../../node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-gops.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-gops.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-gpo.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-gpo.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "../../node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectProto : null;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-keys-internal.js":
/*!*****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-keys-internal.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "../../node_modules/core-js/modules/_array-includes.js")(false);

var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "../../node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }

  return result;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-keys.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-keys.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "../../node_modules/core-js/modules/_object-keys-internal.js");

var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "../../node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-pie.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-pie.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-sap.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-sap.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var core = __webpack_require__(/*! ./_core */ "../../node_modules/core-js/modules/_core.js");

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () {
    fn(1);
  }), 'Object', exp);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_object-to-array.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_object-to-array.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ "../../node_modules/core-js/modules/_object-keys.js");

var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var isEnum = __webpack_require__(/*! ./_object-pie */ "../../node_modules/core-js/modules/_object-pie.js").f;

module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      if (isEnum.call(O, key = keys[i++])) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_own-keys.js":
/*!*****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_own-keys.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ "../../node_modules/core-js/modules/_object-gopn.js");

var gOPS = __webpack_require__(/*! ./_object-gops */ "../../node_modules/core-js/modules/_object-gops.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var Reflect = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js").Reflect;

module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_parse-float.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_parse-float.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js").parseFloat;

var $trim = __webpack_require__(/*! ./_string-trim */ "../../node_modules/core-js/modules/_string-trim.js").trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ "../../node_modules/core-js/modules/_string-ws.js") + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),

/***/ "../../node_modules/core-js/modules/_parse-int.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_parse-int.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js").parseInt;

var $trim = __webpack_require__(/*! ./_string-trim */ "../../node_modules/core-js/modules/_string-trim.js").trim;

var ws = __webpack_require__(/*! ./_string-ws */ "../../node_modules/core-js/modules/_string-ws.js");

var hex = /^[-+]?0[xX]/;
module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),

/***/ "../../node_modules/core-js/modules/_perform.js":
/*!****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_perform.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return {
      e: false,
      v: exec()
    };
  } catch (e) {
    return {
      e: true,
      v: e
    };
  }
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_promise-resolve.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_promise-resolve.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "../../node_modules/core-js/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_property-desc.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_property-desc.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_redefine-all.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_redefine-all.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js");

module.exports = function (target, src, safe) {
  for (var key in src) {
    redefine(target, key, src[key], safe);
  }

  return target;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_redefine.js":
/*!*****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_redefine.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var hide = __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js");

var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var SRC = __webpack_require__(/*! ./_uid */ "../../node_modules/core-js/modules/_uid.js")('src');

var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "../../node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),

/***/ "../../node_modules/core-js/modules/_same-value.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_same-value.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_set-proto.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_set-proto.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var check = function check(O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};

module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  function (test, buggy, set) {
    try {
      set = __webpack_require__(/*! ./_ctx */ "../../node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "../../node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }

    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  }({}, false) : undefined),
  check: check
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_set-species.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_set-species.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var dP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js");

var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js");

var SPECIES = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_set-to-string-tag.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_set-to-string-tag.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f;

var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var TAG = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
    configurable: true,
    value: tag
  });
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_shared-key.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_shared-key.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "../../node_modules/core-js/modules/_shared.js")('keys');

var uid = __webpack_require__(/*! ./_uid */ "../../node_modules/core-js/modules/_uid.js");

module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_shared.js":
/*!***************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_shared.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "../../node_modules/core-js/modules/_core.js");

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "../../node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

/***/ }),

/***/ "../../node_modules/core-js/modules/_species-constructor.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_species-constructor.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var aFunction = __webpack_require__(/*! ./_a-function */ "../../node_modules/core-js/modules/_a-function.js");

var SPECIES = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('species');

module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_strict-method.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_strict-method.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () {
      /* empty */
    }, 1) : method.call(null);
  });
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_string-at.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_string-at.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "../../node_modules/core-js/modules/_to-integer.js");

var defined = __webpack_require__(/*! ./_defined */ "../../node_modules/core-js/modules/_defined.js"); // true  -> String#at
// false -> String#codePointAt


module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_string-context.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_string-context.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "../../node_modules/core-js/modules/_is-regexp.js");

var defined = __webpack_require__(/*! ./_defined */ "../../node_modules/core-js/modules/_defined.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_string-html.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_string-html.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var defined = __webpack_require__(/*! ./_defined */ "../../node_modules/core-js/modules/_defined.js");

var quot = /"/g; // B.2.3.2.1 CreateHTML(string, tag, attribute, value)

var createHTML = function createHTML(string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_string-pad.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_string-pad.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var repeat = __webpack_require__(/*! ./_string-repeat */ "../../node_modules/core-js/modules/_string-repeat.js");

var defined = __webpack_require__(/*! ./_defined */ "../../node_modules/core-js/modules/_defined.js");

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_string-repeat.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_string-repeat.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(/*! ./_to-integer */ "../../node_modules/core-js/modules/_to-integer.js");

var defined = __webpack_require__(/*! ./_defined */ "../../node_modules/core-js/modules/_defined.js");

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");

  for (; n > 0; (n >>>= 1) && (str += str)) {
    if (n & 1) res += str;
  }

  return res;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_string-trim.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_string-trim.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var defined = __webpack_require__(/*! ./_defined */ "../../node_modules/core-js/modules/_defined.js");

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var spaces = __webpack_require__(/*! ./_string-ws */ "../../node_modules/core-js/modules/_string-ws.js");

var space = '[' + spaces + ']';
var non = "\u200B\x85";
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function exporter(KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
}; // 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim


var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),

/***/ "../../node_modules/core-js/modules/_string-ws.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_string-ws.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

/***/ }),

/***/ "../../node_modules/core-js/modules/_task.js":
/*!*************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_task.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "../../node_modules/core-js/modules/_ctx.js");

var invoke = __webpack_require__(/*! ./_invoke */ "../../node_modules/core-js/modules/_invoke.js");

var html = __webpack_require__(/*! ./_html */ "../../node_modules/core-js/modules/_html.js");

var cel = __webpack_require__(/*! ./_dom-create */ "../../node_modules/core-js/modules/_dom-create.js");

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function run() {
  var id = +this; // eslint-disable-next-line no-prototype-builtins

  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var listener = function listener(event) {
  run.call(event.data);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;

    while (arguments.length > i) {
      args.push(arguments[i++]);
    }

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };

    defer(counter);
    return counter;
  };

  clearTask = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (__webpack_require__(/*! ./_cof */ "../../node_modules/core-js/modules/_cof.js")(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(ctx(run, id, 1));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(ctx(run, id, 1));
    }; // Browsers with MessageChannel, includes WebWorkers

  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function defer(id) {
      global.postMessage(id + '', '*');
    };

    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function defer(id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    }; // Rest old browsers

  } else {
    defer = function defer(id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}

module.exports = {
  set: setTask,
  clear: clearTask
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_to-absolute-index.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_to-absolute-index.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "../../node_modules/core-js/modules/_to-integer.js");

var max = Math.max;
var min = Math.min;

module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_to-index.js":
/*!*****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_to-index.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ "../../node_modules/core-js/modules/_to-integer.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_to-integer.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_to-integer.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;

module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_to-iobject.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_to-iobject.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "../../node_modules/core-js/modules/_iobject.js");

var defined = __webpack_require__(/*! ./_defined */ "../../node_modules/core-js/modules/_defined.js");

module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_to-length.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_to-length.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "../../node_modules/core-js/modules/_to-integer.js");

var min = Math.min;

module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_to-object.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_to-object.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "../../node_modules/core-js/modules/_defined.js");

module.exports = function (it) {
  return Object(defined(it));
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_to-primitive.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_to-primitive.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js"); // instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_typed-array.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_typed-array.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if (__webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js")) {
  var LIBRARY = __webpack_require__(/*! ./_library */ "../../node_modules/core-js/modules/_library.js");

  var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

  var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

  var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

  var $typed = __webpack_require__(/*! ./_typed */ "../../node_modules/core-js/modules/_typed.js");

  var $buffer = __webpack_require__(/*! ./_typed-buffer */ "../../node_modules/core-js/modules/_typed-buffer.js");

  var ctx = __webpack_require__(/*! ./_ctx */ "../../node_modules/core-js/modules/_ctx.js");

  var anInstance = __webpack_require__(/*! ./_an-instance */ "../../node_modules/core-js/modules/_an-instance.js");

  var propertyDesc = __webpack_require__(/*! ./_property-desc */ "../../node_modules/core-js/modules/_property-desc.js");

  var hide = __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js");

  var redefineAll = __webpack_require__(/*! ./_redefine-all */ "../../node_modules/core-js/modules/_redefine-all.js");

  var toInteger = __webpack_require__(/*! ./_to-integer */ "../../node_modules/core-js/modules/_to-integer.js");

  var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

  var toIndex = __webpack_require__(/*! ./_to-index */ "../../node_modules/core-js/modules/_to-index.js");

  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "../../node_modules/core-js/modules/_to-absolute-index.js");

  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../../node_modules/core-js/modules/_to-primitive.js");

  var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

  var classof = __webpack_require__(/*! ./_classof */ "../../node_modules/core-js/modules/_classof.js");

  var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

  var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "../../node_modules/core-js/modules/_is-array-iter.js");

  var create = __webpack_require__(/*! ./_object-create */ "../../node_modules/core-js/modules/_object-create.js");

  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "../../node_modules/core-js/modules/_object-gpo.js");

  var gOPN = __webpack_require__(/*! ./_object-gopn */ "../../node_modules/core-js/modules/_object-gopn.js").f;

  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "../../node_modules/core-js/modules/core.get-iterator-method.js");

  var uid = __webpack_require__(/*! ./_uid */ "../../node_modules/core-js/modules/_uid.js");

  var wks = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js");

  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ "../../node_modules/core-js/modules/_array-methods.js");

  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ "../../node_modules/core-js/modules/_array-includes.js");

  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "../../node_modules/core-js/modules/_species-constructor.js");

  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ "../../node_modules/core-js/modules/es6.array.iterator.js");

  var Iterators = __webpack_require__(/*! ./_iterators */ "../../node_modules/core-js/modules/_iterators.js");

  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ "../../node_modules/core-js/modules/_iter-detect.js");

  var setSpecies = __webpack_require__(/*! ./_set-species */ "../../node_modules/core-js/modules/_set-species.js");

  var arrayFill = __webpack_require__(/*! ./_array-fill */ "../../node_modules/core-js/modules/_array-fill.js");

  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ "../../node_modules/core-js/modules/_array-copy-within.js");

  var $DP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js");

  var $GOPD = __webpack_require__(/*! ./_object-gopd */ "../../node_modules/core-js/modules/_object-gopd.js");

  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';
  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });
  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });
  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function toOffset(it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function validate(it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function allocate(C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    }

    return new C(length);
  };

  var speciesFromList = function speciesFromList(O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function fromList(C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);

    while (length > index) {
      result[index] = list[index++];
    }

    return result;
  };

  var addGetter = function addGetter(it, key, internal) {
    dP(it, key, {
      get: function get() {
        return this._d[internal];
      }
    });
  };

  var $from = function from(source
  /* , mapfn, thisArg */
  ) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;

    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      }

      O = values;
    }

    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);

    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }

    return result;
  };

  var $of = function of()
  /* ...items */
  {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);

    while (length > index) {
      result[index] = arguments[index++];
    }

    return result;
  }; // iOS Safari 6.x fails here


  var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
    arrayToLocaleString.call(new Uint8Array(1));
  });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start
    /* , end */
    ) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn
    /* , thisArg */
    ) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value
    /* , start, end */
    ) {
      // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn
    /* , thisArg */
    ) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate
    /* , thisArg */
    ) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate
    /* , thisArg */
    ) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn
    /* , thisArg */
    ) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement
    /* , fromIndex */
    ) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement
    /* , fromIndex */
    ) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) {
      // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement
    /* , fromIndex */
    ) {
      // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn
    /* , thisArg */
    ) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn
    /* , initialValue */
    ) {
      // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn
    /* , initialValue */
    ) {
      // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;

      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      }

      return that;
    },
    some: function some(callbackfn
    /* , thisArg */
    ) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike
  /* , offset */
  ) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);

    while (index < len) {
      this[offset + index] = src[index++];
    }
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function isTAIndex(target, key) {
    return isObject(target) && target[TYPED_ARRAY] && _typeof(key) != 'symbol' && key in target && String(+key) == String(key);
  };

  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
  };

  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set') // TODO: add validation descriptor w/o calling accessors
    && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
      target[key] = desc.value;
      return target;
    }

    return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () {
    arrayToString.call({});
  })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function constructor() {
      /* noop */
    },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function get() {
      return this[TYPED_ARRAY];
    }
  }); // eslint-disable-next-line max-statements

  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];

    var getter = function getter(that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };

    var setter = function setter(that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };

    var addElement = function addElement(that, index) {
      dP(that, index, {
        get: function get() {
          return getter(this, index);
        },
        set: function set(value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;

        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;

          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }

          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }

        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });

        while (index < length) {
          addElement(that, index++);
        }
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new

      new TypedArray(null); // eslint-disable-line no-new

      new TypedArray(1.5); // eslint-disable-line no-new

      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass; // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645

        if (!isObject(data)) return new Base(toIndex(data));

        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
        }

        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }

    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function get() {
          return NAME;
        }
      });
    }

    O[NAME] = TypedArray;
    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });
    $export($export.S + $export.F * fails(function () {
      Base.of.call(TypedArray, 1);
    }), NAME, {
      from: $from,
      of: $of
    });
    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
    $export($export.P, NAME, proto);
    setSpecies(NAME);
    $export($export.P + $export.F * FORCED_SET, NAME, {
      set: $set
    });
    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;
    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, {
      slice: $slice
    });
    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {
      toLocaleString: $toLocaleString
    });
    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () {
  /* empty */
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_typed-buffer.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_typed-buffer.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js");

var LIBRARY = __webpack_require__(/*! ./_library */ "../../node_modules/core-js/modules/_library.js");

var $typed = __webpack_require__(/*! ./_typed */ "../../node_modules/core-js/modules/_typed.js");

var hide = __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js");

var redefineAll = __webpack_require__(/*! ./_redefine-all */ "../../node_modules/core-js/modules/_redefine-all.js");

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var anInstance = __webpack_require__(/*! ./_an-instance */ "../../node_modules/core-js/modules/_an-instance.js");

var toInteger = __webpack_require__(/*! ./_to-integer */ "../../node_modules/core-js/modules/_to-integer.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var toIndex = __webpack_require__(/*! ./_to-index */ "../../node_modules/core-js/modules/_to-index.js");

var gOPN = __webpack_require__(/*! ./_object-gopn */ "../../node_modules/core-js/modules/_object-gopn.js").f;

var dP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f;

var arrayFill = __webpack_require__(/*! ./_array-fill */ "../../node_modules/core-js/modules/_array-fill.js");

var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "../../node_modules/core-js/modules/_set-to-string-tag.js");

var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError; // eslint-disable-next-line no-shadow-restricted-names

var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET; // IEEE754 conversions based on https://github.com/feross/ieee754

function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value); // eslint-disable-next-line no-self-compare

  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);

    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {
    ;
  }

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {
    ;
  }

  buffer[--i] |= s * 128;
  return buffer;
}

function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;

  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {
    ;
  }

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {
    ;
  }

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}

function packI8(it) {
  return [it & 0xff];
}

function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}

function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}

function packF64(it) {
  return packIEEE754(it, 52, 8);
}

function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, {
    get: function get() {
      return this[internal];
    }
  });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}

function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);

  for (var i = 0; i < bytes; i++) {
    store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
  }
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset
    /* , littleEndian */
    ) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset
    /* , littleEndian */
    ) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset
    /* , littleEndian */
    ) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset
    /* , littleEndian */
    ) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset
    /* , littleEndian */
    ) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset
    /* , littleEndian */
    ) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new

    new $ArrayBuffer(1.5); // eslint-disable-line no-new

    new $ArrayBuffer(NaN); // eslint-disable-line no-new

    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };

    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];

    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }

    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  } // iOS Safari 7.x bug


  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),

/***/ "../../node_modules/core-js/modules/_typed.js":
/*!**************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_typed.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var hide = __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js");

var uid = __webpack_require__(/*! ./_uid */ "../../node_modules/core-js/modules/_uid.js");

var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;
var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_uid.js":
/*!************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_uid.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();

module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_user-agent.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_user-agent.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var navigator = global.navigator;
module.exports = navigator && navigator.userAgent || '';

/***/ }),

/***/ "../../node_modules/core-js/modules/_validate-collection.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_validate-collection.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_wks-define.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_wks-define.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var core = __webpack_require__(/*! ./_core */ "../../node_modules/core-js/modules/_core.js");

var LIBRARY = __webpack_require__(/*! ./_library */ "../../node_modules/core-js/modules/_library.js");

var wksExt = __webpack_require__(/*! ./_wks-ext */ "../../node_modules/core-js/modules/_wks-ext.js");

var defineProperty = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f;

module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {
    value: wksExt.f(name)
  });
};

/***/ }),

/***/ "../../node_modules/core-js/modules/_wks-ext.js":
/*!****************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_wks-ext.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js");

/***/ }),

/***/ "../../node_modules/core-js/modules/_wks.js":
/*!************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/_wks.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "../../node_modules/core-js/modules/_shared.js")('wks');

var uid = __webpack_require__(/*! ./_uid */ "../../node_modules/core-js/modules/_uid.js");

var _Symbol = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js").Symbol;

var USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),

/***/ "../../node_modules/core-js/modules/core.get-iterator-method.js":
/*!********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/core.get-iterator-method.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "../../node_modules/core-js/modules/_classof.js");

var ITERATOR = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('iterator');

var Iterators = __webpack_require__(/*! ./_iterators */ "../../node_modules/core-js/modules/_iterators.js");

module.exports = __webpack_require__(/*! ./_core */ "../../node_modules/core-js/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.copy-within.js":
/*!*****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.copy-within.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.P, 'Array', {
  copyWithin: __webpack_require__(/*! ./_array-copy-within */ "../../node_modules/core-js/modules/_array-copy-within.js")
});

__webpack_require__(/*! ./_add-to-unscopables */ "../../node_modules/core-js/modules/_add-to-unscopables.js")('copyWithin');

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.every.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.every.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $every = __webpack_require__(/*! ./_array-methods */ "../../node_modules/core-js/modules/_array-methods.js")(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn
  /* , thisArg */
  ) {
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.fill.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.fill.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.P, 'Array', {
  fill: __webpack_require__(/*! ./_array-fill */ "../../node_modules/core-js/modules/_array-fill.js")
});

__webpack_require__(/*! ./_add-to-unscopables */ "../../node_modules/core-js/modules/_add-to-unscopables.js")('fill');

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.filter.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.filter.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $filter = __webpack_require__(/*! ./_array-methods */ "../../node_modules/core-js/modules/_array-methods.js")(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.find-index.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.find-index.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $find = __webpack_require__(/*! ./_array-methods */ "../../node_modules/core-js/modules/_array-methods.js")(6);

var KEY = 'findIndex';
var forced = true; // Shouldn't skip holes

if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "../../node_modules/core-js/modules/_add-to-unscopables.js")(KEY);

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.find.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.find.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $find = __webpack_require__(/*! ./_array-methods */ "../../node_modules/core-js/modules/_array-methods.js")(5);

var KEY = 'find';
var forced = true; // Shouldn't skip holes

if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "../../node_modules/core-js/modules/_add-to-unscopables.js")(KEY);

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.for-each.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.for-each.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $forEach = __webpack_require__(/*! ./_array-methods */ "../../node_modules/core-js/modules/_array-methods.js")(0);

var STRICT = __webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.from.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.from.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(/*! ./_ctx */ "../../node_modules/core-js/modules/_ctx.js");

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var call = __webpack_require__(/*! ./_iter-call */ "../../node_modules/core-js/modules/_iter-call.js");

var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "../../node_modules/core-js/modules/_is-array-iter.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var createProperty = __webpack_require__(/*! ./_create-property */ "../../node_modules/core-js/modules/_create-property.js");

var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "../../node_modules/core-js/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "../../node_modules/core-js/modules/_iter-detect.js")(function (iter) {
  Array.from(iter);
}), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);

      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }

    result.length = index;
    return result;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.index-of.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.index-of.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $indexOf = __webpack_require__(/*! ./_array-includes */ "../../node_modules/core-js/modules/_array-includes.js")(false);

var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.is-array.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.is-array.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Array', {
  isArray: __webpack_require__(/*! ./_is-array */ "../../node_modules/core-js/modules/_is-array.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.iterator.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.iterator.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "../../node_modules/core-js/modules/_add-to-unscopables.js");

var step = __webpack_require__(/*! ./_iter-step */ "../../node_modules/core-js/modules/_iter-step.js");

var Iterators = __webpack_require__(/*! ./_iterators */ "../../node_modules/core-js/modules/_iterators.js");

var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js"); // 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()


module.exports = __webpack_require__(/*! ./_iter-define */ "../../node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target

  this._i = 0; // next index

  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;

  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }

  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

Iterators.Arguments = Iterators.Array;
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.join.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.join.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 22.1.3.13 Array.prototype.join(separator)

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var arrayJoin = [].join; // fallback for not array-like strings

$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ "../../node_modules/core-js/modules/_iobject.js") != Object || !__webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.last-index-of.js":
/*!*******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var toInteger = __webpack_require__(/*! ./_to-integer */ "../../node_modules/core-js/modules/_to-integer.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement
  /* , fromIndex = @[*-1] */
  ) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;

    for (; index >= 0; index--) {
      if (index in O) if (O[index] === searchElement) return index || 0;
    }

    return -1;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.map.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.map.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $map = __webpack_require__(/*! ./_array-methods */ "../../node_modules/core-js/modules/_array-methods.js")(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.of.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.of.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var createProperty = __webpack_require__(/*! ./_create-property */ "../../node_modules/core-js/modules/_create-property.js"); // WebKit Array.of isn't generic


$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  function F() {
    /* empty */
  }

  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of()
  /* ...args */
  {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);

    while (aLen > index) {
      createProperty(result, index, arguments[index++]);
    }

    result.length = aLen;
    return result;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.reduce-right.js":
/*!******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $reduce = __webpack_require__(/*! ./_array-reduce */ "../../node_modules/core-js/modules/_array-reduce.js");

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.reduce.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.reduce.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $reduce = __webpack_require__(/*! ./_array-reduce */ "../../node_modules/core-js/modules/_array-reduce.js");

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.slice.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.slice.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var html = __webpack_require__(/*! ./_html */ "../../node_modules/core-js/modules/_html.js");

var cof = __webpack_require__(/*! ./_cof */ "../../node_modules/core-js/modules/_cof.js");

var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "../../node_modules/core-js/modules/_to-absolute-index.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var arraySlice = [].slice; // fallback for not array-like ES3 strings and DOM objects

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;

    for (; i < size; i++) {
      cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
    }

    return cloned;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.some.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.some.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $some = __webpack_require__(/*! ./_array-methods */ "../../node_modules/core-js/modules/_array-methods.js")(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn
  /* , thisArg */
  ) {
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.sort.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.sort.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var aFunction = __webpack_require__(/*! ./_a-function */ "../../node_modules/core-js/modules/_a-function.js");

var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var $sort = [].sort;
var test = [1, 2, 3];
$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null); // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ "../../node_modules/core-js/modules/_strict-method.js")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.array.species.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.array.species.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ "../../node_modules/core-js/modules/_set-species.js")('Array');

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.date.now.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.date.now.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Date', {
  now: function now() {
    return new Date().getTime();
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.date.to-iso-string.js":
/*!******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ "../../node_modules/core-js/modules/_date-to-iso-string.js"); // PhantomJS / old WebKit has a broken implementations


$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.date.to-json.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.date.to-json.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../../node_modules/core-js/modules/_to-primitive.js");

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({
    toISOString: function toISOString() {
      return 1;
    }
  }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.date.to-primitive.js":
/*!*****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('toPrimitive');

var proto = Date.prototype;
if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js")(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ "../../node_modules/core-js/modules/_date-to-primitive.js"));

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.date.to-string.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.date.to-string.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;

if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js")(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this); // eslint-disable-next-line no-self-compare

    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.function.bind.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.function.bind.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.P, 'Function', {
  bind: __webpack_require__(/*! ./_bind */ "../../node_modules/core-js/modules/_bind.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.function.has-instance.js":
/*!*********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "../../node_modules/core-js/modules/_object-gpo.js");

var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('hasInstance');

var FunctionProto = Function.prototype; // 19.2.3.6 Function.prototype[@@hasInstance](V)

if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f(FunctionProto, HAS_INSTANCE, {
  value: function value(O) {
    if (typeof this != 'function' || !isObject(O)) return false;
    if (!isObject(this.prototype)) return O instanceof this; // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:

    while (O = getPrototypeOf(O)) {
      if (this.prototype === O) return true;
    }

    return false;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.function.name.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.function.name.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f;

var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // 19.2.4.2 name

NAME in FProto || __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js") && dP(FProto, NAME, {
  configurable: true,
  get: function get() {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.map.js":
/*!***************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.map.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strong = __webpack_require__(/*! ./_collection-strong */ "../../node_modules/core-js/modules/_collection-strong.js");

var validate = __webpack_require__(/*! ./_validate-collection */ "../../node_modules/core-js/modules/_validate-collection.js");

var MAP = 'Map'; // 23.1 Map Objects

module.exports = __webpack_require__(/*! ./_collection */ "../../node_modules/core-js/modules/_collection.js")(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.acosh.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.acosh.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var log1p = __webpack_require__(/*! ./_math-log1p */ "../../node_modules/core-js/modules/_math-log1p.js");

var sqrt = Math.sqrt;
var $acosh = Math.acosh;
$export($export.S + $export.F * !($acosh // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
&& Math.floor($acosh(Number.MAX_VALUE)) == 710 // Tor Browser bug: Math.acosh(Infinity) -> NaN
&& $acosh(Infinity) == Infinity), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.asinh.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.asinh.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
} // Tor Browser bug: Math.asinh(0) -> -0


$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {
  asinh: asinh
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.atanh.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.atanh.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $atanh = Math.atanh; // Tor Browser bug: Math.atanh(-0) -> 0

$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.cbrt.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var sign = __webpack_require__(/*! ./_math-sign */ "../../node_modules/core-js/modules/_math-sign.js");

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.clz32.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.clz32.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.cosh.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.cosh.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var exp = Math.exp;
$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.expm1.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.expm1.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $expm1 = __webpack_require__(/*! ./_math-expm1 */ "../../node_modules/core-js/modules/_math-expm1.js");

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {
  expm1: $expm1
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.fround.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.fround.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  fround: __webpack_require__(/*! ./_math-fround */ "../../node_modules/core-js/modules/_math-fround.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.hypot.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.hypot.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var abs = Math.abs;
$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) {
    // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;

    while (i < aLen) {
      arg = abs(arguments[i++]);

      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }

    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.imul.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.imul.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $imul = Math.imul; // some WebKit versions fails with big numbers, some has wrong arity

$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.log10.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.log10.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.log1p.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.log1p.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log1p: __webpack_require__(/*! ./_math-log1p */ "../../node_modules/core-js/modules/_math-log1p.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.log2.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.log2.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.sign.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.sign.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  sign: __webpack_require__(/*! ./_math-sign */ "../../node_modules/core-js/modules/_math-sign.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.sinh.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.sinh.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var expm1 = __webpack_require__(/*! ./_math-expm1 */ "../../node_modules/core-js/modules/_math-expm1.js");

var exp = Math.exp; // V8 near Chromium 38 has a problem with very small numbers

$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.tanh.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.tanh.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var expm1 = __webpack_require__(/*! ./_math-expm1 */ "../../node_modules/core-js/modules/_math-expm1.js");

var exp = Math.exp;
$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.math.trunc.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.math.trunc.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.constructor.js":
/*!******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.constructor.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var cof = __webpack_require__(/*! ./_cof */ "../../node_modules/core-js/modules/_cof.js");

var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "../../node_modules/core-js/modules/_inherit-if-required.js");

var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../../node_modules/core-js/modules/_to-primitive.js");

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var gOPN = __webpack_require__(/*! ./_object-gopn */ "../../node_modules/core-js/modules/_object-gopn.js").f;

var gOPD = __webpack_require__(/*! ./_object-gopd */ "../../node_modules/core-js/modules/_object-gopd.js").f;

var dP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f;

var $trim = __webpack_require__(/*! ./_string-trim */ "../../node_modules/core-js/modules/_string-trim.js").trim;

var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype; // Opera ~12 has broken Object#toString

var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ "../../node_modules/core-js/modules/_object-create.js")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype; // 7.1.3 ToNumber(argument)

var toNumber = function toNumber(argument) {
  var it = toPrimitive(argument, false);

  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;

    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal /^0o[0-7]+$/i

        default:
          return +it;
      }

      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number // check on 1..constructor(foo) case
    && (BROKEN_COF ? fails(function () {
      proto.valueOf.call(that);
    }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };

  for (var keys = __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js") ? gOPN(Base) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES6 (in case, if modules with ES6 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }

  $Number.prototype = proto;
  proto.constructor = $Number;

  __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js")(global, NUMBER, $Number);
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.epsilon.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.epsilon.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', {
  EPSILON: Math.pow(2, -52)
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.is-finite.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.is-finite.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var _isFinite = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js").isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.is-integer.js":
/*!*****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.is-integer.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', {
  isInteger: __webpack_require__(/*! ./_is-integer */ "../../node_modules/core-js/modules/_is-integer.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.is-nan.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.is-nan.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.is-safe-integer.js":
/*!**********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var isInteger = __webpack_require__(/*! ./_is-integer */ "../../node_modules/core-js/modules/_is-integer.js");

var abs = Math.abs;
$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.max-safe-integer.js":
/*!***********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', {
  MAX_SAFE_INTEGER: 0x1fffffffffffff
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.min-safe-integer.js":
/*!***********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Number', {
  MIN_SAFE_INTEGER: -0x1fffffffffffff
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.parse-float.js":
/*!******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.parse-float.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $parseFloat = __webpack_require__(/*! ./_parse-float */ "../../node_modules/core-js/modules/_parse-float.js"); // 20.1.2.12 Number.parseFloat(string)


$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {
  parseFloat: $parseFloat
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.parse-int.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.parse-int.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $parseInt = __webpack_require__(/*! ./_parse-int */ "../../node_modules/core-js/modules/_parse-int.js"); // 20.1.2.13 Number.parseInt(string, radix)


$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {
  parseInt: $parseInt
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.to-fixed.js":
/*!***************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var toInteger = __webpack_require__(/*! ./_to-integer */ "../../node_modules/core-js/modules/_to-integer.js");

var aNumberValue = __webpack_require__(/*! ./_a-number-value */ "../../node_modules/core-js/modules/_a-number-value.js");

var repeat = __webpack_require__(/*! ./_string-repeat */ "../../node_modules/core-js/modules/_string-repeat.js");

var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function multiply(n, c) {
  var i = -1;
  var c2 = c;

  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function divide(n) {
  var i = 6;
  var c = 0;

  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = c % n * 1e7;
  }
};

var numToString = function numToString() {
  var i = 6;
  var s = '';

  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  }

  return s;
};

var pow = function pow(x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function log(x) {
  var n = 0;
  var x2 = x;

  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }

  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }

  return n;
};

$export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !__webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR); // eslint-disable-next-line no-self-compare

    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);

    if (x < 0) {
      s = '-';
      x = -x;
    }

    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;

      if (e > 0) {
        multiply(0, z);
        j = f;

        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }

        multiply(pow(10, j, 1), 0);
        j = e - 1;

        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }

        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }

    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    }

    return m;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.number.to-precision.js":
/*!*******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var aNumberValue = __webpack_require__(/*! ./_a-number-value */ "../../node_modules/core-js/modules/_a-number-value.js");

var $toPrecision = 1.0.toPrecision;
$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.assign.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.assign.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', {
  assign: __webpack_require__(/*! ./_object-assign */ "../../node_modules/core-js/modules/_object-assign.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.create.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.create.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js"); // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


$export($export.S, 'Object', {
  create: __webpack_require__(/*! ./_object-create */ "../../node_modules/core-js/modules/_object-create.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.define-properties.js":
/*!************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.define-properties.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js"); // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)


$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js"), 'Object', {
  defineProperties: __webpack_require__(/*! ./_object-dps */ "../../node_modules/core-js/modules/_object-dps.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.define-property.js":
/*!**********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.define-property.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js"); // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)


$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js"), 'Object', {
  defineProperty: __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.freeze.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.freeze.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var meta = __webpack_require__(/*! ./_meta */ "../../node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "../../node_modules/core-js/modules/_object-sap.js")('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":
/*!**********************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "../../node_modules/core-js/modules/_object-gopd.js").f;

__webpack_require__(/*! ./_object-sap */ "../../node_modules/core-js/modules/_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.get-own-property-names.js":
/*!*****************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ "../../node_modules/core-js/modules/_object-sap.js")('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ "../../node_modules/core-js/modules/_object-gopn-ext.js").f;
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.get-prototype-of.js":
/*!***********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "../../node_modules/core-js/modules/_object-gpo.js");

__webpack_require__(/*! ./_object-sap */ "../../node_modules/core-js/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.is-extensible.js":
/*!********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "../../node_modules/core-js/modules/_object-sap.js")('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.is-frozen.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "../../node_modules/core-js/modules/_object-sap.js")('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.is-sealed.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "../../node_modules/core-js/modules/_object-sap.js")('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.is.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.is.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Object', {
  is: __webpack_require__(/*! ./_same-value */ "../../node_modules/core-js/modules/_same-value.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.keys.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.keys.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ "../../node_modules/core-js/modules/_to-object.js");

var $keys = __webpack_require__(/*! ./_object-keys */ "../../node_modules/core-js/modules/_object-keys.js");

__webpack_require__(/*! ./_object-sap */ "../../node_modules/core-js/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.prevent-extensions.js":
/*!*************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var meta = __webpack_require__(/*! ./_meta */ "../../node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "../../node_modules/core-js/modules/_object-sap.js")('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.seal.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.seal.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var meta = __webpack_require__(/*! ./_meta */ "../../node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "../../node_modules/core-js/modules/_object-sap.js")('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.set-prototype-of.js":
/*!***********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Object', {
  setPrototypeOf: __webpack_require__(/*! ./_set-proto */ "../../node_modules/core-js/modules/_set-proto.js").set
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.object.to-string.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.object.to-string.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 19.1.3.6 Object.prototype.toString()

var classof = __webpack_require__(/*! ./_classof */ "../../node_modules/core-js/modules/_classof.js");

var test = {};
test[__webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('toStringTag')] = 'z';

if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.parse-float.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.parse-float.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $parseFloat = __webpack_require__(/*! ./_parse-float */ "../../node_modules/core-js/modules/_parse-float.js"); // 18.2.4 parseFloat(string)


$export($export.G + $export.F * (parseFloat != $parseFloat), {
  parseFloat: $parseFloat
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.parse-int.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.parse-int.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $parseInt = __webpack_require__(/*! ./_parse-int */ "../../node_modules/core-js/modules/_parse-int.js"); // 18.2.5 parseInt(string, radix)


$export($export.G + $export.F * (parseInt != $parseInt), {
  parseInt: $parseInt
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.promise.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.promise.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(/*! ./_library */ "../../node_modules/core-js/modules/_library.js");

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var ctx = __webpack_require__(/*! ./_ctx */ "../../node_modules/core-js/modules/_ctx.js");

var classof = __webpack_require__(/*! ./_classof */ "../../node_modules/core-js/modules/_classof.js");

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var aFunction = __webpack_require__(/*! ./_a-function */ "../../node_modules/core-js/modules/_a-function.js");

var anInstance = __webpack_require__(/*! ./_an-instance */ "../../node_modules/core-js/modules/_an-instance.js");

var forOf = __webpack_require__(/*! ./_for-of */ "../../node_modules/core-js/modules/_for-of.js");

var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "../../node_modules/core-js/modules/_species-constructor.js");

var task = __webpack_require__(/*! ./_task */ "../../node_modules/core-js/modules/_task.js").set;

var microtask = __webpack_require__(/*! ./_microtask */ "../../node_modules/core-js/modules/_microtask.js")();

var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ "../../node_modules/core-js/modules/_new-promise-capability.js");

var perform = __webpack_require__(/*! ./_perform */ "../../node_modules/core-js/modules/_perform.js");

var userAgent = __webpack_require__(/*! ./_user-agent */ "../../node_modules/core-js/modules/_user-agent.js");

var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "../../node_modules/core-js/modules/_promise-resolve.js");

var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';

var empty = function empty() {
  /* empty */
};

var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;
var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);

    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    }; // unhandled rejections tracking support, NodeJS Promise without it fails @@species test


    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0 && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) {
    /* empty */
  }
}(); // helpers

var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function notify(promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;

    var run = function run(reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;

      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }

          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // may throw

            if (domain) {
              domain.exit();
              exited = true;
            }
          }

          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };

    while (chain.length > i) {
      run(chain[i++]);
    } // variable length - can't use forEach


    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};

var onUnhandled = function onUnhandled(promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;

    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({
            promise: promise,
            reason: value
          });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    }

    promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};

var isUnhandled = function isUnhandled(promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};

var onHandleUnhandled = function onHandleUnhandled(promise) {
  task.call(global, function () {
    var handler;

    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({
        promise: promise,
        reason: promise._v
      });
    }
  });
};

var $reject = function $reject(value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap

  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};

var $resolve = function $resolve(value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap

  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");

    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = {
          _w: promise,
          _d: false
        }; // wrap

        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({
      _w: promise,
      _d: false
    }, e); // wrap
  }
}; // constructor polyfill


if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);

    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  }; // eslint-disable-next-line no-unused-vars


  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions

    this._a = undefined; // <- checked in isUnhandled reactions

    this._s = 0; // <- state

    this._d = false; // <- done

    this._v = undefined; // <- value

    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled

    this._n = false; // <- notify
  };

  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ "../../node_modules/core-js/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;

      this._c.push(reaction);

      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {
  Promise: $Promise
});

__webpack_require__(/*! ./_set-to-string-tag */ "../../node_modules/core-js/modules/_set-to-string-tag.js")($Promise, PROMISE);

__webpack_require__(/*! ./_set-species */ "../../node_modules/core-js/modules/_set-species.js")(PROMISE);

Wrapper = __webpack_require__(/*! ./_core */ "../../node_modules/core-js/modules/_core.js")[PROMISE]; // statics

$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ "../../node_modules/core-js/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.apply.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.apply.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var aFunction = __webpack_require__(/*! ./_a-function */ "../../node_modules/core-js/modules/_a-function.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var rApply = (__webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js").Reflect || {}).apply;
var fApply = Function.apply; // MS Edge argumentsList argument is optional

$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  rApply(function () {
    /* empty */
  });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.construct.js":
/*!*****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.construct.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var create = __webpack_require__(/*! ./_object-create */ "../../node_modules/core-js/modules/_object-create.js");

var aFunction = __webpack_require__(/*! ./_a-function */ "../../node_modules/core-js/modules/_a-function.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var bind = __webpack_require__(/*! ./_bind */ "../../node_modules/core-js/modules/_bind.js");

var rConstruct = (__webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js").Reflect || {}).construct; // MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it

var NEW_TARGET_BUG = fails(function () {
  function F() {
    /* empty */
  }

  return !(rConstruct(function () {
    /* empty */
  }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () {
    /* empty */
  });
});
$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args
  /* , newTarget */
  ) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);

    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();

        case 1:
          return new Target(args[0]);

        case 2:
          return new Target(args[0], args[1]);

        case 3:
          return new Target(args[0], args[1], args[2]);

        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      } // w/o altered newTarget, lot of arguments case


      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    } // with altered newTarget, not support built-in constructors


    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.define-property.js":
/*!***********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js");

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../../node_modules/core-js/modules/_to-primitive.js"); // MS Edge has broken Reflect.defineProperty - throwing instead of returning false


$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, {
    value: 1
  }), 1, {
    value: 2
  });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);

    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.delete-property.js":
/*!***********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var gOPD = __webpack_require__(/*! ./_object-gopd */ "../../node_modules/core-js/modules/_object-gopd.js").f;

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.enumerate.js":
/*!*****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 26.1.5 Reflect.enumerate(target)

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var Enumerate = function Enumerate(iterated) {
  this._t = anObject(iterated); // target

  this._i = 0; // next index

  var keys = this._k = []; // keys

  var key;

  for (key in iterated) {
    keys.push(key);
  }
};

__webpack_require__(/*! ./_iter-create */ "../../node_modules/core-js/modules/_iter-create.js")(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;

  do {
    if (that._i >= keys.length) return {
      value: undefined,
      done: true
    };
  } while (!((key = keys[that._i++]) in that._t));

  return {
    value: key,
    done: false
  };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":
/*!***********************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ "../../node_modules/core-js/modules/_object-gopd.js");

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.get-prototype-of.js":
/*!************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var getProto = __webpack_require__(/*! ./_object-gpo */ "../../node_modules/core-js/modules/_object-gpo.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.get.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.get.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ "../../node_modules/core-js/modules/_object-gopd.js");

var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "../../node_modules/core-js/modules/_object-gpo.js");

var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

function get(target, propertyKey
/* , receiver */
) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {
  get: get
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.has.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.has.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.is-extensible.js":
/*!*********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var $isExtensible = Object.isExtensible;
$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.own-keys.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.S, 'Reflect', {
  ownKeys: __webpack_require__(/*! ./_own-keys */ "../../node_modules/core-js/modules/_own-keys.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.prevent-extensions.js":
/*!**************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var $preventExtensions = Object.preventExtensions;
$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);

    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.set-prototype-of.js":
/*!************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var setProto = __webpack_require__(/*! ./_set-proto */ "../../node_modules/core-js/modules/_set-proto.js");

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);

    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.reflect.set.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.reflect.set.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js");

var gOPD = __webpack_require__(/*! ./_object-gopd */ "../../node_modules/core-js/modules/_object-gopd.js");

var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "../../node_modules/core-js/modules/_object-gpo.js");

var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var createDesc = __webpack_require__(/*! ./_property-desc */ "../../node_modules/core-js/modules/_property-desc.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

function set(target, propertyKey, V
/* , receiver */
) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;

  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }

    ownDesc = createDesc(0);
  }

  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;

    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));

    return true;
  }

  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {
  set: set
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.regexp.constructor.js":
/*!******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "../../node_modules/core-js/modules/_inherit-if-required.js");

var dP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f;

var gOPN = __webpack_require__(/*! ./_object-gopn */ "../../node_modules/core-js/modules/_object-gopn.js").f;

var isRegExp = __webpack_require__(/*! ./_is-regexp */ "../../node_modules/core-js/modules/_is-regexp.js");

var $flags = __webpack_require__(/*! ./_flags */ "../../node_modules/core-js/modules/_flags.js");

var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g; // "new" creates a new object, old webkit buggy here

var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js") && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  re2[__webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js")('match')] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
  };

  var proxy = function proxy(key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function get() {
        return Base[key];
      },
      set: function set(it) {
        Base[key] = it;
      }
    });
  };

  for (var keys = gOPN(Base), i = 0; keys.length > i;) {
    proxy(keys[i++]);
  }

  proto.constructor = $RegExp;
  $RegExp.prototype = proto;

  __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js")(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ "../../node_modules/core-js/modules/_set-species.js")('RegExp');

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.regexp.flags.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.regexp.flags.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js") && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ "../../node_modules/core-js/modules/_flags.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.regexp.match.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.regexp.match.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ "../../node_modules/core-js/modules/_fix-re-wks.js")('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';

    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.regexp.replace.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.regexp.replace.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ "../../node_modules/core-js/modules/_fix-re-wks.js")('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';

    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.regexp.search.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.regexp.search.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ "../../node_modules/core-js/modules/_fix-re-wks.js")('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';

    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.regexp.split.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.regexp.split.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ "../../node_modules/core-js/modules/_fix-re-wks.js")('split', 2, function (defined, SPLIT, $split) {
  'use strict';

  var isRegExp = __webpack_require__(/*! ./_is-regexp */ "../../node_modules/core-js/modules/_is-regexp.js");

  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';

  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it

    $split = function $split(separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split

      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i; // Doesn't need flags gy, but they don't hurt

      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);

      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index)); // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func

          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined;
            }
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }

        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }

      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    }; // Chakra, V8

  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function $split(separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  } // 21.1.3.17 String.prototype.split(separator, limit)


  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.regexp.to-string.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./es6.regexp.flags */ "../../node_modules/core-js/modules/es6.regexp.flags.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var $flags = __webpack_require__(/*! ./_flags */ "../../node_modules/core-js/modules/_flags.js");

var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js");

var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function define(fn) {
  __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js")(RegExp.prototype, TO_STRING, fn, true);
}; // 21.2.5.14 RegExp.prototype.toString()


if (__webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  return $toString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
})) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  }); // FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.set.js":
/*!***************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.set.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strong = __webpack_require__(/*! ./_collection-strong */ "../../node_modules/core-js/modules/_collection-strong.js");

var validate = __webpack_require__(/*! ./_validate-collection */ "../../node_modules/core-js/modules/_validate-collection.js");

var SET = 'Set'; // 23.2 Set Objects

module.exports = __webpack_require__(/*! ./_collection */ "../../node_modules/core-js/modules/_collection.js")(SET, function (get) {
  return function Set() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.anchor.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.anchor.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.2 String.prototype.anchor(name)

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.big.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.big.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.3 String.prototype.big()

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.blink.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.blink.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.4 String.prototype.blink()

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.bold.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.bold.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.5 String.prototype.bold()

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.code-point-at.js":
/*!********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $at = __webpack_require__(/*! ./_string-at */ "../../node_modules/core-js/modules/_string-at.js")(false);

$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.ends-with.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.ends-with.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var context = __webpack_require__(/*! ./_string-context */ "../../node_modules/core-js/modules/_string-context.js");

var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];
$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "../../node_modules/core-js/modules/_fails-is-regexp.js")(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString
  /* , endPosition = @length */
  ) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.fixed.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.fixed.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.6 String.prototype.fixed()

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.fontcolor.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.7 String.prototype.fontcolor(color)

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.fontsize.js":
/*!***************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.fontsize.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.8 String.prototype.fontsize(size)

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.from-code-point.js":
/*!**********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "../../node_modules/core-js/modules/_to-absolute-index.js");

var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint; // length should be 1, old FF problem

$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) {
    // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;

    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
    }

    return res.join('');
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.includes.js":
/*!***************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.includes.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var context = __webpack_require__(/*! ./_string-context */ "../../node_modules/core-js/modules/_string-context.js");

var INCLUDES = 'includes';
$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "../../node_modules/core-js/modules/_fails-is-regexp.js")(INCLUDES), 'String', {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.italics.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.italics.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.9 String.prototype.italics()

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.iterator.js":
/*!***************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.iterator.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $at = __webpack_require__(/*! ./_string-at */ "../../node_modules/core-js/modules/_string-at.js")(true); // 21.1.3.27 String.prototype[@@iterator]()


__webpack_require__(/*! ./_iter-define */ "../../node_modules/core-js/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target

  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return {
    value: undefined,
    done: true
  };
  point = $at(O, index);
  this._i += point.length;
  return {
    value: point,
    done: false
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.link.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.link.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.10 String.prototype.link(url)

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.raw.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.raw.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;

    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    }

    return res.join('');
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.repeat.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.repeat.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ "../../node_modules/core-js/modules/_string-repeat.js")
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.small.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.small.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.11 String.prototype.small()

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.starts-with.js":
/*!******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.starts-with.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var context = __webpack_require__(/*! ./_string-context */ "../../node_modules/core-js/modules/_string-context.js");

var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];
$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "../../node_modules/core-js/modules/_fails-is-regexp.js")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString
  /* , position = 0 */
  ) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.strike.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.strike.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.12 String.prototype.strike()

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.sub.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.sub.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.13 String.prototype.sub()

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.sup.js":
/*!**********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.sup.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // B.2.3.14 String.prototype.sup()

__webpack_require__(/*! ./_string-html */ "../../node_modules/core-js/modules/_string-html.js")('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.string.trim.js":
/*!***********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.string.trim.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // 21.1.3.25 String.prototype.trim()

__webpack_require__(/*! ./_string-trim */ "../../node_modules/core-js/modules/_string-trim.js")('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.symbol.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.symbol.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // ECMAScript 6 symbols shim

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var has = __webpack_require__(/*! ./_has */ "../../node_modules/core-js/modules/_has.js");

var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "../../node_modules/core-js/modules/_descriptors.js");

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var redefine = __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js");

var META = __webpack_require__(/*! ./_meta */ "../../node_modules/core-js/modules/_meta.js").KEY;

var $fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var shared = __webpack_require__(/*! ./_shared */ "../../node_modules/core-js/modules/_shared.js");

var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "../../node_modules/core-js/modules/_set-to-string-tag.js");

var uid = __webpack_require__(/*! ./_uid */ "../../node_modules/core-js/modules/_uid.js");

var wks = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js");

var wksExt = __webpack_require__(/*! ./_wks-ext */ "../../node_modules/core-js/modules/_wks-ext.js");

var wksDefine = __webpack_require__(/*! ./_wks-define */ "../../node_modules/core-js/modules/_wks-define.js");

var enumKeys = __webpack_require__(/*! ./_enum-keys */ "../../node_modules/core-js/modules/_enum-keys.js");

var isArray = __webpack_require__(/*! ./_is-array */ "../../node_modules/core-js/modules/_is-array.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../../node_modules/core-js/modules/_to-primitive.js");

var createDesc = __webpack_require__(/*! ./_property-desc */ "../../node_modules/core-js/modules/_property-desc.js");

var _create = __webpack_require__(/*! ./_object-create */ "../../node_modules/core-js/modules/_object-create.js");

var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "../../node_modules/core-js/modules/_object-gopn-ext.js");

var $GOPD = __webpack_require__(/*! ./_object-gopd */ "../../node_modules/core-js/modules/_object-gopd.js");

var $DP = __webpack_require__(/*! ./_object-dp */ "../../node_modules/core-js/modules/_object-dp.js");

var $keys = __webpack_require__(/*! ./_object-keys */ "../../node_modules/core-js/modules/_object-keys.js");

var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;

var _stringify = $JSON && $JSON.stringify;

var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function get() {
      return dP(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function wrap(tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);

  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
  return _typeof(it) == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);

  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, {
        enumerable: createDesc(0, false)
      });
    }

    return setSymbolDesc(it, key, D);
  }

  return dP(it, key, D);
};

var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;

  while (l > i) {
    $defineProperty(it, key = keys[i++], P[key]);
  }

  return it;
};

var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};

var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};

var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;

  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  }

  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;

  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  }

  return result;
}; // 19.4.1.1 Symbol([description])


if (!USE_NATIVE) {
  $Symbol = function _Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);

    var $set = function $set(value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };

    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: $set
    });
    return wrap(tag);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });
  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "../../node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "../../node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "../../node_modules/core-js/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "../../node_modules/core-js/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {
  Symbol: $Symbol
});

for (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
  wks(es6Symbols[j++]);
}

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) {
  wksDefine(wellKnownSymbols[k++]);
}

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function _for(key) {
    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');

    for (var key in SymbolRegistry) {
      if (SymbolRegistry[key] === sym) return key;
    }
  },
  useSetter: function useSetter() {
    setter = true;
  },
  useSimple: function useSimple() {
    setter = false;
  }
});
$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // 24.3.2 JSON.stringify(value [, replacer [, space]])

$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol(); // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols

  return _stringify([S]) != '[null]' || _stringify({
    a: S
  }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;

    while (arguments.length > i) {
      args.push(arguments[i++]);
    }

    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

    if (!isArray(replacer)) replacer = function replacer(key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
}); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)

$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]

setToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]

setToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]

setToStringTag(global.JSON, 'JSON', true);

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.array-buffer.js":
/*!******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.array-buffer.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $typed = __webpack_require__(/*! ./_typed */ "../../node_modules/core-js/modules/_typed.js");

var buffer = __webpack_require__(/*! ./_typed-buffer */ "../../node_modules/core-js/modules/_typed-buffer.js");

var anObject = __webpack_require__(/*! ./_an-object */ "../../node_modules/core-js/modules/_an-object.js");

var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "../../node_modules/core-js/modules/_to-absolute-index.js");

var toLength = __webpack_require__(/*! ./_to-length */ "../../node_modules/core-js/modules/_to-length.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var ArrayBuffer = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js").ArrayBuffer;

var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "../../node_modules/core-js/modules/_species-constructor.js");

var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';
$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {
  ArrayBuffer: $ArrayBuffer
});
$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});
$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js")(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix

    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;

    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    }

    return result;
  }
});

__webpack_require__(/*! ./_set-species */ "../../node_modules/core-js/modules/_set-species.js")(ARRAY_BUFFER);

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.data-view.js":
/*!***************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.data-view.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ "../../node_modules/core-js/modules/_typed.js").ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ "../../node_modules/core-js/modules/_typed-buffer.js").DataView
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.float32-array.js":
/*!*******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.float32-array.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "../../node_modules/core-js/modules/_typed-array.js")('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.float64-array.js":
/*!*******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.float64-array.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "../../node_modules/core-js/modules/_typed-array.js")('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.int16-array.js":
/*!*****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.int16-array.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "../../node_modules/core-js/modules/_typed-array.js")('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.int32-array.js":
/*!*****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.int32-array.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "../../node_modules/core-js/modules/_typed-array.js")('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.int8-array.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.int8-array.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "../../node_modules/core-js/modules/_typed-array.js")('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.uint16-array.js":
/*!******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.uint16-array.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "../../node_modules/core-js/modules/_typed-array.js")('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.uint32-array.js":
/*!******************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.uint32-array.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "../../node_modules/core-js/modules/_typed-array.js")('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.uint8-array.js":
/*!*****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.uint8-array.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "../../node_modules/core-js/modules/_typed-array.js")('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":
/*!*************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ "../../node_modules/core-js/modules/_typed-array.js")('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.weak-map.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.weak-map.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__(/*! ./_array-methods */ "../../node_modules/core-js/modules/_array-methods.js")(0);

var redefine = __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js");

var meta = __webpack_require__(/*! ./_meta */ "../../node_modules/core-js/modules/_meta.js");

var assign = __webpack_require__(/*! ./_object-assign */ "../../node_modules/core-js/modules/_object-assign.js");

var weak = __webpack_require__(/*! ./_collection-weak */ "../../node_modules/core-js/modules/_collection-weak.js");

var isObject = __webpack_require__(/*! ./_is-object */ "../../node_modules/core-js/modules/_is-object.js");

var fails = __webpack_require__(/*! ./_fails */ "../../node_modules/core-js/modules/_fails.js");

var validate = __webpack_require__(/*! ./_validate-collection */ "../../node_modules/core-js/modules/_validate-collection.js");

var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function wrapper(get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
}; // 23.3 WeakMap Objects

var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ "../../node_modules/core-js/modules/_collection.js")(WEAK_MAP, wrapper, methods, weak, true, true); // IE11 WeakMap frozen keys fix


if (fails(function () {
  return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7;
})) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();

        var result = this._f[key](a, b);

        return key == 'set' ? this : result; // store all the rest on native weakmap
      }

      return method.call(this, a, b);
    });
  });
}

/***/ }),

/***/ "../../node_modules/core-js/modules/es6.weak-set.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es6.weak-set.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var weak = __webpack_require__(/*! ./_collection-weak */ "../../node_modules/core-js/modules/_collection-weak.js");

var validate = __webpack_require__(/*! ./_validate-collection */ "../../node_modules/core-js/modules/_validate-collection.js");

var WEAK_SET = 'WeakSet'; // 23.4 WeakSet Objects

__webpack_require__(/*! ./_collection */ "../../node_modules/core-js/modules/_collection.js")(WEAK_SET, function (get) {
  return function WeakSet() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

/***/ }),

/***/ "../../node_modules/core-js/modules/es7.array.includes.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es7.array.includes.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // https://github.com/tc39/Array.prototype.includes

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $includes = __webpack_require__(/*! ./_array-includes */ "../../node_modules/core-js/modules/_array-includes.js")(true);

$export($export.P, 'Array', {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "../../node_modules/core-js/modules/_add-to-unscopables.js")('includes');

/***/ }),

/***/ "../../node_modules/core-js/modules/es7.object.entries.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es7.object.entries.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $entries = __webpack_require__(/*! ./_object-to-array */ "../../node_modules/core-js/modules/_object-to-array.js")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":
/*!***********************************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var ownKeys = __webpack_require__(/*! ./_own-keys */ "../../node_modules/core-js/modules/_own-keys.js");

var toIObject = __webpack_require__(/*! ./_to-iobject */ "../../node_modules/core-js/modules/_to-iobject.js");

var gOPD = __webpack_require__(/*! ./_object-gopd */ "../../node_modules/core-js/modules/_object-gopd.js");

var createProperty = __webpack_require__(/*! ./_create-property */ "../../node_modules/core-js/modules/_create-property.js");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;

    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }

    return result;
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es7.object.values.js":
/*!*************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es7.object.values.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $values = __webpack_require__(/*! ./_object-to-array */ "../../node_modules/core-js/modules/_object-to-array.js")(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es7.promise.finally.js":
/*!***************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es7.promise.finally.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally


var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var core = __webpack_require__(/*! ./_core */ "../../node_modules/core-js/modules/_core.js");

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "../../node_modules/core-js/modules/_species-constructor.js");

var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "../../node_modules/core-js/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', {
  'finally': function _finally(onFinally) {
    var C = speciesConstructor(this, core.Promise || global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es7.string.pad-end.js":
/*!**************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es7.string.pad-end.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $pad = __webpack_require__(/*! ./_string-pad */ "../../node_modules/core-js/modules/_string-pad.js");

var userAgent = __webpack_require__(/*! ./_user-agent */ "../../node_modules/core-js/modules/_user-agent.js"); // https://github.com/zloirock/core-js/issues/280


$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength
  /* , fillString = ' ' */
  ) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es7.string.pad-start.js":
/*!****************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es7.string.pad-start.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $pad = __webpack_require__(/*! ./_string-pad */ "../../node_modules/core-js/modules/_string-pad.js");

var userAgent = __webpack_require__(/*! ./_user-agent */ "../../node_modules/core-js/modules/_user-agent.js"); // https://github.com/zloirock/core-js/issues/280


$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength
  /* , fillString = ' ' */
  ) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),

/***/ "../../node_modules/core-js/modules/es7.symbol.async-iterator.js":
/*!*********************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "../../node_modules/core-js/modules/_wks-define.js")('asyncIterator');

/***/ }),

/***/ "../../node_modules/core-js/modules/web.dom.iterable.js":
/*!************************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/web.dom.iterable.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "../../node_modules/core-js/modules/es6.array.iterator.js");

var getKeys = __webpack_require__(/*! ./_object-keys */ "../../node_modules/core-js/modules/_object-keys.js");

var redefine = __webpack_require__(/*! ./_redefine */ "../../node_modules/core-js/modules/_redefine.js");

var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var hide = __webpack_require__(/*! ./_hide */ "../../node_modules/core-js/modules/_hide.js");

var Iterators = __webpack_require__(/*! ./_iterators */ "../../node_modules/core-js/modules/_iterators.js");

var wks = __webpack_require__(/*! ./_wks */ "../../node_modules/core-js/modules/_wks.js");

var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;
var DOMIterables = {
  CSSRuleList: true,
  // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true,
  // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true,
  // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;

  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) {
      if (!proto[key]) redefine(proto, key, $iterators[key], true);
    }
  }
}

/***/ }),

/***/ "../../node_modules/core-js/modules/web.immediate.js":
/*!*********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/web.immediate.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var $task = __webpack_require__(/*! ./_task */ "../../node_modules/core-js/modules/_task.js");

$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

/***/ }),

/***/ "../../node_modules/core-js/modules/web.timers.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/modules/web.timers.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ "../../node_modules/core-js/modules/_global.js");

var $export = __webpack_require__(/*! ./_export */ "../../node_modules/core-js/modules/_export.js");

var userAgent = __webpack_require__(/*! ./_user-agent */ "../../node_modules/core-js/modules/_user-agent.js");

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function wrap(set) {
  return function (fn, time
  /* , ...args */
  ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};

$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),

/***/ "../../node_modules/core-js/web/index.js":
/*!*********************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/core-js/web/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.timers */ "../../node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! ../modules/web.immediate */ "../../node_modules/core-js/modules/web.immediate.js");

__webpack_require__(/*! ../modules/web.dom.iterable */ "../../node_modules/core-js/modules/web.dom.iterable.js");

module.exports = __webpack_require__(/*! ../modules/_core */ "../../node_modules/core-js/modules/_core.js");

/***/ }),

/***/ "../../node_modules/debug/src/browser.js":
/*!*********************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/debug/src/browser.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(/*! ./common */ "../../node_modules/debug/src/common.js")(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../node_modules/debug/src/common.js":
/*!********************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/debug/src/common.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(/*! ms */ "../../node_modules/ms/index.js");
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Disabled?
      if (!debug.enabled) {
        return;
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;

/***/ }),

/***/ "../../node_modules/ieee754/index.js":
/*!*****************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/ieee754/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),

/***/ "../../node_modules/isarray/index.js":
/*!*****************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/isarray/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ "../../node_modules/ms/index.js":
/*!************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/ms/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Helpers.
 */
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};

  var type = _typeof(val);

  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */


function parse(str) {
  str = String(str);

  if (str.length > 100) {
    return;
  }

  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

  if (!match) {
    return;
  }

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;

    case 'weeks':
    case 'week':
    case 'w':
      return n * w;

    case 'days':
    case 'day':
    case 'd':
      return n * d;

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;

    default:
      return undefined;
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtShort(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }

  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }

  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }

  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }

  return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtLong(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }

  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }

  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }

  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }

  return ms + ' ms';
}
/**
 * Pluralization helper.
 */


function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/***/ }),

/***/ "../../node_modules/node-libs-browser/mock/empty.js":
/*!********************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/node-libs-browser/mock/empty.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "../../node_modules/process/browser.js":
/*!*******************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/process/browser.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
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
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
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

  while (len) {
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
}; // v8 likes predictible objects


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

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "../../node_modules/regenerator-runtime/runtime.js":
/*!*******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/node_modules/regenerator-runtime/runtime.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!function (global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var inModule = ( false ? undefined : _typeof(module)) === "object";
  var runtime = global.regeneratorRuntime;

  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    } // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.


    return;
  } // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.


  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  runtime.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  runtime.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
}( // In sloppy mode, unbound `this` refers to the global object, fallback to
// Function constructor if we're in global strict mode. That is sadly a form
// of indirect eval which violates Content Security Policy.
function () {
  return this;
}() || Function("return this")());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "../../node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "../../webio/node_modules/systemjs/dist/system.js":
/*!******************************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/node_modules/systemjs/dist/system.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, process, global, __filename) {var require;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * SystemJS v0.20.19 Dev
 */
!function () {
  "use strict";

  function e(e) {
    return ut ? Symbol() : "@@" + e;
  }

  function t(e, t) {
    ot || (t = t.replace(at ? /file:\/\/\//g : /file:\/\//g, ""));
    var r,
        n = (e.message || e) + "\n  " + t;
    r = ft && e.fileName ? new Error(n, e.fileName, e.lineNumber) : new Error(n);
    var o = e.originalErr ? e.originalErr.stack : e.stack;
    return r.stack = it ? n + "\n  " + o : o, r.originalErr = e.originalErr || e, r;
  }

  function r(e, t) {
    throw new RangeError('Unable to resolve "' + e + '" to ' + t);
  }

  function n(e, t) {
    e = e.trim();
    var n = t && t.substr(0, t.indexOf(":") + 1),
        o = e[0],
        i = e[1];
    if ("/" === o && "/" === i) return n || r(e, t), n + e;

    if ("." === o && ("/" === i || "." === i && ("/" === e[2] || 2 === e.length && (e += "/")) || 1 === e.length && (e += "/")) || "/" === o) {
      var a,
          s = !n || "/" !== t[n.length];

      if (s ? (void 0 === t && r(e, t), a = t) : a = "/" === t[n.length + 1] ? "file:" !== n ? (a = t.substr(n.length + 2)).substr(a.indexOf("/") + 1) : t.substr(8) : t.substr(n.length + 1), "/" === o) {
        if (!s) return t.substr(0, t.length - a.length - 1) + e;
        r(e, t);
      }

      for (var u = a.substr(0, a.lastIndexOf("/") + 1) + e, l = [], c = -1, f = 0; f < u.length; f++) {
        if (-1 === c) {
          if ("." !== u[f]) c = f;else {
            if ("." !== u[f + 1] || "/" !== u[f + 2] && f + 2 !== u.length) {
              if ("/" !== u[f + 1] && f + 1 !== u.length) {
                c = f;
                continue;
              }

              f += 1;
            } else l.pop(), f += 2;

            s && 0 === l.length && r(e, t);
          }
        } else "/" === u[f] && (l.push(u.substring(c, f + 1)), c = -1);
      }

      return -1 !== c && l.push(u.substr(c)), t.substr(0, t.length - a.length) + l.join("");
    }

    return -1 !== e.indexOf(":") ? it && ":" === e[1] && "\\" === e[2] && e[0].match(/[a-z]/i) ? "file:///" + e.replace(/\\/g, "/") : e : void 0;
  }

  function o(e) {
    if (e.values) return e.values();
    if ("undefined" == typeof Symbol || !Symbol.iterator) throw new Error("Symbol.iterator not supported in this browser");
    var t = {};
    return t[Symbol.iterator] = function () {
      var t = Object.keys(e),
          r = 0;
      return {
        next: function next() {
          return r < t.length ? {
            value: e[t[r++]],
            done: !1
          } : {
            value: void 0,
            done: !0
          };
        }
      };
    }, t;
  }

  function i() {
    this.registry = new u();
  }

  function a(e) {
    if (!(e instanceof l)) throw new TypeError("Module instantiation did not return a valid namespace object.");
    return e;
  }

  function s(e) {
    if (void 0 === e) throw new RangeError("No resolution found.");
    return e;
  }

  function u() {
    this[mt] = {};
  }

  function l(e) {
    Object.defineProperty(this, vt, {
      value: e
    }), Object.keys(e).forEach(c, this);
  }

  function c(e) {
    Object.defineProperty(this, e, {
      enumerable: !0,
      get: function get() {
        return this[vt][e];
      }
    });
  }

  function f() {
    i.call(this);
    var e = this.registry.delete;

    this.registry.delete = function (r) {
      var n = e.call(this, r);
      return t.hasOwnProperty(r) && !t[r].linkRecord && (delete t[r], n = !0), n;
    };

    var t = {};
    this[yt] = {
      lastRegister: void 0,
      records: t
    }, this.trace = !1;
  }

  function d(e, t, r) {
    return e.records[t] = {
      key: t,
      registration: r,
      module: void 0,
      importerSetters: void 0,
      loadError: void 0,
      evalError: void 0,
      linkRecord: {
        instantiatePromise: void 0,
        dependencies: void 0,
        execute: void 0,
        executingRequire: !1,
        moduleObj: void 0,
        setters: void 0,
        depsInstantiatePromise: void 0,
        dependencyInstantiations: void 0
      }
    };
  }

  function p(e, t, r, n, o) {
    var i = n[t];
    if (i) return Promise.resolve(i);
    var a = o.records[t];
    return a && !a.module ? a.loadError ? Promise.reject(a.loadError) : h(e, a, a.linkRecord, n, o) : e.resolve(t, r).then(function (t) {
      if (i = n[t]) return i;
      if ((a = o.records[t]) && !a.module || (a = d(o, t, a && a.registration)), a.loadError) return Promise.reject(a.loadError);
      var r = a.linkRecord;
      return r ? h(e, a, r, n, o) : a;
    });
  }

  function g(e, t, r) {
    return function () {
      var e = r.lastRegister;
      return e ? (r.lastRegister = void 0, t.registration = e, !0) : !!t.registration;
    };
  }

  function h(e, r, n, o, i) {
    return n.instantiatePromise || (n.instantiatePromise = (r.registration ? Promise.resolve() : Promise.resolve().then(function () {
      return i.lastRegister = void 0, e[bt](r.key, e[bt].length > 1 && g(e, r, i));
    })).then(function (t) {
      if (void 0 !== t) {
        if (!(t instanceof l)) throw new TypeError("Instantiate did not return a valid Module object.");
        return delete i.records[r.key], e.trace && v(e, r, n), o[r.key] = t;
      }

      var a = r.registration;
      if (r.registration = void 0, !a) throw new TypeError("Module instantiation did not call an anonymous or correctly named System.register.");
      return n.dependencies = a[0], r.importerSetters = [], n.moduleObj = {}, a[2] ? (n.moduleObj.default = n.moduleObj.__useDefault = {}, n.executingRequire = a[1], n.execute = a[2]) : y(e, r, n, a[1]), r;
    }).catch(function (e) {
      throw r.linkRecord = void 0, r.loadError = r.loadError || t(e, "Instantiating " + r.key);
    }));
  }

  function m(e, t, r, n, o, i) {
    return e.resolve(t, r).then(function (r) {
      i && (i[t] = r);
      var a = o.records[r],
          s = n[r];
      if (s && (!a || a.module && s !== a.module)) return s;
      if (a && a.loadError) throw a.loadError;
      (!a || !s && a.module) && (a = d(o, r, a && a.registration));
      var u = a.linkRecord;
      return u ? h(e, a, u, n, o) : a;
    });
  }

  function v(e, t, r) {
    e.loads = e.loads || {}, e.loads[t.key] = {
      key: t.key,
      deps: r.dependencies,
      dynamicDeps: [],
      depMap: r.depMap || {}
    };
  }

  function y(e, t, r, n) {
    var o = r.moduleObj,
        i = t.importerSetters,
        a = !1,
        s = n.call(st, function (e, t) {
      if ("object" == _typeof(e)) {
        var r = !1;

        for (var n in e) {
          t = e[n], "__useDefault" === n || n in o && o[n] === t || (r = !0, o[n] = t);
        }

        if (!1 === r) return t;
      } else {
        if ((a || e in o) && o[e] === t) return t;
        o[e] = t;
      }

      for (var s = 0; s < i.length; s++) {
        i[s](o);
      }

      return t;
    }, new x(e, t.key));
    r.setters = s.setters, r.execute = s.execute, s.exports && (r.moduleObj = o = s.exports, a = !0);
  }

  function b(e, r, n, o, i) {
    if (n.depsInstantiatePromise) return n.depsInstantiatePromise;

    for (var a = Array(n.dependencies.length), s = 0; s < n.dependencies.length; s++) {
      a[s] = m(e, n.dependencies[s], r.key, o, i, e.trace && n.depMap || (n.depMap = {}));
    }

    var u = Promise.all(a).then(function (e) {
      if (n.dependencyInstantiations = e, n.setters) for (var t = 0; t < e.length; t++) {
        var o = n.setters[t];

        if (o) {
          var i = e[t];
          if (i instanceof l) o(i);else {
            if (i.loadError) throw i.loadError;
            o(i.module || i.linkRecord.moduleObj), i.importerSetters && i.importerSetters.push(o);
          }
        }
      }
      return r;
    });
    return e.trace && (u = u.then(function () {
      return v(e, r, n), r;
    })), (u = u.catch(function (e) {
      throw n.depsInstantiatePromise = void 0, t(e, "Loading " + r.key);
    })).catch(function () {}), n.depsInstantiatePromise = u;
  }

  function w(e, t, r, n, o) {
    return new Promise(function (r, i) {
      function a(t) {
        var r = t.linkRecord;
        r && -1 === u.indexOf(t) && (u.push(t), c++, b(e, t, r, n, o).then(s, i));
      }

      function s(e) {
        c--;
        var t = e.linkRecord;
        if (t) for (var n = 0; n < t.dependencies.length; n++) {
          var o = t.dependencyInstantiations[n];
          o instanceof l || a(o);
        }
        0 === c && r();
      }

      var u = [],
          c = 0;
      a(t);
    });
  }

  function x(e, t) {
    this.loader = e, this.key = this.id = t, this.meta = {
      url: t
    };
  }

  function k(e, t, r, n, o, i) {
    if (t.module) return t.module;
    if (t.evalError) throw t.evalError;
    if (i && -1 !== i.indexOf(t)) return t.linkRecord.moduleObj;
    var a = O(e, t, r, n, o, r.setters ? [] : i || []);
    if (a) throw a;
    return t.module;
  }

  function E(e, t, r, n, o, i, a) {
    return function (s) {
      for (var u = 0; u < r.length; u++) {
        if (r[u] === s) {
          var c,
              f = n[u];
          return c = f instanceof l ? f : k(e, f, f.linkRecord, o, i, a), "__useDefault" in c ? c.__useDefault : c;
        }
      }

      throw new Error("Module " + s + " not declared as a System.registerDynamic dependency of " + t);
    };
  }

  function O(e, r, n, o, i, a) {
    a.push(r);
    var s;
    if (n.setters) for (var u, c, f = 0; f < n.dependencies.length; f++) {
      if (!((u = n.dependencyInstantiations[f]) instanceof l) && ((c = u.linkRecord) && -1 === a.indexOf(u) && (s = u.evalError ? u.evalError : O(e, u, c, o, i, c.setters ? a : [])), s)) return r.linkRecord = void 0, r.evalError = t(s, "Evaluating " + r.key), r.evalError;
    }
    if (n.execute) if (n.setters) s = S(n.execute);else {
      var d = {
        id: r.key
      },
          p = n.moduleObj;
      Object.defineProperty(d, "exports", {
        configurable: !0,
        set: function set(e) {
          p.default = p.__useDefault = e;
        },
        get: function get() {
          return p.__useDefault;
        }
      });
      var g = E(e, r.key, n.dependencies, n.dependencyInstantiations, o, i, a);
      if (!n.executingRequire) for (f = 0; f < n.dependencies.length; f++) {
        g(n.dependencies[f]);
      }
      s = j(n.execute, g, p.default, d), d.exports !== p.__useDefault && (p.default = p.__useDefault = d.exports);
      var h = p.default;
      if (h && h.__esModule) for (var m in h) {
        Object.hasOwnProperty.call(h, m) && (p[m] = h[m]);
      }
    }
    if (r.linkRecord = void 0, s) return r.evalError = t(s, "Evaluating " + r.key);

    if (o[r.key] = r.module = new l(n.moduleObj), !n.setters) {
      if (r.importerSetters) for (f = 0; f < r.importerSetters.length; f++) {
        r.importerSetters[f](r.module);
      }
      r.importerSetters = void 0;
    }
  }

  function S(e) {
    try {
      e.call(wt);
    } catch (e) {
      return e;
    }
  }

  function j(e, t, r, n) {
    try {
      var o = e.call(st, t, r, n);
      void 0 !== o && (n.exports = o);
    } catch (e) {
      return e;
    }
  }

  function _() {}

  function P(e) {
    return e instanceof l ? e : new l(e && e.__esModule ? e : {
      default: e,
      __useDefault: e
    });
  }

  function M(e) {
    return void 0 === xt && (xt = "undefined" != typeof Symbol && !!Symbol.toStringTag), e instanceof l || xt && "[object Module]" == Object.prototype.toString.call(e);
  }

  function R(e, t) {
    (t || this.warnings && "undefined" != typeof console && console.warn) && console.warn(e);
  }

  function C(e, t, r) {
    var n = new Uint8Array(t);
    return 0 === n[0] && 97 === n[1] && 115 === n[2] ? WebAssembly.compile(t).then(function (t) {
      var n = [],
          o = [],
          i = {};
      return WebAssembly.Module.imports && WebAssembly.Module.imports(t).forEach(function (e) {
        var t = e.module;
        o.push(function (e) {
          i[t] = e;
        }), -1 === n.indexOf(t) && n.push(t);
      }), e.register(n, function (e) {
        return {
          setters: o,
          execute: function execute() {
            e(new WebAssembly.Instance(t, i).exports);
          }
        };
      }), r(), !0;
    }) : Promise.resolve(!1);
  }

  function L(e, t) {
    if ("." === e[0]) throw new Error("Node module " + e + " can't be loaded as it is not a package require.");

    if (!kt) {
      var r = this._nodeRequire("module"),
          n = decodeURI(t.substr(at ? 8 : 7));

      (kt = new r(n)).paths = r._nodeModulePaths(n);
    }

    return kt.require(e);
  }

  function A(e, t) {
    for (var r in t) {
      Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }

    return e;
  }

  function I(e, t) {
    for (var r in t) {
      Object.hasOwnProperty.call(t, r) && void 0 === e[r] && (e[r] = t[r]);
    }

    return e;
  }

  function F(e, t, r) {
    for (var n in t) {
      if (Object.hasOwnProperty.call(t, n)) {
        var o = t[n];
        void 0 === e[n] ? e[n] = o : o instanceof Array && e[n] instanceof Array ? e[n] = [].concat(r ? o : e[n]).concat(r ? e[n] : o) : "object" == _typeof(o) && null !== o && "object" == _typeof(e[n]) ? e[n] = (r ? I : A)(A({}, e[n]), o) : r || (e[n] = o);
      }
    }
  }

  function K(e) {
    if (Pt || Mt) {
      var t = document.createElement("link");
      Pt ? (t.rel = "preload", t.as = "script") : t.rel = "prefetch", t.href = e, document.head.appendChild(t);
    } else new Image().src = e;
  }

  function D(e, t, r) {
    try {
      importScripts(e);
    } catch (e) {
      r(e);
    }

    t();
  }

  function U(e, t, r, n, o) {
    function i() {
      n(), s();
    }

    function a(t) {
      s(), o(new Error("Fetching " + e));
    }

    function s() {
      for (var e = 0; e < Rt.length; e++) {
        if (Rt[e].err === a) {
          Rt.splice(e, 1);
          break;
        }
      }

      u.removeEventListener("load", i, !1), u.removeEventListener("error", a, !1), document.head.removeChild(u);
    }

    if (e = e.replace(/#/g, "%23"), _t) return D(e, n, o);
    var u = document.createElement("script");
    u.type = "text/javascript", u.charset = "utf-8", u.async = !0, t && (u.crossOrigin = t), r && (u.integrity = r), u.addEventListener("load", i, !1), u.addEventListener("error", a, !1), u.src = e, document.head.appendChild(u);
  }

  function q(e, t) {
    for (var r = e.split("."); r.length;) {
      t = t[r.shift()];
    }

    return t;
  }

  function T(e, t, r) {
    var o = N(t, r);

    if (o) {
      var i = t[o] + r.substr(o.length),
          a = n(i, nt);
      return void 0 !== a ? a : e + i;
    }

    return -1 !== r.indexOf(":") ? r : e + r;
  }

  function z(e) {
    var t = this.name;

    if (t.substr(0, e.length) === e && (t.length === e.length || "/" === t[e.length] || "/" === e[e.length - 1] || ":" === e[e.length - 1])) {
      var r = e.split("/").length;
      r > this.len && (this.match = e, this.len = r);
    }
  }

  function N(e, t) {
    if (Object.hasOwnProperty.call(e, t)) return t;
    var r = {
      name: t,
      match: void 0,
      len: 0
    };
    return Object.keys(e).forEach(z, r), r.match;
  }

  function J(e, t, r, n) {
    if ("file:///" === e.substr(0, 8)) {
      if (Ft) return $(e, t, r, n);
      throw new Error("Unable to fetch file URLs in this environment.");
    }

    e = e.replace(/#/g, "%23");
    var o = {
      headers: {
        Accept: "application/x-es-module, */*"
      }
    };
    return r && (o.integrity = r), t && ("string" == typeof t && (o.headers.Authorization = t), o.credentials = "include"), fetch(e, o).then(function (e) {
      if (e.ok) return n ? e.arrayBuffer() : e.text();
      throw new Error("Fetch error: " + e.status + " " + e.statusText);
    });
  }

  function $(e, t, r, n) {
    return new Promise(function (r, o) {
      function i() {
        r(n ? s.response : s.responseText);
      }

      function a() {
        o(new Error("XHR error: " + (s.status ? " (" + s.status + (s.statusText ? " " + s.statusText : "") + ")" : "") + " loading " + e));
      }

      e = e.replace(/#/g, "%23");
      var s = new XMLHttpRequest();
      n && (s.responseType = "arraybuffer"), s.onreadystatechange = function () {
        4 === s.readyState && (0 == s.status ? s.response ? i() : (s.addEventListener("error", a), s.addEventListener("load", i)) : 200 === s.status ? i() : a());
      }, s.open("GET", e, !0), s.setRequestHeader && (s.setRequestHeader("Accept", "application/x-es-module, */*"), t && ("string" == typeof t && s.setRequestHeader("Authorization", t), s.withCredentials = !0)), s.send(null);
    });
  }

  function B(e, t, r, n) {
    return "file:///" != e.substr(0, 8) ? Promise.reject(new Error('Unable to fetch "' + e + '". Only file URLs of the form file:/// supported running in Node.')) : (Lt = Lt || __webpack_require__(/*! fs */ "../../node_modules/node-libs-browser/mock/empty.js"), e = at ? e.replace(/\//g, "\\").substr(8) : e.substr(7), new Promise(function (t, r) {
      Lt.readFile(e, function (e, o) {
        if (e) return r(e);
        if (n) t(o);else {
          var i = o + "";
          "\uFEFF" === i[0] && (i = i.substr(1)), t(i);
        }
      });
    }));
  }

  function W() {
    throw new Error("No fetch method is defined for this environment.");
  }

  function G() {
    return {
      pluginKey: void 0,
      pluginArgument: void 0,
      pluginModule: void 0,
      packageKey: void 0,
      packageConfig: void 0,
      load: void 0
    };
  }

  function H(e, t, r) {
    var n = G();

    if (r) {
      var o;
      t.pluginFirst ? -1 !== (o = r.lastIndexOf("!")) && (n.pluginArgument = n.pluginKey = r.substr(0, o)) : -1 !== (o = r.indexOf("!")) && (n.pluginArgument = n.pluginKey = r.substr(o + 1)), n.packageKey = N(t.packages, r), n.packageKey && (n.packageConfig = t.packages[n.packageKey]);
    }

    return n;
  }

  function Z(e, t) {
    var r = this[St],
        n = G(),
        o = H(this, r, t),
        i = this;
    return Promise.resolve().then(function () {
      var r = e.lastIndexOf("#?");
      if (-1 === r) return Promise.resolve(e);
      var n = he.call(i, e.substr(r + 2));
      return me.call(i, n, t, !0).then(function (t) {
        return t ? e.substr(0, r) : "@empty";
      });
    }).then(function (e) {
      var a = ne(r.pluginFirst, e);
      return a ? (n.pluginKey = a.plugin, Promise.all([ee.call(i, r, a.argument, o && o.pluginArgument || t, n, o, !0), i.resolve(a.plugin, t)]).then(function (e) {
        if (n.pluginArgument = e[0], n.pluginKey = e[1], n.pluginArgument === n.pluginKey) throw new Error("Plugin " + n.pluginArgument + " cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.");
        return oe(r.pluginFirst, e[0], e[1]);
      })) : ee.call(i, r, e, o && o.pluginArgument || t, n, o, !1);
    }).then(function (e) {
      return ve.call(i, e, t, o);
    }).then(function (e) {
      return re.call(i, r, e, n), n.pluginKey || !n.load.loader ? e : i.resolve(n.load.loader, e).then(function (t) {
        return n.pluginKey = t, n.pluginArgument = e, e;
      });
    }).then(function (e) {
      return i[jt][e] = n, e;
    });
  }

  function X(e, t) {
    var r = ne(e.pluginFirst, t);

    if (r) {
      var n = X.call(this, e, r.plugin);
      return oe(e.pluginFirst, Q.call(this, e, r.argument, void 0, !1, !1), n);
    }

    return Q.call(this, e, t, void 0, !1, !1);
  }

  function Y(e, t) {
    var r = this[St],
        n = G(),
        o = o || H(this, r, t),
        i = ne(r.pluginFirst, e);
    return i ? (n.pluginKey = Y.call(this, i.plugin, t), oe(r.pluginFirst, V.call(this, r, i.argument, o.pluginArgument || t, n, o, !!n.pluginKey), n.pluginKey)) : V.call(this, r, e, o.pluginArgument || t, n, o, !!n.pluginKey);
  }

  function Q(e, t, r, o, i) {
    var a = n(t, r || nt);
    if (a) return T(e.baseURL, e.paths, a);

    if (o) {
      var s = N(e.map, t);
      if (s && (t = e.map[s] + t.substr(s.length), a = n(t, nt))) return T(e.baseURL, e.paths, a);
    }

    if (this.registry.has(t)) return t;
    if ("@node/" === t.substr(0, 6)) return t;
    var u = i && "/" !== t[t.length - 1],
        l = T(e.baseURL, e.paths, u ? t + "/" : t);
    return u ? l.substr(0, l.length - 1) : l;
  }

  function V(e, t, r, n, o, i) {
    if (o && o.packageConfig && "." !== t[0]) {
      var a = o.packageConfig.map,
          s = a && N(a, t);

      if (s && "string" == typeof a[s]) {
        var u = ue(this, e, o.packageConfig, o.packageKey, s, t, n, i);
        if (u) return u;
      }
    }

    var l = Q.call(this, e, t, r, !0, !0),
        c = de(e, l);
    if (n.packageKey = c && c.packageKey || N(e.packages, l), !n.packageKey) return l;
    if (-1 !== e.packageConfigKeys.indexOf(l)) return n.packageKey = void 0, l;
    n.packageConfig = e.packages[n.packageKey] || (e.packages[n.packageKey] = Ee());
    var f = l.substr(n.packageKey.length + 1);
    return ae(this, e, n.packageConfig, n.packageKey, f, n, i);
  }

  function ee(e, t, r, n, o, i) {
    var a = this;
    return Et.then(function () {
      if (o && o.packageConfig && "./" !== t.substr(0, 2)) {
        var r = o.packageConfig.map,
            s = r && N(r, t);
        if (s) return ce(a, e, o.packageConfig, o.packageKey, s, t, n, i);
      }

      return Et;
    }).then(function (o) {
      if (o) return o;
      var s = Q.call(a, e, t, r, !0, !0),
          u = de(e, s);
      return n.packageKey = u && u.packageKey || N(e.packages, s), n.packageKey ? -1 !== e.packageConfigKeys.indexOf(s) ? (n.packageKey = void 0, n.load = te(), n.load.format = "json", n.load.loader = "", Promise.resolve(s)) : (n.packageConfig = e.packages[n.packageKey] || (e.packages[n.packageKey] = Ee()), (u && !n.packageConfig.configured ? pe(a, e, u.configPath, n) : Et).then(function () {
        var t = s.substr(n.packageKey.length + 1);
        return le(a, e, n.packageConfig, n.packageKey, t, n, i);
      })) : Promise.resolve(s);
    });
  }

  function te() {
    return {
      extension: "",
      deps: void 0,
      format: void 0,
      loader: void 0,
      scriptLoad: void 0,
      globals: void 0,
      nonce: void 0,
      integrity: void 0,
      sourceMap: void 0,
      exports: void 0,
      encapsulateGlobal: !1,
      crossOrigin: void 0,
      cjsRequireDetection: !0,
      cjsDeferDepsExecute: !1,
      esModule: !1
    };
  }

  function re(e, t, r) {
    r.load = r.load || te();
    var n,
        o = 0;

    for (var i in e.meta) {
      if (-1 !== (n = i.indexOf("*")) && i.substr(0, n) === t.substr(0, n) && i.substr(n + 1) === t.substr(t.length - i.length + n + 1)) {
        var a = i.split("/").length;
        a > o && (o = a), F(r.load, e.meta[i], o !== a);
      }
    }

    if (e.meta[t] && F(r.load, e.meta[t], !1), r.packageKey) {
      var s = t.substr(r.packageKey.length + 1),
          u = {};

      if (r.packageConfig.meta) {
        o = 0;
        ge(r.packageConfig.meta, s, function (e, t, r) {
          r > o && (o = r), F(u, t, r && o > r);
        }), F(r.load, u, !1);
      }

      !r.packageConfig.format || r.pluginKey || r.load.loader || (r.load.format = r.load.format || r.packageConfig.format);
    }
  }

  function ne(e, t) {
    var r,
        n,
        o = e ? t.indexOf("!") : t.lastIndexOf("!");
    if (-1 !== o) return e ? (r = t.substr(o + 1), n = t.substr(0, o)) : (r = t.substr(0, o), n = t.substr(o + 1) || r.substr(r.lastIndexOf(".") + 1)), {
      argument: r,
      plugin: n
    };
  }

  function oe(e, t, r) {
    return e ? r + "!" + t : t + "!" + r;
  }

  function ie(e, t, r, n, o) {
    if (!n || !t.defaultExtension || "/" === n[n.length - 1] || o) return n;
    var i = !1;
    if (t.meta && ge(t.meta, n, function (e, t, r) {
      if (0 === r || e.lastIndexOf("*") !== e.length - 1) return i = !0;
    }), !i && e.meta && ge(e.meta, r + "/" + n, function (e, t, r) {
      if (0 === r || e.lastIndexOf("*") !== e.length - 1) return i = !0;
    }), i) return n;
    var a = "." + t.defaultExtension;
    return n.substr(n.length - a.length) !== a ? n + a : n;
  }

  function ae(e, t, r, n, o, i, a) {
    if (!o) {
      if (!r.main) return n;
      o = "./" === r.main.substr(0, 2) ? r.main.substr(2) : r.main;
    }

    if (r.map) {
      var s = "./" + o,
          u = N(r.map, s);

      if (u || (s = "./" + ie(t, r, n, o, a)) !== "./" + o && (u = N(r.map, s)), u) {
        var l = ue(e, t, r, n, u, s, i, a);
        if (l) return l;
      }
    }

    return n + "/" + ie(t, r, n, o, a);
  }

  function se(e, t, r) {
    return !(t.substr(0, e.length) === e && r.length > e.length);
  }

  function ue(e, t, r, n, o, i, a, s) {
    "/" === i[i.length - 1] && (i = i.substr(0, i.length - 1));
    var u = r.map[o];
    if ("object" == _typeof(u)) throw new Error("Synchronous conditional normalization not supported sync normalizing " + o + " in " + n);
    if (se(o, u, i) && "string" == typeof u) return V.call(e, t, u + i.substr(o.length), n + "/", a, a, s);
  }

  function le(e, t, r, n, o, i, a) {
    if (!o) {
      if (!r.main) return Promise.resolve(n);
      o = "./" === r.main.substr(0, 2) ? r.main.substr(2) : r.main;
    }

    var s, u;
    return r.map && (s = "./" + o, (u = N(r.map, s)) || (s = "./" + ie(t, r, n, o, a)) !== "./" + o && (u = N(r.map, s))), (u ? ce(e, t, r, n, u, s, i, a) : Et).then(function (e) {
      return e ? Promise.resolve(e) : Promise.resolve(n + "/" + ie(t, r, n, o, a));
    });
  }

  function ce(e, t, r, n, o, i, a, s) {
    "/" === i[i.length - 1] && (i = i.substr(0, i.length - 1));
    var u = r.map[o];
    if ("string" == typeof u) return se(o, u, i) ? ee.call(e, t, u + i.substr(o.length), n + "/", a, a, s).then(function (t) {
      return ve.call(e, t, n + "/", a);
    }) : Et;
    var l = [],
        c = [];

    for (var d in u) {
      var p = he(d);
      c.push({
        condition: p,
        map: u[d]
      }), l.push(f.prototype.import.call(e, p.module, n));
    }

    return Promise.all(l).then(function (e) {
      for (var t = 0; t < c.length; t++) {
        var r = c[t].condition,
            n = q(r.prop, "__useDefault" in e[t] ? e[t].__useDefault : e[t]);
        if (!r.negate && n || r.negate && !n) return c[t].map;
      }
    }).then(function (r) {
      if (r) return se(o, r, i) ? ee.call(e, t, r + i.substr(o.length), n + "/", a, a, s).then(function (t) {
        return ve.call(e, t, n + "/", a);
      }) : Et;
    });
  }

  function fe(e) {
    var t = e.lastIndexOf("*"),
        r = Math.max(t + 1, e.lastIndexOf("/"));
    return {
      length: r,
      regEx: new RegExp("^(" + e.substr(0, r).replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^\\/]+") + ")(\\/|$)"),
      wildcard: -1 !== t
    };
  }

  function de(e, t) {
    for (var r, n, o = !1, i = 0; i < e.packageConfigPaths.length; i++) {
      var a = e.packageConfigPaths[i],
          s = Dt[a] || (Dt[a] = fe(a));

      if (!(t.length < s.length)) {
        var u = t.match(s.regEx);
        !u || r && (o && s.wildcard || !(r.length < u[1].length)) || (r = u[1], o = !s.wildcard, n = r + a.substr(s.length));
      }
    }

    if (r) return {
      packageKey: r,
      configPath: n
    };
  }

  function pe(e, r, n, o, i) {
    var a = e.pluginLoader || e;
    return -1 === r.packageConfigKeys.indexOf(n) && r.packageConfigKeys.push(n), a.import(n).then(function (e) {
      Oe(o.packageConfig, e, o.packageKey, !0, r), o.packageConfig.configured = !0;
    }).catch(function (e) {
      throw t(e, "Unable to fetch package configuration file " + n);
    });
  }

  function ge(e, t, r) {
    var n;

    for (var o in e) {
      var i = "./" === o.substr(0, 2) ? "./" : "";
      if (i && (o = o.substr(2)), -1 !== (n = o.indexOf("*")) && o.substr(0, n) === t.substr(0, n) && o.substr(n + 1) === t.substr(t.length - o.length + n + 1) && r(o, e[i + o], o.split("/").length)) return;
    }

    var a = e[t] && Object.hasOwnProperty.call(e, t) ? e[t] : e["./" + t];
    a && r(a, a, 0);
  }

  function he(e) {
    var t,
        r,
        n,
        o = e.lastIndexOf("|");
    return -1 !== o ? (t = e.substr(o + 1), r = e.substr(0, o), "~" === t[0] && (n = !0, t = t.substr(1))) : (n = "~" === e[0], t = "default", r = e.substr(n), -1 !== Ut.indexOf(r) && (t = r, r = null)), {
      module: r || "@system-env",
      prop: t,
      negate: n
    };
  }

  function me(e, t, r) {
    return f.prototype.import.call(this, e.module, t).then(function (t) {
      var n = q(e.prop, t);
      if (r && "boolean" != typeof n) throw new TypeError("Condition did not resolve to a boolean.");
      return e.negate ? !n : n;
    });
  }

  function ve(e, t, r) {
    var n = e.match(qt);
    if (!n) return Promise.resolve(e);
    var o = he.call(this, n[0].substr(2, n[0].length - 3));
    return me.call(this, o, t, !1).then(function (r) {
      if ("string" != typeof r) throw new TypeError("The condition value for " + e + " doesn't resolve to a string.");
      if (-1 !== r.indexOf("/")) throw new TypeError("Unabled to interpolate conditional " + e + (t ? " in " + t : "") + "\n\tThe condition value " + r + ' cannot contain a "/" separator.');
      return e.replace(qt, r);
    });
  }

  function ye(e, t, r) {
    for (var n = 0; n < Tt.length; n++) {
      var o = Tt[n];
      t[o] && Er[o.substr(0, o.length - 6)] && r(t[o]);
    }
  }

  function be(e, t) {
    var r = {};

    for (var n in e) {
      var o = e[n];
      t > 1 ? o instanceof Array ? r[n] = [].concat(o) : "object" == _typeof(o) ? r[n] = be(o, t - 1) : "packageConfig" !== n && (r[n] = o) : r[n] = o;
    }

    return r;
  }

  function we(e, t) {
    var r = e[t];
    return r instanceof Array ? e[t].concat([]) : "object" == _typeof(r) ? be(r, 3) : e[t];
  }

  function xe(e) {
    if (e) {
      if (-1 !== Or.indexOf(e)) return we(this[St], e);
      throw new Error('"' + e + '" is not a valid configuration name. Must be one of ' + Or.join(", ") + ".");
    }

    for (var t = {}, r = 0; r < Or.length; r++) {
      var n = Or[r],
          o = we(this[St], n);
      void 0 !== o && (t[n] = o);
    }

    return t;
  }

  function ke(e, t) {
    var r = this,
        o = this[St];

    if ("warnings" in e && (o.warnings = e.warnings), "wasm" in e && (o.wasm = "undefined" != typeof WebAssembly && e.wasm), ("production" in e || "build" in e) && tt.call(r, !!e.production, !!(e.build || Er && Er.build)), !t) {
      var i;
      ye(r, e, function (e) {
        i = i || e.baseURL;
      }), (i = i || e.baseURL) && (o.baseURL = n(i, nt) || n("./" + i, nt), "/" !== o.baseURL[o.baseURL.length - 1] && (o.baseURL += "/")), e.paths && A(o.paths, e.paths), ye(r, e, function (e) {
        e.paths && A(o.paths, e.paths);
      });

      for (var a in o.paths) {
        -1 !== o.paths[a].indexOf("*") && (R.call(o, "Path config " + a + " -> " + o.paths[a] + " is no longer supported as wildcards are deprecated."), delete o.paths[a]);
      }
    }

    if (e.defaultJSExtensions && R.call(o, "The defaultJSExtensions configuration option is deprecated.\n  Use packages defaultExtension instead.", !0), "boolean" == typeof e.pluginFirst && (o.pluginFirst = e.pluginFirst), e.map) for (var a in e.map) {
      var s = e.map[a];

      if ("string" == typeof s) {
        var u = Q.call(r, o, s, void 0, !1, !1);
        "/" === u[u.length - 1] && ":" !== a[a.length - 1] && "/" !== a[a.length - 1] && (u = u.substr(0, u.length - 1)), o.map[a] = u;
      } else {
        m = (m = Q.call(r, o, "/" !== a[a.length - 1] ? a + "/" : a, void 0, !0, !0)).substr(0, m.length - 1);
        var l = o.packages[m];
        l || ((l = o.packages[m] = Ee()).defaultExtension = ""), Oe(l, {
          map: s
        }, m, !1, o);
      }
    }

    if (e.packageConfigPaths) {
      for (var c = [], f = 0; f < e.packageConfigPaths.length; f++) {
        var d = e.packageConfigPaths[f],
            p = Math.max(d.lastIndexOf("*") + 1, d.lastIndexOf("/")),
            g = Q.call(r, o, d.substr(0, p), void 0, !1, !1);
        c[f] = g + d.substr(p);
      }

      o.packageConfigPaths = c;
    }

    if (e.bundles) for (var a in e.bundles) {
      for (var h = [], f = 0; f < e.bundles[a].length; f++) {
        h.push(r.normalizeSync(e.bundles[a][f]));
      }

      o.bundles[a] = h;
    }
    if (e.packages) for (var a in e.packages) {
      if (a.match(/^([^\/]+:)?\/\/$/)) throw new TypeError('"' + a + '" is not a valid package name.');
      var m = Q.call(r, o, "/" !== a[a.length - 1] ? a + "/" : a, void 0, !0, !0);
      m = m.substr(0, m.length - 1), Oe(o.packages[m] = o.packages[m] || Ee(), e.packages[a], m, !1, o);
    }
    if (e.depCache) for (var a in e.depCache) {
      o.depCache[r.normalizeSync(a)] = [].concat(e.depCache[a]);
    }
    if (e.meta) for (var a in e.meta) {
      if ("*" === a[0]) A(o.meta[a] = o.meta[a] || {}, e.meta[a]);else {
        var v = Q.call(r, o, a, void 0, !0, !0);
        A(o.meta[v] = o.meta[v] || {}, e.meta[a]);
      }
    }
    "transpiler" in e && (o.transpiler = e.transpiler);

    for (var y in e) {
      -1 === Or.indexOf(y) && -1 === Tt.indexOf(y) && (r[y] = e[y]);
    }

    ye(r, e, function (e) {
      r.config(e, !0);
    });
  }

  function Ee() {
    return {
      defaultExtension: void 0,
      main: void 0,
      format: void 0,
      meta: void 0,
      map: void 0,
      packageConfig: void 0,
      configured: !1
    };
  }

  function Oe(e, t, r, n, o) {
    for (var i in t) {
      "main" === i || "format" === i || "defaultExtension" === i || "configured" === i ? n && void 0 !== e[i] || (e[i] = t[i]) : "map" === i ? (n ? I : A)(e.map = e.map || {}, t.map) : "meta" === i ? (n ? I : A)(e.meta = e.meta || {}, t.meta) : Object.hasOwnProperty.call(t, i) && R.call(o, '"' + i + '" is not a valid package configuration option in package ' + r);
    }

    return void 0 === e.defaultExtension && (e.defaultExtension = "js"), void 0 === e.main && e.map && e.map["."] ? (e.main = e.map["."], delete e.map["."]) : "object" == _typeof(e.main) && (e.map = e.map || {}, e.map["./@main"] = e.main, e.main.default = e.main.default || "./", e.main = "@main"), e;
  }

  function Se(e) {
    return zt ? Wt + new Buffer(e).toString("base64") : "undefined" != typeof btoa ? Wt + btoa(unescape(encodeURIComponent(e))) : "";
  }

  function je(e, t, r, n) {
    var o = e.lastIndexOf("\n");

    if (t) {
      if ("object" != _typeof(t)) throw new TypeError("load.metadata.sourceMap must be set to an object.");
      t = JSON.stringify(t);
    }

    return (n ? "(function(System, SystemJS) {" : "") + e + (n ? "\n})(System, System);" : "") + ("\n//# sourceURL=" != e.substr(o, 15) ? "\n//# sourceURL=" + r + (t ? "!transpiled" : "") : "") + (t && Se(t) || "");
  }

  function _e(e, t, r, n, o) {
    Nt || (Nt = document.head || document.body || document.documentElement);
    var i = document.createElement("script");
    i.text = je(t, r, n, !1);
    var a,
        s = window.onerror;
    if (window.onerror = function (e) {
      a = addToError(e, "Evaluating " + n), s && s.apply(this, arguments);
    }, Pe(e), o && i.setAttribute("nonce", o), Nt.appendChild(i), Nt.removeChild(i), Me(), window.onerror = s, a) return a;
  }

  function Pe(e) {
    0 == Gt++ && (Bt = st.System), st.System = st.SystemJS = e;
  }

  function Me() {
    0 == --Gt && (st.System = st.SystemJS = Bt);
  }

  function Re(e, t, r, n, o, i, a) {
    if (t) {
      if (i && Ht) return _e(e, t, r, n, i);

      try {
        Pe(e), !Jt && e._nodeRequire && (Jt = e._nodeRequire("vm"), $t = Jt.runInThisContext("typeof System !== 'undefined' && System") === e), $t ? Jt.runInThisContext(je(t, r, n, !a), {
          filename: n + (r ? "!transpiled" : "")
        }) : (0, eval)(je(t, r, n, !a)), Me();
      } catch (e) {
        return Me(), e;
      }
    }
  }

  function Ce(e) {
    return "file:///" === e.substr(0, 8) ? e.substr(7 + !!at) : Zt && e.substr(0, Zt.length) === Zt ? e.substr(Zt.length) : e;
  }

  function Le(e, t) {
    return Ce(this.normalizeSync(e, t));
  }

  function Ae(e) {
    var t,
        r = e.lastIndexOf("!"),
        n = (t = -1 !== r ? e.substr(0, r) : e).split("/");
    return n.pop(), n = n.join("/"), {
      filename: Ce(t),
      dirname: Ce(n)
    };
  }

  function Ie(e) {
    function t(e, t) {
      for (var r = 0; r < e.length; r++) {
        if (e[r][0] < t.index && e[r][1] > t.index) return !0;
      }

      return !1;
    }

    It.lastIndex = tr.lastIndex = rr.lastIndex = 0;
    var r,
        n = [],
        o = [],
        i = [];

    if (e.length / e.split("\n").length < 200) {
      for (; r = rr.exec(e);) {
        o.push([r.index, r.index + r[0].length]);
      }

      for (; r = tr.exec(e);) {
        t(o, r) || i.push([r.index + r[1].length, r.index + r[0].length - 1]);
      }
    }

    for (; r = It.exec(e);) {
      if (!t(o, r) && !t(i, r)) {
        var a = r[1].substr(1, r[1].length - 2);
        if (a.match(/"|'/)) continue;
        n.push(a);
      }
    }

    return n;
  }

  function Fe(e) {
    if (-1 === nr.indexOf(e)) {
      try {
        var t = st[e];
      } catch (t) {
        nr.push(e);
      }

      this(e, t);
    }
  }

  function Ke(e) {
    if ("string" == typeof e) return q(e, st);
    if (!(e instanceof Array)) throw new Error("Global exports must be a string or array.");

    for (var t = {}, r = 0; r < e.length; r++) {
      t[e[r].split(".").pop()] = q(e[r], st);
    }

    return t;
  }

  function De(e, t, r, n) {
    var o = st.define;
    st.define = void 0;
    var i;

    if (r) {
      i = {};

      for (var a in r) {
        i[a] = st[a], st[a] = r[a];
      }
    }

    return t || (Yt = {}, Object.keys(st).forEach(Fe, function (e, t) {
      Yt[e] = t;
    })), function () {
      var e,
          r = t ? Ke(t) : {},
          a = !!t;
      if (t && !n || Object.keys(st).forEach(Fe, function (o, i) {
        Yt[o] !== i && void 0 !== i && (n && (st[o] = void 0), t || (r[o] = i, void 0 !== e ? a || e === i || (a = !0) : e = i));
      }), r = a ? r : e, i) for (var s in i) {
        st[s] = i[s];
      }
      return st.define = o, r;
    };
  }

  function Ue(e, t) {
    var r = ((e = e.replace(tr, "")).match(ar)[1].split(",")[t] || "require").replace(sr, ""),
        n = ur[r] || (ur[r] = new RegExp(or + r + ir, "g"));
    n.lastIndex = 0;

    for (var o, i = []; o = n.exec(e);) {
      i.push(o[2] || o[3]);
    }

    return i;
  }

  function qe(e) {
    return function (t, r, n) {
      e(t, r, n), "object" != _typeof(r = n.exports) && "function" != typeof r || "__esModule" in r || Object.defineProperty(n.exports, "__esModule", {
        value: !0
      });
    };
  }

  function Te(e, t) {
    Vt = e, cr = t, Qt = void 0, lr = !1;
  }

  function ze(e) {
    Qt ? e.registerDynamic(Vt ? Qt[0].concat(Vt) : Qt[0], !1, cr ? qe(Qt[1]) : Qt[1]) : lr && e.registerDynamic([], !1, _);
  }

  function Ne(e, t) {
    !e.load.esModule || "object" != _typeof(t) && "function" != typeof t || "__esModule" in t || Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }

  function Je(e, t) {
    var r = this,
        n = this[St];
    return (Be(n, this, e) || Et).then(function () {
      if (!t()) {
        var o = r[jt][e];

        if ("@node/" === e.substr(0, 6)) {
          if (!r._nodeRequire) throw new TypeError("Error loading " + e + ". Can only load node core modules in Node.");
          return r.registerDynamic([], !1, function () {
            return L.call(r, e.substr(6), r.baseURL);
          }), void t();
        }

        return o.load.scriptLoad ? !o.load.pluginKey && fr || (o.load.scriptLoad = !1, R.call(n, 'scriptLoad not supported for "' + e + '"')) : !1 !== o.load.scriptLoad && !o.load.pluginKey && fr && (o.load.deps || o.load.globals || !("system" === o.load.format || "register" === o.load.format || "global" === o.load.format && o.load.exports) || (o.load.scriptLoad = !0)), o.load.scriptLoad ? new Promise(function (n, i) {
          if ("amd" === o.load.format && st.define !== r.amdDefine) throw new Error("Loading AMD with scriptLoad requires setting the global `" + pr + ".define = SystemJS.amdDefine`");
          U(e, o.load.crossOrigin, o.load.integrity, function () {
            if (!t()) {
              o.load.format = "global";
              var e = o.load.exports && Ke(o.load.exports);
              r.registerDynamic([], !1, function () {
                return Ne(o, e), e;
              }), t();
            }

            n();
          }, i);
        }) : $e(r, e, o).then(function () {
          return We(r, e, o, t, n.wasm);
        });
      }
    }).then(function (t) {
      return delete r[jt][e], t;
    });
  }

  function $e(e, t, r) {
    return r.pluginKey ? e.import(r.pluginKey).then(function (e) {
      r.pluginModule = e, r.pluginLoad = {
        name: t,
        address: r.pluginArgument,
        source: void 0,
        metadata: r.load
      }, r.load.deps = r.load.deps || [];
    }) : Et;
  }

  function Be(e, t, r) {
    var n = e.depCache[r];
    if (n) for (a = 0; a < n.length; a++) {
      t.normalize(n[a], r).then(K);
    } else {
      var o = !1;

      for (var i in e.bundles) {
        for (var a = 0; a < e.bundles[i].length; a++) {
          var s = e.bundles[i][a];

          if (s === r) {
            o = !0;
            break;
          }

          if (-1 !== s.indexOf("*")) {
            var u = s.split("*");

            if (2 !== u.length) {
              e.bundles[i].splice(a--, 1);
              continue;
            }

            if (r.substr(0, u[0].length) === u[0] && r.substr(r.length - u[1].length, u[1].length) === u[1]) {
              o = !0;
              break;
            }
          }
        }

        if (o) return t.import(i);
      }
    }
  }

  function We(e, t, r, n, o) {
    return r.load.exports && !r.load.format && (r.load.format = "global"), Et.then(function () {
      if (r.pluginModule && r.pluginModule.locate) return Promise.resolve(r.pluginModule.locate.call(e, r.pluginLoad)).then(function (e) {
        e && (r.pluginLoad.address = e);
      });
    }).then(function () {
      return r.pluginModule ? (o = !1, r.pluginModule.fetch ? r.pluginModule.fetch.call(e, r.pluginLoad, function (e) {
        return Kt(e.address, r.load.authorization, r.load.integrity, !1);
      }) : Kt(r.pluginLoad.address, r.load.authorization, r.load.integrity, !1)) : Kt(t, r.load.authorization, r.load.integrity, o);
    }).then(function (i) {
      return o && "string" != typeof i ? C(e, i, n).then(function (o) {
        if (!o) {
          var a = ot ? new TextDecoder("utf-8").decode(new Uint8Array(i)) : i.toString();
          return Ge(e, t, a, r, n);
        }
      }) : Ge(e, t, i, r, n);
    });
  }

  function Ge(e, t, r, n, o) {
    return Promise.resolve(r).then(function (t) {
      return "detect" === n.load.format && (n.load.format = void 0), Ve(t, n), n.pluginModule ? (n.pluginLoad.source = t, n.pluginModule.translate ? Promise.resolve(n.pluginModule.translate.call(e, n.pluginLoad, n.traceOpts)).then(function (e) {
        if (n.load.sourceMap) {
          if ("object" != _typeof(n.load.sourceMap)) throw new Error("metadata.load.sourceMap must be set to an object.");
          Xe(n.pluginLoad.address, n.load.sourceMap);
        }

        return "string" == typeof e ? e : n.pluginLoad.source;
      }) : t) : t;
    }).then(function (r) {
      return n.load.format || '"bundle"' !== r.substring(0, 8) ? "register" === n.load.format || !n.load.format && He(r) ? (n.load.format = "register", r) : "esm" === n.load.format || !n.load.format && r.match(gr) ? (n.load.format = "esm", Ye(e, r, t, n, o)) : r : (n.load.format = "system", r);
    }).then(function (t) {
      if ("string" != typeof t || !n.pluginModule || !n.pluginModule.instantiate) return t;
      var r = !1;
      return n.pluginLoad.source = t, Promise.resolve(n.pluginModule.instantiate.call(e, n.pluginLoad, function (e) {
        if (t = e.source, n.load = e.metadata, r) throw new Error("Instantiate must only be called once.");
        r = !0;
      })).then(function (e) {
        return r ? t : P(e);
      });
    }).then(function (r) {
      if ("string" != typeof r) return r;
      n.load.format || (n.load.format = Ze(r));
      var i = !1;

      switch (n.load.format) {
        case "esm":
        case "register":
        case "system":
          if (u = Re(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !1)) throw u;
          if (!o()) return Ot;
          return;

        case "json":
          var a = JSON.parse(r);
          return e.newModule({
            default: a,
            __useDefault: a
          });

        case "amd":
          var s = st.define;
          st.define = e.amdDefine, Te(n.load.deps, n.load.esModule);
          var u = Re(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !1);
          if ((i = o()) || (ze(e), i = o()), st.define = s, u) throw u;
          break;

        case "cjs":
          var l = n.load.deps,
              c = (n.load.deps || []).concat(n.load.cjsRequireDetection ? Ie(r) : []);

          for (var f in n.load.globals) {
            n.load.globals[f] && c.push(n.load.globals[f]);
          }

          e.registerDynamic(c, !0, function (o, i, a) {
            if (o.resolve = function (t) {
              return Le.call(e, t, a.id);
            }, a.paths = [], a.require = o, !n.load.cjsDeferDepsExecute && l) for (var s = 0; s < l.length; s++) {
              o(l[s]);
            }
            var u = Ae(a.id),
                c = {
              exports: i,
              args: [o, i, a, u.filename, u.dirname, st, st]
            },
                f = "(function (require, exports, module, __filename, __dirname, global, GLOBAL";
            if (n.load.globals) for (var d in n.load.globals) {
              c.args.push(o(n.load.globals[d])), f += ", " + d;
            }
            var p = st.define;
            st.define = void 0, st.__cjsWrapper = c, r = f + ") {" + r.replace(yr, "") + "\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);";
            var g = Re(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !1);
            if (g) throw g;
            Ne(n, i), st.__cjsWrapper = void 0, st.define = p;
          }), i = o();
          break;

        case "global":
          c = n.load.deps || [];

          for (var f in n.load.globals) {
            var d = n.load.globals[f];
            d && c.push(d);
          }

          e.registerDynamic(c, !1, function (o, i, a) {
            var s;

            if (n.load.globals) {
              s = {};

              for (var u in n.load.globals) {
                n.load.globals[u] && (s[u] = o(n.load.globals[u]));
              }
            }

            var l = n.load.exports;
            l && (r += "\n" + pr + '["' + l + '"] = ' + l + ";");
            var c = De(a.id, l, s, n.load.encapsulateGlobal),
                f = Re(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !0);
            if (f) throw f;
            var d = c();
            return Ne(n, d), d;
          }), i = o();
          break;

        default:
          throw new TypeError('Unknown module format "' + n.load.format + '" for "' + t + '".' + ("es6" === n.load.format ? ' Use "esm" instead here.' : ""));
      }

      if (!i) throw new Error("Module " + t + " detected as " + n.load.format + " but didn't execute correctly.");
    });
  }

  function He(e) {
    var t = e.match(hr);
    return t && "System.register" === e.substr(t[0].length, 15);
  }

  function Ze(e) {
    return e.match(mr) ? "amd" : (vr.lastIndex = 0, It.lastIndex = 0, It.exec(e) || vr.exec(e) ? "cjs" : "global");
  }

  function Xe(e, t) {
    var r = e.split("!")[0];
    t.file && t.file != e || (t.file = r + "!transpiled"), (!t.sources || t.sources.length <= 1 && (!t.sources[0] || t.sources[0] === e)) && (t.sources = [r]);
  }

  function Ye(e, r, n, o, i) {
    if (!e.transpiler) throw new TypeError("Unable to dynamically transpile ES module\n   A loader plugin needs to be configured via `SystemJS.config({ transpiler: 'transpiler-module' })`.");

    if (o.load.deps) {
      for (var a = "", s = 0; s < o.load.deps.length; s++) {
        a += 'import "' + o.load.deps[s] + '"; ';
      }

      r = a + r;
    }

    return e.import.call(e, e.transpiler).then(function (t) {
      if (!(t = t.__useDefault || t).translate) throw new Error(e.transpiler + " is not a valid transpiler plugin.");
      return t === o.pluginModule ? r : ("string" == typeof o.load.sourceMap && (o.load.sourceMap = JSON.parse(o.load.sourceMap)), o.pluginLoad = o.pluginLoad || {
        name: n,
        address: n,
        source: r,
        metadata: o.load
      }, o.load.deps = o.load.deps || [], Promise.resolve(t.translate.call(e, o.pluginLoad, o.traceOpts)).then(function (e) {
        var t = o.load.sourceMap;
        return t && "object" == _typeof(t) && Xe(n, t), "esm" === o.load.format && He(e) && (o.load.format = "register"), e;
      }));
    }, function (e) {
      throw t(e, "Unable to load transpiler to transpile " + n);
    });
  }

  function Qe(e, t, r) {
    for (var n, o = t.split("."); o.length > 1;) {
      e = e[n = o.shift()] = e[n] || {};
    }

    void 0 === e[n = o.shift()] && (e[n] = r);
  }

  function Ve(e, t) {
    var r = e.match(br);
    if (r) for (var n = r[0].match(wr), o = 0; o < n.length; o++) {
      var i = n[o],
          a = i.length,
          s = i.substr(0, 1);

      if (";" == i.substr(a - 1, 1) && a--, '"' == s || "'" == s) {
        var u = i.substr(1, i.length - 3),
            l = u.substr(0, u.indexOf(" "));

        if (l) {
          var c = u.substr(l.length + 1, u.length - l.length - 1);
          "deps" === l && (l = "deps[]"), "[]" === l.substr(l.length - 2, 2) ? (l = l.substr(0, l.length - 2), t.load[l] = t.load[l] || [], t.load[l].push(c)) : "use" !== l && Qe(t.load, l, c);
        } else t.load[u] = !0;
      }
    }
  }

  function et() {
    f.call(this), this._loader = {}, this[jt] = {}, this[St] = {
      baseURL: nt,
      paths: {},
      packageConfigPaths: [],
      packageConfigKeys: [],
      map: {},
      packages: {},
      depCache: {},
      meta: {},
      bundles: {},
      production: !1,
      transpiler: void 0,
      loadedBundles: {},
      warnings: !1,
      pluginFirst: !1,
      wasm: !1
    }, this.scriptSrc = dr, this._nodeRequire = er, this.registry.set("@empty", Ot), tt.call(this, !1, !1), Xt(this);
  }

  function tt(e, t) {
    this[St].production = e, this.registry.set("@system-env", Er = this.newModule({
      browser: ot,
      node: !!this._nodeRequire,
      production: !t && e,
      dev: t || !e,
      build: t,
      default: !0
    }));
  }

  function rt(e, t) {
    R.call(e[St], "SystemJS." + t + " is deprecated for SystemJS.registry." + t);
  }

  var nt,
      ot = "undefined" != typeof window && "undefined" != typeof document,
      it = "undefined" != typeof process && process.versions && process.versions.node,
      at = "undefined" != typeof process && "string" == typeof process.platform && process.platform.match(/^win/),
      st = "undefined" != typeof self ? self : global,
      ut = "undefined" != typeof Symbol;

  if ("undefined" != typeof document && document.getElementsByTagName) {
    if (!(nt = document.baseURI)) {
      var lt = document.getElementsByTagName("base");
      nt = lt[0] && lt[0].href || window.location.href;
    }
  } else "undefined" != typeof location && (nt = location.href);

  if (nt) {
    var ct = (nt = nt.split("#")[0].split("?")[0]).lastIndexOf("/");
    -1 !== ct && (nt = nt.substr(0, ct + 1));
  } else {
    if ("undefined" == typeof process || !process.cwd) throw new TypeError("No environment baseURI");
    nt = "file://" + (at ? "/" : "") + process.cwd(), at && (nt = nt.replace(/\\/g, "/"));
  }

  "/" !== nt[nt.length - 1] && (nt += "/");
  var ft = "_" == new Error(0, "_").fileName,
      dt = Promise.resolve();
  i.prototype.constructor = i, i.prototype.import = function (e, r) {
    if ("string" != typeof e) throw new TypeError("Loader import method must be passed a module key string");
    var n = this;
    return dt.then(function () {
      return n[gt](e, r);
    }).then(a).catch(function (n) {
      throw t(n, "Loading " + e + (r ? " from " + r : ""));
    });
  };
  var pt = i.resolve = e("resolve"),
      gt = i.resolveInstantiate = e("resolveInstantiate");
  i.prototype[gt] = function (e, t) {
    var r = this;
    return r.resolve(e, t).then(function (e) {
      return r.registry.get(e);
    });
  }, i.prototype.resolve = function (e, r) {
    var n = this;
    return dt.then(function () {
      return n[pt](e, r);
    }).then(s).catch(function (n) {
      throw t(n, "Resolving " + e + (r ? " to " + r : ""));
    });
  };
  var ht = "undefined" != typeof Symbol && Symbol.iterator,
      mt = e("registry");
  ht && (u.prototype[Symbol.iterator] = function () {
    return this.entries()[Symbol.iterator]();
  }, u.prototype.entries = function () {
    var e = this[mt];
    return o(Object.keys(e).map(function (t) {
      return [t, e[t]];
    }));
  }), u.prototype.keys = function () {
    return o(Object.keys(this[mt]));
  }, u.prototype.values = function () {
    var e = this[mt];
    return o(Object.keys(e).map(function (t) {
      return e[t];
    }));
  }, u.prototype.get = function (e) {
    return this[mt][e];
  }, u.prototype.set = function (e, t) {
    if (!(t instanceof l)) throw new Error("Registry must be set with an instance of Module Namespace");
    return this[mt][e] = t, this;
  }, u.prototype.has = function (e) {
    return Object.hasOwnProperty.call(this[mt], e);
  }, u.prototype.delete = function (e) {
    return !!Object.hasOwnProperty.call(this[mt], e) && (delete this[mt][e], !0);
  };
  var vt = e("baseObject");
  l.prototype = Object.create(null), "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(l.prototype, Symbol.toStringTag, {
    value: "Module"
  });
  var yt = e("register-internal");
  f.prototype = Object.create(i.prototype), f.prototype.constructor = f;
  var bt = f.instantiate = e("instantiate");
  f.prototype[f.resolve = i.resolve] = function (e, t) {
    return n(e, t || nt);
  }, f.prototype[bt] = function (e, t) {}, f.prototype[i.resolveInstantiate] = function (e, t) {
    var r = this,
        n = this[yt],
        o = this.registry[mt];
    return p(r, e, t, o, n).then(function (e) {
      if (e instanceof l) return e;
      var t = e.linkRecord;

      if (!t) {
        if (e.module) return e.module;
        throw e.evalError;
      }

      return w(r, e, t, o, n).then(function () {
        return k(r, e, t, o, n, void 0);
      });
    });
  }, f.prototype.register = function (e, t, r) {
    var n = this[yt];
    void 0 === r ? n.lastRegister = [e, t, void 0] : (n.records[e] || d(n, e, void 0)).registration = [t, r, void 0];
  }, f.prototype.registerDynamic = function (e, t, r, n) {
    var o = this[yt];
    "string" != typeof e ? o.lastRegister = [e, t, r] : (o.records[e] || d(o, e, void 0)).registration = [t, r, n];
  }, x.prototype.import = function (e) {
    return this.loader.trace && this.loader.loads[this.key].dynamicDeps.push(e), this.loader.import(e, this.key);
  };
  var wt = {};
  Object.freeze && Object.freeze(wt);

  var xt,
      kt,
      Et = Promise.resolve(),
      Ot = new l({}),
      St = e("loader-config"),
      jt = e("metadata"),
      _t = "undefined" == typeof window && "undefined" != typeof self && "undefined" != typeof importScripts,
      Pt = !1,
      Mt = !1;

  if (ot && function () {
    var e = document.createElement("link").relList;

    if (e && e.supports) {
      Mt = !0;

      try {
        Pt = e.supports("preload");
      } catch (e) {}
    }
  }(), ot) {
    var Rt = [],
        Ct = window.onerror;

    window.onerror = function (e, t) {
      for (var r = 0; r < Rt.length; r++) {
        if (Rt[r].src === t) return void Rt[r].err(e);
      }

      Ct && Ct.apply(this, arguments);
    };
  }

  var Lt,
      At,
      It = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)\s*\)/g,
      Ft = "undefined" != typeof XMLHttpRequest,
      Kt = At = "undefined" != typeof self && void 0 !== self.fetch ? J : Ft ? $ : "undefined" != "function" && "undefined" != typeof process ? B : W,
      Dt = {},
      Ut = ["browser", "node", "dev", "build", "production", "default"],
      qt = /#\{[^\}]+\}/,
      Tt = ["browserConfig", "nodeConfig", "devConfig", "buildConfig", "productionConfig"],
      zt = "undefined" != typeof Buffer;

  try {
    zt && "YQ==" !== new Buffer("a").toString("base64") && (zt = !1);
  } catch (e) {
    zt = !1;
  }

  var Nt,
      Jt,
      $t,
      Bt,
      Wt = "\n//# sourceMappingURL=data:application/json;base64,",
      Gt = 0,
      Ht = !1;
  ot && "undefined" != typeof document && document.getElementsByTagName && (window.chrome && window.chrome.extension || navigator.userAgent.match(/^Node\.js/) || (Ht = !0));

  var Zt,
      Xt = function Xt(e) {
    function t(r, n, o, i) {
      if ("object" == _typeof(r) && !(r instanceof Array)) return t.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

      if ("string" == typeof r && "function" == typeof n && (r = [r]), !(r instanceof Array)) {
        if ("string" == typeof r) {
          var a = e.decanonicalize(r, i),
              s = e.get(a);
          if (!s) throw new Error('Module not already loaded loading "' + r + '" as ' + a + (i ? ' from "' + i + '".' : "."));
          return "__useDefault" in s ? s.__useDefault : s;
        }

        throw new TypeError("Invalid require");
      }

      for (var u = [], l = 0; l < r.length; l++) {
        u.push(e.import(r[l], i));
      }

      Promise.all(u).then(function (e) {
        n && n.apply(null, e);
      }, o);
    }

    function r(r, n, o) {
      function i(r, i, l) {
        for (var c = [], f = 0; f < n.length; f++) {
          c.push(r(n[f]));
        }

        if (l.uri = l.id, l.config = _, -1 !== u && c.splice(u, 0, l), -1 !== s && c.splice(s, 0, i), -1 !== a) {
          var d = function d(n, o, i) {
            return "string" == typeof n && "function" != typeof o ? r(n) : t.call(e, n, o, i, l.id);
          };

          d.toUrl = function (t) {
            return e.normalizeSync(t, l.id);
          }, c.splice(a, 0, d);
        }

        var p = st.require;
        st.require = t;
        var g = o.apply(-1 === s ? st : i, c);
        st.require = p, void 0 !== g && (l.exports = g);
      }

      "string" != typeof r && (o = n, n = r, r = null), n instanceof Array || (o = n, n = ["require", "exports", "module"].splice(0, o.length)), "function" != typeof o && (o = function (e) {
        return function () {
          return e;
        };
      }(o)), r || Vt && (n = n.concat(Vt), Vt = void 0);
      var a, s, u;
      -1 !== (a = n.indexOf("require")) && (n.splice(a, 1), r || (n = n.concat(Ue(o.toString(), a)))), -1 !== (s = n.indexOf("exports")) && n.splice(s, 1), -1 !== (u = n.indexOf("module")) && n.splice(u, 1), r ? (e.registerDynamic(r, n, !1, i), Qt ? (Qt = void 0, lr = !0) : lr || (Qt = [n, i])) : e.registerDynamic(n, !1, cr ? qe(i) : i);
    }

    e.set("@@cjs-helpers", e.newModule({
      requireResolve: Le.bind(e),
      getPathVars: Ae
    })), e.set("@@global-helpers", e.newModule({
      prepareGlobal: De
    })), r.amd = {}, e.amdDefine = r, e.amdRequire = t;
  };

  "undefined" != typeof window && "undefined" != typeof document && window.location && (Zt = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : ""));
  var Yt,
      Qt,
      Vt,
      er,
      tr = /(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
      rr = /("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g,
      nr = ["_g", "sessionStorage", "localStorage", "clipboardData", "frames", "frameElement", "external", "mozAnimationStartTime", "webkitStorageInfo", "webkitIndexedDB", "mozInnerScreenY", "mozInnerScreenX"],
      or = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",
      ir = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",
      ar = /\(([^\)]*)\)/,
      sr = /^\s+|\s+$/g,
      ur = {},
      lr = !1,
      cr = !1,
      fr = (ot || _t) && "undefined" != typeof navigator && navigator.userAgent && !navigator.userAgent.match(/MSIE (9|10).0/);
  "undefined" == "function" || "undefined" == typeof process || process.browser || (er = require);
  var dr,
      pr = "undefined" != typeof self ? "self" : "global",
      gr = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?(?!type)([^"'\(\)\n; ]+)\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/,
      hr = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/,
      mr = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/,
      vr = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/,
      yr = /^\#\!.*/,
      br = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,
      wr = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;
  if ("undefined" == typeof Promise) throw new Error("SystemJS needs a Promise polyfill.");

  if ("undefined" != typeof document) {
    var xr = document.getElementsByTagName("script"),
        kr = xr[xr.length - 1];
    document.currentScript && (kr.defer || kr.async) && (kr = document.currentScript), dr = kr && kr.src;
  } else if ("undefined" != typeof importScripts) try {
    throw new Error("_");
  } catch (e) {
    e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function (e, t) {
      dr = t;
    });
  } else "undefined" != typeof __filename && (dr = __filename);

  var Er;
  et.prototype = Object.create(f.prototype), et.prototype.constructor = et, et.prototype[et.resolve = f.resolve] = et.prototype.normalize = Z, et.prototype.load = function (e, t) {
    return R.call(this[St], "System.load is deprecated."), this.import(e, t);
  }, et.prototype.decanonicalize = et.prototype.normalizeSync = et.prototype.resolveSync = Y, et.prototype[et.instantiate = f.instantiate] = Je, et.prototype.config = ke, et.prototype.getConfig = xe, et.prototype.global = st, et.prototype.import = function () {
    return f.prototype.import.apply(this, arguments).then(function (e) {
      return "__useDefault" in e ? e.__useDefault : e;
    });
  };

  for (var Or = ["baseURL", "map", "paths", "packages", "packageConfigPaths", "depCache", "meta", "bundles", "transpiler", "warnings", "pluginFirst", "production", "wasm"], Sr = "undefined" != typeof Proxy, jr = 0; jr < Or.length; jr++) {
    !function (e) {
      Object.defineProperty(et.prototype, e, {
        get: function get() {
          var t = we(this[St], e);
          return Sr && "object" == _typeof(t) && (t = new Proxy(t, {
            set: function set(t, r) {
              throw new Error("Cannot set SystemJS." + e + '["' + r + '"] directly. Use SystemJS.config({ ' + e + ': { "' + r + '": ... } }) rather.');
            }
          })), t;
        },
        set: function set(t) {
          throw new Error("Setting `SystemJS." + e + "` directly is no longer supported. Use `SystemJS.config({ " + e + ": ... })`.");
        }
      });
    }(Or[jr]);
  }

  et.prototype.delete = function (e) {
    return rt(this, "delete"), this.registry.delete(e);
  }, et.prototype.get = function (e) {
    return rt(this, "get"), this.registry.get(e);
  }, et.prototype.has = function (e) {
    return rt(this, "has"), this.registry.has(e);
  }, et.prototype.set = function (e, t) {
    return rt(this, "set"), this.registry.set(e, t);
  }, et.prototype.newModule = function (e) {
    return new l(e);
  }, et.prototype.isModule = M, et.prototype.register = function (e, t, r) {
    return "string" == typeof e && (e = X.call(this, this[St], e)), f.prototype.register.call(this, e, t, r);
  }, et.prototype.registerDynamic = function (e, t, r, n) {
    return "string" == typeof e && (e = X.call(this, this[St], e)), f.prototype.registerDynamic.call(this, e, t, r, n);
  }, et.prototype.version = "0.20.19 Dev";

  var _r = new et();

  (ot || _t) && (st.SystemJS = st.System = _r), "undefined" != typeof module && module.exports && (module.exports = _r);
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/buffer/index.js */ "../../node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "../../node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js"), "/index.js"))

/***/ }),

/***/ "../../webio/src/DomNode.ts":
/*!********************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/DomNode.ts ***!
  \********************************************************************/
/*! exports provided: DOM_NODE_TYPE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM_NODE_TYPE", function() { return DOM_NODE_TYPE; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node */ "../../webio/src/Node.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events */ "../../webio/src/events.ts");
/* harmony import */ var _createNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createNode */ "../../webio/src/createNode.ts");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};


var debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("WebIO:DomNode");



var DOM_NODE_TYPE = "DOM";

var WebIODomNode =
/*#__PURE__*/
function (_WebIONode) {
  _inherits(WebIODomNode, _WebIONode);

  function WebIODomNode(nodeData, options) {
    var _this;

    _classCallCheck(this, WebIODomNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebIODomNode).call(this, nodeData, options));
    _this.eventListeners = {};
    debug("Creating WebIODomNode", {
      nodeData: nodeData,
      options: options
    });
    _this.element = WebIODomNode.createElement(nodeData);

    _this.applyProps(nodeData.props); // Recursively construct children.


    _this.children = nodeData.children.map(function (nodeData) {
      if (typeof nodeData === "string") {
        return nodeData;
      }

      return Object(_createNode__WEBPACK_IMPORTED_MODULE_3__["default"])(nodeData, {
        webIO: _this.webIO,
        scope: _this.scope
      });
    }); // Append childrens' elements to this node's element.

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var child = _step.value;

        if (typeof child === "string") {
          _this.element.appendChild(document.createTextNode(child));
        } else {
          _this.element.appendChild(child.element);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _this;
  }

  _createClass(WebIODomNode, [{
    key: "applyProps",

    /**
     * Apply "props" to the underlying DOM element.
     *
     * @param props - The props to apply.
     */
    value: function applyProps(props) {
      debug("applyProps", props);

      var style = props.style,
          events = props.events,
          attributes = props.attributes,
          attributesNS = props.attributesNS,
          setInnerHtml = props.setInnerHtml,
          rest = __rest(props, ["style", "events", "attributes", "attributesNS", "setInnerHtml"]);

      style && this.applyStyles(style);
      events && this.applyEvents(events);
      attributes && this.applyAttributes(attributes);
      attributesNS && this.applyAttributesNS(attributesNS);
      setInnerHtml && this.setInnerHTML(setInnerHtml);
      this.applyMiscellaneousProps(rest);
    }
    /**
     * Apply all props that don't have special meaning.
     *
     * This should really be refactored so that all these "miscellaneous" props
     * are delivered in a separate object (e.g. have props.miscProps on the same
     * level as props.style and props.events et al.).
     * @param props - The object of miscellaneous props and their values.
     */

  }, {
    key: "applyMiscellaneousProps",
    value: function applyMiscellaneousProps(props) {
      debug("applyMiscellaneousProps", props);

      var _arr = Object.keys(props);

      for (var _i = 0; _i < _arr.length; _i++) {
        var propName = _arr[_i];
        this.element[propName] = props[propName];
      }
    }
  }, {
    key: "applyStyles",
    value: function applyStyles(styles) {
      if (!styles) {
        return;
      }

      var _arr2 = Object.keys(styles);

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var attributeName = _arr2[_i2];
        this.element.style[attributeName] = styles[attributeName];
      }
    }
    /**
     * Apply (add/remove) event listeners to the underlying DOM element.
     *
     * @param events - A map object from event names to event listeners. If an
     *    event name is specified (e.g. `click`) that didn't exist before, the
     *    associated handler (e.g. `events["click"]`) is added as a listener; if
     *    the event name has already been specified (even if the listener function
     *    changed!), then nothing happens; if the event name is absent (or null) in
     *    the map, then any previously setup listeners (if any) are removed.
     */

  }, {
    key: "applyEvents",
    value: function applyEvents(events) {
      var _arr3 = Object.keys(events);

      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var eventName = _arr3[_i3];
        var oldListener = this.eventListeners[eventName];
        var newListenerSource = events[eventName];
        var newListener = newListenerSource && Object(_events__WEBPACK_IMPORTED_MODULE_2__["evalWithWebIOContext"])(this.element, newListenerSource, {
          scope: this.scope,
          webIO: this.webIO
        });

        if (oldListener && !newListener) {
          // We want to just remove the old listener.
          this.element.removeEventListener(eventName, oldListener);
          delete this.eventListeners[eventName];
        } else if (!oldListener && newListener) {
          this.element.addEventListener(eventName, newListener);
          this.eventListeners[eventName] = newListener;
        } // If the listener is just changed, we don't really handle that.

      }
    }
    /**
     * Apply DOM attributes to the underlying DOM element.
     *
     * @param attributes - The map of attributes to apply.
     */

  }, {
    key: "applyAttributes",
    value: function applyAttributes(attributes) {
      var _arr4 = Object.keys(attributes);

      for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
        var key = _arr4[_i4];
        var value = attributes[key];

        if (value === null) {
          this.element.removeAttribute(key);
        } else {
          this.element.setAttribute(key, value);
        }
      }
    }
    /**
     * Apply namespaced DOM attributes to the underlying DOM element.
     *
     * @param attributes - The `{attributeName: {namespace, value}}` map to apply.
     */

  }, {
    key: "applyAttributesNS",
    value: function applyAttributesNS(attributes) {
      var _arr5 = Object.keys(attributes);

      for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
        var key = _arr5[_i5];
        var _attributes$key = attributes[key],
            namespace = _attributes$key.namespace,
            value = _attributes$key.value;

        if (value === null) {
          this.element.removeAttributeNS(namespace, key);
        } else {
          this.element.setAttributeNS(namespace, key, value);
        }
      }
    }
    /**
     * Set the value associated with the node's element.
     *
     * This generally only works with `<input />` elements.
     *
     * @param value
     * @throws Will throw an error if the element doesn't have a `value` attribute.
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      if ("value" in this.element) {
        // If the value hasn't changed, don't re-set it.
        if (this.element.value !== value) {
          this.element.value = value;
        }
      } else {
        throw new Error("Cannot set value on an HTMLElement that doesn't support it.");
      }
    }
  }], [{
    key: "createElement",
    value: function createElement(data) {
      var _data$instanceArgs = data.instanceArgs,
          namespace = _data$instanceArgs.namespace,
          tag = _data$instanceArgs.tag;

      switch (namespace.toLocaleLowerCase()) {
        case "html"
        /* HTML */
        :
          return document.createElement(tag);

        case "http://www.w3.org/2000/svg"
        /* SVG */
        :
        case "svg"
        /* SVG_SHORTHAND */
        :
          return document.createElementNS("http://www.w3.org/2000/svg"
          /* SVG */
          , tag);

        default:
          throw new Error("Unknown DOM namespace: ".concat(namespace, "."));
      }
    }
  }]);

  return WebIODomNode;
}(_Node__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (WebIODomNode);

/***/ }),

/***/ "../../webio/src/IFrame.ts":
/*!*******************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/IFrame.ts ***!
  \*******************************************************************/
/*! exports provided: IFRAME_NODE_TYPE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IFRAME_NODE_TYPE", function() { return IFRAME_NODE_TYPE; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node */ "../../webio/src/Node.ts");
/* harmony import */ var _setInnerHTML__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setInnerHTML */ "../../webio/src/setInnerHTML.ts");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


var debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("WebIO:IFrame");


var IFRAME_NODE_TYPE = "IFrame";
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

var WebIOIFrame =
/*#__PURE__*/
function (_WebIONode) {
  _inherits(WebIOIFrame, _WebIONode);

  function WebIOIFrame(iframeData, options) {
    var _this;

    _classCallCheck(this, WebIOIFrame);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebIOIFrame).call(this, iframeData, options));
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

    iframe.onload = function () {
      return _this.initializeIFrame(innerHTML);
    };

    return _this;
  }
  /**
   * Initialize the IFrame after the onload event has been fired.
   * @param innerHTML
   */


  _createClass(WebIOIFrame, [{
    key: "initializeIFrame",
    value: function initializeIFrame(innerHTML) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var iframe, iframeWindow, iframeDocument, baseTag;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                iframe = this.element; // This method requires that onload has been fired which means that window
                // and document are defined (hence the `!` operator).

                iframeWindow = iframe.contentWindow;
                iframeDocument = iframe.contentDocument; // Set WebIO window global.

                iframeWindow.WebIO = this.webIO; // Add <base> tag to tell IFrame to load relative resources from the same
                // place that the current page is.

                baseTag = document.createElement("base");
                baseTag.href = document.baseURI;
                iframeDocument.head.appendChild(baseTag); // Apply some styling.
                // It seems that there's not an easy way to get the iframe to have the
                // "correct" size (i.e. exactly the size of its contents, as if it were
                // just a normal <div> element). This currently doesn't really work.

                iframeDocument.body.style.cssText = "\n      margin: 0;\n      padding: 0;\n      height: 100%;\n    "; // Set inner html of body.

                Object(_setInnerHTML__WEBPACK_IMPORTED_MODULE_2__["default"])(iframeDocument.body, innerHTML);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }]);

  return WebIOIFrame;
}(_Node__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (WebIOIFrame);

/***/ }),

/***/ "../../webio/src/Node.ts":
/*!*****************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/Node.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setInnerHTML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setInnerHTML */ "../../webio/src/setInnerHTML.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * A high-level "point-of-entry" under which WebIO "things" are rendered.
 *
 * A `WebIONode` has a root DOM element and some functionality for managing the
 * attributes (DOM attributes, CSS styles, event listeners, etc.) that are
 * applied to it.
 */

var WebIONode =
/*#__PURE__*/
function () {
  function WebIONode(nodeData, options) {
    _classCallCheck(this, WebIONode);

    this.nodeData = nodeData;
    var scope = options.scope,
        webIO = options.webIO;
    this.scope = scope;
    this.webIO = webIO;
  }
  /**
   * Set the innerHTML of the node's DOM element.
   */


  _createClass(WebIONode, [{
    key: "setInnerHTML",
    value: function setInnerHTML(html) {
      Object(_setInnerHTML__WEBPACK_IMPORTED_MODULE_0__["default"])(this.element, html);
    }
  }]);

  return WebIONode;
}();

/* harmony default export */ __webpack_exports__["default"] = (WebIONode);

/***/ }),

/***/ "../../webio/src/Observable.ts":
/*!***********************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/Observable.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("WebIO:Observable");
/**
 * A logical "observable" entity.
 *
 * An observable has a name (which is unique to a given scope), an id (which is
 * unique to a given process), and a value, as well as a set of subscribers.
 *
 * Note that a single observable value might have more than one
 * `WebIOObservable` instances (they will have the same id, and possibly even
 * the same name, but exist in different scopes). If one of these observables
 * changes, it is **not** the responsibility of the `WebIOObservable` to update
 * any others. Typically, this update is done by syncing the value back to Julia
 * and letting Julia issue updates for the other observables who live in other
 * scopes.
 *
 */

var WebIOObservable =
/*#__PURE__*/
function () {
  function WebIOObservable(name, _ref, scope) {
    var id = _ref.id,
        value = _ref.value,
        sync = _ref.sync;

    _classCallCheck(this, WebIOObservable);

    this.scope = scope;
    /**
     * An array of active subscriber/listener functions. These are evoked when
     * the value of the observable changes.
     */

    this.subscribers = [];
    this.name = name;
    this.id = id;
    this.value = value;
    this.sync = sync;
    this.webIO.registerObservable(this);
  }

  _createClass(WebIOObservable, [{
    key: "setValue",

    /**
     * Set the value of the observable, optionally synchronizing it with
     * Julia/WebIO.
     *
     * @param newValue - The value to be stored within the observable.
     * @param sync - If `true`, send the new value to Julia/WebIO. This should
     *    always be `false` if the new value originated from Julia/WebIO itself.
     */
    value: function setValue(newValue) {
      var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      debug("Setting value of observable (".concat(this.name, "/").concat(this.id, ")."), newValue);
      this.value = newValue;
      this.notifySubscribers();

      if (sync) {
        this.syncValue();
      }
    }
    /**
     * Synchronize the value stored within this observable with Julia/WebIO.
     *
     * This overwrites the value stored in Julia/WebIO. This method is called
     * automatically when using `setValue` with `sync=true` (the default).
     */

  }, {
    key: "syncValue",
    value: function syncValue() {
      this.webIO.reconcileObservables(this);
      return this.scope.send({
        command: this.name,
        data: this.value
      });
    }
    /**
     * Register a new subscriber.
     *
     * @example
     *    declare const obs: Observable<number>;
     *    // We store a reference to listener so that we may give pass it to
     *    // unsubscribe later.
     *    const listener = (value: number) => {
     *      console.log(`obs got ${value}!`);
     *    };
     *    obs.subscribe(listener);
     *    // Later...
     *    obs.unsubscribe(listener);
     *
     * @param subscriber - A function that is called every time the value of the
     *    observable is called; the function is given the current value of the
     *    observable.
     */

  }, {
    key: "subscribe",
    value: function subscribe(subscriber) {
      debug("Attaching subscriber in Observable(".concat(this.name, "/").concat(this.id, ")."), this, subscriber);
      this.subscribers.push(subscriber);
    }
    /**
     * Deregister an existing subscriber.
     *
     * Note: this method requires that the reference to the original subscriber
     *    function is retained (so that it can be used here).
     *
     * @param subscriber
     */

  }, {
    key: "unsubscribe",
    value: function unsubscribe(subscriber) {
      var index = this.subscribers.indexOf(subscriber);

      if (index != -1) {
        this.subscribers.splice(index, 1);
      }
    }
    /**
     * Call each of the registered subscribers with the current value of the
     * observable.
     */

  }, {
    key: "notifySubscribers",
    value: function notifySubscribers() {
      var _this = this;

      this.subscribers.forEach(function (subscriber) {
        debug("Notifying subscriber in Observable(".concat(_this.name, "/").concat(_this.id, ")."));
        subscriber(_this.value);
      });
    }
  }, {
    key: "webIO",
    get: function get() {
      return this.scope.webIO;
    }
  }]);

  return WebIOObservable;
}();

/* harmony default export */ __webpack_exports__["default"] = (WebIOObservable);

/***/ }),

/***/ "../../webio/src/ObservableNode.ts":
/*!***************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/ObservableNode.ts ***!
  \***************************************************************************/
/*! exports provided: OBSERVABLE_NODE_TYPE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OBSERVABLE_NODE_TYPE", function() { return OBSERVABLE_NODE_TYPE; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node */ "../../webio/src/Node.ts");
/* harmony import */ var _createNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createNode */ "../../webio/src/createNode.ts");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("WebIO:ObservableNode");


var OBSERVABLE_NODE_TYPE = "ObservableNode";
/**
 * A special type of node/observable that contains a node.
 */

var WebIOObservableNode =
/*#__PURE__*/
function (_WebIONode) {
  _inherits(WebIOObservableNode, _WebIONode);

  function WebIOObservableNode(schema, context) {
    var _this;

    _classCallCheck(this, WebIOObservableNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebIOObservableNode).call(this, schema, context));
    _this.observable = null;
    _this.children = null;

    _this.onObservableUpdate = function () {
      _this.mountObservable();
    };

    debug("Creating WebIODomNode", {
      schema: schema,
      context: context
    });
    _this.element = document.createElement("div");
    _this.element.className = "webio-observable-node";

    _this.element.setAttribute("data-webio-observable-name", schema.instanceArgs.name);

    try {
      if (!context.scope) {
        throw new Error("Cannot render ObservableNode that has no parent scope.");
      }

      _this.observable = _this.scope.getObservable(schema.instanceArgs.name);

      _this.mountObservable();

      _this.scope.promises.connected.then(function () {
        return _this.observable.subscribe(_this.onObservableUpdate);
      });
    } catch (e) {
      _this.node = null;
      _this.element.innerHTML = "<strong>Caught exception while trying to render ObservableNode: ".concat(e.message, "</strong>");
    }

    return _this;
  }

  _createClass(WebIOObservableNode, [{
    key: "mountObservable",
    value: function mountObservable() {
      if (!this.observable) {
        throw new Error("Cannot mount null observable.");
      }

      debug("Mounting node within WebIOObservableNode.", {
        nodeSchema: this.observable.value
      });
      var newNode = Object(_createNode__WEBPACK_IMPORTED_MODULE_2__["default"])(this.observable.value, {
        webIO: this.webIO,
        scope: this.scope
      });

      if (this.node) {
        this.element.replaceChild(newNode.element, this.node.element);
      } else {
        this.element.appendChild(newNode.element);
      }

      this.node = newNode;
    }
  }]);

  return WebIOObservableNode;
}(_Node__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (WebIOObservableNode);

/***/ }),

/***/ "../../webio/src/Scope.ts":
/*!******************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/Scope.ts ***!
  \******************************************************************/
/*! exports provided: SCOPE_NODE_TYPE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCOPE_NODE_TYPE", function() { return SCOPE_NODE_TYPE; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node */ "../../webio/src/Node.ts");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Observable */ "../../webio/src/Observable.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "../../webio/src/utils.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./events */ "../../webio/src/events.ts");
/* harmony import */ var _createNode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createNode */ "../../webio/src/createNode.ts");
/* harmony import */ var _imports__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./imports */ "../../webio/src/imports.ts");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};


var debug = debug__WEBPACK_IMPORTED_MODULE_0___default()("WebIO:Scope");






var SCOPE_NODE_TYPE = "Scope";

var WebIOScope =
/*#__PURE__*/
function (_WebIONode) {
  _inherits(WebIOScope, _WebIONode);

  function WebIOScope(schema, context) {
    var _this;

    _classCallCheck(this, WebIOScope);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebIOScope).call(this, schema, context));
    _this.children = null;
    debug("Creating new WebIOScope.", schema);
    _this.element = document.createElement("div");
    _this.element.className = "webio-scope";

    _this.element.setAttribute("data-webio-scope-id", schema.instanceArgs.id);

    var _schema$instanceArgs = schema.instanceArgs,
        id = _schema$instanceArgs.id,
        _schema$instanceArgs$ = _schema$instanceArgs.observables,
        observables = _schema$instanceArgs$ === void 0 ? {} : _schema$instanceArgs$,
        _schema$instanceArgs$2 = _schema$instanceArgs.handlers,
        handlers = _schema$instanceArgs$2 === void 0 ? {} : _schema$instanceArgs$2;
    _this.id = id; // Create WebIOObservables.

    _this.observables = {};
    Object.keys(observables).forEach(function (name) {
      var observable = new _Observable__WEBPACK_IMPORTED_MODULE_2__["default"](name, observables[name], _assertThisInitialized(_assertThisInitialized(_this)));
      _this.observables[name] = observable;
      observable.subscribe(function (value) {
        return _this.evokeObservableHandlers(name, value);
      });
    });
    _this.handlers = {}; // TODO: refactor registerScope as described elsewhere

    _this.webIO.registerScope(_assertThisInitialized(_assertThisInitialized(_this))); // TODO: this following is super messy and needs to be refactored.

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
      connected: _this.webIO.connected.then(function () {
        return _assertThisInitialized(_assertThisInitialized(_this));
      }),
      importsLoaded: importsLoadedPromise
    }; // This is super messy and should be refactored.
    // We must do `setupScope` after imports are loaded (see pull #217).

    _this.initialize(schema).then(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return resolveImportsLoaded(args);
    }).then(function () {
      return _this.setupScope();
    }).catch(function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return rejectImportsLoaded(args);
    });

    return _this;
  }

  _createClass(WebIOScope, [{
    key: "initialize",

    /**
     * Perform asynchronous initialization tasks.
     */
    value: function initialize(schema) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var _schema$instanceArgs2, _schema$instanceArgs3, handlers, imports, systemJSConfig, _handlers$preDependen, preDependencies, _handlers$_promises, _promises, restHandlers, resources, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, child, importsLoadedHandlers, _handlers;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _schema$instanceArgs2 = schema.instanceArgs, _schema$instanceArgs3 = _schema$instanceArgs2.handlers, handlers = _schema$instanceArgs3 === void 0 ? {} : _schema$instanceArgs3, imports = _schema$instanceArgs2.imports, systemJSConfig = _schema$instanceArgs2.systemjs_options; // (Asynchronously) perform dependency initialization

                _handlers$preDependen = handlers.preDependencies, preDependencies = _handlers$preDependen === void 0 ? [] : _handlers$preDependen, _handlers$_promises = handlers._promises, _promises = _handlers$_promises === void 0 ? {} : _handlers$_promises, restHandlers = __rest(handlers, ["preDependencies", "_promises"]);
                preDependencies.map(function (functionString) {
                  return Object(_events__WEBPACK_IMPORTED_MODULE_4__["evalWithWebIOContext"])(_this2, functionString, {
                    scope: _this2,
                    webIO: _this2.webIO
                  });
                }).forEach(function (handler) {
                  return handler.call(_this2);
                }); // Map the function strings into handlers which have `this` bound to the scope's
                // element and which have access to the _webIOScope resources variable (via closure).

                Object.keys(restHandlers).forEach(function (observableName) {
                  _this2.handlers[observableName] = handlers[observableName].map(function (handlerString) {
                    return Object(_events__WEBPACK_IMPORTED_MODULE_4__["evalWithWebIOContext"])(_this2, handlerString, {
                      scope: _this2,
                      webIO: _this2.webIO
                    });
                  });
                });

                if (!imports) {
                  _context.next = 10;
                  break;
                }

                _context.next = 7;
                return Object(_imports__WEBPACK_IMPORTED_MODULE_6__["importBlock"])(imports, systemJSConfig);

              case 7:
                _context.t0 = _context.sent;
                _context.next = 11;
                break;

              case 10:
                _context.t0 = null;

              case 11:
                resources = _context.t0;
                // Create children WebIONodes.
                debug("Creating children for scope (id: ".concat(this.id, ")."));
                this.children = schema.children.map(function (nodeData) {
                  if (typeof nodeData === "string") {
                    return nodeData;
                  }

                  return Object(_createNode__WEBPACK_IMPORTED_MODULE_5__["default"])(nodeData, {
                    webIO: _this2.webIO,
                    scope: _this2
                  });
                }); // Append children elements to our element.

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 17;

                for (_iterator = this.children[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  child = _step.value;

                  if (typeof child === "string") {
                    this.element.appendChild(document.createTextNode(child));
                  } else {
                    this.element.appendChild(child.element);
                  }
                } // TypeScript hackery to deal with how promiseHandlers is a very special case


                _context.next = 25;
                break;

              case 21:
                _context.prev = 21;
                _context.t1 = _context["catch"](17);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 25:
                _context.prev = 25;
                _context.prev = 26;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 28:
                _context.prev = 28;

                if (!_didIteratorError) {
                  _context.next = 31;
                  break;
                }

                throw _iteratorError;

              case 31:
                return _context.finish(28);

              case 32:
                return _context.finish(25);

              case 33:
                importsLoadedHandlers = _promises.importsLoaded;

                if (resources && importsLoadedHandlers) {
                  debug("Invoking importsLoaded handlers for scope (".concat(this.id, ")."), {
                    scope: this,
                    importsLoadedHandlers: importsLoadedHandlers,
                    resources: resources
                  });
                  _handlers = importsLoadedHandlers.map(function (handler) {
                    return Object(_events__WEBPACK_IMPORTED_MODULE_4__["evalWithWebIOContext"])(_this2, handler, {
                      scope: _this2,
                      webIO: _this2.webIO
                    });
                  }); // `as any` is necessary because evalWithWebIOContext normally returns
                  // a function which is expected to be an event listener... but this is
                  // kind of a special case of that.

                  _handlers.forEach(function (handler) {
                    return handler.apply(void 0, _toConsumableArray(resources));
                  });
                } // This isn't super clean, but this function is used to create the
                // importsLoaded promise, so we need to return the promises.
                // TODO: refactor this


                return _context.abrupt("return", resources);

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[17, 21, 25, 33], [26,, 28, 32]]);
      }));
    }
  }, {
    key: "getLocalObservable",
    value: function getLocalObservable(observableName) {
      // Only return a "local" observable
      var obs = this.observables[observableName];

      if (!obs) {
        throw new Error("Scope(id=".concat(this.id, ") has no observable named \"").concat(observableName, "\"."));
      }

      return obs;
    }
  }, {
    key: "getObservable",
    value: function getObservable(observable) {
      if (typeof observable === "string" || observable.scope === this.id) {
        return this.getLocalObservable(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getObservableName"])(observable));
      } // Otherwise, let the root WebIO instance find the correct scope and
      // observable.


      return this.webIO.getObservable(observable);
    }
  }, {
    key: "getObservableValue",
    value: function getObservableValue(observable) {
      return this.getObservable(observable).value;
    }
    /**
     * Update an observable within the scope.
     * @param observable - The name (or specifier) of the observable to modify.
     * @param value - The value to set the observable to.
     * @param sync - Whether or not to sync the value to Julia. This should always be
     *    false if the update originated from Julia and is just being propogated into
     *    the browser.
     */

  }, {
    key: "setObservableValue",
    value: function setObservableValue(observable, value) {
      var sync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var observableName = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getObservableName"])(observable);

      if (!(observableName in this.observables)) {
        throw new Error("Scope(id=".concat(this.id, ") has no observable named \"").concat(observableName, "\"."));
      }

      debug("Setting Observable (name: ".concat(observableName, ") to \"").concat(value, "\" in WebIOScope (id: ").concat(this.id, ")."));
      this.observables[observableName].setValue(value, sync);
    }
    /**
     * Send a message to the WebIO Julia machinery.
     *
     * Sets the scope id if not specified.
     */

  }, {
    key: "send",
    value: function send(_a) {
      var _a$scope = _a.scope,
          scope = _a$scope === void 0 ? this.id : _a$scope,
          rest = __rest(_a, ["scope"]);

      return this.webIO.send(Object.assign({
        scope: scope
      }, rest));
    }
    /**
     * Evoke the listeners for an observable with the current value of
     * that observable.
     *
     * @param name - The name of the observable whose listeners should be evoked.
     * @param value - The current value of the observable.
     */

  }, {
    key: "evokeObservableHandlers",
    value: function evokeObservableHandlers(name, value) {
      var _this3 = this;

      var listeners = this.handlers[name] || [];
      debug("Evoking ".concat(listeners.length, " observable handlers for observable \"").concat(name, "\"."));
      listeners.forEach(function (listener) {
        listener.call(_this3, value, _this3);
      });
    }
    /**
     * Send the setup-scope message.
     *
     * This informs Julia/WebIO that we want to listen to changes associated
     * with this scope.
     */

  }, {
    key: "setupScope",
    value: function setupScope() {
      return this.send({
        command: "_setup_scope"
        /* SETUP_SCOPE */
        ,
        data: {}
      });
    }
  }, {
    key: "dom",
    get: function get() {
      return this.element;
    }
  }]);

  return WebIOScope;
}(_Node__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (WebIOScope);

/***/ }),

/***/ "../../webio/src/WebIO.ts":
/*!******************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/WebIO.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createNode */ "../../webio/src/createNode.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}; // import isArray from "is-array";
// import arrayEqual from "array-equal";




var log = debug__WEBPACK_IMPORTED_MODULE_0___default()("WebIO");

var WebIO =
/*#__PURE__*/
function () {
  function WebIO() {
    var _this = this;

    _classCallCheck(this, WebIO);

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

    this.observables = {}; // We have to use the !-postfix on {resolve,reject}Connected because TypeScript
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


  _createClass(WebIO, [{
    key: "dispatch",
    value: function dispatch(message) {
      log("Dispatching message (command: ".concat(message.command, ")."), message);

      switch (message.command) {
        case "Basics.eval"
        /* EVAL */
        :
          {
            console.error("Dispatching command \"".concat(message.command, "\" not implemented."));
            return;
          }

        default:
          {
            // TODO: see notes in interface definition of WebIOMessage
            var scopeId = message.scope,
                observableName = message.command,
                data = message.data;
            var scope = this.scopes[scopeId];

            if (!scope) {
              throw new Error("WebIO has no such scope (id: ".concat(scopeId, ")."));
            } // Set (but don't sync) the value..


            scope.setObservableValue(observableName, data, false);
          }
      }
    }
    /**
     * Set the send callback that WebIO will use.
     *
     * This method, when called for the first time, will also resolve the WebIO
     * connected promise and send any messages that are waiting.
     */

  }, {
    key: "setSendCallback",
    value: function setSendCallback(sendCallback) {
      log("Setting WebIO sendCallback.");
      this.sendCallback = sendCallback;
      this.resolveConnected();
    }
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

  }, {
    key: "registerScope",
    value: function registerScope(scope) {
      log("Registering WebIO scope (id: ".concat(scope.id, ")."));
      this.scopes[scope.id] = scope;
    }
    /**
     * A method called by observables to register themselves. This is used to
     * ensure that observables are in a consistent state within the browser.
     * @param observable
     */

  }, {
    key: "registerObservable",
    value: function registerObservable(observable) {
      var id = observable.id;
      log("Registering WebIO observable (id: ".concat(observable.id, ")."));

      if (!this.observables[id]) {
        this.observables[id] = [];
      }

      this.observables[observable.id].push(observable);
    }
    /**
     * Ensure that all observable instances have the value off the
     * `sourceObservable`.
     *
     * @param sourceObservable - The observable whose values are synchronized with
     *    all other registered observables of the same id.
     */

  }, {
    key: "reconcileObservables",
    value: function reconcileObservables(sourceObservable) {
      var id = sourceObservable.id,
          name = sourceObservable.name,
          value = sourceObservable.value;
      var observables = this.observables[id] || [];
      log("Reconciling ".concat(observables.length, " observables (id: ").concat(id, ")."));

      if (observables.length < 1) {
        console.warn("Tried to reconcile observables (id: ".concat(id, ", name: ").concat(name, ") but we don't know") + "about any observables with that id.");
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = observables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var observable = _step.value;
          // Don't re-set the value of the observable that triggered the
          // reconciliation.
          if (observable === sourceObservable) continue;
          log("Reconciling observable \"".concat(observable.name, "\" in scope \"").concat(observable.scope.id, "\"."));
          observable.setValue(value, false);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "send",

    /**
     * Send a message to the WebIO Julia machinery.
     *
     * Sets `type: "message"` before passing to the send callback.
     */
    value: function send(message) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.connected;

              case 2:
                log("Sending WebIO message (command: ".concat(message.command, ")."), message);
                return _context.abrupt("return", this.sendCallback(Object.assign({
                  type: "message"
                }, message)));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
    /**
     * Mount a WebIO node into the specified element.
     *
     * This method overwrites the content of the element.
     *
     * @param element - The element to be replaced with the WebIO node.
     * @param nodeSchema - The data associated with the WebIO node.
     */

  }, {
    key: "mount",
    value: function mount(element, nodeSchema) {
      if (!element) {
        console.error("WebIO cannot mount node into element.", {
          element: element,
          nodeData: nodeSchema
        });
        throw new Error("WebIO cannot mount node into element.");
      }

      log("Mounting WebIO node.", {
        nodeData: nodeSchema,
        element: element
      });
      var node = Object(_createNode__WEBPACK_IMPORTED_MODULE_1__["default"])(nodeSchema, {
        webIO: this
      }); // Reset the contents of the node we're mounting into.

      element.innerHTML = "";
      element.classList.add("webio-mountpoint"); // Temporary hack for @piever
      // https://github.com/JuliaGizmos/WebIO.jl/pull/211#issuecomment-429672805

      element.classList.add("interactbulma");
      element.appendChild(node.element);
    }
  }, {
    key: "getScope",
    value: function getScope(scopeId) {
      var scope = this.scopes[scopeId];

      if (!scope) {
        throw new Error("WebIO has no scope (id: ".concat(scopeId, ")."));
      }

      return scope;
    }
    /**
     * Get an {@link WebIOObservable} object.
     *
     * @throws Will throw an error if the scope does not exist or there is no
     *    such observable within the scope.
     */

  }, {
    key: "getObservable",
    value: function getObservable(_ref) {
      var scope = _ref.scope,
          name = _ref.name;
      return this.getScope(scope).getLocalObservable(name);
    }
    /**
     * Get the value of some observable.
     *
     * @deprecated This method is a shim for old WebIO functionally which relied
     * on a global WebIO instance.
     *
     * @throws Will throw an error if the scope does not exist or there is no
     *    such observable within the scope.
     */

  }, {
    key: "getval",
    value: function getval(_ref2) {
      var scope = _ref2.scope,
          name = _ref2.name;
      return this.getScope(scope).getObservableValue(name);
    }
    /**
     * Set the value of some observable.
     *
     * @deprecated This method is a shim for old WebIO functionally which relied
     * on a global WebIO instance.
     *
     * @throws Will throw an error if the scope does not exist or there is no
     *    such observable within the scope.
     */

  }, {
    key: "setval",
    value: function setval(_ref3, value) {
      var scope = _ref3.scope,
          name = _ref3.name;
      var sync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return this.getScope(scope).setObservableValue(name, value, sync);
    }
  }]);

  return WebIO;
}();
/**
 * A reference to {@link NODE_CLASSES} to allow for extension.
 */


WebIO.NODE_CLASSES = _createNode__WEBPACK_IMPORTED_MODULE_1__["NODE_CLASSES"];
/* harmony default export */ __webpack_exports__["default"] = (WebIO);

/***/ }),

/***/ "../../webio/src/createNode.ts":
/*!***********************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/createNode.ts ***!
  \***********************************************************************/
/*! exports provided: NODE_CLASSES, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NODE_CLASSES", function() { return NODE_CLASSES; });
/* harmony import */ var _DomNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomNode */ "../../webio/src/DomNode.ts");
/* harmony import */ var _Scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Scope */ "../../webio/src/Scope.ts");
/* harmony import */ var _IFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IFrame */ "../../webio/src/IFrame.ts");
/* harmony import */ var _ObservableNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ObservableNode */ "../../webio/src/ObservableNode.ts");
var _NODE_CLASSES;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * Map from node type to node class.
 *
 * The node class should extends WebIONode and take the same arguments in its
 * constructor.
 */

var NODE_CLASSES = (_NODE_CLASSES = {}, _defineProperty(_NODE_CLASSES, _DomNode__WEBPACK_IMPORTED_MODULE_0__["DOM_NODE_TYPE"], _DomNode__WEBPACK_IMPORTED_MODULE_0__["default"]), _defineProperty(_NODE_CLASSES, _Scope__WEBPACK_IMPORTED_MODULE_1__["SCOPE_NODE_TYPE"], _Scope__WEBPACK_IMPORTED_MODULE_1__["default"]), _defineProperty(_NODE_CLASSES, _IFrame__WEBPACK_IMPORTED_MODULE_2__["IFRAME_NODE_TYPE"], _IFrame__WEBPACK_IMPORTED_MODULE_2__["default"]), _defineProperty(_NODE_CLASSES, _ObservableNode__WEBPACK_IMPORTED_MODULE_3__["OBSERVABLE_NODE_TYPE"], _ObservableNode__WEBPACK_IMPORTED_MODULE_3__["default"]), _NODE_CLASSES);
/**
* Create a new WebIO node (a scope or a DOM node).
* @param schema
* @param context
*/

var createNode = function createNode(schema, context) {
  var NodeClass = NODE_CLASSES[schema.nodeType];

  if (NodeClass) {
    // We need any here to tell TypeScript that NodeClass isn't an abstract
    // class (because WebIONode **is** an abstract class but we will only have
    // subclasses in our NODE_CLASSES map).
    return new NodeClass(schema, context);
  }

  throw new Error("Unknown WebIO node type: ".concat(schema.nodeType, "."));
};

/* harmony default export */ __webpack_exports__["default"] = (createNode);

/***/ }),

/***/ "../../webio/src/events.ts":
/*!*******************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/events.ts ***!
  \*******************************************************************/
/*! exports provided: evalWithWebIOContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evalWithWebIOContext", function() { return evalWithWebIOContext; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);

var log = debug__WEBPACK_IMPORTED_MODULE_0___default()("WebIO:events");
/**
 * Create a WebIO event listener.
 *
 * This function returns an event listener function that will operate in the
 * correct WebIO scope (i.e. WebIO will refer to the right instance and `this`
 * will be bound to the DOM node specified).
 *
 * Note that we use _webIO-prefixed variable names to avoid any possible clashes
 * with user-code.
 *
 * @param _webIOThis - the DOM node that `this` should be bound to.
 * @param _webIOListenerSource - the source (preferably as a string) of the listener
 *    function; if not a string, the function will be converted to a string and
 *    then re-eval'd to ensure that WebIO and this refer to the correct objects.
 * @param context - the context handler should be evaluated in.
 */

var evalWithWebIOContext = function evalWithWebIOContext(_webIOThis, _webIOListenerSource, _webIOContext) {
  var WebIO = _webIOContext.webIO,
      _webIOScope = _webIOContext.scope;
  log("Creating event listener.", {
    context: _webIOThis,
    scope: _webIOScope,
    source: _webIOListenerSource
  }); // Wrap the source in parens so that eval returns the function instance
  // (so that eval treats it as an expression rather than a top-level function
  // declaration).

  return eval("(".concat(_webIOListenerSource, ")")).bind(_webIOThis);
};

/***/ }),

/***/ "../../webio/src/imports.ts":
/*!********************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/imports.ts ***!
  \********************************************************************/
/*! exports provided: importJS, importCSS, importSyncBlock, importAsyncBlock, importResource, importBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importJS", function() { return importJS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importCSS", function() { return importCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importSyncBlock", function() { return importSyncBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importAsyncBlock", function() { return importAsyncBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importResource", function() { return importResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importBlock", function() { return importBlock; });
/* harmony import */ var systemjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! systemjs */ "../../webio/node_modules/systemjs/dist/system.js");
/* harmony import */ var systemjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(systemjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
var _this = undefined;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



var debug = debug__WEBPACK_IMPORTED_MODULE_1___default()("WebIO:imports");
var URL_PROTOCOL_REGEX = /[A-Za-z]+:\/\//;

var isRelativeUrl = function isRelativeUrl(url) {
  return !(URL_PROTOCOL_REGEX.test(url) || url.startsWith("//"));
};

var _lastImportNumber = 0;

var uniqueImportName = function uniqueImportName() {
  return "import_".concat(_lastImportNumber += 1);
};

var importJSUrl = function importJSUrl(name, url) {
  debug("Importing JavaScript resource (".concat(name, ") from url (").concat(url, ")."));
  systemjs__WEBPACK_IMPORTED_MODULE_0___default.a.config({
    paths: _defineProperty({}, name, url),
    meta: _defineProperty({}, name, {
      authorization: isRelativeUrl(url)
    })
  });
  return systemjs__WEBPACK_IMPORTED_MODULE_0___default.a.import(url);
};

var importJS = function importJS(importData) {
  debug("Importing JavaScript resource.", importData);
  var url = importData.url,
      blob = importData.blob;
  var name = importData.name || uniqueImportName();

  if (blob) {
    throw new Error("Importing JS blob is not yet implemented.");
  } else if (url) {
    return importJSUrl(name, url);
  } else {
    throw new Error("One of blob or url must be specified in call to importJS.");
  }
};
/**
 * Import some href/url in a `<link />` tag.
 * @param url
 */

var importLink = function importLink(url, options) {
  if (document.querySelector("link[data-webio-import=\"".concat(url, "\"]"))) {
    debug("CSS resource (${url}) is already imported."); // This actually has a slight race condition where if the import actually
    // is still loading, we'll resolve immediately. Probably(?) not a big deal.

    return Promise.resolve();
  }

  return new Promise(function (resolve, reject) {
    var link = document.createElement("link"); // Apply options

    var rel = options.rel,
        type = options.type,
        media = options.media;
    rel && (link.rel = rel);
    type && (link.type = type);
    media && (link.media = media);
    link.href = url;
    link.setAttribute("async", "");

    link.onload = function () {
      return resolve();
    };

    link.onerror = function () {
      link.remove();
      reject();
    };

    document.head.appendChild(link);
  });
};

var importCSS = function importCSS(importData) {
  debug("Importing CSS resource.", importData);
  var url = importData.url,
      blob = importData.blob;

  if (url) {
    return importLink(url, {
      rel: "stylesheet",
      type: "text/css",
      media: "all"
    });
  } else if (blob) {
    throw new Error("Imports CSS blob is not yet implemented.");
  } else {
    throw new Error("One of blob or url must be specified in call to importCSS.");
  }
};
var importSyncBlock = function importSyncBlock(importData) {
  return __awaiter(_this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, importItem;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug("Importing synchronous block.", importData);
            results = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 5;
            _iterator = importData.data[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 17;
              break;
            }

            importItem = _step.value;
            _context.t0 = results;
            _context.next = 12;
            return importResource(importItem);

          case 12:
            _context.t1 = _context.sent;

            _context.t0.push.call(_context.t0, _context.t1);

          case 14:
            _iteratorNormalCompletion = true;
            _context.next = 7;
            break;

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t2 = _context["catch"](5);
            _didIteratorError = true;
            _iteratorError = _context.t2;

          case 23:
            _context.prev = 23;
            _context.prev = 24;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 26:
            _context.prev = 26;

            if (!_didIteratorError) {
              _context.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context.finish(26);

          case 30:
            return _context.finish(23);

          case 31:
            return _context.abrupt("return", results);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[5, 19, 23, 31], [24,, 26, 30]]);
  }));
};
var importAsyncBlock = function importAsyncBlock(importData) {
  return __awaiter(_this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            debug("Importing asynchronous block.", importData);
            return _context2.abrupt("return", Promise.all(importData.data.map(importResource)));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
};
/**
 * Import a _thing_.
 * @param importData
 */

var importResource = function importResource(importData) {
  switch (importData.type) {
    case "js"
    /* JS */
    :
      return importJS(importData);

    case "css"
    /* CSS */
    :
      return importCSS(importData);

    default:
      throw new Error("Importing resource of type \"".concat(importData.type, "\" not supported."));
  }
};
var importBlock = function importBlock(importData, config) {
  if (config) {
    systemjs__WEBPACK_IMPORTED_MODULE_0___default.a.config(config);
  }

  switch (importData.type) {
    case "sync_block"
    /* SYNC_BLOCK */
    :
      return importSyncBlock(importData);

    case "async_block"
    /* ASYNC_BLOCK */
    :
      return importAsyncBlock(importData);

    default:
      throw new Error("Cannot import unknown block type: ".concat(importData.type, "."));
  }
};
console.warn("WebIO is registering SystemJS window global.");
window.SystemJS = systemjs__WEBPACK_IMPORTED_MODULE_0___default.a;

/***/ }),

/***/ "../../webio/src/index.ts":
/*!******************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/index.ts ***!
  \******************************************************************/
/*! exports provided: NODE_CLASSES, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebIO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebIO */ "../../webio/src/WebIO.ts");
/* harmony import */ var _createNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createNode */ "../../webio/src/createNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NODE_CLASSES", function() { return _createNode__WEBPACK_IMPORTED_MODULE_1__["NODE_CLASSES"]; });



/* harmony default export */ __webpack_exports__["default"] = (_WebIO__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "../../webio/src/setInnerHTML.ts":
/*!*************************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/setInnerHTML.ts ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Set the `innerHTML` attribute of a DOM element.
 *
 * This method will guarantee the execution of `<script />`s which is not done
 * by simply setting `element.innerHTML = ...`.
 *
 * @param element - The DOM element whose `innerHTML` will be set.
 * @param html - The HTML string to use; any special HTML characters (`<`, `>`, `&`, etc.)
 *    should be &-escaped as appropriate (e.g. to set the displayed text to "foo&bar",
 *    `html` should be `foo&amp;bar`).
 */
var setInnerHTML = function setInnerHTML(element, html) {
  // In the original WebIO, we like to replace </script> with </_script> because the whole shebang
  // is executed inside a <script></script> block (and we don't want to close it too early).
  html = html.replace(/<\/_script>/g, "</script>");
  element.innerHTML = html; // If the HTML contained any <script> tags, these are NOT executed when we assign the DOM
  // innerHTML attribute, so we have to find-and-replace them to force them to execute.
  // We do this weird array coercion because getElementsByTagName returns a
  // HTMLCollection object, which updates as the contents of element update
  // (creating an infinite loop).

  var scripts = Array.from(element.getElementsByTagName("script"));
  scripts.forEach(function (oldScript) {
    var newScript = document.createElement("script"); // Copy all attributes.
    // Unfortunately, attributes is a NamedNodeMap which doesn't have very
    // ES6-like methods of manipulation

    for (var i = 0; i < oldScript.attributes.length; ++i) {
      var _oldScript$attributes = oldScript.attributes[i],
          name = _oldScript$attributes.name,
          value = _oldScript$attributes.value;
      newScript.setAttribute(name, value);
    } // Copy script content


    newScript.appendChild(document.createTextNode(oldScript.innerHTML)); // Replace inside DOM

    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (setInnerHTML);

/***/ }),

/***/ "../../webio/src/utils.ts":
/*!******************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/utils.ts ***!
  \******************************************************************/
/*! exports provided: getObservableName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getObservableName", function() { return getObservableName; });
var getObservableName = function getObservableName(specifier) {
  if (typeof specifier === "string") {
    return specifier;
  }

  return specifier.name;
};

/***/ }),

/***/ "./mux.ts":
/*!****************!*\
  !*** ./mux.ts ***!
  \****************/
/*! exports provided: getMuxWSUrl, connectWebIOToWebSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMuxWSUrl", function() { return getMuxWSUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectWebIOToWebSocket", function() { return connectWebIOToWebSocket; });
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _webio_webio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @webio/webio */ "../../webio/src/index.ts");
var _this = undefined;

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


var log = debug__WEBPACK_IMPORTED_MODULE_0___default()("WebIO:Mux");

/**
 * Get the standard url of the Mux/WebIO WebSocket.
 */

var getMuxWSUrl = function getMuxWSUrl() {
  var _window$location = window.location,
      protocol = _window$location.protocol,
      host = _window$location.host,
      pathname = _window$location.pathname;
  var wsProtocol = protocol == "https:" ? "wss:" : "ws:";
  var basePath = pathname[pathname.length - 1] == "/" ? pathname : pathname + "/";
  var wsPath = basePath + "webio-socket";
  return "".concat(wsProtocol, "//").concat(host).concat(wsPath);
};
/**
 * Create a WebIO instance connected to a Mux WebSocket.
 * @param webIO - the WebIO instance to connect.
 * @param wsUrl - the url of the WebSocket to connect to.
 */

var connectWebIOToWebSocket = function connectWebIOToWebSocket(webIO) {
  var wsUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getMuxWSUrl();
  return new Promise(function (resolve, reject) {
    var webSocket = new WebSocket(wsUrl);

    webSocket.onopen = function () {
      webIO.setSendCallback(function (msg) {
        webSocket.send(JSON.stringify(msg));
      });
      resolve();
    };

    webSocket.onclose = function (closeEvent) {
      // Rejecting a resolved or already-rejected promise is a no-op.
      reject(closeEvent);
    };

    webSocket.onerror = function (error) {
      // Rejecting a resolved or already-rejected promise is a no-op.
      reject(error);
    };

    webSocket.onmessage = function (_ref) {
      var data = _ref.data;
      var message = JSON.parse(data);
      webIO.dispatch(message);
    };
  });
};

var muxEntrypoint = function muxEntrypoint() {
  return __awaiter(_this, void 0, void 0,
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var webIO;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            webIO = new _webio_webio__WEBPACK_IMPORTED_MODULE_1__["default"](); // We do window as any to allow defining new members.

            window.WebIO = webIO;
            _context.next = 4;
            return connectWebIOToWebSocket(webIO);

          case 4:
            log("Connected WebIO to WebSocket.");

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
};

muxEntrypoint();

/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi @babel/polyfill mux.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @babel/polyfill */"../../node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! mux.ts */"./mux.ts");


/***/ })

/******/ });
//# sourceMappingURL=mux.js.map