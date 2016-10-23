(function () {

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
    var allHandlers = domNode.webdisplay_handlers || {};

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

    domNode.webdisplay_handlers = allHandlers;
}

var defaultEventOptions = {
    stopPropagation: true,
    preventDefault: false
}

function makeEventHandler(context, value)
{
    console.log("makeEventHandler", context, value);

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
                var child = WebDisplay.createNode(context, children[i], parentNode);
                parentNode.appendChild(child);
            }
        }
    }

}

function createDOM(ctx, data, parentNode) {

    var cls = data.class;
    var dom;
    if (cls.length == 2) {
        dom = document.createElement(cls[1]);
    } else if (cls.length == 3) {
        dom = document.createElementNS(cls[1], cls[2]);
    } else {
        throw("Wrong number of arguments");
    }

    applyProps(ctx, dom, data.props);
    appendChildren(ctx, dom, data.children)

    return dom;
}

function createContext(ctx, data) {
    var fragment = document.createElement("div");
    fragment.className = "wd-context";
    var commands = data.props.commands;
    if (commands) {
        for (var cmd in commands) {
            var code = handlers[cmd];
            var f = new Function("context", "data", "(" + code + ")(context, data)");
            ctx.commands[key] = f;
        }
    }
    var subctx = WebDisplay.makeContext(data.props.id, ctx.data,
                             ctx.sendCallback, fragment, commands || {});

    appendChildren(subctx, fragment, data.children);

    return fragment;
}

var style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = '.wd-context { display:inherit; margin:inherit }'
document.getElementsByTagName('head')[0].appendChild(style)

WebDisplay.NodeTypes = {
    DOM: {
        namespaces: {"svg": ""},
        create: createDOM
    },
    Context: {
        create: createContext
    }
}

WebDisplay.CommandSets = {
    Basics: {
        eval: function (context, data) {
            eval(data)
        }
    }
};

})();
