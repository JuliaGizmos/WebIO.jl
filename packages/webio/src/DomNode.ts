import debug from "debug";
const log = debug("WebIO:DomNode")

import WebIONode, {WebIODomElement, WebIONodeDataBase, WebIONodeParams, WebIONodeType} from "./Node";
import WebIOScope from "./Scope";
import {createWebIOEventListener} from "./events";
import createNode from "./createNode";

const enum DomNamespace {
  // "html" should actually be "http://www.w3.org/1999/xhtml" but it's okay
  HTML = "html",
  SVG = "http://www.w3.org/2000/svg",
}

/**
 * A map of style (CSS) attributes to the associated value.
 */
interface StylesMap {
  [attributeName: string]: string;
}

/**
 * A map of event names to listeners (or function definitions of listeners).
 */
interface EventsMap {
  [eventName: string]: string | EventListener;
}

/**
 * A map of (DOM?) attributes to their values (or null if they should be unset).
 */
interface AttributesMap {
  [attributeName: string]: string | null;
}

/**
 * A map of namespaced (DOM) attributes to their values (or null if they should
 * be unset).
 *
 * This doesn't seem to be implemented on the Julia side of things.
 */
interface AttributesNSMap {
  [attributeName: string]: {
    namespace: DomNamespace;
    value: string | null;
  }
}

/**
 * Props associated with WebIO DOM nodes.
 */
interface DomNodeProps {
  style?: StylesMap;
  events?: EventsMap;
  attributes?: AttributesMap;
  attributesNS?: AttributesNSMap;
  setInnerHtml?: string;

  /**
   * Miscellaneous attributes that will be set on the DOM element.
   */
  [otherProp: string]: any;
}

/**
 * Data associated with a DOM node.
 */
export interface DomNodeData extends WebIONodeDataBase {
  nodeType: WebIONodeType.DOM;

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
  children: Array<WebIOScope | WebIODomNode | string>;
  private eventListeners: {[eventType: string]: EventListenerOrEventListenerObject | undefined} = {};

  private static createElement(data: DomNodeData) {
    const {namespace, tag} = data.instanceArgs;
    switch (namespace) {
      case DomNamespace.HTML:
        return document.createElement(tag);
      case DomNamespace.SVG:
        return document.createElementNS(DomNamespace.SVG, tag);
      default:
        throw new Error(`Unknown DOM namespace: ${namespace}.`);
    }
  }

  constructor(nodeData: DomNodeData, options: WebIONodeParams) {
    super(nodeData, options);
    log("Creating WebIODomNode", {nodeData, options});
    this.element = WebIODomNode.createElement(nodeData);
    this.applyProps(nodeData.props);

    // Create children and append to this node's element.
    this.children = nodeData.children.map((nodeData) => {
      if (typeof nodeData === "string") {
        return nodeData;
      }
      return createNode(nodeData, {webIO: this.webIO, scope: this.scope})
    });
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
    log("applyProps", props);
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
    log("applyMiscellaneousProps", props);
    for (const propName of Object.keys(props)) {
      (this.element as any)[propName] = props[propName];
    }
  }

  applyStyles(styles: StylesMap) {
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
  applyEvents(events: EventsMap) {
    for (const eventName of Object.keys(events)) {
      const oldListener = this.eventListeners[eventName];
      const newListenerSource = events[eventName];
      const newListener = newListenerSource && createWebIOEventListener(
        this.element,
        newListenerSource,
        this.scope,
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
  applyAttributes(attributes: AttributesMap) {
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
  applyAttributesNS(attributes: AttributesNSMap) {
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
