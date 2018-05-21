const Button = require("./base-components/ww-button.js");
const ListItem = require("./base-components/ww-list-item");
const List = require("./base-components/ww-list");
const ListItemTitle = require("./base-components/ww-list-item__title");
const ListItemLabel = require("./base-components/ww-list-item__label");
const ListItemChevronIcon = require("./base-components/ww-list-item__chevron-icon");
const Input = require("./base-components/ww-input");
const InputMaterial = require("./base-components/ww-input--material");
const SearchInput = require("./ww-search-input");
const Slider = require("./base-components/ww-slider");
const Switch = require("./base-components/ww-switch.js");
const PagingIndicator = require("./ww-paging-indicator");
const TextArea = require("./base-components/ww-textarea");
const TextAreaMaterial = require("./base-components/ww-textarea--material");
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
        "ww-list-item__icon"
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
    createListItemLabel: function () {
        return new ListItemLabel();
    },
    createListItemChevronIcon: function () {
        return new ListItemChevronIcon();
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

            if (el.style.width) {
                newEl.css("width", el.style.width);
            }

            if (el.hasAttribute("id")) {
                newEl.setId(el.getAttribute("id"));
            }

            if (el.hasAttribute("value")) {
                newEl.setCurrentValue(el.getAttribute("value"));
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
    }
};