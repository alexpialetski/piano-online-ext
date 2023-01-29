import { PopupOpenedMessage } from "../../types/messages";
import {
  messageTypeMiddleware,
  pipeMiddleware,
  extensionSenderMiddleware,
} from "../utils";

const popupOpenedHandler = pipeMiddleware(
  extensionSenderMiddleware(),
  messageTypeMiddleware<PopupOpenedMessage>("POPUP_OPENED")
)((_message, _sender, response) => {
  response();
});

chrome.runtime.onMessage.addListener(popupOpenedHandler);
