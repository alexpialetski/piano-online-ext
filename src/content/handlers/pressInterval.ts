import { pressInterval } from "../../piano/utils";
import { PressIntervalMessage } from "../../types/messages";
import {
  messageTypeMiddleware,
  pipeMiddleware,
  extensionSenderMiddleware,
} from "../utils";

const pressIntervalHandler = pipeMiddleware(
  extensionSenderMiddleware(),
  messageTypeMiddleware<PressIntervalMessage>("PRESS_INTERVAL")
)((message, _sender, response) => {
  pressInterval(message.data.keys, message.data.intervalType).then(response);
});

chrome.runtime.onMessage.addListener((...params) => {
  pressIntervalHandler(...params);

  return true;
});
