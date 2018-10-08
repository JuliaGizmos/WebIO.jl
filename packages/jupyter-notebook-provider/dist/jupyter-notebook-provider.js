define(["base/js/namespace","notebook/js/outputarea"], function(__WEBPACK_EXTERNAL_MODULE_base_js_namespace__, __WEBPACK_EXTERNAL_MODULE_notebook_js_outputarea__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./jupyter-notebook.js");
/******/ })
/************************************************************************/
/******/ ({

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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


var log = debug__WEBPACK_IMPORTED_MODULE_0___default()("WebIO:DomNode");




var WebIODomNode =
/*#__PURE__*/
function (_WebIONode) {
  _inherits(WebIODomNode, _WebIONode);

  function WebIODomNode(nodeData, options) {
    var _this;

    _classCallCheck(this, WebIODomNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebIODomNode).call(this, nodeData, options));
    _this.eventListeners = {};
    log("Creating WebIODomNode", {
      nodeData: nodeData,
      options: options
    });
    _this.element = WebIODomNode.createElement(nodeData);

    _this.applyProps(nodeData.props); // Create children and append to this node's element.


    _this.children = nodeData.children.map(function (nodeData) {
      if (typeof nodeData === "string") {
        return nodeData;
      }

      return Object(_createNode__WEBPACK_IMPORTED_MODULE_3__["default"])(nodeData, {
        webIO: _this.webIO,
        scope: _this.scope
      });
    });
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
      log("applyProps", props);

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
      log("applyMiscellaneousProps", props);

      var _arr = Object.keys(props);

      for (var _i = 0; _i < _arr.length; _i++) {
        var propName = _arr[_i];
        this.element[propName] = props[propName];
      }
    }
  }, {
    key: "applyStyles",
    value: function applyStyles(styles) {
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
        var newListener = newListenerSource && Object(_events__WEBPACK_IMPORTED_MODULE_2__["createWebIOEventListener"])(this.element, newListenerSource, this.scope);

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

      switch (namespace) {
        case "html"
        /* HTML */
        :
          return document.createElement(tag);

        case "http://www.w3.org/2000/svg"
        /* SVG */
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _setInnerHTML__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setInnerHTML */ "../../webio/src/setInnerHTML.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var log = debug__WEBPACK_IMPORTED_MODULE_0___default()("WebIO:Node");

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
      Object(_setInnerHTML__WEBPACK_IMPORTED_MODULE_1__["default"])(this.element, html);
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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WebIOObservable =
/*#__PURE__*/
function () {
  function WebIOObservable(name, _ref, scope) {
    var id = _ref.id,
        value = _ref.value,
        sync = _ref.sync;

    _classCallCheck(this, WebIOObservable);

    this.scope = scope;
    this.name = name;
    this.id = id;
    this.value = value;
    this.sync = sync;
  }
  /**
   * Set the value of the observable, optionally synchronizing it with
   * Julia/WebIO.
   *
   * @param newValue - The value to be stored within the observable.
   * @param sync - If `true`, send the new value to Julia/WebIO. This should
   *    always be `false` if the new value originated from Julia/WebIO itself.
   */


  _createClass(WebIOObservable, [{
    key: "setValue",
    value: function setValue(newValue) {
      var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.value = newValue;

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
      return this.scope.send({
        command: this.name,
        data: this.value
      }); // console.error(`WebIOObservable.syncValue not implemented.`);
      // this.scope.send
    }
  }]);

  return WebIOObservable;
}();

/* harmony default export */ __webpack_exports__["default"] = (WebIOObservable);

/***/ }),

/***/ "../../webio/src/Scope.ts":
/*!******************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/Scope.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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







var WebIOScope =
/*#__PURE__*/
function (_WebIONode) {
  _inherits(WebIOScope, _WebIONode);

  function WebIOScope(scopeData, options) {
    var _this;

    _classCallCheck(this, WebIOScope);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebIOScope).call(this, scopeData, options));
    _this.children = null;
    debug("Creating new WebIOScope.", scopeData);
    _this.element = document.createElement("div");
    _this.element.className = "webio-scope";
    var _scopeData$instanceAr = scopeData.instanceArgs,
        id = _scopeData$instanceAr.id,
        _scopeData$instanceAr2 = _scopeData$instanceAr.observables,
        observables = _scopeData$instanceAr2 === void 0 ? {} : _scopeData$instanceAr2,
        _scopeData$instanceAr3 = _scopeData$instanceAr.handlers,
        handlers = _scopeData$instanceAr3 === void 0 ? {} : _scopeData$instanceAr3;
    _this.id = id; // Create WebIOObservables.

    _this.observables = {};
    Object.keys(observables).forEach(function (name) {
      _this.observables[name] = new _Observable__WEBPACK_IMPORTED_MODULE_2__["default"](name, observables[name], _assertThisInitialized(_assertThisInitialized(_this)));
    });
    _this.handlers = {}; // TODO: refactor registerScope as described elsewhere

    _this.webIO.registerScope(_assertThisInitialized(_assertThisInitialized(_this))); // TODO: refactor way initialization/import promises are done


    var initializationPromise = _this.initialize(scopeData);

    _this.promises = {
      connected: _this.webIO.connected.then(function () {
        return _assertThisInitialized(_assertThisInitialized(_this));
      }),
      importsLoaded: initializationPromise
    };

    _this.setupScope();

    return _this;
  }
  /**
   * Perform asynchronous initialization tasks.
   */


  _createClass(WebIOScope, [{
    key: "initialize",
    value: function initialize(scopeData) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var _scopeData$instanceAr4, _scopeData$instanceAr5, handlers, imports, _handlers$preDependen, preDependencies, _handlers$_promises, _promises, restHandlers, resources, importsLoadedHandler, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, child;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _scopeData$instanceAr4 = scopeData.instanceArgs, _scopeData$instanceAr5 = _scopeData$instanceAr4.handlers, handlers = _scopeData$instanceAr5 === void 0 ? {} : _scopeData$instanceAr5, imports = _scopeData$instanceAr4.imports; // (Asynchronously) perform dependency initialization

                _handlers$preDependen = handlers.preDependencies, preDependencies = _handlers$preDependen === void 0 ? [] : _handlers$preDependen, _handlers$_promises = handlers._promises, _promises = _handlers$_promises === void 0 ? {} : _handlers$_promises, restHandlers = __rest(handlers, ["preDependencies", "_promises"]);
                preDependencies.map(function (functionString) {
                  return Object(_events__WEBPACK_IMPORTED_MODULE_4__["createWebIOEventListener"])(_this2.element, functionString, _this2);
                }).forEach(function (handler) {
                  return handler.call(_this2);
                }); // Map the function strings into handlers which have `this` bound to the scope's
                // element and which have access to the _webIOScope resources variable (via closure).

                Object.keys(restHandlers).forEach(function (observableName) {
                  _this2.handlers[observableName] = handlers[observableName].map(function (handlerString) {
                    return Object(_events__WEBPACK_IMPORTED_MODULE_4__["createWebIOEventListener"])(_this2.element, handlerString, _this2);
                  });
                });

                if (!imports) {
                  _context.next = 10;
                  break;
                }

                _context.next = 7;
                return Object(_imports__WEBPACK_IMPORTED_MODULE_6__["importBlock"])(imports);

              case 7:
                _context.t0 = _context.sent;
                _context.next = 11;
                break;

              case 10:
                _context.t0 = null;

              case 11:
                resources = _context.t0;
                // TypeScript hackery to deal with out promiseHandlers is a very special case
                importsLoadedHandler = _promises.importsLoaded;

                if (resources && importsLoadedHandler) {
                  // `as any` necessary because createWebIOEventListener normally returns
                  // a function which is expected to be an event listener... but this is kind of a
                  // special case of that.
                  debug("Invoking importsLoaded Scope handler.", {
                    importsLoadedHandler: importsLoadedHandler,
                    resources: resources
                  });
                  Object(_events__WEBPACK_IMPORTED_MODULE_4__["createWebIOEventListener"])(this.element, importsLoadedHandler, this).apply(void 0, _toConsumableArray(resources));
                } // Finally, create children.


                this.children = scopeData.children.map(function (nodeData) {
                  if (typeof nodeData === "string") {
                    return nodeData;
                  }

                  return Object(_createNode__WEBPACK_IMPORTED_MODULE_5__["default"])(nodeData, {
                    webIO: _this2.webIO,
                    scope: _this2
                  });
                });
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 18;

                for (_iterator = this.children[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  child = _step.value;

                  if (typeof child === "string") {
                    this.element.appendChild(document.createTextNode(child));
                  } else {
                    this.element.appendChild(child.element);
                  }
                } // This isn't super clean, but this function is used to create the
                // importsLoaded promise, so we need to return the promises.


                _context.next = 26;
                break;

              case 22:
                _context.prev = 22;
                _context.t1 = _context["catch"](18);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 26:
                _context.prev = 26;
                _context.prev = 27;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 29:
                _context.prev = 29;

                if (!_didIteratorError) {
                  _context.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return _context.finish(29);

              case 33:
                return _context.finish(26);

              case 34:
                return _context.abrupt("return", resources);

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[18, 22, 26, 34], [27,, 29, 33]]);
      }));
    }
  }, {
    key: "getObservableValue",
    value: function getObservableValue(observable) {
      var observableName = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["getObservableName"])(observable);

      if (!(observableName in this.observables)) {
        throw new Error("Scope(id=".concat(this.id, ") has no observable named \"").concat(observableName, "\"."));
      }

      return this.observables[observableName].value;
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
      this.evokeListeners(observableName);
    }
    /**
     * Evoke the listeners for an observable with the current value of
     * that observable.
     *
     * @param name - The name of the observable whose listeners should be evoked.
     */

  }, {
    key: "evokeListeners",
    value: function evokeListeners(name) {
      var _this3 = this;

      var listeners = this.handlers[name];

      if (!listeners) {
        return;
      }

      listeners.forEach(function (listener) {
        listener.call(_this3.element, _this3.getObservableValue(name), _this3);
      });
    }
    /**
     * @deprecated
     */

  }, {
    key: "setupScope",
    // /**
    //  * Connect to the WebIO Julia machinery.
    //  */
    // private async connect() {
    //   await this.webIO.connected;
    //   await this.send({
    //     command: WebIOCommand.SETUP_SCOPE,
    //     data: {},
    //   });
    //   return;
    // }

    /**
     * Send the setup-scope message.
     *
     * This informs Julia/WebIO that we want to listen to changes associated
     * with this scope.
     */
    value: function setupScope() {
      return this.send({
        command: "_setup_scope"
        /* SETUP_SCOPE */
        ,
        data: {}
      });
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

    this.scopes = {}; // We have to use the !-postfix on {resolve,reject}Connected because TypeScript
    // thinks that the body of the promise below isn't immediately executed (it is).

    this.connected = new Promise(function (resolve, reject) {
      _this.resolveConnected = resolve;
      _this.rejectConnected = reject;
    });
  }
  /**
   * Dispatch a WebIO message.
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
     * Send a message to the WebIO Julia machinery.
     *
     * Sets `type: "message" before passing to the send callback.
     */

  }, {
    key: "send",
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
     * This method replaces the existing element.
     *
     * @param element - The element to be replaced with the WebIO node.
     * @param nodeData - The data associated with the WebIO node.
     */

  }, {
    key: "mount",
    value: function mount(element, nodeData) {
      if (!element) {
        console.error("WebIO cannot mount node into element.", {
          element: element,
          nodeData: nodeData
        });
        throw new Error("WebIO cannot mount node into element.");
      }

      if (!element.parentElement) {
        throw new Error("Cannot mount WebIO node into HTMLElement that isn't mounted in DOM.");
      }

      var node = Object(_createNode__WEBPACK_IMPORTED_MODULE_1__["default"])(nodeData, {
        webIO: this
      });
      element.parentElement.replaceChild(node.element, element);
    }
  }]);

  return WebIO;
}();

/* harmony default export */ __webpack_exports__["default"] = (WebIO);

/***/ }),

/***/ "../../webio/src/createNode.ts":
/*!***********************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/createNode.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DomNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomNode */ "../../webio/src/DomNode.ts");
/* harmony import */ var _Scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Scope */ "../../webio/src/Scope.ts");
/* harmony import */ var _IFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IFrame */ "../../webio/src/IFrame.ts");



/**
* Create a new WebIO node (a scope or a DOM node).
* @param nodeData
* @param options
*/

var createNode = function createNode(nodeData, options) {
  /*
  if (typeof nodeData === "string") {
    throw new Error(`Cannot create string node (yet?).`);
  } else
   */
  if (nodeData.nodeType === "DOM"
  /* DOM */
  ) {
      return new _DomNode__WEBPACK_IMPORTED_MODULE_0__["default"](nodeData, options);
    } else if (nodeData.nodeType === "Scope"
  /* SCOPE */
  ) {
      return new _Scope__WEBPACK_IMPORTED_MODULE_1__["default"](nodeData, options);
    } else if (nodeData.nodeType === "IFrame"
  /* IFRAME */
  ) {
      return new _IFrame__WEBPACK_IMPORTED_MODULE_2__["default"](nodeData, options);
    } else {
    console.error("Unable to generate WebIONode from nodeData:", nodeData);
    throw new Error("Unknown WebIO nodeType: ".concat(nodeData.nodeType, "."));
  }
};

/* harmony default export */ __webpack_exports__["default"] = (createNode);

/***/ }),

/***/ "../../webio/src/events.ts":
/*!*******************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/events.ts ***!
  \*******************************************************************/
/*! exports provided: createWebIOEventListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWebIOEventListener", function() { return createWebIOEventListener; });
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
 * @param _webIOScope - the WebIO scope that the handler should use.
 * @param _webIOElement - the DOM node that `this` should be bound to.
 * @param _webIOListenerSource - the source (preferably as a string) of the listener
 *    function; if not a string, the function will be converted to a string and
 *    then re-eval'd to ensure that WebIO and this refer to the correct objects.
 */

var createWebIOEventListener = function createWebIOEventListener(_webIOElement, _webIOListenerSource, _webIOScope) {
  log("Creating event listener.", {
    element: _webIOElement,
    scope: _webIOScope,
    source: _webIOListenerSource
  });

  if (typeof _webIOListenerSource === "string") {
    // Wrap the source in parens so that eval returns the function instance
    // (so that eval treats it as an expression rather than a top-level function
    // declaration).
    return eval("(".concat(_webIOListenerSource, ")")).bind(_webIOElement);
  } // The listener given is a function; we need to get a string representation of it and
  // then re-create it (so that the binding can be done correctly).
  // TODO: this can be removed (probably?) once the work is done (i.e. only use strings)


  return createWebIOEventListener(_webIOElement, _webIOListenerSource.toString(), _webIOScope);
};

/***/ }),

/***/ "../../webio/src/imports.ts":
/*!********************************************************************!*\
  !*** /home/travigd/.julia/dev/WebIO/packages/webio/src/imports.ts ***!
  \********************************************************************/
/*! exports provided: importJS, importSyncBlock, importAsyncBlock, importResource, importBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importJS", function() { return importJS; });
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

    default:
      throw new Error("not implemented");
  }
};
var importBlock = function importBlock(importData) {
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebIO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebIO */ "../../webio/src/WebIO.ts");

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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

  var scripts = _toConsumableArray(element.getElementsByTagName("script"));

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

/***/ "./jupyter-notebook.js":
/*!*****************************!*\
  !*** ./jupyter-notebook.js ***!
  \*****************************/
/*! exports provided: load_ipython_extension */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load_ipython_extension", function() { return load_ipython_extension; });
/* harmony import */ var base_js_namespace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base/js/namespace */ "base/js/namespace");
/* harmony import */ var base_js_namespace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(base_js_namespace__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var notebook_js_outputarea__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! notebook/js/outputarea */ "notebook/js/outputarea");
/* harmony import */ var notebook_js_outputarea__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(notebook_js_outputarea__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _webio_webio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @webio/webio */ "../../webio/src/index.ts");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_3__);
// Important note: this file is transpiled into an AMD-style module. These first
// few imports are declared as external in webpack.config.js and thus are not
// folded into the generated bundle, but rather, are resolved at runtime (via
// requirejs). If you need any other Jupyter components, make sure to add them
// to externals in webpack.config.js.

 // This is included inside the bundle.



var debug = debug__WEBPACK_IMPORTED_MODULE_3___default()("WebIO:jupyter-notebook");
var INITIALIZATION_DEBOUNCE = 200;
var WEBIO_NODE_MIME = "application/vnd.webio.node+json";
/**
 * The current WebIO instance.
 */

var webIO = null;
/**
 * Keep track of the id of the kernel to which WebIO is currently associated.
 */

var kernelId = null;
/**
 * Initialize the WebIO instance for the current kernel.
 * @param force - If `true`, force a new WebIO instance to be created. If false,
 *    this function checks if the current WebIO instance (if it exists) is
 *    associated with the current kernel and will be a no-op if that is the
 *    case. This is necessary because the `kernel_ready.Kernel` Jupyter event is
 *    sometimes triggered more than once.
 */

var initializeWebIO = function initializeWebIO() {
  var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (!force && !webIO && base_js_namespace__WEBPACK_IMPORTED_MODULE_0__["notebook"].kernel.id === kernelId) {
    debug("Refusing to re-initialize WebIO when the kernel hasn't changed.");
    return;
  }

  debug("Creating new WebIO instance.");
  kernelId = base_js_namespace__WEBPACK_IMPORTED_MODULE_0__["notebook"].kernel.id;
  var commManager = base_js_namespace__WEBPACK_IMPORTED_MODULE_0__["notebook"].kernel.comm_manager;
  commManager.register_target("webio_comm", function () {});
  var comm = commManager.new_comm("webio_comm", {});
  webIO = new _webio_webio__WEBPACK_IMPORTED_MODULE_2__["default"]();
  console.warn("Setting new WebIO window global.");
  window.WebIO = webIO;
  comm.on_msg(function (msg) {
    return webIO.dispatch(msg.content.data);
  });
  webIO.setSendCallback(function (msg) {
    return comm.send(msg);
  });
};
/**
 * Append WebIO node data to a Jupyter notebook cell.
 *
 * This method is called where `this` refers to an `OutputArea` instance.
 *
 * @param data
 * @param metadata
 * @param element
 */


var appendWebIONode = function appendWebIONode(data, metadata, element) {
  var toInsert = this.create_output_subarea(metadata, "output_webio rendered_html", WEBIO_NODE_MIME);
  element.append(toInsert);
  webIO.mount(toInsert.get(0), data);
};

var initializeJupyterOutputType = function initializeJupyterOutputType() {
  notebook_js_outputarea__WEBPACK_IMPORTED_MODULE_1__["OutputArea"].prototype.register_mime_type(WEBIO_NODE_MIME, appendWebIONode, {
    // WebIO can create arbitrary HTML so don't render it if the notebook is
    // untrusted.
    safe: false,
    // Prefer the WebIO MIME over everything else.
    index: 0
  });
};

var load_ipython_extension = function load_ipython_extension() {
  if (!base_js_namespace__WEBPACK_IMPORTED_MODULE_0__ || !base_js_namespace__WEBPACK_IMPORTED_MODULE_0__["notebook"]) {
    return setTimeout(load_ipython_extension, INITIALIZATION_DEBOUNCE);
  }

  initializeJupyterOutputType();
  initializeWebIO();
  base_js_namespace__WEBPACK_IMPORTED_MODULE_0__["notebook"].events.on("kernel_ready.Kernel", initializeWebIO);
};

/***/ }),

/***/ "base/js/namespace":
/*!************************************!*\
  !*** external "base/js/namespace" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_base_js_namespace__;

/***/ }),

/***/ "notebook/js/outputarea":
/*!*****************************************!*\
  !*** external "notebook/js/outputarea" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_notebook_js_outputarea__;

/***/ })

/******/ })});;
//# sourceMappingURL=jupyter-notebook-provider.js.map