import debug from "debug";
const log = debug("WebIO:Node");

import WebIO from "./WebIO";
import WebIOScope, {ScopeNodeData} from "./Scope";
import WebIODomNode, {DomNodeData} from "./DomNode";

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
export type WebIONodeData = DomNodeData | ScopeNodeData;
export const enum WebIONodeType {
  DOM = "DOM",
  SCOPE = "Scope", // this one is capitalized for whatever reason
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
  abstract children: Array<WebIOScope | WebIODomNode | string> | null;

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
   * Set the `innerHTML` attribute of the node's element.
   *
   * This method will guarantee the execution of `<script />`s which is not done
   * by simply setting `element.innerHTML = ...`.
   *
   * @param html - The HTML string to use; any special HTML characters (`<`, `>`, `&`, etc.)
   *    should be &-escaped as appropriate (e.g. to set the displayed text to "foo&bar",
   *    `html` should be `foo&amp;bar`).
   */
  setInnerHTML(html: string) {
    // In the original WebIO, we like to replace </script> with </_script> because the whole shebang
    // is executed inside a <script></script> block (and we don't want to close it too early).
    html = html.replace(/<\/_script>/g, "</script>");

    log("setInnerHTML", html);
    this.element.innerHTML = html;

    // If the HTML contained any <script> tags, these are NOT executed when we assign the DOM
    // innerHTML attribute, so we have to find-and-replace them to force them to execute.
    // We do this weird array coercion because getElementsByTagName returns a
    // HTMLCollection object, which updates as the contents of element update
    // (creating an infinite loop).
    const scripts = [...(this.element.getElementsByTagName("script") as any as HTMLScriptElement[])];
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");

      // Copy all attributes.
      // Unfortunately, attributes is a NamedNodeMap which doesn't have very
      // ES6-like methods of manipulation
      for (let i = 0; i < oldScript.attributes.length; ++i) {
        const {name, value} = oldScript.attributes[i];
        newScript.setAttribute(name, value)
      }

      // Copy script content
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));

      // Replace inside DOM
      oldScript.parentNode!.replaceChild(oldScript, newScript);
    });
  }
}

export default WebIONode;
