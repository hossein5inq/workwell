const Button = require("./ww-button.js");
const ListItem = require("./ww-list-item.js");
const List = require("./ww-list.js");
const ListHeader = require("./ww-list-header.js");
const Input = require("./ww-input.js");
const SearchInput = require("./ww-search-input");
const Slider = require("./base-components/ww-slider");
const SwitchComponent = require("./ww-switch.js");
const PagingIndicator = require("./ww-paging-indicator");
const TextArea = require("./ww-textarea");
const utils = require("../bridge/utils.js");
const uiUtils = require("./ui-utils");

module.exports = {
    os: utils.getMobileOperatingSystem(),
    elements: [
        "ww-button",
        "ww-list",
        "ww-list-header",
        "ww-list-item",
        "ww-list-item__left",
        "ww-list-item__center",
        "ww-list-item__right",
        "ww-list-item__title",
        "ww-list-item__subtitle",
        "ww-list-item__label"
    ],
    addClass: function (el, className) {
        if (el.classList)
            el.classList.add(className);
        else
            el.className += " " + className;
    },
    removeClass: function (el, className) {
        if (el.classList)
            el.classList.remove(className);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },
    createButton: function (text) {
        return new Button(text);
    },
    createList: function () {
        return new List();
    },
    createListHeader: function (text) {
        return new ListHeader(text);
    },
    createListItem: function (title, subtitle) {
        return new ListItem(title, subtitle);
    },
    createInput: function (type) {
        return new Input(type);
    },
    format: function () {
        var listElements = document.getElementsByClassName('ww-list');
        for (var i = 0; i < listElements.length; i++) {
            var el = listElements[i];
            var newEl = module.exports.createList();

            if (el.hasAttribute("id")) {
                newEl.setId(el.getAttribute("id"));
            }

            if (el.hasAttribute("data-list-type")) {
                newEl.setType(el.getAttribute("data-list-type"));
            }

            // Add all the other classes that were put in the html
            for (var c = 0; c < el.classList.length; c++) {
                if (el.classList[c] !== "ww-list") {
                    newEl.addClass(el.classList[c]);
                }
            }

            var listHeaderElements = el.getElementsByClassName('ww-list-header');
            for (var h = 0; h < listHeaderElements.length; h++) {
                var header = listHeaderElements[h];
                var newHeader = module.exports.createListHeader(header.textContent.trim());

                // Add all the other classes that were put in the html
                for (var c = 0; c < header.classList.length; c++) {
                    if (header.classList[c] != "ww-list-header") {
                        newHeader.addClass(header.classList[c]);
                    }
                }

                newEl.setHeader(newHeader);
            }

            var listItemElements = el.getElementsByClassName('ww-list-item');
            for (var li = 0; li < listItemElements.length; li++) {
                var listItem = listItemElements[li];
                var newListItem = module.exports.createListItem();

                // Add all the other classes that were put in the html
                for (var c = 0; c < listItem.classList.length; c++) {
                    if (listItem.classList[c] != "ww-list-item") {
                        if (listItem.classList[c] == "ww-list-item--tappable") {
                            newListItem.setTappable(true);
                        } else {
                            newListItem.addClass(listItem.classList[c]);
                        }
                    }
                }

                var listItemTitleElements = listItem.getElementsByClassName('ww-list-item__title');
                for (var lit = 0; lit < listItemTitleElements.length; lit++) {
                    newListItem.setTitle(listItemTitleElements[lit].textContent.trim());
                }

                var listItemSubtitleElements = listItem.getElementsByClassName('ww-list-item__subtitle');
                for (var lis = 0; lis < listItemSubtitleElements.length; lis++) {
                    newListItem.setSubtitle(listItemSubtitleElements[lis].textContent.trim());
                }

                var listItemIconElements = listItem.getElementsByClassName('ww-list-item__icon');
                for (var lii = 0; lii < listItemIconElements.length; lii++) {
                    var iconClass = "";
                    for (var c = 0; c < listItemIconElements[lii].classList.length; c++) {
                        if (listItemIconElements[lii].classList[c].startsWith("icon-")) {
                            iconClass = listItemIconElements[lii].classList[c];
                            break;
                        }
                    }
                    newListItem.setIcon(iconClass);
                }

                var listItemLabelElements = listItem.getElementsByClassName('ww-list-item__label');
                for (var lil = 0; lil < listItemLabelElements.length; lil++) {
                    newListItem.setLabel(listItemLabelElements[lil].textContent.trim());
                }

                var listItemThumbnailElements = listItem.getElementsByClassName('ww-list-item__thumbnail');
                for (var lit = 0; lit < listItemThumbnailElements.length; lit++) {
                    var src = listItemThumbnailElements[lit].src;
                    newListItem.setThumbnail(src);
                }

                let switchElements = listItem.getElementsByClassName('ww-switch');
                for (let se = 0; se < switchElements.length; se++) {
                    newListItem.setSwitch(module.exports.createSwitch());
                }

                let sliderElements = listItem.getElementsByClassName('ww-slider');
                for (let se = 0; se < sliderElements.length; se++) {
                    let el = sliderElements[se];
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

                    newListItem.addToCenter(newEl);
                }

                newEl.add(newListItem);
            }

            el.parentNode.replaceChild(newEl.toHTMLElement(), el);
        }

        let buttonElements = document.getElementsByClassName('ww-button');
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

        let switchElements = document.getElementsByClassName("ww-switch");
        for (let i = 0; i < switchElements.length; i++) {
            let el = switchElements[i];
            let newEl = module.exports.createSwitch();

            el.parentNode.replaceChild(newEl.toHTMLElement(), el);
        }

        let pagingIndicatorElements = document.getElementsByClassName('ww-paging-indicator');
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

        let searchInputElements = document.getElementsByClassName('ww-search-input');
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

            if (el.hasAttribute("resultConverter")) {
                let fn = el.getAttribute("resultConverter");
                let str = fn.split("(");
                let fnName = str[0];

                if (window[fnName]) {

                }
            }

            newEl.setOnInputAction(action);
            newEl.setOnInputMethod(method);

            if (window[fnName])
                newEl.setResultConverterFunction(window[fnName]);

            el.parentNode.replaceChild(newEl.toHTMLElement(), el);
        }
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
        return new SwitchComponent();
    },
    createTextArea: function () {
        return new TextArea();
    }
}
;