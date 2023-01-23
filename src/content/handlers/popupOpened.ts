import { PopupOpenedMessage } from "../../types";
import {
  messageTypeMiddleware,
  pipeMiddleware,
  extensionSenderMiddleware,
} from "../utils";

const popupOpenedHandler = pipeMiddleware(
  extensionSenderMiddleware(),
  messageTypeMiddleware<PopupOpenedMessage>("POPUP_OPENED")
)((message, _, response) => {
  response();
});

chrome.runtime.onMessage.addListener(popupOpenedHandler);
