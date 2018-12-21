import { WebIOMessage, WebIOWireMessage } from "./message";
import { WebIODomElement, WebIONodeSchema } from "./Node";
import WebIOScope from "./Scope";
import { ObservableGlobalSpecifier } from "./utils";
import WebIOObservable from "./Observable";
export declare type WebIOSendCallback = (message: WebIOWireMessage) => void;
declare class WebIO {
    /**
     * A promise that is resolved when WebIO is connected to the Julia backend.
     */
    readonly connected: Promise<void>;
    private resolveConnected;
    private rejectConnected;
    /**
     * A map from `scopeId` to the corresponding {@link WebIOScope} instance.
     */
    private scopes;
    /**
     * A map from `observableId` to an array of corresponding
     * {@link WebIOObservable} instances. We have an array of these instances
     * since an observable may appear within several different scopes. Also note
     * that we identify observables by id here, rather than by name, since the
     * name may be different in different scopes; the ids are usually of the form
     * `obs_123`.
     */
    private observables;
    /**
     * The function that WebIO uses to send data to the Julia backend.
     */
    private sendCallback?;
    /**
     * A reference to {@link NODE_CLASSES} to allow for extension.
     */
    static readonly NODE_CLASSES: {
        [nodeType: string]: typeof import("./Node").default | undefined;
    };
    constructor();
    /**
     * Dispatch a message into the WebIO JavaScript machinery.
     *
     * The message usually comes from the comm (e.g. WebSocket) that WebIO is
     * using to communicate.
     *
     * @param message - The message to dispatch.
     */
    dispatch(message: WebIOMessage): void;
    /**
     * Set the send callback that WebIO will use.
     *
     * This method, when called for the first time, will also resolve the WebIO
     * connected promise and send any messages that are waiting.
     */
    setSendCallback(sendCallback: WebIOSendCallback): void;
    /**
     * A method called by scopes to register themselves so that messages
     * can be routed appropriately.
     *
     * @todo This should probably be changed so that this method is used to
     *    create a new `WebIOScope` and have it registered then instead of
     *    asking the scope to register itself.
     *    tl;dr; change
     *    `scope = new WebIOScope(...); webIO.registerScope(scope)`
     *    to `scope = webio.createScope(...);`.
     *
     * @param scope
     */
    registerScope(scope: WebIOScope): void;
    /**
     * A method called by observables to register themselves. This is used to
     * ensure that observables are in a consistent state within the browser.
     * @param observable
     */
    registerObservable(observable: WebIOObservable): void;
    /**
     * Ensure that all observable instances have the value off the
     * `sourceObservable`.
     *
     * @param sourceObservable - The observable whose values are synchronized with
     *    all other registered observables of the same id.
     */
    reconcileObservables(sourceObservable: WebIOObservable): void;
    /**
     * Send a message to the WebIO Julia machinery.
     *
     * Sets `type: "message"` before passing to the send callback.
     */
    send(message: WebIOMessage): Promise<void>;
    /**
     * Mount a WebIO node into the specified element.
     *
     * This method overwrites the content of the element.
     *
     * @param element - The element to be replaced with the WebIO node.
     * @param nodeSchema - The data associated with the WebIO node.
     */
    mount(element: WebIODomElement, nodeSchema: WebIONodeSchema): void;
    getScope(scopeId: string): WebIOScope;
    /**
     * Get an {@link WebIOObservable} object.
     *
     * @throws Will throw an error if the scope does not exist or there is no
     *    such observable within the scope.
     */
    getObservable({ scope, name }: ObservableGlobalSpecifier): WebIOObservable<any>;
    /**
     * Get the value of some observable.
     *
     * @deprecated This method is a shim for old WebIO functionally which relied
     * on a global WebIO instance.
     *
     * @throws Will throw an error if the scope does not exist or there is no
     *    such observable within the scope.
     */
    getval({ scope, name }: ObservableGlobalSpecifier): any;
    /**
     * Set the value of some observable.
     *
     * @deprecated This method is a shim for old WebIO functionally which relied
     * on a global WebIO instance.
     *
     * @throws Will throw an error if the scope does not exist or there is no
     *    such observable within the scope.
     */
    setval({ scope, name }: ObservableGlobalSpecifier, value: any, sync?: boolean): void;
}
export default WebIO;
