import {getMobileOperatingSystem} from "./utils";

export let os = getMobileOperatingSystem();

export function sendFromJS(json) {
    if (os === "android") {
        window.jsbridge.sendFromJS(json);
    } else if (os === "ios") {
        window.webkit.messageHandlers.jsbridge.postMessage(json);
    }
}