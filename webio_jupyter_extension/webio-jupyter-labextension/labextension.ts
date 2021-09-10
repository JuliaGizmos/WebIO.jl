import debug from "debug";
import { Panel } from "@lumino/widgets";
import { DisposableDelegate, IDisposable } from "@lumino/disposable";

import type { JupyterFrontEndPlugin } from "@jupyterlab/application";
import type { DocumentRegistry } from "@jupyterlab/docregistry";
import type { INotebookModel, NotebookPanel } from "@jupyterlab/notebook";
import type { IRenderMime } from "@jupyterlab/rendermime";
import type { Kernel } from "@jupyterlab/services";

import WebIO from "@webio/webio";

const log = debug("WebIO:jupyter-lab");
const MIME_TYPE = "application/vnd.webio.node+json";
const COMM_TARGET = "webio_comm";
const WEBIO_METADATA_KEY = "@webio";

const WEBIO_OLD_KERNEL_MESSAGE =
  "This WebIO widget was rendered for a Jupyter kernel that is no longer running. " +
  "Re-run this cell to regenerate this widget.";

/**
 * In order to know when (and how) to resume connections (after a refresh, for
 * example), we store information about the last-used kernel and the last-used
 * comm. This data is stored in the notebook's metadata.
 */
interface WebIONotebookMetadata {
  lastKernelId?: string;
  lastCommId?: string;
}

interface WebIOOutputMetadata {
  kernelId?: string;
}

/*
 * The rank of a renderer determines the order in which renderers are invoked.
 * A lower rank means that the Renderer has a higher priority.
 *
 * It shouldn't actually mean anything since there shouldn't(?) be any other
 * renderers that try to render the WebIO MIME type.
 */
const RENDERER_RANK = 0;

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
class WebIORenderer
  extends Panel
  implements IRenderMime.IRenderer, IDisposable
{
  private get webIO() {
    return this.webIOManager.webIO;
  }

  constructor(
    options: IRenderMime.IRendererOptions,
    private webIOManager: WebIONotebookManager,
  ) {
    super();
    log("WebIORenderer¬constructor", options, webIOManager);
  }

  async renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    // const metadata = model.metadata as WebIOOutputMetadata;
    // if (!metadata.kernelId) {
    //   // Do nothing; we set the model metadata which triggers a re-render.
    //   return this.setModelMetadata(model);
    // }
    log("WebIORenderer¬renderModel");
    const { kernelId } = this.getModelMetadata(model);
    if (!kernelId) {
      return this.setModelMetadata(model);
    }
    const currentKernelId = (await this.webIOManager.getKernel()).id;
    if (kernelId !== currentKernelId) {
      log(
        `WebIORenderer¬renderModel: output was generated for kernelId "${kernelId}", ` +
          `but we're currently running using kernel "${currentKernelId}".`,
      );
      const div = document.createElement("div");
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      strong.innerText = WEBIO_OLD_KERNEL_MESSAGE;
      p.appendChild(strong);
      div.appendChild(p);
      this.node.appendChild(div);
      return;
    }
    (window as any).lastWebIORenderer = this;
    log("WebIORenderer¬renderModel", model.data[MIME_TYPE]);
    const data = model.data[MIME_TYPE];
    if (!data) {
      console.error("WebIORenderer created for unsupported model:", model);
      return;
    }
    this.webIO.mount(this.node, model.data[MIME_TYPE] as any);
    return;
  }

  private getModelMetadata(model: IRenderMime.IMimeModel) {
    return (model.metadata[WEBIO_METADATA_KEY] || {}) as WebIOOutputMetadata;
  }

  private async setModelMetadata(model: IRenderMime.IMimeModel) {
    model.setData({
      metadata: {
        ...model.metadata,
        [WEBIO_METADATA_KEY]: {
          kernelId: (await this.webIOManager.getKernel()).id,
        } as WebIOOutputMetadata,
      } as any,
    });
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
  private readonly _webIO = new WebIO();
  private comm?: Kernel.IComm;

  /**
   * We lazy-connect WebIO. This ensures that we don't try to connect to WebIO
   * before the kernel is ready.
   *
   * IMPORTANT: This also depends upon how the WebIORenderer won't try to render
   * WebIO nodes that were created for a different kernel; because we know that
   * the node was generated using the current kernel, we're sure that it's ready
   * for comm connections (since it's already been answering code execution
   * requests).
   */
  get webIO() {
    this.connect();
    return this._webIO;
  }

  constructor(
    private notebook: NotebookPanel,
    private context: DocumentRegistry.IContext<INotebookModel>,
  ) {
    (window as any).webIONotebookManager = this;
    log("WebIONotebookManager¬constructor");
  }

  async getKernel() {
    log("WebIONotebookManager¬getKernel");
    await this.context.sessionContext.ready;
    const session = this.context.sessionContext.session;
    if (!session) {
      throw new Error("Kernel is not available!");
    }
    const kernel = session.kernel;
    if (!kernel) {
      throw new Error("Session is ready but kernel isn't available!");
    }
    log(
      `WebIONotebookManager¬connect: Notebook kernel is ready; status is ${kernel.status}.`,
    );
    return kernel;
  }

  /**
   * Connect to the Julia side of WebIO using a comm.
   *
   * This function is idempotent (_i.e._ calling it multiple times shouldn't
   * result on an error and it should only connect on the first call).
   */
  async connect() {
    log("WebIONotebookManager¬connect");

    const kernel = await this.getKernel();
    // It's important that everything below this is synchronous to avoid race
    // conditions.
    if (this.comm) {
      log("WebIONotebookManager¬connect: WebIO is already connected.");
      return;
    }

    const { lastKernelId, lastCommId } = this.getWebIOMetadata();
    const shouldReuseCommId =
      // To re-use the comm id, we need to be using the same kernel.
      lastKernelId === kernel.id &&
      // We need to know what the last comm id *was*
      !!lastCommId;
    log(
      `WebIONotebookManager¬connect: Last WebIO connection was for kernelId="${lastKernelId}", commId="${lastCommId}".`,
    );
    log(
      `WebIONotebookManager¬connect: We're ${
        shouldReuseCommId ? "definitely" : "not"
      } re-using the old commId.`,
    );

    this.comm = kernel.createComm(
      COMM_TARGET,
      shouldReuseCommId ? lastCommId : undefined,
    );
    this.comm.open();
    this._webIO.setSendCallback((msg: any) => this.comm!.send(msg));
    this.comm.onMsg = (msg: any) => {
      log("Received WebIO comm message:", msg);
      this._webIO.dispatch(msg.content.data);
    };

    this.setWebIOMetadata(kernel.id, this.comm.commId);
  }

  private getWebIOMetadata(): WebIONotebookMetadata {
    if (!this.notebook.model) {
      throw new Error("Notebook model is not available!");
    }
    return (this.notebook.model.metadata.get(WEBIO_METADATA_KEY) || {}) as any;
  }

  private setWebIOMetadata(kernelId: string, commId: string) {
    const metadata: WebIONotebookMetadata = {
      lastKernelId: kernelId,
      lastCommId: commId,
    };
    log("Setting WebIO notebook metadata.", metadata);
    if (!this.notebook.model) {
      throw new Error("Notebook model is not available!");
    }
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
class WebIONotebookExtension
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
{
  createNew(
    notebook: NotebookPanel,
    context: DocumentRegistry.IContext<INotebookModel>,
  ): IDisposable {
    log("WebIONotebookExtension¬createNew", notebook, context);
    const webIONotebookManager = new WebIONotebookManager(notebook, context);

    log(`Registering rendermime factory for MIME: ${MIME_TYPE}.`);
    const { rendermime } = notebook.content;
    rendermime.addFactory(
      {
        safe: true,
        mimeTypes: [MIME_TYPE],
        createRenderer: (options) => {
          log("Creating WebIO renderer...");
          webIONotebookManager.connect();
          return new WebIORenderer(options, webIONotebookManager);
        },
      },
      RENDERER_RANK,
    );

    return new DisposableDelegate(() => {
      log("Unregistering WebIO MIME renderer...");
      rendermime.removeMimeType(MIME_TYPE);
    });
  }
}

const extension: JupyterFrontEndPlugin<void> = {
  id: "@webio/jupyter-lab-provider:plugin",
  activate: (app) => {
    log("Activating WebIO JupyterLab plugin.");
    app.docRegistry.addWidgetExtension(
      "Notebook",
      new WebIONotebookExtension(),
    );
  },
  autoStart: true,
};

export default extension;
