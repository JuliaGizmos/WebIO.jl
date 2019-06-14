"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var setInnerHTML = function (element, html) {
    // In the original WebIO, we like to replace </script> with </_script> because the whole shebang
    // is executed inside a <script></script> block (and we don't want to close it too early).
    html = html.replace(/<\/_script>/g, "</script>");
    element.innerHTML = html;
    // If the HTML contained any <script> tags, these are NOT executed when we assign the DOM
    // innerHTML attribute, so we have to find-and-replace them to force them to execute.
    // We do this weird array coercion because getElementsByTagName returns a
    // HTMLCollection object, which updates as the contents of element update
    // (creating an infinite loop).
    var scripts = Array.from(element.getElementsByTagName("script"));
    scripts.forEach(function (oldScript) {
        var newScript = document.createElement("script");
        // Copy all attributes.
        // Unfortunately, attributes is a NamedNodeMap which doesn't have very
        // ES6-like methods of manipulation
        for (var i = 0; i < oldScript.attributes.length; ++i) {
            var _a = oldScript.attributes[i], name_1 = _a.name, value = _a.value;
            newScript.setAttribute(name_1, value);
        }
        // Copy script content
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        // Replace inside DOM
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
};
exports.default = setInnerHTML;
