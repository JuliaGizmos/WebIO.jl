import createLogger from "debug";
const debug = createLogger("WebIO:IFrame");

import WebIONode, {WebIONodeSchema, WebIONodeContext} from "./Node";
import setInnerHTML from "./setInnerHTML";

export const IFRAME_NODE_TYPE = "IFrame";

/**
 * Schema required to construct an IFrame node.
 */
export interface IFrameNodeSchema extends WebIONodeSchema {
  nodeType: typeof IFRAME_NODE_TYPE;

  instanceArgs: {
    innerHTML: string;
  }
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
class WebIOIFrame extends WebIONode {
  readonly element: HTMLIFrameElement;
  children: null = null;

  constructor(
    iframeData: IFrameNodeSchema,
    options: WebIONodeContext,
  ) {
    super(iframeData, options);

    debug("Creating new WebIOIFrame.", iframeData);

    const iframe = this.element = document.createElement("iframe");
    iframe.className = "webio-iframe";
    iframe.src = `about:blank`;
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.height = "100%";
    iframe.width = "100%";
    iframe.style.display = "block";

    const {innerHTML} = iframeData.instanceArgs;
    iframe.onload = () => this.initializeIFrame(innerHTML);
  }

  /**
   * Initialize the IFrame after the onload event has been fired.
   * @param innerHTML
   */
  async initializeIFrame(innerHTML: string) {
    const iframe = this.element;

    // This method requires that onload has been fired which means that window
    // and document are defined (hence the `!` operator).
    const iframeWindow = iframe.contentWindow!;
    const iframeDocument = iframe.contentDocument!;

    // Set WebIO window global.
    (iframeWindow as any).WebIO = this.webIO;

    // Add <base> tag to tell IFrame to load relative resources from the same
    // place that the current page is.
    const baseTag = document.createElement("base");
    baseTag.href = document.baseURI;
    iframeDocument.head!.appendChild(baseTag);

    // Apply some styling.
    // It seems that there's not an easy way to get the iframe to have the
    // "correct" size (i.e. exactly the size of its contents, as if it were
    // just a normal <div> element). This currently doesn't really work.
    iframeDocument.body.style.cssText = `
      margin: 0;
      padding: 0;
      height: 100%;
    `;

    // Set inner html of body.
    setInnerHTML(iframeDocument.body, innerHTML);
  }
}

export default WebIOIFrame;
