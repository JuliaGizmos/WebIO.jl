import createLogger from "debug";
const debug = createLogger("WebIO:IFrame");

import WebIONode, {WebIONodeSchema, WebIONodeContext} from "./Node";
import setInnerHTML from "./setInnerHTML";
import Future from "./Future";
import WebIO from "./WebIO";

export const IFRAME_NODE_TYPE = "IFrame";

/**
 * Schema required to construct an IFrame node.
 */
export interface IFrameNodeSchema extends WebIONodeSchema {
  nodeType: typeof IFRAME_NODE_TYPE;

  instanceArgs: {
    innerHTML: string;
    bundleURL: string;
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

  private dispatchListener?: WebIO["dispatch"] = undefined;

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

    const {innerHTML, bundleURL} = iframeData.instanceArgs;
    iframe.onload = () => this.initializeIFrame(innerHTML, bundleURL);
  }

  /**
   * Initialize the IFrame after the onload event has been fired.
   * @param innerHTML
   * @param bundleURL
   */
  async initializeIFrame(innerHTML: string, bundleURL: string) {
    const iframe = this.element;

    // This method requires that onload has been fired which means that window
    // and document are defined (hence the `!` operator).
    const iframeWindow = iframe.contentWindow!;
    const iframeDocument = iframe.contentDocument!;

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

    // Inject the WebIO generic HTTP bundle script and wait for it to load.
    (iframeWindow as any)._webIOSkipWebSocket = true;
    const webIOScript = iframeDocument.createElement("script");
    webIOScript.src = bundleURL;
    iframeDocument.body.appendChild(webIOScript);
    await this.waitForWebIO(iframeWindow);

    const iframeWebIO: WebIO = (iframeWindow as any).WebIO;

    // Setup message into and out of the IFrame's WebIO
    this.dispatchListener = iframeWebIO.dispatch.bind(iframeWebIO);
    iframeWebIO.setSendCallback(this.webIO.send.bind(this.webIO));
    this.webIO.addDispatchListener(this.dispatchListener);

    // TODO/MEMORY LEAK:
    // There doesn't seem to be a way to detect when the current element is
    // removed from the DOM. I couldn't get the MutationObserver API to work,
    // and it seems like it would require a listener on `document.body` for it
    // to work anyway (and a separate event listener for every WebIO tree).

    // Set inner html of body.
    setInnerHTML(iframeDocument.body, innerHTML);
  }

  /**
   * Poll the IFrame for the WebIO global.
   * @param iframeWindow
   * @param interval
   */
  private waitForWebIO(iframeWindow: Window, interval: number = 100) {
    const future = new Future<WebIO>();
    const wait = () => {
      if (typeof (iframeWindow as any).WebIO === "undefined") {
        debug(`IFrame doesn't have WebIO, waiting ${interval}ms...`);
        return setTimeout(wait, interval);
      }
      future.resolve((iframeWindow as any).WebIO);
    };
    wait();
    return future;
  }
}

export default WebIOIFrame;
