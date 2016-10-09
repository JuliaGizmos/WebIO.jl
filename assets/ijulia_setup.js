(function (IPython, $, WebDisplay) {

    $(document).ready(function() {
        function initComm(evt, data) {
            var comm_manager = data.kernel.comm_manager;

            comm_manager.register_target("web_display_ijulia",
                function (comm) {
                    WebDisplay.send_callback = function (cmd, ctxid, data) {
                        comm.send({
                            "command": cmd,
                            "context_id": ctxid,
                            "data": data
                        });
                    }

                    comm.on_msg(function (msg) {
                        console.log("message received", msg);
                        WebDisplay.handle(
                            msg["command"],
                            msg["context_id"],
                            msg["data"]
                        );
                    });
                }
            );
        }

        try {
            // try to initialize right away
            initComm(undefined, IPython.notebook);
        } catch (e) {
            // wait on the status_started event.
            $([IPython.events]).on(
                    'kernel_created.Kernel kernel_created.Session',
                     initComm
            );
        }
    });
})(IPython, jQuery, WebDisplay);
