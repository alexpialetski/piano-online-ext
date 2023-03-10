import { useCallback, useEffect, useMemo } from "react";

import { Combination } from "~/types/combination";

import { useTrainingReducer } from "./useTrainingReducer";
import { Mode } from "./types";

export type UseTrainingParams<T extends Combination> = {
  possibleCombinations: T[];
  isEnabled: boolean;
};

export const useTraining = <T extends Combination>({
  possibleCombinations,
  isEnabled,
}: UseTrainingParams<T>) => {
  const [state, dispatch] = useTrainingReducer();

  useEffect(() => {
    dispatch({
      type: "INITIALIZE_COMBINATIONS",
      payload: possibleCombinations,
    });
  }, [dispatch, possibleCombinations]);

  const succeedCurrent = useCallback(
    () => dispatch({ type: "SUCCEED_CURRENT_COMBINATION", payload: undefined }),
    [dispatch]
  );

  const failCurrent = useCallback(
    () => dispatch({ type: "FAIL_CURRENT_COMBINATION", payload: undefined }),
    [dispatch]
  );

  const changeMode = useCallback(
    (mode: Mode) => dispatch({ type: "CHANGE_MODE", payload: mode }),
    [dispatch]
  );

  const actions = useMemo(
    () => ({ succeedCurrent, failCurrent, changeMode }),
    [succeedCurrent, failCurrent, changeMode]
  );

  return { state, actions };
};
