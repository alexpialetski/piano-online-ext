import { HTMLAttributes } from "react";
import Box from "@mui/material/Box";

export type TabPanelProps = HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps): JSX.Element => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box boxSizing="border-box" height="100%" sx={{ p: 3 }}>
        {children}
      </Box>
    )}
  </div>
);
