import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { Mode } from "~/hooks/useTraining";

const isMode = (value: string): value is Mode =>
  (["elimination", "mistakes"] as Mode[]).includes(value as Mode);

export type ModeControlsProps = {
  currentMode: Mode;
  changeMode: (mode: Mode) => void;
};

export const ModeControls = ({
  currentMode,
  changeMode,
}: ModeControlsProps): JSX.Element => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newMode: string) => {
    if (isMode(newMode)) {
      changeMode(newMode);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={currentMode}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value={"elimination" as Mode}>Elimination</ToggleButton>
      <ToggleButton value={"mistakes" as Mode}>Mistakes</ToggleButton>
    </ToggleButtonGroup>
  );
};
