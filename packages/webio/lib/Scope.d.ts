import { Config as SystemJSConfig } from "systemjs";
import WebIONode, { WebIONodeSchema, WebIONodeContext } from "./Node";
import WebIOObservable, { ObservableData } from "./Observable";
import { ObservableSpecifier, OptionalKeys } from "./utils";
import { WebIOMessage } from "./message";
import { BlockImport } from "./imports";
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
/**
 * Promises associated with a scope.
 */
interface ScopePromises {
    importsLoaded: Promise<any[] | null>;
    connected: Promise<WebIOScope>;
    [promiseName: string]: Promise<any> | undefined;
}
export declare const SCOPE_NODE_TYPE = "Scope";
/**
 * Data associated with a scope node.
 */
export interface ScopeSchema extends WebIONodeSchema {
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
        /**
         * Configuration to apply to SystemJS before importing the dependencies.
         *
         * See {@link https://github.com/systemjs/systemjs/blob/0.21/docs/config-api.md}.
         */
        systemjs_options: SystemJSConfig;
    };
}
/**
 * Handlers that are associated with the scope promises.
 *
 * @todo This needs to be refactored.
 */
export interface PromiseHandlers {
    importsLoaded?: string[];
}
declare class WebIOScope extends WebIONode {
    readonly id: string;
    readonly element: HTMLDivElement;
    children: Array<WebIONode | string> | null;
    handlers: ScopeListeners;
    observables: {
        [observableName: string]: WebIOObservable;
    };
    promises: ScopePromises;
    readonly dom: HTMLDivElement;
    constructor(schema: ScopeSchema, context: WebIONodeContext);
    /**
     * Perform asynchronous initialization tasks.
     */
    private initialize;
    getLocalObservable(observableName: string): WebIOObservable<any>;
    getObservable(observable: ObservableSpecifier): WebIOObservable<any>;
    getObservableValue(observable: ObservableSpecifier): any;
    /**
     * Update an observable within the scope.
     * @param observable - The name (or specifier) of the observable to modify.
     * @param value - The value to set the observable to.
     * @param sync - Whether or not to sync the value to Julia. This should always be
     *    false if the update originated from Julia and is just being propogated into
     *    the browser.
     */
    setObservableValue(observable: ObservableSpecifier, value: any, sync?: boolean): void;
    /**
     * Send a message to the WebIO Julia machinery.
     *
     * Sets the scope id if not specified.
     */
    send({ scope, ...rest }: OptionalKeys<WebIOMessage, "scope">): Promise<void>;
    /**
     * Evoke the listeners for an observable with the current value of
     * that observable.
     *
     * @param name - The name of the observable whose listeners should be evoked.
     * @param value - The current value of the observable.
     */
    protected evokeObservableHandlers(name: string, value: any): void;
    /**
     * Send the setup-scope message.
     *
     * This informs Julia/WebIO that we want to listen to changes associated
     * with this scope.
     */
    protected setupScope(): Promise<void>;
}
export default WebIOScope;
