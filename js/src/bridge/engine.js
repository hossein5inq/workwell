const util = require("./utils.js");
const token = require("./token.js");
const errorHandler = require("./error-handler.js");
const config = require("./config");

module.exports = {
    createJSONFrom: function (action, target, obj) {
        if (token.getServiceToken().tokenId.trim() === "") {
            // empty service token
            throw new Error("You need to set the service token before using any methods from the SDK !");
        }

        var json = {};
        json.action = action;
        json.target = target;
        json.token = token.getServiceToken();
        json.compatibilityVersion = config.getCompatibilityVersion();

        try {
            if (obj) {
                if (action === "ui" || action === "core")
                    json.data = obj.data;
                else if (action === "get") {
                    json.data = {};
                    if (target === "userById") {
                        if (!obj.id)
                            throw new Error("getUserById needs an id in the json object !");
                        else
                            json.data.userId = obj.id;
                    } else if (target === "userInfo") {
                        json.data.serviceToken = json.token.tokenId;
                    }
                } else {
                    if (obj.data) {
                        json.data = obj.data;
                    } else {
                        json.data = {};
                    }
                }

                if (action === "ui" || action === "open" || action === "core" || action === "get") {
                    var successCallback = util.generateCallbackName("success");
                    var errorCallback = util.generateCallbackName("error");
                    json.successCallback = successCallback;
                    json.errorCallback = errorCallback;
                    if (typeof window !== "undefined") {
                        if (obj.success) {
                            //json.successCallback = successCallback;
                            window[successCallback] = obj.success;
                        } else {
                            window[successCallback] = function () {

                            };
                        }

                        if (obj.error) {
                            //json.errorCallback = errorCallback;
                            window[errorCallback] = obj.error;
                        } else {
                            window[errorCallback] = function () {

                            };
                        }
                    }
                }

                if (obj && obj.transition) {
                    json.transition = obj.transition;
                } else {
                    // DEFAULT
                    //json.transition = Workwell.constants.transitions.SLIDE_RIGHT_TO_LEFT;
                    json.transition = 1;
                }

                return json;

            } else {
                throw new Error("The method you're calling needs a json object for argument !");
            }
        } catch (err) {
            errorHandler.log(err.stack);
        }

        return undefined;
    }
};