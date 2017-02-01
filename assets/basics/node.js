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
                domNode[key] = value;
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
            var handler = makeEventHandler(context, value);
            domNode.addEventListener(key, function (event) {
                handler.call(domNode, event);
            });
            allHandlers[key] = handler;
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
    if (typeof value == "string") {
        return makeEventHandler(context, {
            code: value, options: defaultEventOptions
        })
    }

    var options = value.options;
    var code = value.code;

    function eventHandler(event) {
        if (options.stopPropagation) {
            event.stopPropagation();
        }
        if (options.preventDefault) {
            event.preventDefault();
        }

        // http://stackoverflow.com/questions/1271516/executing-anonymous-functions-created-using-javascript-eval
        var f = new Function("event", "context", "(" + code + ").call(this, event, context)");
        f.call(this, event, context);
    }

    eventHandler.options = options;
    return eventHandler;
}

function appendChildren(context, parentNode, children) {
    if (children) {
        for (var nChildren=children.length, i=0; i<nChildren;i++) {
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

function createContext(ctx, data) {
    var fragment = document.createElement("div");
    fragment.className = "wio-context";
    var commands = data.instanceArgs.commands;
    var command_funcs = {}
    if (commands) {
        for (var cmd in commands) {
            var code = commands[cmd];
            var f = new Function("context", "data", "(" + code + ")(context, data)");
            command_funcs[cmd] = f;
        }
    }
    var subctx = WebIO.makeContext(data.instanceArgs.id, ctx.data,
                             ctx.sendCallback, fragment, command_funcs);

    // TODO: Could be made a promise
    WebIO.onConnected(function () {
        WebIO.send(subctx, "_setup_context", {});
    })

    appendChildren(subctx, fragment, data.children);

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
    Context: {
        create: createContext
    }
}

WebIO.CommandSets = {
    Basics: {
        eval: function (context, data) {
            eval(data)
        }
    }
};
