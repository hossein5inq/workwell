var utils = require("../bridge/utils.js");
var uiUtils = require("./ui-utils.js");

function button(text) {
    var element = this;
    var id;
    var text = text;
    var defaultClass = "ww-button";
    var os = utils.getMobileOperatingSystem();
    var btn = document.createElement("button");
    uiUtils.addClass(btn, defaultClass);
    btn.innerHTML = text;

    this.getId = function () {
        return id;
    };

    this.setId = function (id_) {
        id = id_;
        btn.id = id_;
    };

    this.addEventListener = function (event, fn) {
        btn.addEventListener(event, function () {
            fn(element);
        });
    };

    this.onClick = function (fn) {
        btn.addEventListener("click", fn);
    };

    this.addClass = function (className) {
        uiUtils.addClass(btn, className);
    };

    this.disable = function () {
        btn.setAttribute("disabled", "");
    };

    this.enable = function () {
        btn.removeAttribute("disabled");
    };

    this.setType = function (type) {
        this.addClass("ww-button-" + type);
    };

    this.toHTMLElement = function () {
        return btn;
    };
}

module.exports = button;