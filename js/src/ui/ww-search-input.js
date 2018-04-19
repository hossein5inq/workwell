var utils = require("../bridge/utils.js");
var uiUtils = require("./ui-utils.js");
var searchView = require("./ww-search-view");

function searchInput() {
    var el = this;
    var id = "";
    var defaultClass = "ww-search-input-container";
    var defaultInputClass = "ww-search-input";
    var div = document.createElement("div");
    var input = document.createElement("div");
    var icon = document.createElement("icon");
    var iconContainer = document.createElement("div");
    var value;
    var searchView_ = new searchView();
    var hasASelectedValue = false;

    searchView_.setSearchInputCaller(this);

    uiUtils.addClass(div, defaultClass);
    uiUtils.addClass(input, defaultInputClass);
    uiUtils.addClass(iconContainer, "ww-search-input-icon-container");
    uiUtils.addClass(icon, "icon-search-input");

    iconContainer.appendChild(icon);
    div.appendChild(iconContainer);
    div.appendChild(input);

    div.getValue = function () {
        return value;
    };

    this.addClass = function (className) {
        uiUtils.addClass(input, className);
    };

    this.getId = function () {
        return id;
    };

    this.getValue = function () {
        return value;
    };

    this.setId = function (id_) {
        id = id_;
        div.id = id_;
    };

    this.getInputValue = function () {
        return searchView_.getInputValue();
    };

    this.setValue = function (value_, hasASelectedValue_) {
        hasASelectedValue = hasASelectedValue_;
        value = value_;
        input.innerText = value_;
        if (!hasASelectedValue_) {
            // the actual placeholder, not a selected value
            searchView_.setPlaceholder(value_);
        }
    };

    this.onClick = function (fn) {
        div.addEventListener("click", fn);
    };

    this.toHTMLElement = function () {
        return div;
    };

    this.setOnInputAction = function (action) {
        searchView_.setOnInputAction(action);
    };

    this.setOnInputMethod = function (method) {
        searchView_.setOnInputMethod(method);
    };

    this.setResultConverterFunction = function (fn) {
        searchView_.setResultConverterFunction(fn);
    };

    this.setValue("Search", false);

    this.onClick(function () {
        // open the search view

        document.body.style.position = "fixed";

        if (hasASelectedValue) {
            searchView_.setInputValue(el.getValue());
        } else {
            searchView_.clear();
        }

        searchView_.open();
    });
}

module.exports = searchInput;