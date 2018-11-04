import debug from "debug";
const log = debug("WebIO:Node");

import WebIO from "./WebIO";
import WebIOScope, {ScopeNodeData} from "./Scope";
import WebIODomNode, {DomNodeData} from "./DomNode";
import setInnerHTML from "./setInnerHTML";
import {IFrameNodeData} from "./IFrame";

/**
 * Union of all WebIO supported DOM elements.
 *
 * Note: we can't use the base Element type for typing purposes because Element
 * includes more abstract things than HTML/SVG Elements (that does always have
 * the style property, for example).
 * We also need HTMLInputElement to stop TypeScript from complaining that
 * `value` doesn't exist on an input element, even though it's technically a
 * sub-type of HTMLElement; TypeScript will still force us to make sure that the
 * type of the element is compatible before accessing the value attribute though.
 */
export type WebIODomElement = HTMLElement | SVGElement | HTMLInputElement;

// This was originally designed thinking that a Scope was a type of node,
// but the thinking on that has changed.
// And now, I'm thinking it has changed back.
export type WebIONodeData = DomNodeData | ScopeNodeData | IFrameNodeData;
export const enum WebIONodeType {
  DOM = "DOM",
  SCOPE = "Scope",
  IFRAME = "IFrame",
}

/**
 * Abstract base interface for "node data."
 *
 * "Node data" is the data used to construct `WebIONode` instances and is the
 * data that is passed over the comm from Julia to the browser.
 */
export interface WebIONodeDataBase {
  type: "node";
  nodeType: WebIONodeType;
  children: Array<WebIONodeData | string>;
}

export interface WebIONodeParams {
  scope?: WebIOScope;
  webIO: WebIO;
}

/**
 * A high-level "point-of-entry" under which WebIO "things" are rendered.
 *
 * A `WebIONode` has a root DOM element and some functionality for managing the
 * attributes (DOM attributes, CSS styles, event listeners, etc.) that are
 * applied to it.
 */
abstract class WebIONode {
  /**
   * The actual DOM element associated with this node.
   */
  abstract readonly element: WebIODomElement;

  /**
   * An array of children (or null if not yet initialized).
   */
  abstract children: Array<WebIONode | string> | null;

  /**
   * The closest-ancestor scope associated with this node.
   */
  readonly scope?: WebIOScope;

  /**
   * The top-level WebIO instance associated with this node.
   */
  readonly webIO: WebIO;

  protected constructor(
    private readonly nodeData: WebIONodeData,
    options: WebIONodeParams,
  ) {
    const {scope, webIO} = options;
    this.scope = scope;
    this.webIO = webIO;
  }

  /**
   * Set the innerHTML of the node's DOM element.
   */
  setInnerHTML(html: string) {
    setInnerHTML(this.element, html);
  }
}

export default WebIONode;
