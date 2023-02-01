import { forwardRef, useCallback, useState } from "react";
import Button, { ButtonProps } from "@mui/material/Button";

type Highlight = "error" | "success";

export type ChoiceButtonProps = {
  disabled: boolean;
  isCorrect: boolean;
  onSuccess: () => void;
  onError: () => void;
  children?: React.ReactNode;
};

const TIMEOUT = 800;

export const ChoiceButton = forwardRef<HTMLButtonElement, ChoiceButtonProps>(
  ({ disabled, isCorrect, children, onSuccess, onError }, ref): JSX.Element => {
    const [highlight, setHighlight] = useState<ButtonProps["color"]>("primary");

    const onClick = useCallback(() => {
      let callback = isCorrect ? onSuccess : onError;

      setHighlight(isCorrect ? "success" : "error");

      setTimeout(() => {
        setHighlight("primary");

        callback();
      }, TIMEOUT);
    }, [isCorrect, onSuccess, onError]);

    return (
      <Button
        ref={ref}
        color={highlight}
        variant="contained"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
);
