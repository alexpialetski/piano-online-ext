import { IntervalPlayType } from "../types/music";
import { KeyboardEventType } from "./types";

export const getKeyBoardEvent = (type: KeyboardEventType, key: string) =>
  new KeyboardEvent(type, { keyCode: key.charCodeAt(0) });

export const pressPianoKey = (key: string) =>
  new Promise<void>((res) => {
    document.dispatchEvent(getKeyBoardEvent("keydown", key));

    setTimeout(() => {
      document.dispatchEvent(getKeyBoardEvent("keyup", key));
      res();
    }, 200);
  });

export const pressInterval = (
  notes: string[],
  intervalType: IntervalPlayType
): Promise<void> =>
  notes.reduce(
    (accPromise, note, index) =>
      accPromise.then(
        () =>
          new Promise((res) =>
            setTimeout(
              () => pressPianoKey(note).then(res),
              !index || intervalType === "harmonic" ? 0 : 1000 // no timer if first note or if interval is harmonic (all notes together)
            )
          )
      ),
    Promise.resolve()
  );
