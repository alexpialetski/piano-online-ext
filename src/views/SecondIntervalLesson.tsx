import { MajorMinorInterval } from "~/modules/MajorMinorInterval";
import { KEYS } from "~/piano/constants";
import { IntervalCombination } from "~/types/intervalCombination";

const SECOND_INTERVAL = {
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

const COMBINATIONS = SECOND_INTERVAL.getAllPossibleCombinations();

export const SecondIntervalLesson = (): JSX.Element => (
  <MajorMinorInterval combinations={COMBINATIONS} />
);
