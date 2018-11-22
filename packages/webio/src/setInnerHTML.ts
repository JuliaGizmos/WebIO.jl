import {WebIODomElement} from "./Node";

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
const setInnerHTML = (element: WebIODomElement, html: string) => {
  // In the original WebIO, we like to replace </script> with </_script> because the whole shebang
  // is executed inside a <script></script> block (and we don't want to close it too early).
  html = html.replace(/<\/_script>/g, "</script>");
  element.innerHTML = html;

  // If the HTML contained any <script> tags, these are NOT executed when we assign the DOM
  // innerHTML attribute, so we have to find-and-replace them to force them to execute.
  // We do this weird array coercion because getElementsByTagName returns a
  // HTMLCollection object, which updates as the contents of element update
  // (creating an infinite loop).
  const scripts = Array.from(element.getElementsByTagName("script"));
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");

    // Copy all attributes.
    // Unfortunately, attributes is a NamedNodeMap which doesn't have very
    // ES6-like methods of manipulation
    for (let i = 0; i < oldScript.attributes.length; ++i) {
      const {name, value} = oldScript.attributes[i];
      newScript.setAttribute(name, value)
    }

    // Copy script content
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));

    // Replace inside DOM
    oldScript.parentNode!.replaceChild(newScript, oldScript);
  });
};

export default setInnerHTML;
