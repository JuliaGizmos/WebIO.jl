import WebIOScope from "./Scope";
import { WebIONodeContext } from "./Node";
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
 * @param context - the context handler should be evaluated in.
 */
export declare const evalWithWebIOContext: (_webIOThis: WebIOScope | HTMLElement | SVGElement | HTMLInputElement, _webIOListenerSource: string | EventListener, _webIOContext: WebIONodeContext) => EventListener;
