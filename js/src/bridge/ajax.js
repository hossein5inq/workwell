import {isJson} from "./utils";

export function request(obj) {
    let req = new XMLHttpRequest();
    req.open(obj.type, obj.url, true);

    req.onload = function () {
        if (req.status >= 200 && req.status < 400) {
            // Success!
            const responseText = req.responseText;
            if (isJson(responseText)) {
                // JSON
                const result = JSON.parse(responseText);
                if (obj.success) {
                    obj.success(result);
                }
            } else {
                // TEXT
                if (obj.success) {
                    obj.success(responseText);
                }
            }
        } else {
            // We reached our target server, but it returned an error
            if (obj.error) {
                obj.error(req);
            }
        }
    };

    req.onerror = function () {
        // There was a connection error of some sort
        if (obj.error) {
            obj.error("Connection error !");
        }
    };

    req.send();
}