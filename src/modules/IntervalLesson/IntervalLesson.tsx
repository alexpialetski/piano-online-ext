import { useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { PressIntervalMessage } from "~/types/messages";
import { chromeSendMessage } from "~/chrome";
import { useTraining } from "~/hooks/useTraining";
import { Combination } from "~/types/combination";
import { ModeControls } from "./ModeControls";
import { QueueIndicator } from "./QueueIndicator";

export type IntervalLessonProps = {
  combinations: Combination[];
  children: (val: {
    isInProgress: boolean;
    current: Combination | undefined;
    onSuccess: () => void;
    onError: () => void;
  }) => JSX.Element;
};

export const IntervalLesson = ({
  combinations,
  children,
}: IntervalLessonProps): JSX.Element => {
  const [isInProgress, setIsInProgress] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const { state, actions } = useTraining({
    possibleCombinations: combinations,
    isEnabled,
  });

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
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [triggerCurrent]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
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
          <ModeControls
            changeMode={actions.changeMode}
            currentMode={state.mode}
          />
          <QueueIndicator state={state} />
          <Button
            variant="contained"
            disabled={isInProgress}
            onClick={triggerCurrent}
          >
            Repeat
          </Button>
          <Box display="flex" gap="8px">
            {children({
              isInProgress,
              current: state.currentCombination,
              onSuccess: actions.succeedCurrent,
              onError: actions.failCurrent,
            })}
          </Box>
        </>
      )}
    </Box>
  );
};
