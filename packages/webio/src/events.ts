import debug from "debug";
const log = debug("WebIO:events");
import WebIOScope from "./Scope";
import {WebIODomElement} from "./Node";

/**
 * Create a WebIO event listener.
 *
 * This function returns an event listener function that will operate in the
 * correct WebIO scope (i.e. WebIO will refer to the right instance and `this`
 * will be bound to the DOM node specified).
 *
 * Note that we use _webIO-prefixed variable names to avoid any possible clashes
 * with user-code.
 *
 * @param _webIOThisContext - the DOM node that `this` should be bound to.
 * @param _webIOListenerSource - the source (preferably as a string) of the listener
 *    function; if not a string, the function will be converted to a string and
 *    then re-eval'd to ensure that WebIO and this refer to the correct objects.
 * @param _webIOScope - the WebIO scope that the handler should use.
 */
export const createWebIOEventListener = (
    _webIOThisContext: WebIODomElement | WebIOScope,
    _webIOListenerSource: string | EventListener,
    _webIOScope?: WebIOScope,
): EventListener => {
  log("Creating event listener.", {context: _webIOThisContext, scope: _webIOScope, source: _webIOListenerSource});
  if (typeof _webIOListenerSource === "string") {
    // Wrap the source in parens so that eval returns the function instance
    // (so that eval treats it as an expression rather than a top-level function
    // declaration).
    return (eval(`(${_webIOListenerSource})`) as EventListener).bind(_webIOThisContext);
  }

  // The listener given is a function; we need to get a string representation of it and
  // then re-create it (so that the binding can be done correctly).
  // TODO: this can be removed (probably?) once the work is done (i.e. only use strings)
  return createWebIOEventListener(_webIOThisContext, _webIOListenerSource.toString(), _webIOScope);
};
