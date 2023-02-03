import { IntervalCombination } from "~/types/intervalCombination";

import { KEYS } from "./constants";

type IntervalParameter = {
  distance: number;
  color: IntervalCombination["color"];
  reverse: boolean;
};

export class IntervalCombinationsConstructor {
  type: IntervalCombination["type"];

  constructor(type: IntervalCombination["type"]) {
    this.type = type;
  }

  getAllPossibleCombinations(
    parameters: IntervalParameter[]
  ): IntervalCombination[] {
    return parameters.reduce<IntervalCombination[]>((acc, parameter) => {
      for (let i = 0; i < KEYS.length; ++i) {
        const firstKey = KEYS[i];
        const secondKey = KEYS[i + parameter.distance];

        if (firstKey && secondKey) {
          acc.push(
            new IntervalCombination(this.type, parameter.color, [
              firstKey,
              secondKey,
            ])
          );

          if (parameter.reverse) {
            acc.push(
              new IntervalCombination(this.type, parameter.color, [
                secondKey,
                firstKey,
              ])
            );
          }
        }
      }

      return acc;
    }, []);
  }
}
