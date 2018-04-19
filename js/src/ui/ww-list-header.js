var utils = require("../bridge/utils.js");
var uiUtils = require("./ui-utils.js");

function listHeader(text) {
    var id = "";
    var defaultClass = "ww-list-header";
    var os = utils.getMobileOperatingSystem();
    var li = document.createElement("li");
    var text = text;
    var type = "";
    var badge = 0;
    uiUtils.addClass(li, defaultClass);
    li.innerHTML = text;

    this.addClass = function (className) {
        uiUtils.addClass(li, className);
    }

    this.setBorderBottom = function (style) {
        li.style.borderBottom = style;
    }

    this.setId = function (id_) {
        id = id_;
        li.id = id_;
    }

    this.onClick = function (fn) {
        li.addEventListener("click", fn);
    }

    this.refresh = function () {
        li.innerHTML = text;
        //styler.style(li);
    }

    this.toHTMLElement = function () {
        return li;
    }
}

module.exports = listHeader;