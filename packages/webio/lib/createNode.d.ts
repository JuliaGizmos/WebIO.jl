import WebIONode, { WebIONodeSchema, WebIONodeContext } from "./Node";
/**
 * Map from node type to node class.
 *
 * The node class should extends WebIONode and take the same arguments in its
 * constructor.
 */
export declare const NODE_CLASSES: {
    [nodeType: string]: typeof WebIONode | undefined;
};
/**
* Create a new WebIO node (a scope or a DOM node).
* @param schema
* @param context
*/
declare const createNode: (schema: WebIONodeSchema, context: WebIONodeContext) => any;
export default createNode;
