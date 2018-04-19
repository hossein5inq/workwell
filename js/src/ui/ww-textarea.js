var utils = require("../bridge/utils.js");
var uiUtils = require("./ui-utils.js");

function textArea() {
    var id = "";
    var defaultClass = "ww-textarea";
    var os = utils.getMobileOperatingSystem();
    var textarea = document.createElement("textarea");
    var placeholder = "";

    uiUtils.addClass(textarea, defaultClass);

    this.addClass = function (className) {
        uiUtils.addClass(textarea, className);
    }

    this.getId = function () {
        return id;
    }

    this.setId = function (id_) {
        id = id_;
        textarea.id = id_;
    }

    this.setValue = function (value_) {
        textarea.value = value_;
    }

    this.getValue = function () {
        return textarea.value;
    }

    this.onClick = function (fn) {
        textarea.addEventListener("click", fn);
    }

    this.setPlaceholder = function (placeholder_) {
        placeholder = placeholder_;
        textarea.setAttribute("placeholder", placeholder_);
    }

    this.setMaxLength = function (maxLength_) {
        textarea.maxLength = maxLength_;
    }

    this.disable = function () {
        textarea.setAttribute("disabled", "");
    }

    this.enable = function () {
        textarea.removeAttribute("disabled");
    }

    this.toHTMLElement = function () {
        return textarea;
    }
}

module.exports = textArea;