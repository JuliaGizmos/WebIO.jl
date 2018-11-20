import WebIONode, { WebIODomElement, WebIONodeSchema, WebIONodeContext } from "./Node";
export declare const DOM_NODE_TYPE = "DOM";
declare const enum DomNamespace {
    HTML = "html",
    SVG = "http://www.w3.org/2000/svg",
    SVG_SHORTHAND = "svg"
}
/**
 * Props associated with a WebIO DOM node serialization.
 */
interface DomNodeProps {
    /**
     * A map of style (CSS) attributes to the associated value.
     */
    style?: {
        [attributeName: string]: string;
    };
    /**
     * A map of event names to listeners (or function definitions of listeners).
     */
    events?: {
        [eventName: string]: string;
    };
    /**
     * A map of (DOM?) attributes to their values (or null if they should be unset).
     */
    attributes?: {
        [attributeName: string]: string | null;
    };
    /**
     * A map of namespaced (DOM) attributes to their values (or null if they should
     * be unset).
     *
     * This doesn't seem to be implemented on the Julia side of things.
     */
    attributesNS?: {
        [attributeName: string]: {
            namespace: DomNamespace;
            value: string | null;
        };
    };
    /**
     * The `innerHTML` that should be set on the node.
     *
     * @todo Is there a reason that this is `setInnerHTML` rather than just
     *    `innerHTML`?
     */
    setInnerHtml?: string;
    /**
     * Miscellaneous attributes that will be set on the DOM element.
     */
    [otherProp: string]: any;
}
declare type Props = Required<DomNodeProps>;
/**
 * Data required to construct a WebIO DOM node.
 */
export interface DomNodeData extends WebIONodeSchema {
    nodeType: typeof DOM_NODE_TYPE;
    /**
     * Information about the type of DOM node (e.g. a <div /> or SVG document).
     */
    instanceArgs: {
        namespace: DomNamespace;
        tag: string;
    };
    props: DomNodeProps;
}
declare class WebIODomNode extends WebIONode {
    readonly element: WebIODomElement;
    children: Array<WebIONode | string>;
    private eventListeners;
    private static createElement;
    constructor(nodeData: DomNodeData, options: WebIONodeContext);
    /**
     * Apply "props" to the underlying DOM element.
     *
     * @param props - The props to apply.
     */
    applyProps(props: DomNodeProps): void;
    /**
     * Apply all props that don't have special meaning.
     *
     * This should really be refactored so that all these "miscellaneous" props
     * are delivered in a separate object (e.g. have props.miscProps on the same
     * level as props.style and props.events et al.).
     * @param props - The object of miscellaneous props and their values.
     */
    applyMiscellaneousProps(props: {
        [propName: string]: any;
    }): void;
    applyStyles(styles: Props["style"]): void;
    /**
     * Apply (add/remove) event listeners to the underlying DOM element.
     *
     * @param events - A map object from event names to event listeners. If an
     *    event name is specified (e.g. `click`) that didn't exist before, the
     *    associated handler (e.g. `events["click"]`) is added as a listener; if
     *    the event name has already been specified (even if the listener function
     *    changed!), then nothing happens; if the event name is absent (or null) in
     *    the map, then any previously setup listeners (if any) are removed.
     */
    applyEvents(events: Props["events"]): void;
    /**
     * Apply DOM attributes to the underlying DOM element.
     *
     * @param attributes - The map of attributes to apply.
     */
    applyAttributes(attributes: Props["attributes"]): void;
    /**
     * Apply namespaced DOM attributes to the underlying DOM element.
     *
     * @param attributes - The `{attributeName: {namespace, value}}` map to apply.
     */
    applyAttributesNS(attributes: Props["attributesNS"]): void;
    /**
     * Set the value associated with the node's element.
     *
     * This generally only works with `<input />` elements.
     *
     * @param value
     * @throws Will throw an error if the element doesn't have a `value` attribute.
     */
    setValue(value: any): void;
}
export default WebIODomNode;
