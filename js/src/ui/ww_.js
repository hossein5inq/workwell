const uiUtils = require("./ui-utils");
const Slider = require("./base-components/ww-slider");
const ListItem = require("./base-components/ww-list-item");
const ListItemLabel = require("./base-components/ww-list-item__label");
const Button = require("./base-components/ww-button");
const List = require("./base-components/ww-list");
const Switch = require("./base-components/ww-switch");
const Banner = require("./base-components/ww-banner");
const FAB = require("./base-components/ww-fab");
const Icon = require("./base-components/ww-icon");
const Input = require("./base-components/ww-input");
const InputMaterial = require("./base-components/ww-input--material");

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
    } else if (uiUtils.hasClass(el, "ww-button")) {
        obj = new Button();
    } else if (uiUtils.hasClass(el, "ww-list")) {
        obj = new List();
    } else if (uiUtils.hasClass(el, "ww-switch")) {
        obj = new Switch();
    } else if (uiUtils.hasClass(el, "ww-banner")) {
        obj = new Banner();
    } else if (uiUtils.hasClass(el, "ww-fab")) {
        obj = new FAB();
    } else if (uiUtils.hasClass(el, "ww-icon")) {
        obj = new Icon();
    } else if (uiUtils.hasClass(el, "ww-input")) {
        obj = new Input();
    } else if (uiUtils.hasClass(el, "ww-input__container")) {
        obj = new InputMaterial();
    }

    Object.assign(obj, el);
    obj.el = el;

    return obj;
};