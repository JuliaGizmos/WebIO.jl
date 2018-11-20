import createLogger from "debug";
const debug = createLogger("WebIO:DomNode");

import WebIONode, {
  WebIODomElement,
  WebIONodeSchema,
  WebIONodeContext,
} from "./Node";
import {evalWithWebIOContext} from "./events";
import createNode from "./createNode";

export const DOM_NODE_TYPE = "DOM";

const enum DomNamespace {
  // "html" should actually be "http://www.w3.org/1999/xhtml" but it's okay
  HTML = "html",
  SVG = "http://www.w3.org/2000/svg",
  SVG_SHORTHAND = "svg",
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
    }
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

// Convenience declaration for use in methods within `WebIODomNode`
type Props = Required<DomNodeProps>;

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
  }
  props: DomNodeProps;
}

class WebIODomNode extends WebIONode {
  readonly element: WebIODomElement;
  children: Array<WebIONode | string>;
  private eventListeners: {[eventType: string]: EventListener | undefined} = {};

  private static createElement(data: DomNodeData) {
    const {namespace, tag} = data.instanceArgs;
    switch (namespace.toLocaleLowerCase()) {
      case DomNamespace.HTML:
        return document.createElement(tag);
      case DomNamespace.SVG:
      case DomNamespace.SVG_SHORTHAND:
        return document.createElementNS(DomNamespace.SVG, tag);
      default:
        throw new Error(`Unknown DOM namespace: ${namespace}.`);
    }
  }

  constructor(nodeData: DomNodeData, options: WebIONodeContext) {
    super(nodeData, options);
    debug("Creating WebIODomNode", {nodeData, options});
    this.element = WebIODomNode.createElement(nodeData);
    this.applyProps(nodeData.props);

    // Recursively construct children.
    this.children = nodeData.children.map((nodeData) => {
      if (typeof nodeData === "string") {
        return nodeData;
      }
      return createNode(nodeData, {webIO: this.webIO, scope: this.scope})
    });

    // Append childrens' elements to this node's element.
    for (const child of this.children) {
      if (typeof child === "string") {
        this.element.appendChild(document.createTextNode(child));
      } else {
        this.element.appendChild(child.element);
      }
    }
  }

  /**
   * Apply "props" to the underlying DOM element.
   *
   * @param props - The props to apply.
   */
  applyProps(props: DomNodeProps) {
    debug("applyProps", props);
    const {style, events, attributes, attributesNS, setInnerHtml, ...rest} = props;
    style && this.applyStyles(style);
    events && this.applyEvents(events);
    attributes && this.applyAttributes(attributes);
    attributesNS && this.applyAttributesNS(attributesNS);
    setInnerHtml && this.setInnerHTML(setInnerHtml);
    this.applyMiscellaneousProps(rest);
  }

  /**
   * Apply all props that don't have special meaning.
   *
   * This should really be refactored so that all these "miscellaneous" props
   * are delivered in a separate object (e.g. have props.miscProps on the same
   * level as props.style and props.events et al.).
   * @param props - The object of miscellaneous props and their values.
   */
  applyMiscellaneousProps(props: {[propName: string]: any}) {
    debug("applyMiscellaneousProps", props);
    for (const propName of Object.keys(props)) {
      (this.element as any)[propName] = props[propName];
    }
  }

  applyStyles(styles: Props["style"]) {
    if (!styles) { return; }
    for (const attributeName of Object.keys(styles)) {
      this.element.style[attributeName as any] = styles[attributeName];
    }
  }

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
  applyEvents(events: Props["events"]) {
    for (const eventName of Object.keys(events)) {
      const oldListener = this.eventListeners[eventName];
      const newListenerSource = events[eventName];
      const newListener = newListenerSource && evalWithWebIOContext(
        this.element,
        newListenerSource,
        {scope: this.scope, webIO: this.webIO},
      );

      if (oldListener && !newListener) {
        // We want to just remove the old listener.
        this.element.removeEventListener(eventName, oldListener);
        delete this.eventListeners[eventName];
      } else if (!oldListener && newListener) {
        this.element.addEventListener(eventName, newListener);
        this.eventListeners[eventName] = newListener;
      }

      // If the listener is just changed, we don't really handle that.
    }
  }

  /**
   * Apply DOM attributes to the underlying DOM element.
   *
   * @param attributes - The map of attributes to apply.
   */
  applyAttributes(attributes: Props["attributes"]) {
    for (const key of Object.keys(attributes)) {
      const value = attributes[key];
      if (value === null) {
        this.element.removeAttribute(key);
      } else {
        this.element.setAttribute(key, value);
      }
    }
  }

  /**
   * Apply namespaced DOM attributes to the underlying DOM element.
   *
   * @param attributes - The `{attributeName: {namespace, value}}` map to apply.
   */
  applyAttributesNS(attributes: Props["attributesNS"]) {
    for (const key of Object.keys(attributes)) {
      const {namespace, value} = attributes[key];
      if (value === null) {
        this.element.removeAttributeNS(namespace, key);
      } else {
        this.element.setAttributeNS(namespace, key, value);
      }
    }
  }

  /**
   * Set the value associated with the node's element.
   *
   * This generally only works with `<input />` elements.
   *
   * @param value
   * @throws Will throw an error if the element doesn't have a `value` attribute.
   */
  setValue(value: any) {
    if ("value" in this.element) {
      // If the value hasn't changed, don't re-set it.
      if (this.element.value !== value) {
        this.element.value = value;
      }
    } else {
      throw new Error("Cannot set value on an HTMLElement that doesn't support it.");
    }
  }
}

export default WebIODomNode;
