const ListItem = require("./ww-list-item");
const ListItemLabel = require("./base-components/ww-list-item-label");
const Slider = require("./base-components/ww-slider");
const uiUtils = require("./ui-utils");

module.exports = function (el) {
    let obj = {};

    if (typeof el === "string" && el.startsWith("#")) {
        // looking for id
        el = document.getElementById(el.substr(1));
    } else if (typeof el === "string" && el.startsWith(".")) {
        // looking for class
    }

    if (uiUtils.hasClass(el, "ww-list-item"))
        obj = new ListItem();
    else if (uiUtils.hasClass(el, "ww-slider")) {
        obj = new Slider();
    } else if (uiUtils.hasClass(el, "ww-list-item__label"))
        obj = new ListItemLabel();

    // assign all from obj to our Dom element
    Object.assign(el, obj);

    return el;
};