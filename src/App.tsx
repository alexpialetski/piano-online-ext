import React, { useCallback, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { TabPanel } from "./components";
import { SecondInterval } from "./views";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const App = (): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => setValue(newValue),
    []
  );

  // useEffect(() => {
  //   chrome.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
  //     const currentTabId = tabs[0].id;

  //     if (currentTabId) {
  //       chrome.scripting
  //         .executeScript({
  //           target: { tabId: currentTabId },
  //           files: ["static/js/inject.js"],
  //         })
  //         .then(() => console.log("injected a function"));
  //     }
  //   });
  // }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Second interval" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SecondInterval />
      </TabPanel>
    </Box>
  );
};
