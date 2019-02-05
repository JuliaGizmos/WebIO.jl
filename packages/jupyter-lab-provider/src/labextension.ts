import debug from "debug";
import {Panel} from "@phosphor/widgets";
import {JupyterLabPlugin} from "@jupyterlab/application";
import {DisposableDelegate, IDisposable} from "@phosphor/disposable";
import {DocumentRegistry} from "@jupyterlab/docregistry";
import {INotebookModel, NotebookPanel} from "@jupyterlab/notebook";
import {IRenderMime} from "@jupyterlab/rendermime";
import {Kernel} from "@jupyterlab/services";

import WebIO from "@webio/webio";

const log = debug("WebIO:jupyter-lab");
const MIME_TYPE = "application/vnd.webio.node+json";
const COMM_TARGET = "webio_comm";
const WEBIO_METADATA_KEY = "@webio";

/**
 * In order to know when (and how) to resume connections (after a refresh, for
 * example), we store information about the last-used kernel and the last-used
 * comm. This data is stored in the notebook's metadata.
 */
interface WebIONotebookMetadata {
  lastKernelId?: string;
  lastCommId?: string;
}

/*
 * The rank of a renderer determines the order in which renderers are invoked.
 * A lower rank means that the Renderer has a higher priority.
 *
 * It shouldn't actually mean anything since there shouldn't(?) be any other
 * renderers that try to render the WebIO MIME type.
 */
const RENDERER_RANK = 0;

log("@webio/jupyter-lab-provider");

/**
 * A Jupyter renderer class that mounts a WebIO node.
 *
 * The JupyterLab machinery creates an instance of this class every time WebIO
 * data is displayed in the notebook. It is passed a {@link WebIO} instance by
 * the renderer-factory which is set up in
 * {@link WebIONotebookExtension#createNew}. The {@link WebIO} instance is also
 * managed by a {@link WebIONotebookManager} but that is handles outside of this
 * class (_i.e._ this class just gets a WebIO instance which may or may not be
 * connected to the Julia kernel yet).
 */
class WebIORenderer extends Panel implements IRenderMime.IRenderer, IDisposable {

  private lastModel?: IRenderMime.IMimeModel;

  constructor(private options: IRenderMime.IRendererOptions, private webIO: WebIO) {
    super();
    log(`WebIORenderer¬constructor`, options, webIO);
  }

  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    console.warn("Setting window.lastWebIORenderer");
    (window as any).lastWebIORenderer = this;
    this.lastModel = model;
    log(`WebIORenderer¬renderModel`, model.data[MIME_TYPE]);
    this.webIO.mount(this.node, model.data[MIME_TYPE] as any);
    return Promise.resolve();
  }
}

/**
 * A manager that is responsible for maintaining the WebIO instance for a single
 * notebook panel.
 *
 * An instance of this class exists for every notebook open in the JupyterLab
 * session (i.e. for every notebook tab).
 *
 * This class is necessary to facilitate lazy-initialization. We could just
 * create a new {@link WebIO} instance in {@link WebIONotebookExtension#createNew}
 * but we won't be sure that WebIO has been loaded on the kernel side yet (i.e.
 * we try to open the comm before `using WebIO` has been executed); even if
 * WebIO is initialized on the kernel later, the comm will never connect.
 */
class WebIONotebookManager {

  readonly webIO = new WebIO();
  private comm?: Kernel.IComm;

  constructor(
    private notebook: NotebookPanel,
    private context: DocumentRegistry.IContext<INotebookModel>
  ) {
    (window as any).webIONotebookManager = this;
    log(`WebIONotebookManager¬constructor`);
  }

  /**
   * Connect to the Julia side of WebIO using a comm.
   *
   * This function is idempotent (_i.e._ calling it multiple times shouldn't
   * result on an error and it should only connect on the first call).
   */
  async connect() {
    log("WebIONotebookManager¬connect");

    // Make sure the kernel is ready before we try to connect to it.
    await this.context.session.ready;
    log("WebIONotebookManager¬connect: Notebook session is ready.");

    // It's important that everything below this is synchronous to avoid race
    // conditions.
    if (this.comm) {
      log("WebIONotebookManager¬connect: WebIO is already connected.")
      return;
    }

    const {kernel} = this.context.session;
    if (!kernel) {
      // Shouldn't happen, but TypeScript complains if we don't do this check.
      throw new Error(`Kernel is not available!`);
    }

    const {lastKernelId, lastCommId} = this.getWebIOMetadata();
    const shouldReuseCommId = (
      // To re-use the comm id, we need to be using the same kernel.
      lastKernelId === kernel.id
      // We need to know what the last comm id *was*
      && !!lastCommId
    );
    log(`WebIONotebookManager¬connect: Last WebIO connection was for kernelId="${lastKernelId}", commId="${lastCommId}".`);
    log(`WebIONotebookManager¬connect: We're ${shouldReuseCommId ? "definitely" : "not"} re-using the old commId.`);

    this.comm = kernel.connectToComm(COMM_TARGET, shouldReuseCommId ? lastCommId : undefined);
    this.comm.open();
    this.webIO.setSendCallback((msg) => this.comm!.send(msg as any));
    this.comm.onMsg = (msg: any) => {
      log("Received WebIO comm message:", msg);
      this.webIO.dispatch(msg.content.data);
    };

    this.setWebIOMetadata(kernel.id, this.comm.commId);
  }

  private getWebIOMetadata(): WebIONotebookMetadata {
    return (this.notebook.model.metadata.get(WEBIO_METADATA_KEY) || {}) as any;
  }

  private setWebIOMetadata(kernelId: string, commId: string) {
    const metadata: WebIONotebookMetadata = {
      lastKernelId: kernelId,
      lastCommId: commId,
    };
    log("Setting WebIO notebook metadata.", metadata);
    this.notebook.model.metadata.set(WEBIO_METADATA_KEY, metadata as any);
  }
}

/**
 * The JupyterLab WebIO notebook extension.
 *
 * Essentially, every time a new {@link NotebookPanel} instance is created
 * (_i.e._ when a new notebook tab is opened), JupyterLab will call the
 * {@link WebIONotebookExtension#createNew} method which creates a new
 * {@link WebIO} instance (specific to the new notebook) and hooks up the
 * {@link WebIORenderer} using this notebook-specific instance of {@link WebIO}.
 */
class WebIONotebookExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {

  createNew(notebook: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    log(`WebIONotebookExtension¬createNew`, notebook, context);
    const webIONotebookManager = new WebIONotebookManager(notebook, context);

    notebook.rendermime.addFactory({
      safe: false,
      mimeTypes: [MIME_TYPE],
      createRenderer: (options) => {
        webIONotebookManager.connect();
        return new WebIORenderer(options, webIONotebookManager.webIO);
      },
    }, RENDERER_RANK);

    return new DisposableDelegate(() => {
      notebook.rendermime.removeMimeType(MIME_TYPE);
    });
  }
}

const extension: JupyterLabPlugin<void>= {
  id: "@webio/jupyter-lab-provider:plugin",
  activate: (app) => {
    log(`Activating WebIO JupyterLab plugin.`);
    app.docRegistry.addWidgetExtension("Notebook", new WebIONotebookExtension());
  },
  autoStart: true,
};

export default extension;
