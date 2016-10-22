(function () {


    var contexts = {};

    function makeContext(id, data, sendCallback, dom)
    {
        var ctx = {
            type: "context",
            id: id,
            data: data,
            sendCallback: sendCallback,
            dom: dom
        }

        contexts[id] = ctx;

        return ctx;
    }


    var nodeTypes = {};

    function createNode(context, data, parentNode)
    {
        console.log(data)
        var nodeType = data.class[0];
        return WebDisplay.NodeTypes[nodeType].create(
                context, data, parentNode)
    }


    var handlers = {};

    function handle(cmd, ctxid, data)
    {

        if (typeof contexts[ctxid] === "undefined") {
            console.error(
                cmd + " command received before " +
                "create for context id: " + ctxid
            );
        } else {
            handlers[cmd](contexts[ctxid], data);
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

        debugger;

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

    function registerHandler(cmd, f)
    {
        handlers[cmd] = f;
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
        handle: handle,

        // Send a message back to the Context on Julia
        send: send,

        // For packages to use to register JS commands
        registerHandler: registerHandler,

        // given by Provider, to be called when JS needs to send a command to Julia
        sendCallback: sendNotSetUp
    };
})();

// TODO: have many instances of WebDisplay
// problem: send_callback needs to be used for construction
// where do components "register_handler"?
