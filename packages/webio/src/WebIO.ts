// import isArray from "is-array";
// import arrayEqual from "array-equal";
import debug from "debug";
import {WebIOCommand, WebIOMessage, WebIOWireMessage} from "./message";
import {WebIODomElement, WebIONodeSchema} from "./Node";
import WebIOScope from "./Scope";
import createNode, {NODE_CLASSES} from "./createNode";
import {ObservableGlobalSpecifier} from "./utils";

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
  private sendCallback?: WebIOSendCallback;

  // Add reference to NODE_CLASSES to allow for extension
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
   * Dispatch a WebIO message.
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
