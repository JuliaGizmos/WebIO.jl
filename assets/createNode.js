(function () {

var STYLE_KEY = 'style';
var EVENT_KEY = 'events';
var ATTR_KEY = 'attributes';
var ATTR_NS_KEY = 'attributes_ns';

function applyProps(domNode, eventNode, props)
{
	for (var key in props)
	{
		var value = props[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
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

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.webdisplay_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.opts = value;
		}
	}

	domNode.webdisplay_handlers = allHandlers;
}

function makeEventHandler(eventNode, value)
{
    var opts = value.opts
    var code = resolveCode(value);
    function eventHandler(event) {
        if (opts.stopPropagation) {
            event.stopPropagation();
        }
        if (opts.preventDefault) {
            event.preventDefault();
        }
        code(event);
    }
    eventHandler.opts = opts;
    return eventHandler;
}

function resolveCode(value) {
    switch (value.type) {
        case 'ref':
            var path = value.data.split(".")
            var val = window[path[0]]
            for (var i=1,l=path.length; i<l;i++) {
                val = val[path[i]]
            }
            return val;
        case 'code':
            return eval(value.data)
        default:
            console.error("Could not resolve code: ", value);
    }
}

function createDOM(data) {

    var cls = data.class;
    var node;

    if (cls.length == 2) {
        node = document.createElement(cls[1])
    } else if (cls.length == 3) {
        node = document.createElementNS(cls[1], cls[2])
    } else {
        throw("Wrong number of arguments");
    }

    applyProps(node,undefined, data.props);
    // Call event handler for node initialization without children

    debugger;
    var children = data.children;
    if (children) {
        for (var nChildren=children.length, i=0; i<nChildren;i++) {
            if (typeof children[i] === "string") {
                node.appendChild(document.createTextNode(children[i]));
            } else {
                node.appendChild(createNode(children[i]));
            }
        }
    }

    // Call event handler for node initialization with children
    return node;
}

var node_types = {};

node_types.vDOM = {
    namespaces: {"svg": ""},
    create: createDOM
}


function createNode(data) {
    console.log(data)
    var nodeType = data.class[0];
    return node_types[nodeType].create(data)
}


window.createNode = createNode;

})();

/**
 * create -> different types of nodes
 *
 **/
