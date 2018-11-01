var SystemJS = require('systemjs/dist/system')
var WebIO = require('./webio.js')

var STYLE_KEY = 'style';
var EVENT_KEY = 'events';
var ATTR_KEY = 'attributes';
var ATTR_NS_KEY = 'attributes_ns';

function applyProps(scope, domNode, props)
{
    for (var key in props) {
        var value = props[key];

        switch (key)
        {
            case STYLE_KEY:
                applyStyles(domNode, value);
                break;

            case EVENT_KEY:
                applyEvents(domNode, scope, value);
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

function applyEvents(domNode, scope, events)
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
            allHandlers[key] = makeEventHandler(scope, value);
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

function makeEventHandler(scope, value)
{
    if (typeof value == "function") {
        return makeEventHandler(scope, {
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
        f.call(this, event, scope); //XXX security!?
    }

    eventHandler.options = options;
    return eventHandler;
}

function appendChildren(options, parentNode, children) {
    if (children) {
        for (var nChildren=children.length, i=0; i<nChildren; i++) {
            if (typeof children[i] === "string") {
                parentNode.appendChild(document.createTextNode(children[i]));
            } else {
                var child = WebIO.createNode(options, children[i], parentNode);
                parentNode.appendChild(child);
            }
        }
    }

}

var namespaces = {svg: "http://www.w3.org/2000/svg"}

function createDOM(options, data, parentNode) {

    var args = data.instanceArgs;
    var dom;
    if (args.namespace == "html") {
        dom = document.createElement(args.tag);
    } else {
        var ns = namespaces[args.namespace] || args.namespace;
        dom = document.createElementNS(ns, args.tag);
    }

    applyProps(options, dom, data.props);
    appendChildren(options, dom, data.children)

    return dom;
}

function doImports(scope, imp) {
    // this function must return a promise which resolves to a
    // vector of modules or null values (null values for non-modules)
    switch (imp.type) {
        case "sync_block":
            // all imports in this block must be loaded one after the other
            // We create a single promise which accumulates the resolved
            // values of all the input promises into a vector
            var sync_imports = imp.data

            if (sync_imports.length == 0) {
                return undefined
            }

            // we chain promises to this empty promise
            var p = new Promise(function (acc, rej) { acc([]); })

            function makePromisClosure(sync_import) {
                return function (vec) {
                    // vec contains previously resolved modules
                    var y = doImports(scope, sync_import) // a promise
                    var flatten = (sync_import.type == "sync_block" ||
                                   sync_import.type == "async_block")

                    return new Promise(function (acc, rej) {
                        y.then(function (mod) {
                            if (typeof(mod) === "undefined") {
                            } else if (flatten) {
                                acc(vec.concat(mod))
                            } else {
                                vec.push(mod)
                                acc(vec)
                            }
                        })
                    })
                }
            }
            for (var i=0, l = sync_imports.length; i < l; i++) {
                p = p.then(makePromisClosure(sync_imports[i]))
            }
            return p;
        case "async_block":
            var ps = imp.data.map(function(x){return doImports(scope, x)})
            return Promise.all(ps).then(function (mods) {
                var mods2 = []
                for (var i=0, l=imp.data.length; i<l; i++) {
                    var x = imp.data[i]
                    if (x.type == "sync_block" || x.type == "async_block") {
                        mods2 = mods2.concat(mods[i])
                    } else {
                        mods2.push(mods[i])
                    }
                }
                return mods2
            })
        case "js":
            var cfg = {paths: {}}
            cfg.paths[imp.name] = imp.url
            if (imp.url.replace(/^https?:\/\//, "") == imp.url && imp.url.slice(0, 2) !== "//") { // this means the URL is relative
                cfg.meta = {};
                // forward cookies
                // see https://github.com/systemjs/systemjs/issues/1731
                cfg.meta[imp.url] = {authorization: true};
            }
            SystemJS.config(cfg)
            return SystemJS.import(imp.url).then(function (mod) {
                if (imp.name) {
                    scope[imp.name] = mod
                }
                return mod
            })
        case "css":
            var cssId = imp.url.split( "/" ).join("-");
            if (!document.getElementById(cssId))
            {
                var link  = document.createElement('link');
                link.id   = cssId;
                link.rel  = 'stylesheet';
                link.type = 'text/css';
                link.href = imp.url
                link.media = 'all';
                scope.dom.appendChild(link);
            }
            return undefined;
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
                    console.error("This browser doesn't support HTML " +
                                  "imports. Cannot import " + imp.url);
                    reject(imp);
                }
            });
            return p
        default:
            console.warn("Don't know how to load import of type " + imp.type);
            return undefined
    }
}

function createScope(options, data) {
    var fragment = document.createElement("div");
    fragment.className = "wio-scope";

    // var handlers = data.instanceArgs.handlers;
    var observables = data.instanceArgs.observables;
    var handlers = data.instanceArgs.handlers;

    var scope = WebIO.makeScope(data.instanceArgs.id, data,
                             options.sendCallback, fragment, handlers, observables);

    if (data.instanceArgs.systemjs_options)
        SystemJS.config(data.instanceArgs.systemjs_options)

    if (handlers["preDependencies"]) {
        var predepfns = handlers["preDependencies"]
        predepfns.map(function (f){ f(scope) })
    }

    var imports = data.instanceArgs.imports;

    var depsPromise = doImports(scope, imports);
    scope.promises.importsLoaded = depsPromise

    scope.promises.connected = new Promise(function (accept, reject) {
        WebIO.onConnected(function () {
            accept(scope);
        })
    })

    depsPromise.then(function (deps) {
        appendChildren(scope, fragment, data.children);
    })

    var callbackPromise = new Promise(function (acc, rej) {acc()}) // always accept
    if (handlers._promises !== undefined &&
        handlers._promises["importsLoaded"]){
        var onimportfns = handlers._promises["importsLoaded"]
        callbackPromise = depsPromise.then(function(alldeps){
            onimportfns.map(function (f){ f.apply(scope, alldeps) })
        })
    }

    Promise.all([scope.promises.connected, callbackPromise]).then(function () {
        // internal message to notify julia that
        // the scope can now receive messages
        WebIO.send(scope, "_setup_scope", {})
    })

    return fragment;
}

var style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = '.wio-scope { display:inherit; margin:inherit }'
document.getElementsByTagName('head')[0].appendChild(style)

WebIO.NodeTypes = {
    DOM: {
        namespaces: namespaces,
        create: createDOM
    },
    Scope: {
        create: createScope
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
