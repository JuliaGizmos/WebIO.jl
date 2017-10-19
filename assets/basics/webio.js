var is_array = require('is-array')
var arrays_equal = require('array-equal')

function arrays_and_equal(arr1, arr2){
    return is_array(arr1) && is_array(arr2) && arrays_equal(arr1, arr2)
}

var contexts = {};
var obscontexts = {};

function makeWidget(id, data, sendCallback, dom, handlers, observables)
{
    var ctx = {
        type: "context",
        id: id,
        data: data,
        sendCallback: sendCallback,
        dom: dom,
        handlers: handlers || {},
        observables: observables || {},
        promises: {}
    }

    contexts[id] = ctx;
    if (observables){
        Object.keys(observables).forEach(function setobscontext(name){
            var o = observables[name]
            if (typeof obscontexts[o.id] === "undefined"){
                obscontexts[o.id] = []
            }
            //obname is the name of the observable in this context
            obscontexts[o.id].push({ctx: ctx, obname: name})
        })
    }

    return ctx;
}


function createNode(context, data, parentNode)
{
    var nodeType = data.nodeType;
    return WebIO.NodeTypes[nodeType]
           .create(context, data, parentNode)
}

function getHandlers(ctx, cmd)
{
    var fs = ctx.handlers[cmd];
    if (typeof fs !== "undefined") {
        return fs;
    }
    var parts = cmd.split('.');
    var inherit = WebIO.CommandSets;
    if (inherit && inherit[parts[0]]) {
        fs = inherit[parts[0]][parts[1]]
        if (typeof fs !== "undefined") {
            return [fs];
        }
    }
    return [function () {
        console.error("Invalid command ", cmd, "received for context", ctx)
    }]
}


function dispatch(msg)
{
    if (msg.type != "command") {
        console.warn("invalid message received", msg)
    } else {
        var ctx = contexts[msg.context];
        var fs = getHandlers(ctx, msg.command);
        for (var i=0, l=fs.length; i<l; i++) {
            var f = fs[i]
            f.call(ctx, msg.data, false) // false for "not client-side"
        }
    }
}

function mount(id, targetQuery, data)
{
    // TODO: separate targetQuery from Widget id
    // every root element gets a context by default
    var context = makeWidget(id, data, WebIO.sendCallback)
    var target;

    if (targetQuery) {
        target = document.querySelector(targetQuery);

        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
    }

    var node = createNode(context, data, target);
    context.dom = node;

    if (target) {
        target.appendChild(node);
    }

    return node
}

function send(ctx, cmd, data)
{
    ctx.sendCallback(message(ctx, cmd, data));
}

function setval(ob, val) {
    var allcontexts = obscontexts[ob.id]
    var synced_julia = false
    allcontexts.forEach(function propagate_to_other_contexts(octxinfo){
        var ctx = octxinfo.ctx
        var name = octxinfo.obname // the name of the observable in octx
        var x = ctx.observables[name]
        if (val === x.value || arrays_and_equal(val, x.value) ||
                (val !== val && x.value !== x.value)) {
            // adapted from Vue.js reactiveSetter, avoids calling handlers if value
            // is unchanged. The second check is for arrays, since ["a"] !== ["a"].
            // The third check is for values like NaN, since, e.g., NaN !== NaN
            return
        }
        x.value = val
        if (typeof ctx.handlers[name] !== "undefined") {
            var fs = ctx.handlers[name];
            for (var i=0, l=fs.length; i<l; i++) {
                var f = fs[i]
                f.call(ctx, val, true) // true for "client-side"
            }
        }

        // sync the observable's value to julia if `sync` is true in any context
        if (x.sync && !synced_julia) {
            WebIO.send(ctx, name, val);
            synced_julia = true
        }
    })
}

function getval(ob) {
    var ctx = contexts[ob.context]
    var x = ctx.observables[ob.name]
    return x.value
}

function message(ctx, cmd, data)
{
    return {
        type: "message",
        context: ctx.id,
        command: cmd,
        data: data
    }
}

var connected_callbacks=[];
function onConnected(f) {
    if (WebIO._connected) {
        setTimeout(f, 0);
    } else {
        connected_callbacks[connected_callbacks.length]=f;
    }
}

function triggerConnected() {
    for (var i=0,l=connected_callbacks.length; i<l; i++) {
        connected_callbacks[i]()
    }
    WebIO._connected=true;
}

function sendNotSetUp()
{
    console.error("WebIO.sendCallback not set up")
}

//unescape closing script tags which cause problems in html documents
function unencode_scripts(htmlstr){
    if (typeof htmlstr !== "string") return htmlstr;
    return htmlstr.replace(new RegExp("</_script>", "g"), "</scr"+"ipt>")
}

// Add an html string as the contents of an element
// and ensure any scripts get run. Adding with innerHTML
// doesn't run scripts. Ref: https://stackoverflow.com/a/42628703
function setInnerHtml(elm, html) {
  // TODO fix indentation for this function
  html = unencode_scripts(html)
  elm.innerHTML = html;
  var scripts = elm.getElementsByTagName("script");
  // If we don't clone the results then "scripts"
  // will actually update live as we insert the new
  // tags, and we'll get caught in an endless loop
  var scriptsClone = [];
  for (var i = 0; i < scripts.length; i++) {
    scriptsClone.push(scripts[i]);
  }
  for (var i = 0; i < scriptsClone.length; i++) {
    var currentScript = scriptsClone[i];
    var s = document.createElement("script");
    // Copy all the attributes from the original script
    for (var j = 0; j < currentScript.attributes.length; j++) {
      var a = currentScript.attributes[j];
      s.setAttribute(a.name, a.value);
    }
    s.appendChild(document.createTextNode(currentScript.innerHTML));
    currentScript.parentNode.replaceChild(s, currentScript);
  }
}

var WebIO = {
    type: "WebIO",

    // For Base.show or a package to print an element.
    mount: mount,

    // Create Widget - for use by NodeTypes
    makeWidget: makeWidget,

    // createNode
    createNode: createNode,

    // For Providers to call when messages are received from Julia
    dispatch: dispatch,

    // Send a message back to the Widget on Julia
    send: send,

    // A variant of send which sets the value of an observable
    setval: setval,

    // Get the current value of an observable
    getval: getval,

    // given by Provider, to be called when JS needs to send a message to Julia
    sendCallback: sendNotSetUp,

    triggerConnected: triggerConnected,

    onConnected: onConnected,

    propUtils: {
        setInnerHtml: setInnerHtml
    }
};

if (window) {
    window.WebIO = WebIO;
}
module.exports = WebIO
