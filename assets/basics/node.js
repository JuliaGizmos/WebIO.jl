var WebIO = require('./webio.js')

var STYLE_KEY = 'style';
var EVENT_KEY = 'events';
var ATTR_KEY = 'attributes';
var ATTR_NS_KEY = 'attributes_ns';

function applyProps(context, domNode, props)
{
    for (var key in props) {
        var value = props[key];

        switch (key)
        {
            case STYLE_KEY:
                applyStyles(domNode, value);
                break;

            case EVENT_KEY:
                applyEvents(domNode, context, value);
                break;

            case ATTR_KEY:
                applyAttrs(domNode, value);
                break;

            case ATTR_NS_KEY:
                applyAttrsNS(domNode, value);
                break;

            case 'value':
                // special-case for updating value only
                // when it has changed.
                if (domNode[key] !== value)
                {
                    domNode[key] = value;
                }
                break;

            default:
                if (WebIO.propUtils[key]){
                    WebIO.propUtils[key](domNode, value);
                } else {
                    domNode[key] = value;
                }
                break;
        }
    }
}

function applyAttrs(domNode, attrs)
{
    for (var key in attrs)
    {
        var val = attrs[key];
        if (val === null) { // should be undefined
            domNode.removeAttribute(key);
        } else {
            domNode.setAttribute(key, val);
        }
    }
}

function applyAttrsNS(domNode, nsAttrs)
{
    for (var key in nsAttrs)
    {
        var attr = nsAttrs[key];
        var namespace = attr.namespace;
        var value = attr.value;

        if (value === null)
        {
            domNode.removeAttributeNS(namespace, key);
        }
        else
        {
            domNode.setAttributeNS(namespace, key, value);
        }
    }
}


function applyStyles(domNode, styles)
{
    var domNodeStyle = domNode.style;

    for (var key in styles)
    {
        domNodeStyle[key] = styles[key];
    }
}

function applyEvents(domNode, context, events)
{
    var allHandlers = domNode.webio_handlers || {};

    for (var key in events)
    {
        var handler = allHandlers[key];
        var value   = events[key];

        if (typeof value === 'undefined')
        {
            domNode.removeEventListener(key, handler);
            allHandlers[key] = undefined;
        }
        else if (typeof handler === 'undefined')
        {
            // for loop doesn't create a new scope in js, only functions
            function bindHandler(handlerfn){
                domNode.addEventListener(key, function (event) {
                    handlerfn.call(domNode, event);
                });
            }
            allHandlers[key] = makeEventHandler(context, value);
            bindHandler(allHandlers[key])
        }
        else
        {
            handler.options = value;
        }
    }

    domNode.webio_handlers = allHandlers;
}

var defaultEventOptions = {
    stopPropagation: true,
    preventDefault: false
}

function makeEventHandler(context, value)
{
    if (typeof value == "function") {
        return makeEventHandler(context, {
            code: value, options: defaultEventOptions
        })
    }

    var options = value.options;
    var f = value.code;

    function eventHandler(event) {
        if (options.stopPropagation) {
            event.stopPropagation();
        }
        if (options.preventDefault) {
            event.preventDefault();
        }

        // http://stackoverflow.com/questions/1271516/executing-anonymous-functions-created-using-javascript-eval
        f.call(this, event, context); //XXX security!?
    }

    eventHandler.options = options;
    return eventHandler;
}

function appendChildren(context, parentNode, children) {
    if (children) {
        for (var nChildren=children.length, i=0; i<nChildren; i++) {
            if (typeof children[i] === "string") {
                parentNode.appendChild(document.createTextNode(children[i]));
            } else {
                var child = WebIO.createNode(context, children[i], parentNode);
                parentNode.appendChild(child);
            }
        }
    }

}

var namespaces = {svg: "http://www.w3.org/2000/svg"}

function createDOM(ctx, data, parentNode) {

    var args = data.instanceArgs;
    var dom;
    if (args.namespace == "html") {
        dom = document.createElement(args.tag);
    } else {
        var ns = namespaces[args.namespace] || args.namespace;
        dom = document.createElementNS(ns, args.tag);
    }

    applyProps(ctx, dom, data.props);
    appendChildren(ctx, dom, data.children)

    return dom;
}

require('../node_modules/systemjs/dist/system.js')

function asyncloadJS(js) {
    return SystemJS.import(js); // a promise
}

function doImports(imports) {
    var promises = [];
    for (var i=0, l=imports.length; i<l; i++) {
        var imp = imports[i];
        if (imp.type === undefined) {
            console.warn("Can't load dependency ", imp)
        } else {
            switch (imp.type) {
                case "js":
                    promises.push(SystemJS.import(imp.url));
                    break;
                case "css":
                    var cssId = imp.url.split( "/" ).join("-");
                    if (!document.getElementById(cssId))
                    {
                        var head  = document.getElementsByTagName('head')[0];
                        var link  = document.createElement('link');
                        link.id   = cssId;
                        link.rel  = 'stylesheet';
                        link.type = 'text/css';
                        link.href = imp.url
                        link.media = 'all';
                        head.appendChild(link);
                    }
                    break;
                case "html":
                    var p = new Promise(function (accept, reject) {
                        var link = document.createElement('link');
                        if ('import' in link) {
                            link.rel = 'import';
                            link.href = imp.url;
                            link.setAttribute('async', '');
                            link.onload = accept;
                            link.onerror = reject;
                            document.head.appendChild(link);
                        } else {
                            console.error("This browser doesn't support HTML imports. Cannot import " + imp.url);
                            reject(imp);
                        }
                    });
                    promises.push(p);
                    break;
                default:
                    console.warn("Don't know how to load import of type " + imp.type);
            }
        }
    }
    return Promise.all(promises);
}

function createWidget(ctx, data) {
    var fragment = document.createElement("div");
    fragment.className = "wio-context";

    // var handlers = data.instanceArgs.handlers;
    var observables = data.instanceArgs.observables;
    var handlers = data.instanceArgs.handlers;

    var subctx = WebIO.makeWidget(data.instanceArgs.id, ctx.data,
                             ctx.sendCallback, fragment, handlers, observables);

    if (handlers["preDependencies"]) {
        var predepfns = handlers["preDependencies"]
        predepfns.map(function (f){ f(subctx) })
    }

    var imports = data.instanceArgs.dependencies;

    var depsPromise = doImports(imports);
    subctx.promises.dependenciesLoaded = depsPromise

    subctx.promises.connected = new Promise(function (accept, reject) {
        WebIO.onConnected(function () {
            // internal message to notify julia
            WebIO.send(subctx, "_setup_context", {});
            accept(subctx);
        })
    })

    depsPromise.then(function (deps) {
        appendChildren(subctx, fragment, data.children);
    })

    if (handlers["dependenciesLoaded"]){
        depsPromise.then(function(alldeps){
            var ondepsfns = handlers["dependenciesLoaded"]
            ondepsfns.map(function (f){ f.apply(subctx, alldeps) })
        })
    }

    return fragment;
}

var style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = '.wio-context { display:inherit; margin:inherit }'
document.getElementsByTagName('head')[0].appendChild(style)

WebIO.NodeTypes = {
    DOM: {
        namespaces: namespaces,
        create: createDOM
    },
    Widget: {
        create: createWidget
    }
}

WebIO.CommandSets = {
    Basics: {
        // XXX security!?
        eval: function (code) {
            var f = new Function(code);
            f.call(this);
        }
    }
};
