import {sendFromJS} from "./bridge/bridge";
import {createJSONFrom} from "./bridge/engine";
import * as token from "./bridge/token";
import {getMobileOperatingSystem} from "./bridge/utils";
import * as constants_ from "./bridge/constants";
import * as ui_ from "./ui/ui";
import * as config from "./bridge/config";
import * as sdk from "./bridge/sdk";
import "./polyfills.js";
import "../../dist/css/workwell.css";

window["Workwell_onShow"] = function () {
    // nothing
};

ui_.ready(function () {
    document.body.addEventListener("touchstart", function () {

    });

    let mutationObserver = new MutationObserver(function (mutations) {
        for (let mutation of mutations) {
            if (mutation.type === "childList") {
                for (const addedNodeIndex in mutation.addedNodes) {
                    if (mutation.addedNodes[addedNodeIndex].onAttachedToDom) {
                        mutation.addedNodes[addedNodeIndex].onAttachedToDom();
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

export function getUserInfo(obj) {
    if (obj.success) {
        let fn = obj.success;
        obj.success = function (res) {
            ui.setLocale(res.locale);
            fn(res);
        };
    } else {
        obj.success = function (res) {
            ui.setLocale(res.locale);
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

export function chooseImage(obj) {
    sdk.chooseImage(obj);
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
    obj.data = {};
    if (obj) {
        if (obj.title) {
            obj.data.title = obj.title;
        }
    }
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

export function openEvent(obj) {
    if (!obj || (obj && !obj.eventId)) {
        throw new Error("You need to set the eventId to call this method !");
    }
    obj.data = {
        eventServiceToken: obj.eventId
    };
    const jsonObj = createJSONFrom("events", "openEvent", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function openEventsList() {
    const jsonObj = createJSONFrom("events", "openEventsList", {});
    sendFromJS(JSON.stringify(jsonObj));
}

export function getUserAccessToken(obj) {
    if (obj.success) {
        let fn = obj.success;
        obj.success = function (res) {
            let newRes = {};
            if (res.hasOwnProperty("user") && res.user.hasOwnProperty("user_access_token")) {
                newRes.user_access_token = res.user.user_access_token;
            }
            fn(newRes);
        };
    }

    const jsonObj = createJSONFrom("get", "userInfo", obj);
    sendFromJS(JSON.stringify(jsonObj));
}

export function setOS(os) {
    config.setOS(os);
}