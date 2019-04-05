import createLogger from "debug";
import uuid from "uuid/v4";

import {WebIOCommand, WebIOCommandType, WebIOMessage, WebIORequest, WebIORequestType, WebIOResponse} from "./message";
import {WebIODomElement, WebIONodeSchema} from "./Node";
import WebIOScope from "./Scope";
import createNode, {NODE_CLASSES} from "./createNode";
import {ObservableGlobalSpecifier} from "./utils";
import WebIOObservable from "./Observable";
import {importResource, importBlock} from "./imports";
import {evalWithWebIOContext} from "./events";
import Future from "./Future";

const debug = createLogger("WebIO");

export type WebIOSendCallback = (message: WebIOMessage) => void; // TODO: void?

class WebIO {

  /**
   * A promise that is resolved when WebIO is connected to the Julia backend.
   */
  readonly connected: Promise<void>;

  // We use ! to tell TypeScript that these will be set (see constructor for details).
  private resolveConnected!: () => void;
  private rejectConnected!: () => void;

  /**
   * A map from `scopeId` to the corresponding {@link WebIOScope} instance.
   */
  private scopes: {[scopeId: string]: WebIOScope | undefined} = {};

  /**
   * A map from `observableId` to an array of corresponding
   * {@link WebIOObservable} instances. We have an array of these instances
   * since an observable may appear within several different scopes. Also note
   * that we identify observables by id here, rather than by name, since the
   * name may be different in different scopes; the ids are usually of the form
   * `obs_123`.
   */
  private observables: {[observableId: string]: WebIOObservable[] | undefined} = {};

  /**
   * The function that WebIO uses to send data to the Julia backend.
   */
  private sendCallback?: WebIOSendCallback;

  /**
   * A map of in-flight requests.
   *
   * Keys are `requestId`s and the values are {@link Future}s that (should be)
   * ultimately resolved with the corresponding {@link WebIOResponse}.
   */
  private requestFutures: Map<string, Future<WebIOResponse>> = new Map();

  private dispatchListeners: Array<WebIO["dispatch"]> = [];

  /**
   * A reference to {@link NODE_CLASSES} to allow for extension.
   */
  static readonly NODE_CLASSES = NODE_CLASSES;

  constructor() {
    // We have to use the !-postfix on {resolve,reject}Connected because TypeScript
    // thinks that the body of the promise below isn't immediately executed (it is).
    this.connected = new Promise<void>((resolve, reject) => {
      this.resolveConnected = resolve;
      this.rejectConnected = reject;
    })
  }

  /**
   * Dispatch a message into the WebIO JavaScript machinery.
   *
   * The message usually comes from the comm (e.g. WebSocket) that WebIO is
   * using to communicate.
   *
   * @param message - The message to dispatch.
   */
  dispatch(message: WebIOMessage) {
    this.dispatchListeners.forEach((handler) => {
      try {
        handler(message)
      } catch (e) {
        console.error(e);
        console.error(`Unhandled error in dispatchListener: ${e}.`);
      }
    });
    switch (message.type) {
      case "request":
        return this.dispatchRequest(message);
      case "command":
        return this.dispatchCommand(message);
      case "response":
        return this.dispatchResponse(message);
    }

    throw new Error(`Unknown message type: ${(message as any).type}.`);
  }

  private dispatchCommand(message: WebIOCommand) {
    debug(`Dispatching command (command: ${message.command}).`, message);
    switch (message.command) {
      case WebIOCommandType.UPDATE_OBSERVABLE: {
        const scope = this.scopes[message.scope];
        if (!scope) {
          debug(`WebIO has no such scope: (id ${message.scope}).`);
          return;
        }
        scope.setObservableValue(message.name, message.value, false);
        return;
      }

      default: {
        // TODO: see notes in interface definition of WebIOMessage
        throw new Error(`Unknown command: ${message.command}`);
        // const {scope: scopeId, command} = message;
        // const scope = this.scopes[scopeId];
        // if (!scope) {
        //   throw new Error(`WebIO has no such scope (id: ${scopeId}).`);
        // }
      }
    }
  }

  private async dispatchRequest(message: WebIORequest) {
    debug(`dispatchRequest: ${message.request}`);
    switch (message.request) {
      case WebIORequestType.EVAL: {
        const scope = this.getScope(message.scope);
        let result = evalWithWebIOContext(scope, message.expression, {webIO: this, scope});
        if (result instanceof Promise) {
          debug(`Eval expression returned a promise, awaiting promise.`);
          result = await result;
        }

        return await this.send({
          type: "response",
          request: message.request,
          requestId: message.requestId,
          result,
        });
      }
    }

    throw new Error(`Unknown request type: ${message.request}.`);
  }

  private dispatchResponse(message: WebIOResponse) {
    const {request, requestId} = message;
    debug(`dispatchResponse: ${request}`);
    const future = this.requestFutures.get(requestId);
    if (!future) {
      debug(`Received response for unknown requestId: ${requestId}.`);
      return;
    }
    this.requestFutures.delete(requestId);
    future.resolve(message);
  }

  /**
   * Set the send callback that WebIO will use.
   *
   * This method, when called for the first time, will also resolve the WebIO
   * connected promise and send any messages that are waiting.
   */
  setSendCallback(sendCallback: WebIOSendCallback) {
    debug(`Setting WebIO sendCallback.`);
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
  registerScope(scope: WebIOScope) {
    debug(`Registering WebIO scope (id: ${scope.id}).`);
    this.scopes[scope.id] = scope;
  }

  /**
   * A method called by observables to register themselves. This is used to
   * ensure that observables are in a consistent state within the browser.
   * @param observable
   */
  registerObservable(observable: WebIOObservable) {
    const {id} = observable;
    debug(`Registering WebIO observable (id: ${observable.id}).`);
    if (!this.observables[id]) {
      this.observables[id] = [];
    }
    this.observables[observable.id]!.push(observable);
  }

  /**
   * Ensure that all observable instances have the value off the
   * `sourceObservable`.
   *
   * @param sourceObservable - The observable whose values are synchronized with
   *    all other registered observables of the same id.
   */
  reconcileObservables(sourceObservable: WebIOObservable) {
    const {id, name, value} = sourceObservable;
    const observables = this.observables[id] || [];
    debug(`Reconciling ${observables.length} observables (id: ${id}).`);

    if (observables.length < 1) {
      console.warn(
        `Tried to reconcile observables (id: ${id}, name: ${name}) but we don't know`
        + `about any observables with that id.`
      );
      return;
    }

    for (const observable of observables) {
      // Don't re-set the value of the observable that triggered the
      // reconciliation.
      if (observable === sourceObservable) continue;

      debug(`Reconciling observable "${observable.name}" in scope "${observable.scope.id}".`);
      observable.setValue(value, false);
    }
  };

  /**
   * Send a message to the WebIO Julia machinery.
   *
   * Sets `type: "message"` before passing to the send callback.
   */
  async send(message: WebIOMessage) {
    await this.connected;
    debug(`Sending WebIO message:`, message);
    debug(`sendCallback:`, this.sendCallback);
    return this.sendCallback!({type: "message", ...message});
  }

  async sendRequest<T extends WebIORequestType>(message: WebIORequest<T>): Promise<WebIOResponse<T>> {
    message.type = message.type || "request";
    message.requestId = message.requestId || uuid();
    const {type, request, requestId} = message;
    if (type !== "request" || !request) {
      throw new Error("Malformed request.");
    }
    if (this.requestFutures.has(requestId)) {
      throw new Error(`Duplicate request id: ${requestId}.`);
    }

    const future = new Future<WebIOResponse<T>>();
    this.requestFutures.set(requestId, future);
    await this.send(message);
    return await future;
  }

  async RPC(rpcId: string, args: any[]): Promise<unknown> {
    const result = await this.sendRequest<WebIORequestType.RPC>({
      type: "request",
      request: WebIORequestType.RPC,
      requestId: uuid(),
      rpcId,
      arguments: args,
    });
    if ("exception" in result) {
      throw new Error(result.exception);
    }
    return result.result;
  }

  /**
   * Curried RPC function.
   *
   * @example
   * const rpc = WebIO.getRPC("myRpc");
   * await rpc(1, 2, 3);
   * await rpc(4, 5, 6);
   */
  getRPC = (rpcId: string) => (...args: any[]) => this.RPC(rpcId, args);

  /**
   * Mount a WebIO node into the specified element.
   *
   * This method overwrites the content of the element.
   *
   * @param element - The element to be replaced with the WebIO node.
   * @param nodeSchema - The data associated with the WebIO node.
   */
  mount(element: WebIODomElement, nodeSchema: WebIONodeSchema) {
    if (!element) {
      console.error("WebIO cannot mount node into element.", {element, nodeData: nodeSchema});
      throw new Error(`WebIO cannot mount node into element.`);
    }
    debug("Mounting WebIO node.", {nodeData: nodeSchema, element});
    const node = createNode(nodeSchema, {webIO: this});

    // Reset the contents of the node we're mounting into.
    element.innerHTML = "";
    element.classList.add("webio-mountpoint");

    element.appendChild(node.element);
  }

  getScope(scopeId: string): WebIOScope {
    const scope = this.scopes[scopeId];
    if (!scope) {
      throw new Error(`WebIO has no scope (id: ${scopeId}).`);
    }
    return scope;
  }

  /**
   * Get an {@link WebIOObservable} object.
   *
   * @throws Will throw an error if the scope does not exist or there is no
   *    such observable within the scope.
   */
  getObservable({scope, name}: ObservableGlobalSpecifier) {
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
  getval({scope, name}: ObservableGlobalSpecifier) {
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
  setval({scope, name}: ObservableGlobalSpecifier, value: any, sync: boolean = true) {
    return this.getScope(scope).setObservableValue(name, value, sync);
  }

  addDispatchListener(listener: WebIO["dispatch"]) {
    this.dispatchListeners.push(listener);
  }

  removeDispatchListener(listener: WebIO["dispatch"]) {
    const index = this.dispatchListeners.indexOf(listener);
    if (index === -1) {
      return;
    }
    this.dispatchListeners = this.dispatchListeners.splice(index, 1);
  }

  // Re-export from imports.ts
  importResource = importResource;
  importBlock = importBlock;
}

export default WebIO;
