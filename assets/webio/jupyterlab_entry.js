define(['./index.js', '@jupyterlab/notebook'], function(WebIO, Notebook){

    function activateWebIO(app, notebooks) {
        notebooks.widgetAdded.connect(function (sender, panel) {
           panel.context.session
                .kernelChanged.connect(function (sender, kernel) {
              newKernel(kernel);
            });

            if (panel.context.session.kernel) {
              newKernel(context.session.kernel);
            }
        });

        function newKernel(kernel) {
            kernel.registerCommTarget('webio_comm', function (comm, commMsg) {
                if (commMsg.content.target_name !== 'webio_comm') {
                   return;
                }

                WebIO.triggerConnected()

                WebIO.sendCallback = function (msg) {
                    comm.send(msg)
                }

                comm.onMsg = function (msg) {
                    WebIO.dispatch(msg.content.data);
                }

                comm.onClose = function (msg) {
                  console.log(msg);  // 'bye'
                }
            })
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
