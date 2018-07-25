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
import ListItemSubtitle from "./base-components/ww-list-item__subtitle";
import ListItemChevronIcon from "./base-components/ww-list-item__chevron-icon";
import PagingIndicator from "./base-components/ww-paging-indicator";
import TextArea from "./base-components/ww-textarea";
import TextAreaMaterial from "./base-components/ww-textarea--material";
import BannerTitle from "./base-components/ww-banner-title";
import BannerSubtitle from "./base-components/ww-banner-subtitle";
import {getMobileOperatingSystem} from "../bridge/utils";
import {hasClass, addClass, convertEvent} from "./ui-utils";
import ww_ from "./ww_";

export let os = getMobileOperatingSystem();

export const elements = [
    "ww-button",
    "ww-list",
    "ww-input",
    "ww-list-header",
    "ww-list-item",
    "ww-list-item__left",
    "ww-list-item__center",
    "ww-list-item__right",
    "ww-list-item__title",
    "ww-list-item__subtitle",
    "ww-list-item__label",
    "ww-list-item__icon",
    "ww-banner",
    "ww-banner__title",
    "ww-banner__subtitle",
    "ww-fab",
    "ww-icon"
];

export function createButton(text) {
    return new Button(text);
}

export function createList() {
    return new List();
}

export function createListItem() {
    return new ListItem();
}

export function createInput(type) {
    if (getMobileOperatingSystem() === "android") {
        return new InputMaterial(type);
    }
    return new Input(type);
}

export function createPagingIndicator(pageCount, selectedPage) {
    return new PagingIndicator(pageCount, selectedPage);
}

export function createSlider() {
    return new Slider();
}

export function createSwitch() {
    return new Switch();
}

export function createTextArea() {
    if (getMobileOperatingSystem() === "android") {
        return new TextAreaMaterial();
    }
    return new TextArea();
}

export function createListItemTitle(title) {
    return new ListItemTitle(title);
}

export function createListItemSubtitle(subtitle) {
    return new ListItemSubtitle(subtitle);
}

export function createListItemLabel(label) {
    return new ListItemLabel(label);
}

export function createListItemChevronIcon() {
    return new ListItemChevronIcon();
}

export function createBanner() {
    return new Banner();
}

export function createBannerTitle(title) {
    return new BannerTitle(title);
}

export function createBannerSubtitle(subtitle) {
    return new BannerSubtitle(subtitle);
}

export function createFAB() {
    return new FAB();
}

export function createIcon() {
    return new Icon();
}

export function $(el){
    return ww_(el);
}

export function ready(fn) {
    if (typeof document !== "undefined" && document.readyState !== "loading") {
        fn();
    } else {
        if (typeof document !== "undefined")
            document.addEventListener("DOMContentLoaded", fn);
    }
}

export function format() {
    addClass(document.body, "ww-body");

    for (let i = 0; i < elements.length; i++) {
        let els = document.getElementsByClassName(elements[i]);
        for (let j = 0; j < els.length; j++) {
            addClass(els[j], elements[i]);
        }
    }

    let listItems = document.getElementsByClassName("ww-list-item");
    for (let i = 0; i < listItems.length; i++) {
        let el = listItems[i];

        if (hasClass(el, "ww-list-item--tappable")) {
            ww_(el).setTappable(true);
        }
    }

    let buttonElements = document.getElementsByClassName("ww-button");
    for (let i = 0; i < buttonElements.length; i++) {
        let el = buttonElements[i];
        let newEl = createButton(buttonElements[i].textContent.trim());

        if (el.hasAttribute("id")) {
            newEl.setId(el.getAttribute("id"));
        }

        if (el.hasAttribute("onclick")) {
            convertEvent("click", el.getAttribute("onclick"), newEl);
        }

        el.parentNode.replaceChild(newEl.toHTMLElement(), el);
    }

    let sliderElements = document.getElementsByClassName("ww-slider");
    for (let i = 0; i < sliderElements.length; i++) {
        let el = sliderElements[i];
        let newEl = createSlider();

        if (el.hasAttribute("id")) {
            newEl.setId(el.getAttribute("id"));
        }

        if (el.hasAttribute("data-value")) {
            newEl.setCurrentValue(el.getAttribute("data-value"));
        }

        if (el.hasAttribute("data-step")) {
            newEl.setStep(el.getAttribute("data-step"));
        }

        if (el.hasAttribute("data-min")) {
            newEl.setMin(el.getAttribute("data-min"));
        }

        if (el.hasAttribute("data-max")) {
            newEl.setMax(el.getAttribute("data-max"));
        }

        el.parentNode.replaceChild(newEl.toHTMLElement(), el);
    }

    let inputElements = document.getElementsByClassName("ww-input");
    for (let i = 0; i < inputElements.length; i++) {
        let el = inputElements[i];
        let newEl = createInput();

        if (el.hasAttribute("id")) {
            newEl.setId(el.getAttribute("id"));
        }
        if (el.hasAttribute("type")) {
            newEl.setType(el.getAttribute("type"));
        }
        if (el.hasAttribute("placeholder")) {
            newEl.setPlaceholder(el.getAttribute("placeholder"));
        }
        if (el.hasAttribute("data-value")) {
            newEl.setValue(el.getAttribute("data-value"));
        }
        if (el.hasAttribute("data-assistive-text")) {
            newEl.setAssistiveText(el.getAttribute("data-assistive-text"));
        }

        el.parentNode.replaceChild(newEl.toHTMLElement(), el);
    }

    let textAreaAlements = document.getElementsByClassName("ww-textarea");
    for (let i = 0; i < textAreaAlements.length; i++) {
        let el = textAreaAlements[i];
        let newEl = createTextArea();

        if (el.hasAttribute("id")) {
            newEl.setId(el.getAttribute("id"));
        }
        if (el.hasAttribute("type")) {
            newEl.setType(el.getAttribute("type"));
        }
        if (el.hasAttribute("placeholder")) {
            newEl.setPlaceholder(el.getAttribute("placeholder"));
        }
        if (el.hasAttribute("data-assistive-text")) {
            newEl.setAssistiveText(el.getAttribute("data-assistive-text"));
        }

        el.parentNode.replaceChild(newEl.toHTMLElement(), el);
    }

    let switchElements = document.getElementsByClassName("ww-switch");
    for (let i = 0; i < switchElements.length; i++) {
        let el = switchElements[i];
        let newEl = createSwitch();

        if (el.hasAttribute("id")) {
            newEl.setId(el.getAttribute("id"));
        }

        el.parentNode.replaceChild(newEl.toHTMLElement(), el);
    }

    let pagingIndicatorElements = document.getElementsByClassName("ww-paging-indicator");
    for (let i = 0; i < pagingIndicatorElements.length; i++) {
        let el = pagingIndicatorElements[i];
        let newEl = createPagingIndicator();

        if (el.hasAttribute("id")) {
            newEl.setId(el.getAttribute("id"));
        }

        if (el.hasAttribute("data-page-count")) {
            newEl.setPageCount(el.getAttribute("data-page-count"));
        }

        if (el.hasAttribute("data-selected-page")) {
            newEl.setSelectedPage(el.getAttribute("data-selected-page"));
        }

        el.parentNode.replaceChild(newEl.toHTMLElement(), el);
    }

    let bannerElements = document.getElementsByClassName("ww-banner");
    for (let i = 0; i < bannerElements.length; i++) {
        let el = bannerElements[i];

        if (el.hasAttribute("data-image")) {
            ww_(el).setBackgroundImage(el.getAttribute("data-image"));
        }
    }

    let fabElements = document.getElementsByClassName("ww-fab");
    for (let i = 0; i < fabElements.length; i++) {
        let el = fabElements[i];

        if (el.hasAttribute("data-theme")) {
            ww_(el).setTheme(el.getAttribute("data-theme"));
        }

        if (el.hasAttribute("data-position")) {
            ww_(el).setPosition(el.getAttribute("data-position"));
        }

        ww_(el).updateTopPosition();
    }

    let iconElements = document.getElementsByClassName("ww-icon");
    for (let i = 0; i < iconElements.length; i++) {
        let el = iconElements[i];

        if (el.hasAttribute("data-type")) {
            ww_(el).setType(el.getAttribute("data-type"));
        }
    }
}