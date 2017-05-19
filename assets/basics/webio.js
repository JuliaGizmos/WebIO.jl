var contexts = {};

function makeWidget(id, data, sendCallback, dom, commands)
{
    var ctx = {
        type: "context",
        id: id,
        data: data,
        sendCallback: sendCallback,
        dom: dom,
        commands: commands || {},
        promises: {}
    }

    contexts[id] = ctx;

    return ctx;
}


function createNode(context, data, parentNode)
{
    var nodeType = data.nodeType;
    return WebIO.NodeTypes[nodeType]
           .create(context, data, parentNode)
}

function getHandler(ctx, cmd)
{
    var f = ctx.commands[cmd];
    if (typeof f !== "undefined") {
        return f;
    }
    var parts = cmd.split('.');
    var inherit = WebIO.CommandSets;
    if (inherit && inherit[parts[0]]) {
        f = inherit[parts[0]][parts[1]]
        if (typeof f !== "undefined") {
            return f;
        }
    }
    return function (ctx, data) {
        console.warn("No handler found for " + cmd, " Conext: ", ctx)
    }
}


function dispatch(msg)
{
    if (msg.type != "command") {
        console.warn("invalid message received", msg)
    } else {
        var ctx = contexts[msg.context];
        var f = getHandler(ctx, msg.command);
        f(ctx, msg.data)
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
    var ctx = contexts[ob.context];
    WebIO.send(ctx, ob.command, val);
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
    if(WebIO._connected) {
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

var WebIO = {
    type: "WebIO",

    // For Base.show or a package to create an element.
    mount: mount,

    // Create Widget - for use by NodeTypes
    makeWidget: makeWidget,

    // createNode
    createNode: createNode,

    // For Providers to call when commands are received from Julia
    dispatch: dispatch,

    // Send a message back to the Widget on Julia
    send: send,

    // A variant of send which sets the value of an observable
    setval: setval,

    // given by Provider, to be called when JS needs to send a command to Julia
    sendCallback: sendNotSetUp,

    triggerConnected: triggerConnected,

    onConnected: onConnected
};

if (window) {
    window.WebIO = WebIO;
}
module.exports = WebIO

