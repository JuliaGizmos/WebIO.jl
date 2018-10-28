import WebIO from "./WebIO";
import WebIOScope from "./Scope";
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
export declare type WebIODomElement = HTMLElement | SVGElement | HTMLInputElement;
/**
 * Abstract base interface for "node schema."
 *
 * "Node schema" is the data used to construct `WebIONode` instances and is the
 * data that is passed over the comm from Julia to the browser.
 *
 * Sub-interfaces (corresponding to various node types) may have other members.
 */
export interface WebIONodeSchema {
    type: "node";
    nodeType: string;
    children: Array<WebIONodeSchema | string>;
    instanceArgs: {};
}
/**
 * The "context" where the node is being created.
 *
 * `scope` refers to the closest-ancestor scope, or undefined if there is no
 * ancestor scope. This is used to resolve observable references in a
 * hierarchical fashion.
 *
 * `webIO` refers to the top-level WebIO instance.
 */
export interface WebIONodeContext {
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
declare abstract class WebIONode {
    private readonly nodeData;
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
    protected constructor(nodeData: WebIONodeSchema, options: WebIONodeContext);
    /**
     * Set the innerHTML of the node's DOM element.
     */
    setInnerHTML(html: string): void;
}
export default WebIONode;
