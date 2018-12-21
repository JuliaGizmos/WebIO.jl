"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var debug = debug_1.default("WebIO:Observable");
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
var WebIOObservable = /** @class */ (function () {
    function WebIOObservable(name, _a, scope) {
        var id = _a.id, value = _a.value, sync = _a.sync;
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
    Object.defineProperty(WebIOObservable.prototype, "webIO", {
        get: function () {
            return this.scope.webIO;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the value of the observable, optionally synchronizing it with
     * Julia/WebIO.
     *
     * @param newValue - The value to be stored within the observable.
     * @param sync - If `true`, send the new value to Julia/WebIO. This should
     *    always be `false` if the new value originated from Julia/WebIO itself.
     */
    WebIOObservable.prototype.setValue = function (newValue, sync) {
        if (sync === void 0) { sync = true; }
        debug("Setting value of observable (" + this.name + "/" + this.id + ").", newValue);
        this.value = newValue;
        this.notifySubscribers();
        if (sync) {
            this.syncValue();
        }
    };
    /**
     * Synchronize the value stored within this observable with Julia/WebIO.
     *
     * This overwrites the value stored in Julia/WebIO. This method is called
     * automatically when using `setValue` with `sync=true` (the default).
     */
    WebIOObservable.prototype.syncValue = function () {
        this.webIO.reconcileObservables(this);
        return this.scope.send({
            command: this.name,
            data: this.value,
        });
    };
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
    WebIOObservable.prototype.subscribe = function (subscriber) {
        debug("Attaching subscriber in Observable(" + this.name + "/" + this.id + ").", this, subscriber);
        this.subscribers.push(subscriber);
    };
    /**
     * Deregister an existing subscriber.
     *
     * Note: this method requires that the reference to the original subscriber
     *    function is retained (so that it can be used here).
     *
     * @param subscriber
     */
    WebIOObservable.prototype.unsubscribe = function (subscriber) {
        var index = this.subscribers.indexOf(subscriber);
        if (index != -1) {
            this.subscribers.splice(index, 1);
        }
    };
    /**
     * Call each of the registered subscribers with the current value of the
     * observable.
     */
    WebIOObservable.prototype.notifySubscribers = function () {
        var _this = this;
        this.subscribers.forEach(function (subscriber) {
            debug("Notifying subscriber in Observable(" + _this.name + "/" + _this.id + ").");
            subscriber(_this.value);
        });
    };
    return WebIOObservable;
}());
exports.default = WebIOObservable;
