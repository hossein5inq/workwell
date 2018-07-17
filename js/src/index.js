import {sendFromJS} from "./bridge/bridge";
import {createJSONFrom} from "./bridge/engine";
import * as navbar from "./bridge/navbar";
import * as token from "./bridge/token";
import {getMobileOperatingSystem} from "./bridge/utils";
import * as config_ from "./bridge/config";
import * as constants_ from "./bridge/constants";
import * as ui_ from "./ui/ui";
import ww_ from "./ui/ww_";
import "../../dist/css/workwell.css";

window["Workwell_onShow"] = function () {
    // nothing
};

ready(function () {
    document.body.addEventListener("touchstart", function () {

    });

    let mutationObserver = new MutationObserver(function (mutations) {
        for (let mutation of mutations) {
            if (mutation.type === "childList") {
                for (let addedNode of mutation.addedNodes) {
                    if (addedNode.onAttachedToDom) {
                        addedNode.onAttachedToDom();
                    }
                }
            }
        }
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    ui.format();
});

export const name = "Workwell";
export let os = getMobileOperatingSystem();
export const ui = ui_;
export let config = config_;
export const constants = {
    transitions: {
        SLIDE_LEFT_TO_RIGHT: 0,
        SLIDE_RIGHT_TO_LEFT: 1,
        SLIDE_TOP_TO_BOTTOM: 2,
        SLIDE_BOTTOM_TO_TOP: 3
    }
};

export function getNavBar() {
    return navbar;
}

export function getUserInfo(obj) {
    if (obj.success) {
        let fn = obj.success;
        obj.success = function (res) {
            config.setLocale(res.locale);
            fn(res);
        };
    } else {
        obj.success = function (res) {
            config.setLocale(res.locale);
        };
    }

    const jsonObj = createJSONFrom("get", "userInfo", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function goBack() {
    const jsonObj = createJSONFrom("core", "goBack", {});
    sendFromJS(JSON.stringify(jsonObj));
}

export function onShow(fn) {
    window["Workwell_onShow"] = fn;
}

export function ready(fn) {
    if (typeof document !== "undefined" && document.readyState !== "loading") {
        fn();
    } else {
        if (typeof document !== "undefined")
            document.addEventListener("DOMContentLoaded", fn);
    }
}

export function init() {

}

export function chooseImage(obj) {
    const jsonObj = createJSONFrom("ui", "chooseImage", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function getLocation(obj) {
    if (obj && obj.success && typeof(obj.success) === "function") {
        window["getLocationSuccess"] = obj.success;
        let json = {};
        json.action = "get";
        json.target = "location";
        json.async = false;
        json.data = {};
        json.successCallback = "getLocationSuccess";
        sendFromJS(JSON.stringify(json));
    }
}

export function openWebPage(url) {
    const index = url.indexOf("?");
    if (index !== -1) {
        // the query parameter exists in the url
        const beginString = url.substring(0, index);
        const endString = url.substring(index, url.length);
        const secondIndex = endString.indexOf(".");
        if (secondIndex !== -1) {
            // the query parameter is not at the end, we need to move it to the end
            const query = endString.substring(0, secondIndex);
            url = beginString + endString.substring(secondIndex, endString.length) + query;
        }
    }

    let obj = {};
    obj.data = {
        href: url
    };
    const jsonObj = createJSONFrom("core", "openWebPage", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function openPaymentModule(obj) {
    const jsonObj = createJSONFrom("open", "payment", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function refreshView() {
    const jsonObj = createJSONFrom("ui", "refresh", {});
    sendFromJS(JSON.stringify(jsonObj));
}

export function getNetworkType(obj) {
    const jsonObj = createJSONFrom("get", "networkType", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function openChat(obj) {
    if (!obj || (obj && !obj.userServiceToken)) {
        throw new Error("You need to set the userServiceToken to call this method !");
    }
    obj.data = {
        userServiceToken: obj.userServiceToken
    };
    const jsonObj = createJSONFrom("ui", "chat", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function changeNavBar(obj) {
    const jsonObj = createJSONFrom("ui", "navigationBar", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function setServiceToken(token_) {
    token.setServiceToken(token_);
}

export function showActionSheet(obj) {
    obj.data = {
        title: obj.title,
        actions: obj.actions
    };
    const jsonObj = createJSONFrom("ui", "actionSheet", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function showDateTimePicker(obj) {
    let defaultDateTSInSeconds = Math.floor(new Date().getTime() / 1000);
    let dayInSeconds = 60 * 60 * 24;
    obj.data = {};
    if (obj.type)
        obj.data.type = obj.type;
    else
        obj.data.type = "date";
    if (obj.date)
        obj.data.date = obj.date;
    else
        obj.data.date = defaultDateTSInSeconds;
    if (obj.minDate)
        obj.data.minDate = obj.minDate;
    else
        obj.data.minDate = defaultDateTSInSeconds;
    if (obj.maxDate)
        obj.data.maxDate = obj.maxDate;
    else
        obj.data.maxDate = defaultDateTSInSeconds + 3 * dayInSeconds;
    if (obj.minuteInterval)
        obj.data.minuteInterval = obj.minuteInterval;
    else
        obj.data.minuteInterval = 15;
    const jsonObj = createJSONFrom("ui", "datePicker", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function preprocessLinks() {
    if (typeof document !== "undefined") {
        const anchors = document.getElementsByTagName("a");
        for (let z = 0; z < anchors.length; z++) {
            let elem = anchors[z];
            elem.onclick = function () {
                module.exports.openWebPage(this.href);
                return false;
            };
        }
    }
}

export function showMessage(message, type) {
    let obj = {};
    obj.data = {
        message: message,
        type: type
    };
    const jsonObj = createJSONFrom("ui", "toastMessage", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function showNativeLoader() {
    let obj = {};
    const jsonObj = createJSONFrom("ui", "showLoader", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function hideNativeLoader() {
    let obj = {};
    const jsonObj = createJSONFrom("ui", "hideLoader", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function track(eventName, properties) {
    if (!eventName || (typeof eventName !== "string")) {
        throw new Error("You need to set the eventName (as a String) !");
    }
    let obj = {};
    if (!properties) {
        let data_ = {};
        data_[constants_.EVENT_GLOBAL_KEY] = eventName;
        obj.data = data_;
    } else {
        properties[constants_.EVENT_GLOBAL_KEY] = eventName;
        obj.data = properties;
    }
    const jsonObj = createJSONFrom("core", "track", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function subscribe(obj) {
    if (!obj.id) {
        throw new Error("An id is required in the json to call this method");
    } else if (!obj.type) {
        throw new Error("A type is required in the json to call this method");
    } else {
        let objCopy = Object.assign({}, obj);
        obj.data = {};
        for (let key in objCopy) {
            if (key !== "change")
                obj.data[key] = objCopy[key];
        }

        if (obj.change) {
            obj.success = obj.change;
        }

        let jsonObj = createJSONFrom(obj.type, "subscribe", obj);
        sendFromJS(JSON.stringify(jsonObj));
    }
}

export function unsubscribe(obj_) {
    if (!obj_.id) {
        throw new Error("An id is required in the json to call this method");
    } else if (!obj_.type) {
        throw new Error("A type is required in the json to call this method");
    } else {
        let obj = {};
        obj.data = {
            id: obj_.id,
            type: obj_.type
        };
        let jsonObj = createJSONFrom(obj_.type, "unsubscribe", obj);
        sendFromJS(JSON.stringify(jsonObj));
    }
}

export function $(el) {
    return ww_(el);
}