import WebIO from "@webio/webio";

/**
 * Tell TypeScript that the `Blink` global exists.
 *
 * @todo This could be typed out but is probably pretty low priority.
 */
declare const Blink: any;

if (Blink && Blink.sock) {
  const webIO = new WebIO();
  webIO.setSendCallback((message) => {
    Blink.msg("webio", message);
  });
  Blink.handlers.webio = (message: any) => {
    webIO.dispatch(message.data);
  };

  if (typeof window !== "undefined") {
    console.warn("WebIO is registering WebIO window global.");
    (window as any).WebIO = webIO;
  }
} else {
  console.error("WebIO is unable to initialize (Blink is not connected)!");
}
