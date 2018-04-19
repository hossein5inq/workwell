var uiUtils = require("./ui-utils");

function pagingIndicator(pageCount, selectedPage) {
    var el = this;
    var id;
    var pageCount = pageCount ? pageCount : 3; // default
    var selectedPage = selectedPage ? selectedPage : 0; // default
    var dots = [];

    var defaultClass = "ww-paging-indicator";
    var dotClass = "ww-paging-indicator__dot";

    var div = document.createElement("div");

    div.setAttribute("data-page-count", pageCount);
    div.setAttribute("data-selected-page", selectedPage);

    div.setSelectedPage = function (selectedPage_) {
        el.setSelectedPage(selectedPage_);
    }

    div.setPageCount = function (pageCount_) {
        el.setPageCount(pageCount_);
    }

    div.getPageCount = function () {
        return el.getPageCount();
    }

    div.getSelectedPage = function () {
        return el.getSelectedPage();
    }

    uiUtils.addClass(div, defaultClass);

    this.setId = function (id_) {
        id = id_;
        div.id = id_;
    }

    this.getId = function () {
        return id;
    }

    this.getPageCount = function () {
        return pageCount;
    }

    this.getSelectedPage = function () {
        return selectedPage;
    }

    this.setPageCount = function (pageCount_) {
        div.setAttribute("data-page-count", pageCount_);
        pageCount = pageCount_;
        div.innerHTML = "";
        dots = [];
        for (var i = 0; i < pageCount; i++) {
            var dot = document.createElement("div");
            uiUtils.addClass(dot, dotClass);
            div.appendChild(dot);

            if (i == selectedPage) {
                dot.setAttribute("selected", "");
            }

            dots.push(dot);
        }
    }

    this.setSelectedPage = function (selectedPage_) {
        if (0 < selectedPage_ < dots.length) {
            for (var i = 0; i < dots.length; i++) {
                dots[i].removeAttribute("selected");
            }
            dots[selectedPage_].setAttribute("selected", "");
            selectedPage = selectedPage_;
            div.setAttribute("data-selected-page", selectedPage);
        }
    }

    this.toHTMLElement = function () {
        return div;
    }

    this.setPageCount(pageCount);
}

module.exports = pagingIndicator;