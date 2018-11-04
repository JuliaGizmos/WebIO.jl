import WebIO from "@webio/webio";
declare global {
    interface Window {
        _webIOWebSocketURL?: string;
    }
}
/**
 * Get the standard url of the WebIO WebSocket.
 */
export declare const getWSUrl: () => string;
/**
 * Create a WebIO instance connected to a WebSocket.
 * @param webIO - the WebIO instance to connect.
 * @param wsUrl - the url of the WebSocket to connect to.
 */
export declare const connectWebIOToWebSocket: (webIO: WebIO, wsUrl?: string) => Promise<void>;
