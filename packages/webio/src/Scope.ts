import createLogger from "debug";
const debug = createLogger("WebIO:Scope");

import WebIONode, {WebIONodeDataBase, WebIONodeParams, WebIONodeType} from "./Node";
import WebIOObservable, {ObservableData} from "./Observable";
import {getObservableName, ObservableSpecifier, OptionalKeys} from "./utils";
import {WebIOCommand, WebIOMessage} from "./message";
import {createWebIOEventListener} from "./events";
import WebIODomNode from "./DomNode";
import createNode from "./createNode";

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
  importsLoaded: Promise<void>; // TODO
  connected: Promise<WebIOScope>;
}

/**
 * Data associated with a scope node.
 */
export interface ScopeNodeData extends WebIONodeDataBase {
  nodeType: WebIONodeType.SCOPE;

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
  }
}

class WebIOScope extends WebIONode {

  readonly id: string;
  readonly element: HTMLDivElement;
  children: Array<WebIOScope | WebIODomNode>;
  handlers: ScopeListeners;
  observables: {[observableName: string]: WebIOObservable};
  promises: ScopePromises;

  constructor(
    scopeData: ScopeNodeData,
    options: WebIONodeParams,
  ) {
    super(scopeData, options);

    debug("Creating new WebIOScope.", scopeData);

    this.element = document.createElement("div");
    this.element.className = "webio-scope";

    const {id, observables = {}, handlers = {}} = scopeData.instanceArgs;
    this.id = id;

    this.observables = {};
    Object.keys(observables).forEach((name) => {
      this.observables[name] = new WebIOObservable(name, observables[name], this);
    });

    // Map the function strings into handlers which have `this` bound to the scope's
    // element and which have access to the _webIOScope variable (via closure).
    this.handlers = {};
    Object.keys(handlers).forEach((observableName) => {
      this.handlers[observableName] = handlers[observableName].map((handlerString) => {
        return createWebIOEventListener(this.element, handlerString, this);
      });
    });

    // TODO
    this.promises = null as any;

    this.webIO.registerScope(this);

    // this.node = node;
    // this.handlers = handlers;
    // this.observables  = observables;
    //
    // // (Asynchronously) perform dependency initialization
    // const {preDependencies = []} = this.handlers;
    // preDependencies.forEach((handler) => handler.call(this));
    // const importsLoaded = Promise.resolve(); // TODO
    //
    // // (Asynchronously) connect to the WebIO Julia machinery
    // const connected = this.connect().then(() => this);
    //
    // this.promises = {importsLoaded, connected};

    // Create children and append to this node's element.
    this.children = scopeData.children.map((nodeData) => (
      createNode(nodeData, {webIO: this.webIO, scope: this})
    ));
    for (const child of this.children) {
      this.element.appendChild(child.element);
    }

    this.setupScope();
  }

  getObservableValue(observable: ObservableSpecifier) {
    const observableName = getObservableName(observable);
    if (!(observableName in this.observables)) {
      throw new Error(`Scope(id=${this.id}) has no observable named "${observableName}".`)
    }
    return this.observables[observableName].value;
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
