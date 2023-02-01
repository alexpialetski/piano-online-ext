import { useEffect, useRef } from "react";
import { IntervalCombination } from "~/types/intervalCombination";

import { IntervalLesson, ChoiceButton } from "./IntervalLesson";

export type MajorMinorIntervalProps = {
  combinations: IntervalCombination[];
};

export const MajorMinorInterval = ({
  combinations,
}: MajorMinorIntervalProps): JSX.Element => {
  const minorButton = useRef<HTMLButtonElement>(null);
  const majorButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") {
        minorButton.current?.click();
      } else if (e.code === "ArrowRight") {
        majorButton.current?.click();
      }
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <IntervalLesson combinations={combinations}>
      {({ isInProgress, onError, onSuccess, current }) => (
        <>
          <ChoiceButton
            ref={minorButton}
            disabled={isInProgress}
            isCorrect={current?.color === "minor"}
            onError={onError}
            onSuccess={onSuccess}
          >
            Minor
          </ChoiceButton>
          <ChoiceButton
            ref={majorButton}
            disabled={isInProgress}
            isCorrect={current?.color === "major"}
            onError={onError}
            onSuccess={onSuccess}
          >
            Major
          </ChoiceButton>
        </>
      )}
    </IntervalLesson>
  );
};
