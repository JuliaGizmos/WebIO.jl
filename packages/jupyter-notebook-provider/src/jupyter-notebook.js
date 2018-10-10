// Important note: this file is transpiled into an AMD-style module. These first
// few imports are declared as external in webpack.config.js and thus are not
// folded into the generated bundle, but rather, are resolved at runtime (via
// requirejs). If you need any other Jupyter components, make sure to add them
// to externals in webpack.config.js.
import * as Jupyter from "base/js/namespace";
import {OutputArea} from "notebook/js/outputarea";

// This is included inside the bundle.
import WebIO from "@webio/webio";
import createLogger from "debug";
const debug = createLogger("WebIO:jupyter-notebook");

const INITIALIZATION_DEBOUNCE = 200;
const WEBIO_NODE_MIME = "application/vnd.webio.node+json";

/**
 * The current WebIO instance.
 */
let webIO = null;

/**
 * Keep track of the id of the kernel to which WebIO is currently associated.
 */
let kernelId = null;

/**
 * Return a promise that resolves when the notebook is ready.
 * @returns {*}
 */
const _notebookReadyPromiseBody = () => {
  if (Jupyter.notebook && Jupyter.notebook.kernel && Jupyter.notebook._fully_loaded) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    setTimeout(200, () => {
      if (Jupyter.notebook && Jupyter.notebook.kernel && Jupyter.notebook._fully_loaded) {
        return Promise.resolve();
      }
      return _notebookReadyPromiseBody();
    });
  });
};
const notebookReadyPromise = _notebookReadyPromiseBody();

/**
 * Initialize the WebIO instance for the current kernel.
 * @param force - If `true`, force a new WebIO instance to be created. If false,
 *    this function checks if the current WebIO instance (if it exists) is
 *    associated with the current kernel and will be a no-op if that is the
 *    case. This is necessary because the `kernel_ready.Kernel` Jupyter event is
 *    sometimes triggered more than once.
 */
const initializeWebIO = (force = false) => {
  if (!force && !webIO && Jupyter.notebook.kernel.id === kernelId) {
    debug("Refusing to re-initialize WebIO when the kernel hasn't changed.");
    return;
  }
  debug(`Creating new WebIO instance (kernel id: ${Jupyter.notebook.kernel.id}).`);
  kernelId = Jupyter.notebook.kernel.id;
  const commManager = Jupyter.notebook.kernel.comm_manager;
  commManager.register_target("webio_comm", () => {});
  const comm = commManager.new_comm("webio_comm", {});
  webIO = new WebIO();
  console.warn("Setting new WebIO window global.");
  window.WebIO = webIO;

  comm.on_msg((msg) => webIO.dispatch(msg.content.data));
  webIO.setSendCallback((msg) => comm.send(msg));

  rerenderWebIOCells();
};

/**
 * Append WebIO node data to a Jupyter notebook cell.
 *
 * This method is called where `this` refers to an `OutputArea` instance.
 *
 * @param data
 * @param metadata
 * @param element
 */
const appendWebIONode = function (data, metadata, element) {
  debug("Rendering WebIO MIME type (called by Jupyter).", data);
  const toInsert = this.create_output_subarea(
    metadata,
    "output_webio rendered_html",
    WEBIO_NODE_MIME,
  );
  element.append(toInsert);
  webIO.mount(toInsert.get(0), data);
};

/**
 * Return true if a cell has a WebIO output.
 * @param cell - The Jupyter cell to check.
 */
const cellHasWebIOOutput = (cell) => {
  return cell.output_area.outputs.some((output) => (
    output.data && WEBIO_NODE_MIME in output.data
  ));
};

/**
 * Rerender all cells that contain WebIO outputs.
 *
 * This method is required because, unfortunately, there's no way to hook up our
 * WebIO MIME renderer before the notebook is loaded.
 */
const rerenderWebIOCells = async () => {
  debug("Rerendering all WebIO cells.");
  Jupyter.notebook.get_cells()
    .filter(cellHasWebIOOutput)
    .forEach((cell) => {
      debug("Rerendering cell:", cell);
      Jupyter.notebook.render_cell_output(cell);
    });
};

const initializeJupyterOutputType = () => {
  if (!OutputArea.output_types.includes(WEBIO_NODE_MIME)) {
    debug(`Registering WebIO node MIME type (${WEBIO_NODE_MIME}).`);
    OutputArea.prototype.register_mime_type(
      WEBIO_NODE_MIME,
      appendWebIONode,
      {
        // WebIO can create arbitrary HTML so don't render it if the notebook is
        // untrusted.
        safe: false,
        // Prefer the WebIO MIME over everything else.
        index: 0,
      }
    );
  }
  debug("OutputArea display order:", OutputArea.display_order);
};

export const load_ipython_extension = () => {
  if (!Jupyter || !Jupyter.notebook || !Jupyter.notebook.kernel) {
    return setTimeout(load_ipython_extension, INITIALIZATION_DEBOUNCE);
  }
  initializeJupyterOutputType();
  initializeWebIO();
  Jupyter.notebook.events.on("kernel_ready.Kernel", initializeWebIO);
};

setTimeout(function() {
  console.log("setTimeout executed", 0);
});