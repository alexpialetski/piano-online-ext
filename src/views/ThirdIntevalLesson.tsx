import { MajorMinorInterval } from "~/modules/MajorMinorInterval";
import { IntervalCombinationsConstructor } from "~/piano/IntervalCombinationsConstructor";

const thirdInterval = new IntervalCombinationsConstructor("third");

const COMBINATIONS = thirdInterval.getAllPossibleCombinations([
  { color: "major", distance: 4, reverse: false },
  { color: "minor", distance: 3, reverse: false },
]);

export const ThirdIntervalLesson = (): JSX.Element => (
  <MajorMinorInterval combinations={COMBINATIONS} />
);
