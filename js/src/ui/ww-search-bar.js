var uiUtils = require("./ui-utils");
var utils = require("../bridge/utils.js");
var config = require("../bridge/config");
var i18n = require("./i18n");

function searchBar() {
    var os = utils.getMobileOperatingSystem();
    var defaultClass = "ww-search-bar";
    var div = document.createElement("div");
    var iconContainer = document.createElement("div");
    var icon = document.createElement("icon");
    var input = document.createElement("input");
    var textContainer = document.createElement("div");
    var inputContainer = document.createElement("div");
    var searchIconContainer = document.createElement("div");
    var clearIconContainer = document.createElement("div");
    var searchIcon = document.createElement("icon");
    var clearIcon = document.createElement("icon");
    var searchView = undefined;

    uiUtils.addClass(div, defaultClass);
    uiUtils.addClass(iconContainer, "ww-search-bar-icon-container");
    uiUtils.addClass(icon, "icon-close");
    uiUtils.addClass(input, "ww-search-bar-input");
    uiUtils.addClass(inputContainer, "ww-search-bar-input-container");
    uiUtils.addClass(searchIconContainer, "ww-search-bar-search-icon-container");
    uiUtils.addClass(clearIconContainer, "ww-search-bar-clear-icon-container");
    uiUtils.addClass(searchIcon, "icon-search-input-small");
    uiUtils.addClass(clearIcon, "icon-clear");
    uiUtils.addClass(textContainer, "ww-search-bar-text-container");

    input.addEventListener('input', function (evt) {
        if (searchView) {
            searchView.onInput();
        }
    });

    if (os == "android") {
        iconContainer.appendChild(icon);
        div.appendChild(iconContainer);
        div.appendChild(input);

        iconContainer.addEventListener("click", function () {
            searchView.close();
        });
    } else if (os == "ios") {
        textContainer.innerText = i18n.get(config.getLocale(), "cancel-search-input");
        searchIconContainer.appendChild(searchIcon);
        clearIconContainer.appendChild(clearIcon);
        inputContainer.appendChild(searchIconContainer);
        inputContainer.appendChild(input);
        inputContainer.appendChild(clearIconContainer);
        div.appendChild(inputContainer);
        div.appendChild(textContainer);

        textContainer.addEventListener('click', function () {
            searchView.close();
        });

        clearIconContainer.addEventListener('click', function () {
            input.value = "";
            input.focus();
            searchView.onInput();
        });
    }

    this.getInputValue = function () {
        return input.value;
    };

    this.setInputValue = function (value) {
        input.value = value;
    };

    this.setParentView = function (searchView_) {
        searchView = searchView_;
    };

    this.clear = function () {
        input.value = "";
    };

    this.focus = function () {
        input.focus();
    };

    this.setPlaceholder = function (placeholder_) {
        input.setAttribute("placeholder", placeholder_);
    };

    this.toHTMLElement = function () {
        return div;
    };
}

module.exports = searchBar;