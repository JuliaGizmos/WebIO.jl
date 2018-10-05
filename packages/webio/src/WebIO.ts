// import isArray from "is-array";
// import arrayEqual from "array-equal";
import debug from "debug";
import {WebIOCommand, WebIOMessage, WebIOWireMessage} from "./message";
import {WebIODomElement, WebIONodeData} from "./Node";
import WebIOScope from "./Scope";
import createNode from "./createNode";

const log = debug("WebIO");

export type WebIOSendCallback = (message: WebIOWireMessage) => void; // TODO: void?

class WebIO {

  readonly connected: Promise<void>;
  // We use ! to tell TypeScript that these will be set (see constructor for details).
  private resolveConnected!: () => void;
  private rejectConnected!: () => void;
  private scopes: {[scopeId: string]: WebIOScope | undefined} = {};
  private sendCallback?: WebIOSendCallback;

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
   * Sets `type: "message" before passing to the send callback.
   */
  async send(message: WebIOMessage) {
    await this.connected;
    log(`Sending WebIO message (command: ${message.command}).`, message);
    return this.sendCallback!({type: "message", ...message});
  }

  /**
   * Mount a WebIO node into the specified element.
   *
   * This method replaces the existing element.
   *
   * @param element - The element to be replaced with the WebIO node.
   * @param nodeData - The data associated with the WebIO node.
   */
  mount(element: WebIODomElement, nodeData: WebIONodeData) {
    if (!element) {
      console.error("WebIO cannot mount node into element.", {element, nodeData});
      throw new Error(`WebIO cannot mount node into element.`);
    }
    const node = createNode(nodeData, {webIO: this});
    if (!element.parentElement) {
      throw new Error("Cannot mount WebIO node into HTMLElement that isn't mounted in DOM.")
    }
    element.parentElement.replaceChild(node.element, element);
  }

}

export default WebIO;
