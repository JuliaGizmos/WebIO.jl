(function () {

    var contexts = {};

    function makeContext(id, data, sendCallback, dom, commands)
    {
        var ctx = {
            type: "context",
            id: id,
            data: data,
            sendCallback: sendCallback,
            dom: dom,
            commands: commands || {}
        }

        contexts[id] = ctx;

        return ctx;
    }


    function createNode(context, data, parentNode)
    {
        var nodeType = data.nodeType;
        return WebDisplay.NodeTypes[nodeType]
               .create(context, data, parentNode)
    }

    function getHandler(ctx, cmd)
    {
        debugger;
        var f = ctx.commands[cmd];
        if (typeof f !== "undefined") {
            return f;
        }
        var parts = cmd.split('.');
        var inherit = WebDisplay.CommandSets;
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

    function mount(targetQuery, data)
    {
        // every root element gets a context by default
        var context = makeContext(targetQuery, data, WebDisplay.sendCallback)
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

    function message(ctx, cmd, data)
    {
        return {
            type: "message",
            context: ctx.id,
            command: cmd,
            data: data
        }
    }


    function sendNotSetUp()
    {
        console.error("WebDisplay.sendCallback not set up")
    }

    window.WebDisplay = {
        type: "WebDisplay",

        // For Base.show or a package to create an element.
        mount: mount,

        // Create Context - for use by NodeTypes
        makeContext: makeContext,

        // createNode
        createNode: createNode,

        // For Providers to call when commands are received from Julia
        dispatch: dispatch,

        // Send a message back to the Context on Julia
        send: send,

        // given by Provider, to be called when JS needs to send a command to Julia
        sendCallback: sendNotSetUp
    };
})();

// TODO: have many instances of WebDisplay
// problem: send_callback needs to be used for construction
// where do components "register_handler"?
