import "./handlers";
// import { injectScript } from "./utils";

// injectScript(chrome.runtime.getURL("static/js/inject.js"));

console.log(`
Object.defineProperty(window, "inFocus", {
    value: true,
    writable: false,
    configurable: false,
});
`);
