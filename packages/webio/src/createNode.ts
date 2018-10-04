import WebIODomNode from "./DomNode";
import WebIOScope from "./Scope";
import {WebIONodeData, WebIONodeParams, WebIONodeType} from "./Node";

/**
* Create a new WebIO node (a scope or a DOM node).
* @param nodeData
* @param options
*/
const createNode = (nodeData: WebIONodeData, options: WebIONodeParams) => {
  /*
  if (typeof nodeData === "string") {
    throw new Error(`Cannot create string node (yet?).`);
  } else
   */
  if (nodeData.nodeType === WebIONodeType.DOM) {
    return new WebIODomNode(nodeData, options);
  } else if (nodeData.nodeType === WebIONodeType.SCOPE) {
    return new WebIOScope(nodeData, options);
  } else {
    console.error("Unable to generate WebIONode from nodeData:", nodeData);
    throw new Error(`Unknown WebIO nodeType: ${(nodeData as any).nodeType}.`);
  }
};

export default createNode;
