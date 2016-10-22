(function (IPython, $, WebDisplay) {

    function initComm(notebook)
    {
        var commManager = notebook.kernel.comm_manager;

        // Register a "target" so that Julia can create a Comm
        // to communicate.
        commManager.register_target("web_display_ijulia",
            function (comm) {
                var wd = WebDisplay();
                WebDisplay.sendCallback = function (cmd, ctxid, data) {
                    comm.send({
                        "command": cmd,
                        "context_id": ctxid,
                        "data": data
                    });
                }

                comm.on_msg(function (msg) {
                    console.log("message received", msg);
                    WebDisplay.dispatch(
                        msg["command"],
                        msg["context_id"],
                        msg["data"]
                    );
                });
            }
        );
    }

    $(document).ready(function() {

        try {
            // try to initialize right away - note: $.ready is async.
            initComm(IPython.notebook);
        } catch (e) {
            // wait on the status_started event.
            $([IPython.events]).on(
                'kernel_created.Kernel kernel_created.Session',
                 function(event, notebook) { initComm(notebook); }
            );
        }
    });

})(IPython, jQuery, WebDisplay);
