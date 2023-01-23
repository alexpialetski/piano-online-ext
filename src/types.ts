import { CommonMessage } from "./chrome";

export type IntervalType = "harmonic" | "melodic";

export type PressIntervalMessage = CommonMessage<
  "PRESS_INTERVAL",
  {
    keys: string[];
    intervalType: "harmonic" | "melodic";
  },
  void
>;

export type PopupOpenedMessage = CommonMessage<"POPUP_OPENED", void, void>;

export type PianoChromeMessage = PressIntervalMessage | PopupOpenedMessage;
