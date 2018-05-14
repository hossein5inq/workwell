var uiUtils = require("./ui-utils");
var ajax = require("../bridge/ajax");
var Velocity = require("velocity-animate");
var searchBar = require("./ww-search-bar");
var list = require("./base-components/ww-list");
var listItem = require("./base-components/ww-list-item");

function searchView() {
    var el = this;
    var defaultClass = "ww-search-view";
    var div = document.createElement("div");
    var listContainer = document.createElement("div");
    var searchBar_ = new searchBar();
    searchBar_.setParentView(this);
    var animDuration = 150;
    var action;
    var method;
    var resultConverter = undefined;
    var searchInputCaller;

    uiUtils.addClass(div, defaultClass);
    uiUtils.addClass(listContainer, "ww-search-view-list-container");

    div.appendChild(searchBar_.toHTMLElement());
    div.appendChild(listContainer);

    document.body.appendChild(div);

    this.onClick = function (fn) {
        div.addEventListener("click", fn);
    };

    this.setPlaceholder = function (placeholder) {
        searchBar_.setPlaceholder(placeholder);
    };

    this.onInput = function () {
        if (action.trim() != "" && method.trim() != "") {
            ajax.request({
                type: method,
                url: action + "?query=" + searchBar_.getInputValue(),
                success: function (res) {
                    el.refreshListContainer(res);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    };

    this.setOnInputAction = function (action_) {
        action = action_;
    };

    this.setOnInputMethod = function (method_) {
        method = method_;
    };

    this.setResultConverterFunction = function (fn) {
        resultConverter = fn;
    };

    this.getInputValue = function () {
        return searchBar_.getInputValue();
    };

    this.setInputValue = function (value) {
        searchBar_.setInputValue(value);
    };

    this.clear = function () {
        searchBar_.clear();
    };

    this.refreshListContainer = function (res) {
        var list_ = new list();
        for (var i = 0; i < res.length; i++) {
            var li = new listItem();
            var obj = {
                title: res[i].title,
                thumbnail: res[i].thumbnail
            };

            if (resultConverter) {
                obj = resultConverter(res[i]);
            }

            li.setTitle(obj.title);
            li.setThumbnail(obj.thumbnail);
            li.setTappable(true);
            li.onClick(function (element) {
                searchInputCaller.setValue(element.getTitle(), true);
                searchBar_.setInputValue(element.getTitle());
                el.close();
            });
            list_.add(li);
        }
        listContainer.innerHTML = "";
        listContainer.appendChild(list_.toHTMLElement());
    };

    this.close = function () {
        Velocity(
            div,
            {
                top: "100%"
            },
            {
                duration: animDuration,
                easing: "ease-in",
                complete: function () {
                    document.body.style.position = "static";
                }
            }
        );
    };

    this.open = function () {
        Velocity(
            div,
            {
                top: "0%"
            },
            {
                duration: animDuration,
                easing: "ease-out",
                complete: function () {
                    el.onInput();
                    searchBar_.focus();
                }
            }
        );
    };

    this.setSearchInputCaller = function (searchInputCaller_) {
        searchInputCaller = searchInputCaller_;
    };

    this.toHTMLElement = function () {
        return div;
    };
}

module.exports = searchView;