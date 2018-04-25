var button = require("./ww-button.js");
var listItem = require("./ww-list-item.js");
var list = require("./ww-list.js");
var listHeader = require("./ww-list-header.js");
var input = require("./ww-input.js");
var searchInput = require("./ww-search-input");
var switchComponent = require("./ww-switch.js");
var pagingIndicator = require("./ww-paging-indicator");
var textArea = require("./ww-textarea");
var utils = require("../bridge/utils.js");
var uiUtils = require("./ui-utils");

module.exports = {
    os: utils.getMobileOperatingSystem(),
    elements: ["ww-button", "ww-list", "ww-list-header", "ww-list-item", "ww-input", "ww-textarea"],
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
        return new button(text);
    },
    createList: function () {
        return new list();
    },
    createListHeader: function (text) {
        return new listHeader(text);
    },
    createListItem: function (title, subtitle) {
        return new listItem(title, subtitle);
    },
    createInput: function (type) {
        return new input(type);
    },
    format: function () {
        /*
         When loading large images, the 'onload' event attached to the window (index.js) has to wait for the image
         to completely load before executing the 'format' function. So when an external user uses for instance $(document).ready
         from JQuery and dynamically creates Workwell UI elements, the 'format' method is then called (after the large image is loaded)
         and so a second 'styling' pass is done on those newly created objects, and that's not good ! So to prevent that, we check if the os
         attribute has already been defined (object already created and styled) or not (object needs to be styled).
         */
        /*if (module.exports.os == "android") {
         var elements = document.querySelectorAll("[class^=ww-]");
         for (var i = 0; i < elements.length; i++) {
         for (var j = elements[i].classList.length - 1; j >= 0; j--) {
         var class_ = elements[i].classList[j];
         if (class_.startsWith("ww-")) {
         var arr = class_.split("__");
         var replacement = arr[0] + "--material";
         if (arr.length > 1) {
         replacement += "__" + arr[1];
         }
         elements[i].classList.add(replacement);
         }
         }
         }
         var badges = document.querySelectorAll("[class=badge-default]");
         for (var i = 0; i < badges.length; i++) {
         var replacement = "badge-default--material";
         badges[i].classList.add(replacement);
         }
         }

         // begin -> special case - to take care of a UI bug when adding an icon on the right
         var elements = document.querySelectorAll("[class^=ww-list-item__right]");
         for (var i = 0; i < elements.length; i++) {
         var parent = elements[i].parentNode;
         var centerDiv = parent.querySelector("[class^=ww-list-item__center]");
         var titleDiv = centerDiv.querySelector("[class^=ww-list-item__title]");
         var subtitleDiv = centerDiv.querySelector("[class^=ww-list-item__subtitle]");
         if (titleDiv && titleDiv.innerHTML.trim() != "" && subtitleDiv && subtitleDiv.innerHTML.trim() != "") {
         elements[i].style.maxHeight = "inherit";
         }
         }
         // end -> special case*/

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
                if (el.classList[c] != "ww-list") {
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

                var switchElements = listItem.getElementsByClassName('ww-switch');
                for (var i = 0; i < switchElements.length; i++) {
                    newListItem.setSwitch(module.exports.createSwitch());
                }

                newEl.add(newListItem);
            }

            el.parentNode.replaceChild(newEl.toHTMLElement(), el);
        }

        var buttonElements = document.getElementsByClassName('ww-button');
        for (var i = 0; i < buttonElements.length; i++) {
            var el = buttonElements[i];
            var newEl = module.exports.createButton(buttonElements[i].textContent.trim());

            if (el.hasAttribute("id")) {
                newEl.setId(el.getAttribute("id"));
            }

            if (el.hasAttribute("onclick")) {
                uiUtils.convertEvent("click", el.getAttribute("onclick"), newEl);
            }

            el.parentNode.replaceChild(newEl.toHTMLElement(), el);
        }

        var switchElements = document.getElementsByClassName('ww-switch');
        for (var i = 0; i < switchElements.length; i++) {
            var el = switchElements[i];
            var newEl = module.exports.createSwitch();

            if (el.hasAttribute("id")) {
                newEl.setId(el.getAttribute("id"));
            }

            el.parentNode.replaceChild(newEl.toHTMLElement(), el);
        }

        var pagingIndicatorElements = document.getElementsByClassName('ww-paging-indicator');
        for (var i = 0; i < pagingIndicatorElements.length; i++) {
            var el = pagingIndicatorElements[i];
            var newEl = module.exports.createPagingIndicator();

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

        var searchInputElements = document.getElementsByClassName('ww-search-input');
        for (var i = 0; i < searchInputElements.length; i++) {
            var el = searchInputElements[i];
            var newEl = module.exports.createSearchInput();

            if (el.hasAttribute("id")) {
                newEl.setId(el.getAttribute("id"));
            }

            var method = "get";
            var action = "";
            var fnName = undefined;

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
                var fn = el.getAttribute("resultConverter");
                var str = fn.split("(");
                var fnName = str[0];

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
        return new pagingIndicator(pageCount, selectedPage);
    },
    createSearchInput: function () {
        return new searchInput();
    },
    createSwitch: function () {
        return new switchComponent();
    },
    createTextArea: function () {
        return new textArea();
    }
}
;