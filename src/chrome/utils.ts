import { CommonMessage, MessageResponse } from "./types";

export const chromeSendMessage = <T extends CommonMessage<string, any, any>>(
  message: T,
  queryTabInfo: chrome.tabs.QueryInfo = { active: true, currentWindow: true }
) =>
  new Promise<MessageResponse<T>>((res) => {
    chrome.tabs?.query(queryTabInfo, (tabs) => {
      const currentTabId = tabs[0].id;

      if (currentTabId) {
        chrome.tabs.sendMessage(currentTabId, message, res);
      }
    });
  });

export const injectScript = (fn: () => void) => {
  const script = document.createElement("script");
  script.text = `(${fn.toString()})();`;
  document.documentElement.appendChild(script);
};
