import WebIONode, {WebIONodeSchema, WebIONodeContext} from "./Node";
import WebIODomNode, {DOM_NODE_TYPE} from "./DomNode";
import WebIOScope, {SCOPE_NODE_TYPE} from "./Scope";
import WebIOIFrame, {IFRAME_NODE_TYPE} from "./IFrame";
import WebIOObservableNode, {OBSERVABLE_NODE_TYPE} from "./ObservableNode";

/**
 * Map from node type to node class.
 *
 * The node class should extends WebIONode and take the same arguments in its
 * constructor.
 */
export const NODE_CLASSES: {[nodeType: string]: typeof WebIONode | undefined} = {
  [DOM_NODE_TYPE]: WebIODomNode,
  [SCOPE_NODE_TYPE]: WebIOScope,
  [IFRAME_NODE_TYPE]: WebIOIFrame,
  [OBSERVABLE_NODE_TYPE]: WebIOObservableNode,
};

/**
* Create a new WebIO node (a scope or a DOM node).
* @param schema
* @param context
*/
const createNode = (schema: WebIONodeSchema, context: WebIONodeContext) => {

  const NodeClass = NODE_CLASSES[schema.nodeType];
  if (NodeClass) {
    // We need any here to tell TypeScript that NodeClass isn't an abstract
    // class (because WebIONode **is** an abstract class but we will only have
    // subclasses in our NODE_CLASSES map).
    return new (NodeClass as any)(schema, context);
  }

  throw new Error(`Unknown WebIO node type: ${schema.nodeType}.`);
};

export default createNode;
