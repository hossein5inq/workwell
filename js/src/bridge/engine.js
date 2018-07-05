import {generateCallbackName} from "./utils";
import {getServiceToken} from "./token";
import {log} from "./error-handler";
import {getCompatibilityVersion} from "./config";

export function createJSONFrom(action, target, obj) {
    if (getServiceToken().tokenId.trim() === "") {
        // empty service token
        throw new Error("You need to set the service token before using any methods from the SDK !");
    }

    let json = {};
    json.action = action;
    json.target = target;
    json.token = getServiceToken();
    json.compatibilityVersion = getCompatibilityVersion();

    try {
        if (obj) {
            if (action === "ui" || action === "core" || action === "location")
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

            if (action === "ui" || action === "open" || action === "core" || action === "get" || action === "location") {
                const successCallback = generateCallbackName("success");
                const errorCallback = generateCallbackName("error");
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
        log(err.stack);
    }

    return undefined;
}