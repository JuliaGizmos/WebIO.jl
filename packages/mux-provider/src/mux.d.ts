import WebIO from "@webio/webio";
/**
 * Get the standard url of the Mux/WebIO WebSocket.
 */
export declare const getMuxWSUrl: () => string;
/**
 * Create a WebIO instance connected to a Mux WebSocket.
 * @param webIO - the WebIO instance to connect.
 * @param wsUrl - the url of the WebSocket to connect to.
 */
export declare const connectWebIOToWebSocket: (webIO: WebIO, wsUrl?: string) => Promise<void>;
