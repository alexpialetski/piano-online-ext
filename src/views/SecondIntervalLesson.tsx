import { useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { PressIntervalMessage } from "../types/messages";
import { IntervalCombination } from "../types/intervalCombination";
import { ChordType } from "../types/music";
import { chromeSendMessage } from "../chrome";
import { KEYS } from "../piano/constants";
import { useTraining } from "../hooks/useTraining/useTraining";

const TestObj = {
  getAllPossibleCombinations: (): IntervalCombination[] => {
    const result: IntervalCombination[] = [];

    for (let i = 1; i < KEYS.length; ++i) {
      result.push(
        new IntervalCombination("second", "minor", [KEYS[i - 1], KEYS[i]])
      );
    }

    for (let i = 2; i < KEYS.length; ++i) {
      result.push(
        new IntervalCombination("second", "major", [KEYS[i - 2], KEYS[i]])
      );
    }

    return result;
  },
};

const COMBINATIONS = TestObj.getAllPossibleCombinations();

export const SecondIntervalLesson = (): JSX.Element => {
  const [isInProgress, setIsInProgress] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const { state, actions } = useTraining({
    possibleCombinations: COMBINATIONS,
    isEnabled,
  });

  const onChoiceClick = useCallback(
    (color: ChordType) => () => {
      if (state.currentCombination) {
        if (state.currentCombination.color === color) {
          actions.succeedCurrent();
        } else {
          actions.failCurrent();
        }
      }
    },
    [state.currentCombination, actions]
  );

  const triggerCurrent = useCallback(() => {
    if (state.currentCombination) {
      setIsInProgress(true);

      chromeSendMessage<PressIntervalMessage>({
        type: "PRESS_INTERVAL",
        data: { keys: state.currentCombination.keys, intervalType: "harmonic" },
      }).then(() => setIsInProgress(false));
    }
  }, [state.currentCombination]);

  useEffect(() => {
    if (isEnabled) {
      triggerCurrent();
    }
  }, [isEnabled, triggerCurrent]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        triggerCurrent();
      }
      if (e.code === "ArrowLeft") {
        onChoiceClick("minor")();
      }
      if (e.code === "ArrowRight") {
        onChoiceClick("major")();
      }
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [triggerCurrent, onChoiceClick]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      alignItems="center"
      gap="8px"
    >
      {!isEnabled && (
        <Button
          variant="contained"
          disabled={isInProgress}
          onClick={() => setIsEnabled(true)}
        >
          Start
        </Button>
      )}
      {isEnabled && (
        <>
          <Typography
            style={{ fontWeight: state.currentQueue === "overall" ? 800 : 400 }}
          >{`Overall: ${state.queueCombinations.length} out of ${state.initialCombinations.length}`}</Typography>
          <Typography
            style={{
              fontWeight: state.currentQueue === "struggle" ? 800 : 400,
            }}
          >{`Struggle: ${state.struggleCombinations.length}`}</Typography>
          <Button
            variant="contained"
            disabled={isInProgress}
            onClick={triggerCurrent}
          >
            Repeat
          </Button>
          <Box display="flex" gap="8px">
            <Button
              variant="contained"
              disabled={isInProgress}
              onClick={onChoiceClick("minor")}
            >
              Minor
            </Button>
            <Button
              variant="contained"
              disabled={isInProgress}
              onClick={onChoiceClick("major")}
            >
              Major
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
