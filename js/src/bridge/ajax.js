var utils = require("./utils");

module.exports = {
    request: function (obj) {
        var req = new XMLHttpRequest();
        req.open(obj.type, obj.url, true);

        req.onload = function () {
            if (req.status >= 200 && req.status < 400) {
                // Success!
                var responseText = req.responseText;
                if (utils.isJson(responseText)) {
                    // JSON
                    var result = JSON.parse(responseText);
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
};