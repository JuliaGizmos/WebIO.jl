(function (IPython, $, WebIO) {

    function initComm(notebook)
    {
        var commManager = notebook.kernel.comm_manager;

        // Register a "target" so that Julia can create a Comm
        // to communicate.
        commManager.register_target("webio_comm", function (comm) { })

        // Create a comm -- this will be receprocated by Julia, and will trigger the
        // method IJulia.CommManager.register_comm(Comm{:webio_comm}, x) which will
        // set up forwarding of messages
        var comm = commManager.new_comm("webio_comm", {})

        // Set how WebIO communicates with Julia
        WebIO.sendCallback = function (msg) { comm.send(msg) }

        // dispatch messages from Julia to WebIO
        comm.on_msg(function (msg) {
            WebIO.dispatch(msg.content.data)
        });

        // Get existing Scopes ready
        WebIO.triggerConnected()
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
