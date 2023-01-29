import { CommonMessage } from "../chrome";
import { IntervalPlayType } from "./music";

export type PressIntervalMessage = CommonMessage<
  "PRESS_INTERVAL",
  {
    keys: string[];
    intervalType: IntervalPlayType;
  },
  void
>;

export type PopupOpenedMessage = CommonMessage<"POPUP_OPENED", void, void>;

export type PianoChromeMessage = PressIntervalMessage | PopupOpenedMessage;
