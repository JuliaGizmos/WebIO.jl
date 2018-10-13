import WebIOScope from "./Scope";

export interface ObservableMap {
  [id: string]: WebIOObservable;
}

export type Subscription<T = any> = (value: T) => void;

/**
 * Data that is sent from Julia/WebIO about the observable.
 */
export interface ObservableData<T = any> {
  id: string;
  value: T;
  sync: boolean;
}

class WebIOObservable<T = any> {
  readonly name: string;
  readonly id: string;
  readonly sync: boolean;
  value: T;

  /**
   * An array of active subscriber/listener functions. These are evoked when
   * the value of the observable changes.
   */
  private subscribers: Subscription<T>[] = [];

  constructor(
    name: string,
    {id, value, sync}: ObservableData<T>,
    readonly scope: WebIOScope,
  ) {
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
  setValue(newValue: T, sync: boolean = true) {
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
  syncValue() {
    return this.scope.send({
      command: this.name,
      data: this.value,
    });

    // console.error(`WebIOObservable.syncValue not implemented.`);
    // this.scope.send
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
  subscribe(subscriber: Subscription<T>) {
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
  unsubscribe(subscriber: Subscription<T>) {
    const index = this.subscribers.indexOf(subscriber);
    if (index != -1) {
      this.subscribers.splice(index, 1);
    }
  }

  /**
   * Call each of the registered subscribers with the current value of the
   * observable.
   */
  protected notifySubscribers() {
    this.subscribers.forEach((subscriber) => subscriber(this.value));
  }
}

export default WebIOObservable;
