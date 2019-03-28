// Important note: this file is transpiled into an AMD-style module. These first
// few imports are declared as external in webpack.config.js and thus are not
// folded into the generated bundle, but rather, are resolved at runtime (via
// requirejs). If you need any other Jupyter components, make sure to add them
// to externals in webpack.config.js.
import * as Jupyter from "base/js/namespace";
import {OutputArea} from "notebook/js/outputarea";
import $ from "jquery";

// This is included inside the bundle.
import WebIO from "@webio/webio";
import createLogger from "debug";
const debug = createLogger("WebIO:jupyter-notebook");

const INITIALIZATION_DEBOUNCE = 200;
const WEBIO_NODE_MIME = "application/vnd.webio.node+json";

/**
 * The key used to access metadata associated with the notebook.
 */
const WEBIO_METADATA_KEY = "@webio";

/**
 * The current WebIO instance.
 */
export let webIO = null;

/**
 * Get WebIO metadata embedded within the notebook.
 * This contains information about the last kernel that was used with WebIO
 * and the id of the comm that was used (or null).
 *
 * @returns {{lastKernelId: string | null, lastCommId: string | null}}
 */
const getWebIOMetadata = () => {
  const {lastKernelId = null, lastCommId = null} = (Jupyter.notebook.metadata[WEBIO_METADATA_KEY] || {});
  return {lastKernelId, lastCommId};
};

/**
 * Clear cell/output metadata associated with WebIO.
 *
 * This is useful if the kernel is changing so that we won't try to render
 * WebIO nodes using the wrong kernel. It's not quite enough to just compare
 * against the kernel's id because the kernel maintains its id across restarts
 * (so we have to set all the stored kernel id's to null).
 *
 * @param cell
 */
const clearWebIOCellMetadata = (cell) => {
  cell.output_area && cell.output_area.outputs.forEach((output) => {
    if (output && output.metadata && WEBIO_NODE_MIME in output.metadata) {
      output.metadata[WEBIO_NODE_MIME].kernelId = null;
    }
  });
};

/**
 *
 * @param data - The data to set.
 * @param {string | null} data.lastKernelId - The id of the current kernel.
 * @param {string | null} data.lastCommId - The id of the current comm.
 */
const setWebIOMetadata = (data = {lastKernelId: null, lastCommId: null}) => {
  debug("Setting WebIO notebook metadata.", data);
  Jupyter.notebook.metadata[WEBIO_METADATA_KEY] = data;
  if (data.lastKernelId === null) {
    debug("Clearing all WebIO cell/output metadata.");
    Jupyter.notebook.get_cells().forEach(clearWebIOCellMetadata);
  }
  Jupyter.notebook.set_dirty(true);
};

/**
 * Initialize the WebIO instance for the current kernel.
 * @param force - If `true`, force a new WebIO instance to be created. If false,
 *    this function checks if the current WebIO instance (if it exists) is
 *    associated with the current kernel and will be a no-op if that is the
 *    case. This is necessary because the `kernel_ready.Kernel` Jupyter event is
 *    sometimes triggered more than once.
 */
export const initializeWebIO = (force = false) => {
  const {lastKernelId, lastCommId} = getWebIOMetadata();
  if (!force && webIO && Jupyter.notebook.kernel.id === lastKernelId) {
    debug("Refusing to re-initialize WebIO when the kernel hasn't changed.");
    return;
  }

  // debug(`Conditions: force is ${force}, webIO is ${webIO}, notebook kernel id is ${Jupyter.notebook.kernel.id}, remembered kernelId is ${kernelId}.`);
  // debug(!force, !webIO, Jupyter.notebook.kernel.id, kernelId, Jupyter.notebook.kernel.id === kernelId);

  // If we're using the same kernel as before, we want to use the same comm id.
  // Otherwise, IJulia will try to send on multiple comms that no longer exist
  // (e.g. a new comm will be created for every refresh, so after three
  // refreshes, there are four comms, three of which no longer exist, and so
  // the console is littered with error messages along the lines of
  // "Comm promise not found for comm id ..."
  debug(`The last kernel id was ${lastKernelId} and the last comm id was ${lastCommId}. The current kernel id is ${Jupyter.notebook.kernel.id}.`);
  const shouldReuseCommId = (
    // To re-use the comm id, we need to be using the same kernel.
    lastKernelId === Jupyter.notebook.kernel.id
    // We need to know what the last comm id *was*
    && !!lastCommId
    // There can't already be a comm of that id
    && !(lastCommId in Jupyter.notebook.kernel.comm_manager.comms)
  );
  debug(`We decided that we ${shouldReuseCommId ? "should" : "shouldn't"} re-use the comm id.`);
  const newCommId = shouldReuseCommId ? lastCommId : undefined;
  debug("newCommId is:", newCommId);

  debug(`Creating new WebIO instance (kernel id: ${Jupyter.notebook.kernel.id}).`);
  webIO = new WebIO();
  console.warn("Setting new WebIO window global.");
  window.WebIO = webIO;

  const commManager = Jupyter.notebook.kernel.comm_manager;
  commManager.unregister_target("webio_comm");
  commManager.register_target("webio_comm", () => {});
  const comm = commManager.new_comm(
    "webio_comm", // target_name
    {}, // data
    undefined, // callbacks
    undefined, // metadata
    newCommId, // comm_id
    undefined, // buffers
  );

  debug(`comm's actual id is ${comm.comm_id}, we told it ${newCommId}.`);

  comm.on_msg((msg) => webIO.dispatch(msg.content.data));
  webIO.setSendCallback((msg) => comm.send(msg));

  // Set metadata so that if the notebook is refreshed, we can re-use the same
  // comm.
  setWebIOMetadata({
    lastCommId: comm.comm_id,
    lastKernelId: Jupyter.notebook.kernel.id,
  });
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

  if (webIO === null) {
    debug("Initializing WebIO");
    initializeWebIO();
  }

  // Set metadata attributes if not already set.
  metadata[WEBIO_NODE_MIME] = metadata[WEBIO_NODE_MIME] || {};
  metadata[WEBIO_NODE_MIME].kernelId = (
    metadata[WEBIO_NODE_MIME].kernelId !== undefined
    ? metadata[WEBIO_NODE_MIME].kernelId
    : Jupyter.notebook.kernel.id
  );

  // Check if the widget was rendered against a different kernel.
  // This avoids all the annoying messages about the client having an unknown
  // scope, but has the drawback that nothing is rendered if the kernel that
  // rendered this widget is gone.
  if (metadata[WEBIO_NODE_MIME].kernelId !== Jupyter.notebook.kernel.id) {
    const toInsert = this.create_output_subarea(metadata, "", WEBIO_NODE_MIME);
    toInsert.append($(
      "<div><p><strong>"
      + "This WebIO widget was rendered for a Jupyter kernel that is no longer running. "
      + "Re-run this cell to regenerate this widget."
      + "</strong></p></div>"
    ));
    element.append(toInsert);
    return;
  }

  // Otherwise, the widget belongs to the current kernel and we're okay.
  const toInsert = this.create_output_subarea(
    metadata,
    "output_webio rendered_html",
    WEBIO_NODE_MIME,
  );
  element.append(toInsert);
  Jupyter.notebook.keyboard_manager.register_events(toInsert);
  webIO.mount(toInsert.get(0), data);
  return toInsert;
};

/**
 * Return true if a cell has a WebIO output.
 * @param cell - The Jupyter cell to check.
 */
const cellHasWebIOOutput = (cell) => {
  // Check for output_area first to check if it's a code cell.
  return cell.output_area && cell.output_area.outputs.some((output) => (
    output.data && WEBIO_NODE_MIME in output.data
  ));
};

/**
 * Asynchronously re-rerender all cells that contain WebIO outputs.
 *
 * This method is required because, unfortunately, there's no way to hook up our
 * WebIO MIME renderer before the notebook is loaded.
 */
export const rerenderWebIOCells = () => {
  debug("Rerendering all WebIO cells.");
  if (!Jupyter.notebook._fully_loaded) {
    debu("When rerendering WebIO cells, the notebook wasn't loaded; will try again in 250ms.");
    setTimeout(rerenderWebIOCells, 250);
    return;
  }
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
  rerenderWebIOCells();

  // Mark the kernelId as null so that when we restart, we're forced to
  // re-create the WebIO instance.
  Jupyter.notebook.events.on(
    "kernel_killed.Session kernel_restarting.Kernel",
    () => {
      setWebIOMetadata();
      webIO = null;
    },
  );
};

setTimeout(function() {
  console.log("setTimeout executed", 0);
});