var utils = require("../bridge/utils");

module.exports = {
    addClass: function (el, className) {
        if (utils.getMobileOperatingSystem() === "android") {
            if (className.startsWith("ww-")) {
                if (el.classList)
                    el.classList.add(className + "--material");
                else
                    el.className += " " + className + "--material";
            }
        }

        if (el.classList)
            el.classList.add(className);
        else
            el.className += " " + className;
    },
    removeClass: function (el, className) {
        if (el.classList) {
            el.classList.remove(className);
            if (utils.getMobileOperatingSystem() === "android") {
                el.classList.remove(className + "--material");
            }
        }
        else {
            if (utils.getMobileOperatingSystem() === "android") {
                let replacement = className + "--material";
                el.className = el.className.replace(new RegExp("(^|\\b)" + replacement.split(" ").join("|") + "(\\b|$)", "gi"), " ");
            }
            el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
        }
    },
    hasClass: function (el, className) {
        if (el.classList)
            return el.classList.contains(className);
        else
            return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
    },
    insertBefore: function (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode);
    },
    convertEvent: function (event, fn, wwElement) {
        var str = fn.split("(");
        if (str.length > 1) {
            var fnName = str[0];
            var fnArgumentsWithComma = str[1].split(")")[0];
            if (fnArgumentsWithComma.length > 0) {
                var fnArguments = fnArgumentsWithComma.split(",");

                for (var arg = 0; arg < fnArguments.length; arg++) {
                    if ((fnArguments[arg].charAt(0) === "'" && fnArguments[arg].charAt(fnArguments[arg].length - 1) === "'") ||
                        (fnArguments[arg].charAt(0) === "\"" && fnArguments[arg].charAt(fnArguments[arg].length - 1) === "\"")) {
                        // the argument is a string
                        fnArguments[arg] = fnArguments[arg].substring(1, fnArguments[arg].length - 1);
                    } else if (!isNaN(fnArguments[arg])) {
                        // the argument is a number
                        fnArguments[arg] = parseInt(fnArguments[arg]);
                    } else {
                        // the argument is undefined
                        fnArguments[arg] = undefined;
                    }
                }

                wwElement.addEventListener(event, function () {
                    /*if (fnArguments.length > size) {
                     // it's already been unshifted
                     fnArguments[0] = this.getInputValue();
                     } else {
                     fnArguments.unshift(this.getInputValue());
                     }*/

                    if (window[fnName])
                        window[fnName].apply(null, fnArguments);
                    else
                        throw new TypeError(fnName + " is not a function");
                });
            } else {
                wwElement.addEventListener(event, function () {
                    if (window[fnName])
                        window[fnName]();
                    else
                        throw new TypeError(fnName + " is not a function");
                });
            }
        } else {
            let fnName = str[0];
            wwElement.addEventListener(event, function () {
                throw new TypeError(fnName + " is not a function");
            });
        }
    },
    rgbToHex: function (rgb) {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    },
    fullColorHex: function (r, g, b) {
        var red = module.exports.rgbToHex(r);
        var green = module.exports.rgbToHex(g);
        var blue = module.exports.rgbToHex(b);
        return red + green + blue;
    }
};