const uiUtils = require("./ui-utils");
const Slider = require("./base-components/ww-slider");
const ListItem = require("./base-components/ww-list-item");
const ListItemLabel = require("./base-components/ww-list-item__label");

module.exports = function (el) {
    let obj = {};

    if (typeof el === "string" && el.startsWith("#")) {
        // looking for an element with a certain id
        el = document.getElementById(el.substr(1));
    } else if (typeof el === "string" && el.startsWith(".")) {
        // looking for elements with a certain class
    } else {
        // it's an element

    }

    if (uiUtils.hasClass(el, "ww-slider")) {
        obj = new Slider();
    } else if (uiUtils.hasClass(el, "ww-list-item__label")) {
        obj = new ListItemLabel();
    } else if (uiUtils.hasClass(el, "ww-list-item")) {
        obj = new ListItem();
    }

    Object.assign(obj, el);
    obj.el = el;

    return obj;
};