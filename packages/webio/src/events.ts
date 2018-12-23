import debug from "debug";
const log = debug("WebIO:events");
import WebIOScope from "./Scope";
import {WebIODomElement, WebIONodeContext} from "./Node";

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
 * @param _webIOThis - the DOM node that `this` should be bound to.
 * @param _webIOListenerSource - the source (preferably as a string) of the listener
 *    function; if not a string, the function will be converted to a string and
 *    then re-eval'd to ensure that WebIO and this refer to the correct objects.
 * @param _webIOContext - the context handler should be evaluated in.
 */
export const createWebIOEventListener = (
    _webIOThis: WebIODomElement | WebIOScope,
    _webIOListenerSource: string | EventListener,
    _webIOContext: WebIONodeContext,
): EventListener => {
  const {webIO: WebIO, scope: _webIOScope}= _webIOContext;
  log("Creating event listener.", {context: _webIOThis, scope: _webIOScope, source: _webIOListenerSource});
  // Wrap the source in parens so that eval returns the function instance
  // (so that eval treats it as an expression rather than a top-level function
  // declaration).
  return (eval(`(${_webIOListenerSource})`) as EventListener).bind(_webIOThis);
};

export const evalWithWebIOContext = (
  _webIOThis: WebIODomElement | WebIOScope,
  _webIOListenerSource: string | EventListener,
  _webIOContext: WebIONodeContext,
): unknown => {
  const {webIO: WebIO, scope: _webIOScope}= _webIOContext;
  const _wrappedFunction = () => {
    return eval(`${_webIOListenerSource}`);
  };
  return _wrappedFunction.apply(_webIOThis);
};
