const Button = require("./base-components/ww-button.js");
const ListItem = require("./base-components/ww-list-item");
const List = require("./base-components/ww-list");
const ListItemTitle = require("./base-components/ww-list-item__title");
const ListItemSubtitle = require("./base-components/ww-list-item__subtitle");
const ListItemLabel = require("./base-components/ww-list-item__label");
const ListItemChevronIcon = require("./base-components/ww-list-item__chevron-icon");
const Input = require("./base-components/ww-input");
const InputMaterial = require("./base-components/ww-input--material");
const SearchInput = require("./ww-search-input");
const Slider = require("./base-components/ww-slider");
const Switch = require("./base-components/ww-switch.js");
const PagingIndicator = require("./base-components/ww-paging-indicator");
const TextArea = require("./base-components/ww-textarea");
const TextAreaMaterial = require("./base-components/ww-textarea--material");
const Banner = require("./base-components/ww-banner");
const BannerTitle = require("./base-components/ww-banner-title");
const BannerSubtitle = require("./base-components/ww-banner-subtitle");
const FAB = require("./base-components/ww-fab");
const Icon = require("./base-components/ww-icon");
const utils = require("../bridge/utils.js");
const uiUtils = require("./ui-utils");
const ww_ = require("./ww_");

module.exports = {
    os: utils.getMobileOperatingSystem(),
    elements: [
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
    ],
    createButton: function (text) {
        return new Button(text);
    },
    createList: function () {
        return new List();
    },
    createListItem: function (title, subtitle) {
        return new ListItem(title, subtitle);
    },
    createInput: function (type) {
        if (utils.getMobileOperatingSystem() === "android") {
            return new InputMaterial(type);
        }
        return new Input(type);
    },
    createPagingIndicator: function (pageCount, selectedPage) {
        return new PagingIndicator(pageCount, selectedPage);
    },
    createSearchInput: function () {
        return new SearchInput();
    },
    createSlider: function () {
        return new Slider();
    },
    createSwitch: function () {
        return new Switch();
    },
    createTextArea: function () {
        if (utils.getMobileOperatingSystem() === "android") {
            return new TextAreaMaterial();
        }
        return new TextArea();
    },
    createListItemTitle: function () {
        return new ListItemTitle();
    },
    createListItemSubtitle: function () {
        return new ListItemSubtitle();
    },
    createListItemLabel: function () {
        return new ListItemLabel();
    },
    createListItemChevronIcon: function () {
        return new ListItemChevronIcon();
    },
    createBanner: function () {
        return new Banner();
    },
    createBannerTitle: function () {
        return new BannerTitle();
    },
    createBannerSubtitle: function () {
        return new BannerSubtitle();
    },
    createFAB: function () {
        return new FAB();
    },
    createIcon: function () {
        return new Icon();
    },
    format: function () {

        uiUtils.addClass(document.body, "ww-body");

        for (let i = 0; i < module.exports.elements.length; i++) {
            let els = document.getElementsByClassName(module.exports.elements[i]);
            for (let j = 0; j < els.length; j++) {
                uiUtils.addClass(els[j], module.exports.elements[i]);
            }
        }

        let listItems = document.getElementsByClassName("ww-list-item");
        for (let i = 0; i < listItems.length; i++) {
            let el = listItems[i];

            if (uiUtils.hasClass(el, "ww-list-item--tappable")) {
                ww_(el).setTappable(true);
            }
        }

        let buttonElements = document.getElementsByClassName("ww-button");
        for (let i = 0; i < buttonElements.length; i++) {
            let el = buttonElements[i];
            let newEl = module.exports.createButton(buttonElements[i].textContent.trim());

            if (el.hasAttribute("id")) {
                newEl.setId(el.getAttribute("id"));
            }

            if (el.hasAttribute("onclick")) {
                uiUtils.convertEvent("click", el.getAttribute("onclick"), newEl);
            }

            el.parentNode.replaceChild(newEl.toHTMLElement(), el);
        }

        let sliderElements = document.getElementsByClassName("ww-slider");
        for (let i = 0; i < sliderElements.length; i++) {
            let el = sliderElements[i];
            let newEl = module.exports.createSlider();

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
            let newEl = module.exports.createInput();

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

        let textAreaAlements = document.getElementsByClassName("ww-textarea");
        for (let i = 0; i < textAreaAlements.length; i++) {
            let el = textAreaAlements[i];
            let newEl = module.exports.createTextArea();

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
            let newEl = module.exports.createSwitch();

            if (el.hasAttribute("id")) {
                newEl.setId(el.getAttribute("id"));
            }

            el.parentNode.replaceChild(newEl.toHTMLElement(), el);
        }

        let pagingIndicatorElements = document.getElementsByClassName("ww-paging-indicator");
        for (let i = 0; i < pagingIndicatorElements.length; i++) {
            let el = pagingIndicatorElements[i];
            let newEl = module.exports.createPagingIndicator();

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

        let searchInputElements = document.getElementsByClassName("ww-search-input");
        for (let i = 0; i < searchInputElements.length; i++) {
            let el = searchInputElements[i];
            let newEl = module.exports.createSearchInput();

            if (el.hasAttribute("id")) {
                newEl.setId(el.getAttribute("id"));
            }

            let method = "get";
            let action = "";
            let fnName = undefined;

            if (el.hasAttribute("placeholder")) {
                newEl.setValue(el.getAttribute("placeholder"), false);
            }

            if (el.hasAttribute("onInputAction")) {
                action = el.getAttribute("onInputAction");
            }

            if (el.hasAttribute("onInputMethod")) {
                method = el.getAttribute("onInputMethod");
            }

            newEl.setOnInputAction(action);
            newEl.setOnInputMethod(method);

            if (window[fnName])
                newEl.setResultConverterFunction(window[fnName]);

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
};