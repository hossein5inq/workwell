var config = require("./config");

module.exports = {
    getMobileOperatingSystem: function () {
        if (config.os)
            return config.os;

        if (typeof navigator !== "undefined") {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            if (/windows phone/i.test(userAgent)) {
                config.setOS("Windows Phone");
                return "Windows Phone";
            }

            if (/android/i.test(userAgent)) {
                config.setOS("android");
                return "android";
            }

            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                config.setOS("ios");
                return "ios";
            }
        }

        return "unknown";
    },
    generateCallbackName: function (type) {
        var r = Math.random();
        var res = "Workwell_" + Math.floor(r * 10000000) + "_" + type;
        return res;
    },
    isJson: function (text) {
        try {
            JSON.parse(text);
        } catch (e) {
            return false;
        }
        return true;
    }
};