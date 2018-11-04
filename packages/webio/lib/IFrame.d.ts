import WebIONode, { WebIONodeSchema, WebIONodeContext } from "./Node";
export declare const IFRAME_NODE_TYPE = "IFrame";
/**
 * Schema required to construct an IFrame node.
 */
export interface IFrameNodeSchema extends WebIONodeSchema {
    nodeType: typeof IFRAME_NODE_TYPE;
    instanceArgs: {
        innerHTML: string;
    };
}
/**
 * A WebIO IFrame node.
 *
 * This renders WebIO content within a (mostly) isolate IFrame. Both the IFrame
 * and the parent page share the same WebIO instance.
 *
 * IMPORANT: IFrames have **huge** overhead on a browser page because they
 * require a whole new page context (it's pretty much the same as opening a
 * new tab). Using many IFrames will result in huge memory usage.
 *
 * NOTE: We don't have a good way to style IFrames such that they're exactly the
 * size of the content within them. RIP.
 */
declare class WebIOIFrame extends WebIONode {
    readonly element: HTMLIFrameElement;
    children: null;
    constructor(iframeData: IFrameNodeSchema, options: WebIONodeContext);
    /**
     * Initialize the IFrame after the onload event has been fired.
     * @param innerHTML
     */
    initializeIFrame(innerHTML: string): Promise<void>;
}
export default WebIOIFrame;
