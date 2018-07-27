import {hasClass} from "./ui-utils";
import Slider from "./base-components/ww-slider";
import ListItem from "./base-components/ww-list-item";
import ListItemLabel from "./base-components/ww-list-item__label";
import ListItemTitle from "./base-components/ww-list-item__title";
import Button from "./base-components/ww-button";
import List from "./base-components/ww-list";
import Switch from "./base-components/ww-switch";
import Banner from "./base-components/ww-banner";
import FAB from "./base-components/ww-fab";
import Icon from "./base-components/ww-icon";
import Input from "./base-components/ww-input";
import InputMaterial from "./base-components/ww-input--material";
import TextArea from "./base-components/ww-textarea";
import TextAreaMaterial from "./base-components/ww-textarea--material";

export default function ww_(el) {
    let obj = {};

    if (typeof el === "string" && el.startsWith("#")) {
        // looking for an element with a certain id
        el = document.getElementById(el.substr(1));
    } else if (typeof el === "string" && el.startsWith(".")) {
        // looking for elements with a certain class
    } else {
        // it's an element

    }

    if (hasClass(el, "ww-slider")) {
        obj = new Slider();
    } else if (hasClass(el, "ww-list-item__label")) {
        obj = new ListItemLabel();
    } else if (hasClass(el, "ww-list-item__title")) {
        obj = new ListItemTitle();
    } else if (hasClass(el, "ww-list-item")) {
        obj = new ListItem();
    } else if (hasClass(el, "ww-button")) {
        obj = new Button();
    } else if (hasClass(el, "ww-list")) {
        obj = new List();
    } else if (hasClass(el, "ww-switch")) {
        obj = new Switch();
    } else if (hasClass(el, "ww-banner")) {
        obj = new Banner();
    } else if (hasClass(el, "ww-fab")) {
        obj = new FAB();
    } else if (hasClass(el, "ww-icon")) {
        obj = new Icon();
    } else if (hasClass(el, "ww-input")) {
        obj = new Input();
    } else if (hasClass(el, "ww-input__container")) {
        if (el.querySelector("textarea") === null)
            obj = new InputMaterial();
        else
            obj = new TextAreaMaterial();
    } else if (hasClass(el, "ww-textarea")) {
        obj = new TextArea();
    }

    Object.assign(obj, el);
    obj.el = el;

    return obj;
}