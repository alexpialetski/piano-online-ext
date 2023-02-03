import { MajorMinorInterval } from "~/modules/MajorMinorInterval";
import { IntervalCombinationsConstructor } from "~/piano/IntervalCombinationsConstructor";

const secondInterval = new IntervalCombinationsConstructor("second");

const COMBINATIONS = secondInterval.getAllPossibleCombinations([
  { color: "major", distance: 2, reverse: false },
  { color: "minor", distance: 1, reverse: false },
]);

export const SecondIntervalLesson = (): JSX.Element => (
  <MajorMinorInterval combinations={COMBINATIONS} />
);
