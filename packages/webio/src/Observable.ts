import WebIOScope from "./Scope";

export interface ObservableMap {
  [id: string]: WebIOObservable;
}

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
}

export default WebIOObservable;
