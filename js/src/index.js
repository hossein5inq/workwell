var bridge = require("./bridge/bridge.js");
var engine = require("./bridge/engine.js");
var navbar = require("./bridge/navbar.js");
var token = require("./bridge/token.js");
var auth = require("./bridge/auth.js");
var utils = require("./bridge/utils.js");
var ui = require("./ui/ui.js");
var errorHandler = require("./bridge/error-handler.js");
var config = require("./bridge/config");
var constants = require("./bridge/constants");
const ww_ = require("./ui/ww_");
const style = require("../../dist/css/workwell.css");

let mutationObserver;

window["Workwell_onShow"] = function () {
    // nothing
};

window["ww_"] = ww_;

function ready(fn) {
    if (typeof document !== "undefined" && document.readyState != 'loading') {
        fn();
    } else {
        if (typeof document !== "undefined")
            document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {
    document.body.addEventListener('touchstart', function () {

    });
    mutationObserver = new MutationObserver(function (mutations) {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                for (let addedNode of mutation.addedNodes) {
                    if (addedNode.onAttached) {
                        addedNode.onAttached();
                    }
                }
            } else if (mutation.type === 'attributes') {

            }
        }
    });

    mutationObserver.observe(document.body, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });

    ui.format();
});

/*let mutationObserver = new MutationObserver(function (mutations) {
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
            for (let addedNode of mutation.addedNodes) {
                console.log(addedNode);
                console.log(addedNode.troudballe);
            }
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
});

mutationObserver.observe(document.body, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
});*/

/**
 * @namespace
 */
var Workwell = {
    name: "Workwell",
    os: utils.getMobileOperatingSystem(),
    ui: ui,
    config: config,
    compatibilityVersion: config.getCompatibilityVersion(),
    constants: {
        transitions: {
            SLIDE_LEFT_TO_RIGHT: 0,
            SLIDE_RIGHT_TO_LEFT: 1,
            SLIDE_TOP_TO_BOTTOM: 2,
            SLIDE_BOTTOM_TO_TOP: 3
        }
    },
    navbar: navbar.getInstance(),
    /**
     * This function returns the navigation bar javascript object so that you can modify some aspects of it.
     * @returns {navbar} the app's navigation bar
     */
    getNavBar: function () {
        return navbar;
    },
    /**
     * This function retrieves the current user's info from the app.
     * @param {json} obj a json object
     * @param {function} obj.success - success callback function. It returns the user object
     * @param {function} obj.error - failure callback function. It returns the error
     * @example
     * Workwell.getUserInfo({
     *      success: function (data) {
     *          console.log(data);
     *          // You can then create a new user with the data you received,
     *          // or fetch an existing one in your db
     *
     *          // Here is an example of data you would receive:
     *          // {
     *          //      "user": {
     *          //          "address": "65, Workwell St., Paris, 75017",
     *          //          "email": "abc@workwell.io",
     *          //          "name": "This is not my name"
     *          //      }
     *          // }
     *
     *      },
     *      error: function (error) {
     *          console.log(error);
     *      }
     *});
     */
    getUserInfo: function (obj) {
        if (obj.success) {
            var fn = obj.success;
            obj.success = function (res) {
                config.setLocale(res.locale);
                fn(res);
            };
        } else {
            obj.success = function (res) {
                config.setLocale(res.locale);
            };
        }

        var jsonObj = engine.createJSONFrom("get", "userInfo", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    /**
     * This function makes you go back in your history stack. It makes the current view disappears in the app.
     */
    goBack: function () {
        var jsonObj = engine.createJSONFrom("core", "goBack", {});
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    /**
     * This function is called when the view is shown to the user. Mostly used for UI-refreshing purpose.
     * @param {function} fn a callback function
     * @example
     * Workwell.onShow(function(){
     *      refreshUI();
     *      callSomeFunction();
     * });
     */
    onShow: function (fn) {
        window["Workwell_onShow"] = fn;
    },
    ready: function (fn) {
        if (typeof document !== "undefined" && document.readyState != 'loading') {
            fn();
        } else {
            if (typeof document !== "undefined")
                document.addEventListener('DOMContentLoaded', fn);
        }
    },
    init: function (obj) {
        try {
            if (obj) {
                if (obj.requestToken && typeof(obj.requestToken) === "function")
                    auth.setRequestTokenFunction(obj.requestToken);
                else
                    throw new Error("Request Token function is missing !");
            } else {
                throw new Error("The init function must have a json object for argument !");
            }
        } catch (err) {
            errorHandler.log(err.stack);
        }
    },
    chooseImage: function (obj) {
        var jsonObj = engine.createJSONFrom("ui", "chooseImage", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    getLocation: function (obj) {
        if (obj && obj.success && typeof(obj.success) === "function") {
            window["getLocationSuccess"] = obj.success;
            var json = {};
            json.action = "get";
            json.target = "location";
            json.async = false;
            json.data = {};
            json.successCallback = "getLocationSuccess";
            bridge.sendFromJS(JSON.stringify(json));
        }
    },
    /**
     * This function opens a new page with Workwell's native way (instead of opening it in the same browser's web view). It's for a better UI / UX.
     * @param {string} url the url to navigato to
     */
    openWebPage: function (url) {
        var index = url.indexOf("?");
        if (index != -1) {
            // the query parameter exists in the url
            var beginString = url.substring(0, index);
            var endString = url.substring(index, url.length);
            var secondIndex = endString.indexOf(".");
            if (secondIndex != -1) {
                // the query parameter is not at the end, we need to move it to the end
                var query = endString.substring(0, secondIndex);
                url = beginString + endString.substring(secondIndex, endString.length) + query;
            }
        }

        var obj = {};
        obj.data = {
            href: url
        };
        var jsonObj = engine.createJSONFrom("core", "openWebPage", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    openPaymentModule: function (obj) {
        var jsonObj = engine.createJSONFrom("open", "payment", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    create: function (viewId, left, top) {
        var view = $("<div id='" + viewId + "' class='ww-view'></div>");
        view.css("left", left + "px");
        view.css("top", top + "px");
        return view;
    },
    refreshView: function () {
        var jsonObj = engine.createJSONFrom("ui", "refresh", {});
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    getNetworkType: function (obj) {
        var jsonObj = engine.createJSONFrom("get", "networkType", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    openChat: function (obj) {
        if (!obj || (obj && !obj.userServiceToken)) {
            throw new Error("You need to set the userServiceToken to call this method !");
        }
        obj.data = {
            userServiceToken: obj.userServiceToken
        };
        var jsonObj = engine.createJSONFrom("ui", "chat", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    getCurrentUserName: function (obj) {
        var jsonObj = engine.createJSONFrom("get", "userName", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    getCurrentUserEmail: function (obj) {
        var jsonObj = engine.createJSONFrom("get", "userEmail", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    getCurrentUser: function (obj) {
        var jsonObj = engine.createJSONFrom("get", "user", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    getUserById: function (obj) {
        var jsonObj = engine.createJSONFrom("get", "userById", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    changeNavBar: function (obj) {
        var jsonObj = engine.createJSONFrom("ui", "navigationBar", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    /**
     * This function sets the service token within the SDK. You must set your service token before you try fetching any info through WorkwellJS.
     * @param {string} token_ the service token generated from your back-end server
     */
    setServiceToken: function (token_) {
        token.setServiceToken(token_);
    },
    /**
     * This function opens the native action sheets.
     * @param {json} obj a json object
     * @param {string} obj.title - the title of the action sheets
     * @param {array} obj.actions - array of actions (id {string}, title {string}, type {string} : optional)
     * @param {function} obj.success - success callback function. It returns the id of the selected action
     * @param {function} obj.error - failure callback function. It returns the error
     * @example
     * Workwell.showActionSheet({
     *      title: "Please choose your favorite mobile platform",
     *      actions: [
     *          {
     *              id: "iosId",
     *              title: "iOS"
     *          },
     *          {
     *              id: "androidId",
     *              title: "Android",
     *              type: "default"
     *          },
     *          {
     *              id: "defaultId",
     *              title: "Remove",
     *              type: "destructive"
     *          }
     *      ],
     *      success: function(res){
     *          console.log(res.selectedAction);
     *      },
     *      error: function(err){
     *          console.log(err);
     *      }
     * )};
     */
    showActionSheet: function (obj) {
        obj.data = {
            title: obj.title,
            actions: obj.actions
        };
        var jsonObj = engine.createJSONFrom("ui", "actionSheet", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    /**
     * This function opens the native date(time) picker.
     * @param {json} obj a json object
     * @param {string} [obj.type] - can be : "date", "dateHourMinute" or "hourMinute"
     * @param {number} [obj.date] - timestamp
     * @param {number} [obj.minDate] - timestamp
     * @param {number} [obj.maxDate] - timestamp
     * @param {number} [obj.minuteInterval] - timestamp
     * @param {function} obj.success - success callback function. It returns a timestamp
     * @param {function} obj.error - failure callback function. It returns the error
     * @example
     * Workwell.showDateTimePicker({
     *      type: "dateHourMinute",
     *      date: moment.now(),
     *      success: function(res){
     *          console.log(res);
     *      },
     *      error: function(err){
     *          console.log(err);
     *      }
     * )};
     */
    showDateTimePicker: function (obj) {
        obj.data = {};
        if (obj.type)
            obj.data.type = obj.type;
        if (obj.date)
            obj.data.date = obj.date;
        if (obj.minDate)
            obj.data.minDate = obj.minDate;
        if (obj.maxDate)
            obj.data.maxDate = obj.maxDate;
        if (obj.minuteInterval)
            obj.data.minuteInterval = obj.minuteInterval;
        var jsonObj = engine.createJSONFrom("ui", "datePicker", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    preprocessLinks: function () {
        if (typeof document !== "undefined") {
            var anchors = document.getElementsByTagName('a');
            for (var z = 0; z < anchors.length; z++) {
                var elem = anchors[z];
                elem.onclick = function () {
                    module.exports.openWebPage(this.href);
                    return false;
                };
            }
        }
    },
    /**
     * This function shows a native toast message.
     * @param {string} message - The message you want to show
     * @param {string} [type] - can be : "success", "warning" or "error"
     * @example
     * Workwell.showMessage("This message is a success", "success");
     * @example
     * Workwell.showMessage("This message is an error", "error");
     */
    showMessage: function (message, type) {
        var obj = {};
        obj.data = {
            message: message,
            type: type
        };
        var jsonObj = engine.createJSONFrom("ui", "toastMessage", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    showNativeLoader: function () {
        var obj = {};
        var jsonObj = engine.createJSONFrom("ui", "showLoader", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    hideNativeLoader: function () {
        var obj = {};
        var jsonObj = engine.createJSONFrom("ui", "hideLoader", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    },
    track: function (eventName, properties) {
        if (!eventName || (typeof eventName !== "string")) {
            throw new Error("You need to set the eventName (as a String) !");
        }
        var obj = {};
        if (!properties) {
            var data_ = {};
            data_[constants.EVENT_GLOBAL_KEY] = eventName;
            obj.data = data_;
        } else {
            properties[constants.EVENT_GLOBAL_KEY] = eventName;
            obj.data = properties;
        }
        var jsonObj = engine.createJSONFrom("core", "track", obj);
        bridge.sendFromJS(JSON.stringify(jsonObj));
    }
};

module.exports = Workwell;