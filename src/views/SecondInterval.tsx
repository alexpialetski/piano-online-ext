import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { PressIntervalMessage } from "../types";
import { chromeSendMessage } from "../chrome";
import { KEYS } from "../piano/constants";

const TestObj = {
  getAllPossibleCombinations: (): string[][] => {
    const result = [];

    for (let i = 1; i < KEYS.length; ++i) {
      result.push([KEYS[i - 1], KEYS[i]]);
    }

    return result;
  },
};

export const SecondInterval = (): JSX.Element => {
  const [isInProgress, setIsInProgress] = useState(false);

  const pressInterval = useCallback(() => {
    setIsInProgress(true);

    chromeSendMessage<PressIntervalMessage>({
      type: "PRESS_INTERVAL",
      data: { keys: [KEYS[0], KEYS[1]], intervalType: "melodic" },
    }).then(() => setIsInProgress(false));
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      alignItems="center"
    >
      <Button
        variant="contained"
        disabled={isInProgress}
        onClick={pressInterval}
      >
        Press second interval
      </Button>
      <Typography>
        {JSON.stringify(TestObj.getAllPossibleCombinations())}
      </Typography>
    </Box>
  );
};
