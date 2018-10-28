import WebIOScope from "./Scope";
export interface ObservableMap {
    [id: string]: WebIOObservable;
}
export declare type Subscription<T = any> = (value: T) => void;
/**
 * Data that is sent from Julia/WebIO about the observable.
 */
export interface ObservableData<T = any> {
    id: string;
    value: T;
    sync: boolean;
}
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
declare class WebIOObservable<T = any> {
    readonly scope: WebIOScope;
    readonly name: string;
    readonly id: string;
    readonly sync: boolean;
    value: T;
    readonly webIO: import("./WebIO").default;
    /**
     * An array of active subscriber/listener functions. These are evoked when
     * the value of the observable changes.
     */
    protected subscribers: Subscription<T>[];
    constructor(name: string, { id, value, sync }: ObservableData<T>, scope: WebIOScope);
    /**
     * Set the value of the observable, optionally synchronizing it with
     * Julia/WebIO.
     *
     * @param newValue - The value to be stored within the observable.
     * @param sync - If `true`, send the new value to Julia/WebIO. This should
     *    always be `false` if the new value originated from Julia/WebIO itself.
     */
    setValue(newValue: T, sync?: boolean): Promise<void>;
    /**
     * Synchronize the value stored within this observable with Julia/WebIO.
     *
     * This overwrites the value stored in Julia/WebIO. This method is called
     * automatically when using `setValue` with `sync=true` (the default).
     */
    syncValue(): Promise<void>;
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
    subscribe(subscriber: Subscription<T>): void;
    /**
     * Deregister an existing subscriber.
     *
     * Note: this method requires that the reference to the original subscriber
     *    function is retained (so that it can be used here).
     *
     * @param subscriber
     */
    unsubscribe(subscriber: Subscription<T>): void;
    /**
     * Call each of the registered subscribers with the current value of the
     * observable.
     */
    protected notifySubscribers(): void;
}
export default WebIOObservable;