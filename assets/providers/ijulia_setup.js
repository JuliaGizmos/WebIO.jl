(function (IPython, $, WebIO) {

    function initComm(notebook)
    {
        var commManager = notebook.kernel.comm_manager;

        // Register a "target" so that Julia can create a Comm
        // to communicate.
        commManager.register_target("webio_comm",
            function (comm) {
                WebIO.triggerConnected();
                WebIO.sendCallback = function (msg) { comm.send(msg); }
                comm.on_msg(function (msg) {
                    WebIO.dispatch(msg.content.data);
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

})(IPython, jQuery, WebIO);
