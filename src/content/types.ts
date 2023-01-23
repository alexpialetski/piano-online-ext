import { MessageResponse } from "../chrome";
import { PianoChromeMessage } from "../types";

export type MessageHandler<
  TMessage extends PianoChromeMessage = PianoChromeMessage
> = (
  message: TMessage,
  sender: chrome.runtime.MessageSender,
  response: (message: MessageResponse<TMessage>) => void
) => void;

export type MiddleWare<
  TMessage extends PianoChromeMessage,
  TReturnMessage extends PianoChromeMessage = TMessage
> = (next: MessageHandler<TReturnMessage>) => MessageHandler<TMessage>;
