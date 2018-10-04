export interface WebIOMessage {
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
  command: WebIOCommand | string;

  /**
   * The data associated with the command.
   */
  data: any;
}


export const enum WebIOCommand {
  SETUP_SCOPE = "_setup_scope",
  EVAL = "Basics.eval",
}

export type WebIOWireMessage = WebIOMessage & {type: "message"};
