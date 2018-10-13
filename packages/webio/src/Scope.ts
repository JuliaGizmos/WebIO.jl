import createLogger from "debug";
import System from "systemjs";
const debug = createLogger("WebIO:Scope");

import WebIONode, {WebIONodeSchema, WebIONodeContext} from "./Node";
import WebIOObservable, {ObservableData} from "./Observable";
import {getObservableName, ObservableSpecifier, OptionalKeys} from "./utils";
import {WebIOCommand, WebIOMessage} from "./message";
import {createWebIOEventListener} from "./events";
import WebIODomNode from "./DomNode";
import createNode from "./createNode";
import {BlockImport, importBlock} from "./imports";

/**
 * A map of observable names to arrays-of-listeners that should be
 * evoked when the observable changes.
 *
 * `preDependencies` is a special array-of-listeners which are evoked
 * when all the scope dependencies are loaded.
 */
export interface ScopeListeners {
  preDependencies?: Array<(scope: WebIOScope) => void>;
  [handlerName: string]: Array<((value: any, scope?: WebIOScope) => void)> | undefined;
}

export interface ScopePromises {
  importsLoaded: Promise<any[] | null>;
  connected: Promise<WebIOScope>;
}

export const SCOPE_NODE_TYPE = "Scope";

/**
 * Data associated with a scope node.
 */
export interface ScopeNodeData extends WebIONodeSchema {
  nodeType: typeof SCOPE_NODE_TYPE;

  instanceArgs: {
    /**
     * The id of the scope.
     */
    id: string;

    /**
     * Map from "observableName" => { data about observable }.
     *
     * @example
     * observables = {
     *   "obs-output": {
     *     id: "ob_02",
     *     value: 0.0,
     *     sync: true,
     *   }
     * }
     */
    observables?: {
      [observableName: string]: ObservableData;
    };

    /**
     * Map from "observableName" => ["array", "of", "handlers"] where each handler
     * is specified as a function definition string.
     *
     * @example
     * handlers = {
     *   "obs-output": [
     *     "function (newValue) { console.log('obs-output got ', newValue); }",
     *     "function (newValue) { alert('obs-output got ' + newValue); }"
     *   ]
     * }
     *
     */
    handlers?: {
      [observableName: string]: string[];
    };

    imports?: BlockImport;
  }
}

/**
 * Handlers that are associated with the scope promises.
 *
 * @todo This needs to be refactored.
 */
export interface PromiseHandlers {
  importsLoaded?: string; // (imports: any[] | null) => void;
  // TODO: other promise handlers?
}

class WebIOScope extends WebIONode {

  readonly id: string;
  readonly element: HTMLDivElement;
  children: Array<WebIONode | string> | null = null;
  handlers: ScopeListeners;
  observables: {[observableName: string]: WebIOObservable};
  promises: ScopePromises;

  constructor(
    scopeData: ScopeNodeData,
    options: WebIONodeContext,
  ) {
    super(scopeData, options);

    debug("Creating new WebIOScope.", scopeData);

    this.element = document.createElement("div");
    this.element.className = "webio-scope";
    this.element.setAttribute("data-webio-scope-id",  scopeData.instanceArgs.id);

    const {id, observables = {}, handlers = {}} = scopeData.instanceArgs;
    this.id = id;

    // Create WebIOObservables.
    this.observables = {};
    Object.keys(observables).forEach((name) => {
      this.observables[name] = new WebIOObservable(name, observables[name], this);
    });

    this.handlers = {};

    // TODO: refactor registerScope as described elsewhere
    this.webIO.registerScope(this);

    // TODO: refactor way initialization/import promises are done
    const initializationPromise = this.initialize(scopeData);

    this.promises = {
      connected: this.webIO.connected.then(() => this),
      importsLoaded: initializationPromise,
    };

    this.setupScope();
  }

  /**
   * Perform asynchronous initialization tasks.
   */
  private async initialize(scopeData: ScopeNodeData) {
    const {handlers = {}, imports} = scopeData.instanceArgs;

    // (Asynchronously) perform dependency initialization
    const {preDependencies = [], _promises = {}, ...restHandlers} = handlers;
    preDependencies
      .map((functionString) => createWebIOEventListener(this, functionString, this))
      .forEach((handler) => handler.call(this))
    ;

    // Map the function strings into handlers which have `this` bound to the scope's
    // element and which have access to the _webIOScope resources variable (via closure).
    Object.keys(restHandlers).forEach((observableName) => {
      this.handlers[observableName] = handlers[observableName].map((handlerString) => {
        return createWebIOEventListener(this, handlerString, this);
      });
    });

    const resources = imports ? await importBlock(imports) : null;

    // TypeScript hackery to deal with out promiseHandlers is a very special case
    const {importsLoaded: importsLoadedHandler} = _promises as any as PromiseHandlers;
    if (resources && importsLoadedHandler) {
      // `as any` necessary because createWebIOEventListener normally returns
      // a function which is expected to be an event listener... but this is kind of a
      // special case of that.
      debug("Invoking importsLoaded Scope handler.", {importsLoadedHandler, resources});
      (createWebIOEventListener(this, importsLoadedHandler, this) as any)(...resources);
    }

    // Finally, create children.
    this.children = scopeData.children.map((nodeData) => {
      if (typeof nodeData === "string") {
        return nodeData;
      }
      return createNode(nodeData, {webIO: this.webIO, scope: this})
    });
    for (const child of this.children) {
      if (typeof child === "string") {
        this.element.appendChild(document.createTextNode(child));
      } else {
        this.element.appendChild(child.element);
      }
    }

    // This isn't super clean, but this function is used to create the
    // importsLoaded promise, so we need to return the promises.
    return resources;
  }

  getObservable(observable: ObservableSpecifier) {
    const observableName = getObservableName(observable);
    if (!(observableName in this.observables)) {
      throw new Error(`Scope(id=${this.id}) has no observable named "${observableName}".`)
    }
    return this.observables[observableName];
  }

  getObservableValue(observable: ObservableSpecifier) {
    return this.getObservable(observable).value;
  }

  /**
   * Update an observable within the scope.
   * @param observable - The name (or specifier) of the observable to modify.
   * @param value - The value to set the observable to.
   * @param sync - Whether or not to sync the value to Julia. This should always be
   *    false if the update originated from Julia and is just being propogated into
   *    the browser.
   */
  setObservableValue(observable: ObservableSpecifier, value: any, sync: boolean = true) {
    const observableName = getObservableName(observable);
    if (!(observableName in this.observables)) {
      throw new Error(`Scope(id=${this.id}) has no observable named "${observableName}".`)
    }
    debug(`Setting Observable (name: ${observableName}) to "${value}" in WebIOScope (id: ${this.id}).`);
    this.observables[observableName].setValue(value, sync);
    this.evokeListeners(observableName);
  }

  /**
   * Evoke the listeners for an observable with the current value of
   * that observable.
   *
   * @param name - The name of the observable whose listeners should be evoked.
   */
  evokeListeners(name: string) {
    const listeners = this.handlers[name];
    if (!listeners) { return; }
    listeners.forEach((listener) => {
      listener.call(this.element, this.getObservableValue(name), this);
    })
  }

  /**
   * @deprecated
   */
  get dom() {
    console.warn("scope.dom!");
    return this.element;
  }

  // /**
  //  * Connect to the WebIO Julia machinery.
  //  */
  // private async connect() {
  //   await this.webIO.connected;
  //   await this.send({
  //     command: WebIOCommand.SETUP_SCOPE,
  //     data: {},
  //   });
  //   return;
  // }

  /**
   * Send the setup-scope message.
   *
   * This informs Julia/WebIO that we want to listen to changes associated
   * with this scope.
   */
  protected setupScope() {
    return this.send({
      command: WebIOCommand.SETUP_SCOPE,
      data: {},
    })
  }

  /**
   * Send a message to the WebIO Julia machinery.
   *
   * Sets the scope id if not specified.
   */
  send({scope = this.id, ...rest}: OptionalKeys<WebIOMessage, "scope">) {
    return this.webIO.send({scope, ...rest});
  }
}

export default WebIOScope;
