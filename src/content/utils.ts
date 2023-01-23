import { PianoChromeMessage } from "../types";
import { MessageHandler, MiddleWare } from "./types";

const senderMiddleware =
  <TMessage extends PianoChromeMessage>(
    senderId: string
  ): MiddleWare<TMessage> =>
  (next) =>
  (message, sender, response) => {
    if (sender.id === senderId) {
      next(message, sender, response);
    }
  };

export const extensionSenderMiddleware = <
  TMessage extends PianoChromeMessage
>(): MiddleWare<TMessage> => senderMiddleware<TMessage>(chrome.runtime.id);

export const isSpecificMessage = <TMessage extends PianoChromeMessage>(
  message: PianoChromeMessage,
  type: TMessage["type"]
): message is TMessage => message.type === type;

export const messageTypeMiddleware =
  <TMessage extends PianoChromeMessage>(
    messageType: TMessage["type"]
  ): MiddleWare<PianoChromeMessage, TMessage> =>
  (next) =>
  (message, sender, response) => {
    if (isSpecificMessage(message, messageType)) {
      next(message, sender, response);
    }
  };

export function pipeMiddleware<M1 extends PianoChromeMessage>(
  m1: MiddleWare<PianoChromeMessage, M1>
): (handler: MessageHandler<M1>) => MessageHandler<PianoChromeMessage>;
export function pipeMiddleware<
  M1 extends PianoChromeMessage,
  M2 extends PianoChromeMessage
>(
  m1: MiddleWare<PianoChromeMessage, M1>,
  m2: MiddleWare<M1, M2>
): (handler: MessageHandler<M2>) => MessageHandler<PianoChromeMessage>;
export function pipeMiddleware(
  ...middlewares: MiddleWare<PianoChromeMessage>[]
): (
  handler: MessageHandler<PianoChromeMessage>
) => MessageHandler<PianoChromeMessage> {
  return (handler: MessageHandler<PianoChromeMessage>) =>
    middlewares.reduce(
      (accHandler, currMiddleware) => currMiddleware(accHandler),
      handler
    );
}

export const injectScript = (fileName: string) => {
  var s = document.createElement("script");
  s.src = fileName;
  (document.head || document.documentElement).appendChild(s);
  s.onload = function () {
    s.remove();
  };
};
