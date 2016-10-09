(function () {

    var handlers = {};
    var contexts = {};

    function handle(cmd, ctxid, data) {

        if (typeof contexts[ctxid] === "undefined") {
            if (cmd === "create") {
                contexts[ctxid] = create(ctxid, data);
            } else {
                console.error(
                    cmd + " command received before " +
                    "create for context id: " + ctxid
                );
            }
        } else {
            handlers[cmd](contexts[ctxid], data);
        }
    }

    function create(ctxid, data) {
        var dom = createNode(data);

        dom.addEventListener("send-back", function (ev) {
            console.log("Send to julia", ev);
            sendback(ev.command, ev.context.id, ev.data)
        })

        return {type: "context", id: ctxid, dom: dom, data: data};
    }

    function register_handler(cmd, f) {
        handlers[cmd] = f;
    }

    function send_not_set_up() {
        console.error("WebDisplay.send_callback not set up")
    }

    window.WebDisplay = {
        type: "WebDisplay",
        register_handler: register_handler,
        handle: handle,
        send_callback: send_not_set_up
    };
})();

// TODO: have many instances of WebDisplay
// problem: send_callback needs to be used for construction
// where do components "register_handler"?
