/**
 * A request sent from Julia to the browser to evaluate and return the value of
 * a response.
 */
export interface EvalRequest extends RequestBase {
  request: WebIORequestType.EVAL;
  scope: string;
  expression: string;
}
export interface EvalResponse extends ResponseBase {
  request: WebIORequestType.EVAL;
  result: any;
}

/**
 * A request to evaluate an RPC that was defined in Julia.
 *
 * See `rpc.jl`.
 */
export interface RPCRequest extends RequestBase {
  request: WebIORequestType.RPC;

  /**
   * The id of the RPC.
   *
   * This defaults to a random identifier when constructed in Julia but may also
   * be specified as a semantic name.
   */
  rpcId: string;

  /**
   * An array of positional arguments to give to the RPC.
   */
  arguments?: any[];
}

interface RPCOkayResponse extends ResponseBase {
  request: WebIORequestType.RPC;

  /**
   * The return value of the RPC.
   */
  result: unknown;
}
interface RPCExceptionResponse extends ResponseBase {
  request: WebIORequestType.RPC;

  /**
   * A description of the exception that occurred.
   */
  exception: string;
}
export type RPCResponse = RPCOkayResponse | RPCExceptionResponse;

export interface UpdateObservableCommand<T = any> extends CommandBase {
  command: WebIOCommandType.UPDATE_OBSERVABLE;
  id: string;
  name: string;
  value: T;
}

export interface SetupScopeCommand extends CommandBase {
  command: WebIOCommandType.SETUP_SCOPE;
  scope: string;
}

export const enum WebIORequestType {
  EVAL = "eval",
  RPC = "rpc",
}

export const enum WebIOCommandType {
  SETUP_SCOPE = "setup_scope",
  UPDATE_OBSERVABLE = "update_observable",
}

/**
 * The type of a WebIORequest.
 *
 * Note: `WebIORequest` refers to all possible request types, whereas
 * `WebIORequest<WebIORequestType.RPC>` refers specifically to the
 * `WebIORPCRequest` type. This is useful for type safety in places where we
 * take in a request and return the accompanying response.
 *
 * @example
 * function getResponse<T extends WebIORequestType>(WebIORequest<T>): WebIOResponse<T> {
 *   return response;
 * }
 */
export type WebIORequest<T extends WebIORequestType = WebIORequestType> = WebIORequestByType[T];
export type WebIOResponse<T extends WebIORequestType = WebIORequestType> = WebIOResponseByType[T];
export type WebIOCommand<T extends WebIOCommandType = WebIOCommandType> = WebIOCommandByType[T];

interface WebIORequestByType {
  [WebIORequestType.EVAL]: EvalRequest;
  [WebIORequestType.RPC]: RPCRequest;
}
interface WebIOResponseByType {
  [WebIORequestType.EVAL]: EvalResponse;
  [WebIORequestType.RPC]: RPCResponse;
}
interface WebIOCommandByType {
  [WebIOCommandType.SETUP_SCOPE]: SetupScopeCommand;
  [WebIOCommandType.UPDATE_OBSERVABLE]: UpdateObservableCommand;
}

export interface RequestBase {
  type: "request";
  request: WebIORequestType;
  requestId: string;
}

export interface ResponseBase {
  type: "response";
  request: WebIORequestType;
  requestId: string;
}

export interface CommandBase {
  type: "command";
  scope: string;
  command: WebIOCommandType;
}

export type WebIOMessage = WebIORequest | WebIOCommand | WebIOResponse;
