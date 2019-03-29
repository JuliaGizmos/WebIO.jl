/**
 * An externally resolvable future.
 *
 * @example
 * // Create a future that logs its result when done.
 * const future = new Future<string>();
 * future.then((s) => console.log(`Future resolved with: ${s}`);
 * future.resolve("foo");
 */
class Future<T, E = any> {

  resolve!: (x: T) => void;
  reject!: (e: E) => void;

  private _promise = new Promise<T>((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });

  then: Promise<T>["then"] = (...args) => this._promise.then(...args);
  catch: Promise<T>["then"] = (...args) => this._promise.then(...args);
}

export default Future;
