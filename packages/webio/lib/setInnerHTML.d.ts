import { WebIODomElement } from "./Node";
/**
 * Set the `innerHTML` attribute of a DOM element.
 *
 * This method will guarantee the execution of `<script />`s which is not done
 * by simply setting `element.innerHTML = ...`.
 *
 * @param element - The DOM element whose `innerHTML` will be set.
 * @param html - The HTML string to use; any special HTML characters (`<`, `>`, `&`, etc.)
 *    should be &-escaped as appropriate (e.g. to set the displayed text to "foo&bar",
 *    `html` should be `foo&amp;bar`).
 */
declare const setInnerHTML: (element: WebIODomElement, html: string) => void;
export default setInnerHTML;
