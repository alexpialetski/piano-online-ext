import Typography from "@mui/material/Typography";
import { Fragment } from "react";

import { TrainingReducerState } from "~/hooks/useTraining";

export type QueueIndicatorProps = {
  state: TrainingReducerState;
};

export const QueueIndicator = ({ state }: QueueIndicatorProps): JSX.Element => (
  <Fragment>
    <Typography
      style={{ fontWeight: state.currentQueue === "overall" ? 800 : 400 }}
    >{`Overall: ${state.queueCombinations.length} out of ${state.initialCombinations.length}`}</Typography>
    <Typography
      style={{
        fontWeight: state.currentQueue === "struggle" ? 800 : 400,
      }}
    >{`Struggle: ${state.struggleCombinations.length}`}</Typography>
  </Fragment>
);
