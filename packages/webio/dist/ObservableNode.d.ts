import WebIONode, { WebIONodeSchema, WebIONodeContext } from "./Node";
import WebIOObservable from "./Observable";
import WebIOScope from "./Scope";
export declare const OBSERVABLE_NODE_TYPE = "ObservableNode";
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
    };
}
/**
 * A special type of node/observable that contains a node.
 */
declare class WebIOObservableNode extends WebIONode {
    readonly element: HTMLDivElement;
    readonly observable: WebIOObservable<WebIONodeSchema> | null;
    scope: WebIOScope;
    children: null;
    protected node: WebIONode | null;
    constructor(schema: ObservableNodeSchema, context: WebIONodeContext);
    mountObservable(): void;
    onObservableUpdate: () => void;
}
export default WebIOObservableNode;
