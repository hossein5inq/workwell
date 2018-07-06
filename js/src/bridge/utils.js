import * as config from "./config";

export function getMobileOperatingSystem() {
    /*if (config.os)
        return config.os;*/

    if (typeof navigator !== "undefined") {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/windows phone/i.test(userAgent)) {
            //config.setOS("Windows Phone");
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            //config.setOS("android");
            return "android";
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            //config.setOS("ios");
            return "ios";
        }
    }

    return "unknown";
}

export function generateCallbackName(type) {
    return "Workwell_" + Math.floor(Math.random() * 10000000) + "_" + type;
}

export function isJson(text) {
    try {
        JSON.parse(text);
    } catch (e) {
        return false;
    }
    return true;
}