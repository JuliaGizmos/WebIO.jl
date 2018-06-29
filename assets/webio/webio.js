var is_array = require('is-array')
var arrays_equal = require('array-equal')

function arrays_and_equal(arr1, arr2){
    return is_array(arr1) && is_array(arr2) && arrays_equal(arr1, arr2)
}

function makeScope(id, data, sendCallback, dom, handlers, observables)
{
    var scope = {
        type: "scope",
        id: id,
        data: data,
        sendCallback: sendCallback,
        dom: dom,
        handlers: handlers || {},
        observables: observables || {},
        promises: {}
    }

    if (typeof WebIO.scopes[id] !== "undefined") {
        console.warn("A scope with id '"+id+"' already exists.")
    }
    WebIO.scopes[id] = scope;
    if (observables){
        Object.keys(observables).forEach(function setobsscope(name) {
            var o = observables[name]
            if (typeof WebIO.obsscopes[o.id] === "undefined"){
                WebIO.obsscopes[o.id] = []
            }
            //obname is the name of the observable in this scope
            WebIO.obsscopes[o.id].push({scope: scope, obname: name})
        })
    }

    return scope;
}


function createNode(scope, data, parentNode)
{
    var nodeType = data.nodeType;
    return WebIO.NodeTypes[nodeType]
           .create(scope, data, parentNode)
}

function getHandlers(scope, cmd)
{
    var fs = scope.handlers[cmd];
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
        console.error("Invalid command ", cmd, "received for scope", scope)
    }]
}


function dispatch(msg)
{
    if (msg.type != "command") {
        console.warn("invalid message received", msg)
    } else {
        var scope = WebIO.scopes[msg.scope];
        var fs = getHandlers(scope, msg.command);
        for (var i=0, l=fs.length; i<l; i++) {
            var f = fs[i]
            f.call(scope, msg.data, false) // false for "not client-side"
        }
    }
}

function mount(target, data)
{
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }

    var opts = {sendCallback: WebIO.sendCallback}
    var node = createNode(opts, data, target);

    target.parentNode.replaceChild(node, target)

    return node
}

function send(scope, cmd, data)
{
    WebIO.sendCallback(message(scope, cmd, data));
}

function setval(ob, val, sync) {
    if (typeof sync == "undefined") {
        sync = true // compat
    }

    var allscopes = WebIO.obsscopes[ob.id] // all scopes this observable appears in
    var synced_julia = false               // have we synced with Julia yet?

    allscopes.forEach(function (oscopeinfo) {
        var scope = oscopeinfo.scope
        var name = oscopeinfo.obname // the name of the observable in oscope
        var observable = scope.observables[name]

        observable.value = val

        // fire any handlers for the given observable in this scope
        if (typeof scope.handlers[name] !== "undefined") {
            var fs = scope.handlers[name];
            for (var i=0, l=fs.length; i<l; i++) {
                var f = fs[i]
                f.call(scope, val, true) // true for "client-side"
            }
        }

        // sync the observable's value to julia if `sync` is true in any scope
        if (sync && observable.sync && !synced_julia) {
            WebIO.send(scope, name, val);
            synced_julia = true
        }
    })
}

function getval(ob) {
    var scope = WebIO.scopes[ob.scope]
    // NOTE: there maybe many scopes this observable is associated with
    // (as stored in obsscopes) but we assume all of them have the same value
    // this is an invariant that should be maintained by `setval`
    return scope.observables[ob.name].value
}

function message(scope, cmd, data)
{
    return {
        type: "message",
        scope: scope.id,
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

    // Create Scope - for use by NodeTypes
    makeScope: makeScope,

    // createNode
    createNode: createNode,

    // For Providers to call when messages are received from Julia
    dispatch: dispatch,

    // Send a message back to the Scope on Julia
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
    },
    scopes: {},
    obsscopes: {}
};

if (window) {
    window.WebIO = WebIO;
}
module.exports = WebIO
