import { TrainingReducerState } from "./types";

export const INITIAL_STATE: TrainingReducerState = {
  initialCombinations: [],
  queueCombinations: [],
  struggleCombinations: [],
  currentCombination: undefined,
  currentQueue: "overall",
};
