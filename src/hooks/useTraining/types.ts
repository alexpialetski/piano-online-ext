import { Combination } from "../../types/combination";

type TrainingAction =
  | "INITIALIZE_COMBINATIONS"
  | "FAIL_CURRENT_COMBINATION"
  | "SUCCEED_CURRENT_COMBINATION"
  | "CHANGE_MODE";

export type Mode = "elimination" | "mistakes";

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

export type ChangeModeDispatchAction = Action<"CHANGE_MODE", Mode>;

export type TrainingReducerAction =
  | InitCombDispatchAction
  | FailCurrentCombDispatchAction
  | SucceedCurrrentCombDispatchAction
  | ChangeModeDispatchAction;

export type TrainingReducerState = {
  initialCombinations: Combination[];
  queueCombinations: Combination[];
  struggleCombinations: Combination[];
  currentCombination: Combination | undefined;
  currentQueue: "overall" | "struggle";
  mode: Mode;
};
