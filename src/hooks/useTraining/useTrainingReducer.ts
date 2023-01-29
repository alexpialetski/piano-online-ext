import { useReducer, Reducer } from "react";

import { INITIAL_STATE } from "./trainingReducer.constants";
import { TrainingReducerAction, TrainingReducerState } from "./types";
import { Combination } from "../../types/combination";

const getRandomCombination = <T extends Combination>(combinations: T[]): T =>
  combinations[Math.floor(Math.random() * combinations.length)];

const removeFromCombination = <T extends Combination>(
  combinations: T[],
  combination: T
): T[] => combinations.filter((c) => c.getId() !== combination.getId());

const isCombinationInsideOfQueue = <T extends Combination>(
  combinations: T[],
  combination: T
): boolean =>
  Boolean(combinations.find((comb) => comb.getId() === combination.getId()));

const calculateNextQueueAndCombination = (
  state: TrainingReducerState
): Pick<TrainingReducerState, "currentCombination" | "currentQueue"> => {
  if (state.struggleCombinations.length && state.currentQueue === "overall") {
    return {
      currentCombination: getRandomCombination(state.struggleCombinations),
      currentQueue: "struggle",
    };
  } else {
    return {
      currentCombination: getRandomCombination(state.queueCombinations),
      currentQueue: "overall",
    };
  }
};

export const entityProviderReducer: Reducer<
  TrainingReducerState,
  TrainingReducerAction
> = (state, { type: actionType, payload }) => {
  switch (actionType) {
    case "INITIALIZE_COMBINATIONS":
      const shuffledArr = payload.slice().sort(() => 0.5 - Math.random());

      return {
        ...state,
        initialCombinations: shuffledArr,
        queueCombinations: shuffledArr,
        currentCombination: getRandomCombination(shuffledArr),
        currentQueue: "overall",
      };

    case "SUCCEED_CURRENT_COMBINATION": {
      if (!state.currentCombination) {
        return state;
      }

      let intermidiateState: TrainingReducerState;

      if (state.currentQueue === "overall") {
        intermidiateState = {
          ...state,
          queueCombinations: removeFromCombination(
            state.queueCombinations,
            state.currentCombination
          ),
        };
      } else {
        intermidiateState = {
          ...state,
          struggleCombinations: removeFromCombination(
            state.struggleCombinations,
            state.currentCombination
          ),
        };
      }

      return {
        ...intermidiateState,
        ...calculateNextQueueAndCombination(intermidiateState),
      };
    }

    case "FAIL_CURRENT_COMBINATION": {
      if (!state.currentCombination) {
        return state;
      }

      let intermidiateState = state;

      if (
        !isCombinationInsideOfQueue(
          intermidiateState.struggleCombinations,
          state.currentCombination
        )
      ) {
        intermidiateState = {
          ...state,
          struggleCombinations: [
            ...state.struggleCombinations,
            state.currentCombination,
          ],
        };
      }

      return {
        ...intermidiateState,
        ...calculateNextQueueAndCombination(state),
      };
    }

    default:
      return state;
  }
};

export type UseTrainingReducerReturn = [
  TrainingReducerState,
  React.Dispatch<TrainingReducerAction>
];

export const useTrainingReducer = (): UseTrainingReducerReturn =>
  useReducer<Reducer<TrainingReducerState, TrainingReducerAction>>(
    entityProviderReducer,
    INITIAL_STATE
  );
