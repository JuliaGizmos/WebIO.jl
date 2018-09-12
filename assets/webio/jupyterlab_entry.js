define(['./index.js', '@jupyterlab/notebook'], function(WebIO, Notebook){

    function activateWebIO(app, notebooks) {
        notebooks.widgetAdded.connect(function (sender, panel) {
           panel.context.session
                .kernelChanged.connect(function (sender, change) {
                    if (change.hasOwnProperty('newValue')) {
                        newKernel(change.newValue)
                    } else {
                        newKernel(change) // compatibility before JupyterLab 0.34
                    }
            });

            if (panel.context.session.kernel) {
              newKernel(context.session.kernel);
            }
        });

        function newKernel(kernel) {
            var comm = kernel.connectToComm("webio_comm")
            comm.open()
            WebIO.sendCallback = function (msg) {
                comm.send(msg)
            }

            comm.onMsg = function (msg) {
                WebIO.dispatch(msg.content.data);
            }

            comm.onClose = function (msg) {
              console.log(msg);  // 'bye'
            }

            WebIO.triggerConnected()
        }

    }

    return {
        id: "jupyter.extensions.julia-web-io",
        activate: activateWebIO,
        autoStart: true,
        requires: [Notebook.INotebookTracker],
        load_ipython_extension: activateWebIO,
        load_jupyter_extension: activateWebIO
    }
 });
