import { Combination } from "../../types/combination";

type TrainingAction =
  | "INITIALIZE_COMBINATIONS"
  | "FAIL_CURRENT_COMBINATION"
  | "SUCCEED_CURRENT_COMBINATION";

type Action<TAction extends TrainingAction, TPayload> = {
  type: TAction;
  payload: TPayload;
};

export type InitCombDispatchAction = Action<
  "INITIALIZE_COMBINATIONS",
  Combination[]
>;

export type FailCurrentCombDispatchAction = Action<
  "FAIL_CURRENT_COMBINATION",
  void
>;

export type SucceedCurrrentCombDispatchAction = Action<
  "SUCCEED_CURRENT_COMBINATION",
  void
>;

export type TrainingReducerAction =
  | InitCombDispatchAction
  | FailCurrentCombDispatchAction
  | SucceedCurrrentCombDispatchAction;

export type TrainingReducerState = {
  initialCombinations: Combination[];
  queueCombinations: Combination[];
  struggleCombinations: Combination[];
  currentCombination: Combination | undefined;
  currentQueue: "overall" | "struggle";
};
