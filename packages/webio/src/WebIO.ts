// import isArray from "is-array";
// import arrayEqual from "array-equal";
import debug from "debug";
import {WebIOCommand, WebIOMessage, WebIOWireMessage} from "./message";
import {WebIODomElement, WebIONodeSchema} from "./Node";
import WebIOScope from "./Scope";
import createNode, {NODE_CLASSES} from "./createNode";
import {ObservableGlobalSpecifier} from "./utils";
import WebIOObservable from "./Observable";

const log = debug("WebIO");

export type WebIOSendCallback = (message: WebIOWireMessage) => void; // TODO: void?

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
    log(`Dispatching message (command: ${message.command}).`, message);
    switch (message.command) {
      case WebIOCommand.EVAL: {
        console.error(`Dispatching command "${message.command}" not implemented.`);
        return;
      }

      default: {
        // TODO: see notes in interface definition of WebIOMessage
        const {scope: scopeId, command: observableName, data} = message;
        const scope = this.scopes[scopeId];
        if (!scope) {
          throw new Error(`WebIO has no such scope (id: ${scopeId}).`);
        }
        // Set (but don't sync) the value..
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
  setSendCallback(sendCallback: WebIOSendCallback) {
    log(`Setting WebIO sendCallback.`);
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
    log(`Registering WebIO scope (id: ${scope.id}).`);
    this.scopes[scope.id] = scope;
  }

  /**
   * A method called by observables to register themselves. This is used to
   * ensure that observables are in a consistent state within the browser.
   * @param observable
   */
  registerObservable(observable: WebIOObservable) {
    const {id} = observable;
    log(`Registering WebIO observable (id: ${observable.id}).`);
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
    log(`Reconciling ${observables.length} observables (id: ${id}).`);

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

      log(`Reconciling observable "${observable.name}" in scope "${observable.scope.id}".`);
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
    log(`Sending WebIO message (command: ${message.command}).`, message);
    return this.sendCallback!({type: "message", ...message});
  }

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
    log("Mounting WebIO node.", {nodeData: nodeSchema, element});
    const node = createNode(nodeSchema, {webIO: this});

    // Reset the contents of the node we're mounting into.
    element.innerHTML = "";
    element.classList.add("webio-mountpoint");
    // Temporary hack for @piever
    // https://github.com/JuliaGizmos/WebIO.jl/pull/211#issuecomment-429672805
    element.classList.add("interactbulma");

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

}

export default WebIO;
