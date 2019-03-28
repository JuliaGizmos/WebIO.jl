export type WebIORequest = EvalRequest;
export type WebIOResponse = EvalResponse;

export type WebIOCommand = (
  UpdateObservableMessage
  | SetupScopeMessage
);

export interface RequestBase {
  type: "request";
  scope: string;
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

export interface EvalRequest extends RequestBase {
  request: WebIORequestType.EVAL;
  expression: string;
}
export interface EvalResponse extends ResponseBase {
  request: WebIORequestType.EVAL;
  result: any;
}

export interface UpdateObservableMessage<T = any> extends CommandBase {
  command: WebIOCommandType.UPDATE_OBSERVABLE;
  id: string;
  name: string;
  value: T;
}

export interface SetupScopeMessage extends CommandBase {
  command: WebIOCommandType.SETUP_SCOPE;
  scope: string;
}

export interface TypeUnsafeWebIOMessage {
  /**
   * The id of the scope that the message is associated with.
   */
  scope: string;

  /**
   * The command to execute.
   *
   * @todo Using observable names as commands is less than ideal, but
   *    changing it requires more work in the Julia side than I'm willing
   *    to commit to at this moment in time. It should be refactored to be
   *    something like
   *    ```
   *    {
   *      type: "message",
   *      scope: "string",
   *      command: "update-observable",
   *      data: {
   *        name: "observable-name",
   *        value: "observable-balue,
   *      },
   *    }
   *    ```
   *    which is also more inline with how data is normally transmitted as
   *    a JSON object rather than a string.
   */
  command: WebIOCommandType;

  /**
   * The data associated with the command.
   */
  data: any;
}

export const enum WebIORequestType {
  EVAL = "eval",
}

export const enum WebIOCommandType {
  SETUP_SCOPE = "setup_scope",
  UPDATE_OBSERVABLE = "update_observable",
}

export type WebIOMessage = WebIORequest | WebIOCommand | WebIOResponse;
