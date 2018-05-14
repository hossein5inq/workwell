var uiUtils = require("./ui-utils.js");

function input(type_) {
    var id = "";
    var defaultClass = "ww-input";
    var input = document.createElement("input");
    input.type = type_;
    var placeholder = "";
    var maxLength = 30; // default

    uiUtils.addClass(input, defaultClass);

    this.addClass = function (className) {
        uiUtils.addClass(input, className);
    };

    this.getId = function () {
        return id;
    };

    this.getValue = function () {
        return input.value;
    };

    this.setId = function (id_) {
        id = id_;
        input.id = id_;
    };

    this.setValue = function (value_) {
        input.value = value_;
    };

    this.onClick = function (fn) {
        input.addEventListener("click", fn);
    };

    this.setPlaceholder = function (placeholder_) {
        placeholder = placeholder_;
        input.setAttribute("placeholder", placeholder_);
    };

    this.getPlaceholder = function () {
        return placeholder;
    };

    this.getMaxLength = function () {
        return maxLength;
    };

    this.setMaxLength = function (maxLength_) {
        maxLength = maxLength_;
        input.maxLength = maxLength_;
    };

    this.toHTMLElement = function () {
        return input;
    };
}

module.exports = input;