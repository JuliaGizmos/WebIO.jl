import createLogger from "debug";
const debug = createLogger("WebIO:ObservableNode");

import WebIONode, {
  WebIONodeSchema,
  WebIONodeContext,
} from "./Node";
import createNode from "./createNode";
import WebIOObservable from "./Observable";
import WebIOScope from "./Scope";

export const OBSERVABLE_NODE_TYPE = "ObservableNode";

/**
 * Data required to construct a WebIO Observable node.
 */
export interface ObservableNodeSchema extends WebIONodeSchema {
  nodeType: typeof OBSERVABLE_NODE_TYPE;

  /**
   * Information about the observable.
   */
  instanceArgs: {
    /**
     * The name of the observable where the node schema lives.
     */
    name: string;
  }
}

/**
 * A special type of node/observable that contains a node.
 */
class WebIOObservableNode extends WebIONode {
  readonly element: HTMLDivElement;
  readonly observable: WebIOObservable<WebIONodeSchema> | null = null;
  scope!: WebIOScope;
  children: null = null;
  protected node!: WebIONode | null;

  constructor(schema: ObservableNodeSchema, context: WebIONodeContext) {
    super(schema, context);
    debug("Creating WebIODomNode", {schema, context});

    this.element = document.createElement("div");
    this.element.className = "webio-observable-node";
    this.element.setAttribute("data-webio-observable-name",  schema.instanceArgs.name);

    try {
      if (!context.scope) {
        throw new Error(`Cannot render ObservableNode that has no parent scope.`);
      }
      this.observable = this.scope.getObservable(schema.instanceArgs.name);
      this.mountObservable();
      this.scope.promises.connected.then(() => this.observable!.subscribe(this.onObservableUpdate));
    } catch (e) {
      this.node = null;
      this.element.innerHTML = `<strong>Caught exception while trying to render ObservableNode: ${e.message}</strong>`;
    }
  }

  mountObservable() {
    if (!this.observable) {
      throw new Error(`Cannot mount null observable.`);
    }

    debug("Mounting node within WebIOObservableNode.", {nodeSchema: this.observable.value});

    const newNode = createNode(this.observable.value, {webIO: this.webIO, scope: this.scope});
    if (this.node) {
      this.element.replaceChild(newNode.element, this.node.element);
    } else {
      this.element.appendChild(newNode.element);
    }
    this.node = newNode;
  }

  onObservableUpdate = () => {
    this.mountObservable();
  }
}

export default WebIOObservableNode;
