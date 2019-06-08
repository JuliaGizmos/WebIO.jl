"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An externally resolvable future.
 *
 * @example
 * // Create a future that logs its result when done.
 * const future = new Future<string>();
 * future.then((s) => console.log(`Future resolved with: ${s}`);
 * future.resolve("foo");
 */
var Future = /** @class */ (function () {
    function Future() {
        var _this = this;
        this._promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
        this.then = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            return (_a = _this._promise).then.apply(_a, args);
        };
        this.catch = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            return (_a = _this._promise).then.apply(_a, args);
        };
    }
    return Future;
}());
exports.default = Future;
