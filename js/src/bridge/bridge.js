var util = require("./utils.js");

module.exports = {
    os: util.getMobileOperatingSystem(),
    sendFromJS: function (json) {
        if (this.os === "android") {
            window.jsbridge.sendFromJS(json);
        } else if (this.os === "ios") {
            window.webkit.messageHandlers.jsbridge.postMessage(json);
        }
    }
}