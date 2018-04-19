var uiUtils = require("./ui-utils.js");

function list() {
    var defaultClass = "ww-list";
    var header = null;
    var items = [];
    var id;
    var type = "default";
    var ul = document.createElement("ul");
    var el = this;
    var selectedItem = null;

    ul.checkedItems = function () {
        return el.getCheckedItems();
    };

    ul.selectedItem = function () {
        return el.getSelectedItem();
    };

    uiUtils.addClass(ul, defaultClass);

    this.addClass = function (className) {
        uiUtils.addClass(ul, className);
    };

    this.setHeader = function (listHeader) {
        if (header == null) {
            header = listHeader;
            ul.insertBefore(header.toHTMLElement(), ul.firstChild);
        } else {
            header = listHeader;
            ul.replaceChild(header.toHTMLElement(), ul.firstChild);
        }
        //ul.appendChild(header.toHTMLElement());
    };

    this.setId = function (id_) {
        id = id_;
        ul.id = id;
    };

    this.setBorderTop = function (style) {
        if (style == null) {
            ul.style.borderTop = "none";
        } else {
            ul.style.borderTop = style;
        }
    };

    this.setBorderBottom = function (style) {
        if (style == null) {
            ul.style.borderBottom = "none";
        } else {
            ul.style.borderBottom = style;
        }
    };

    this.setType = function (type_) {
        type = type_;
        ul.setAttribute("data-list-type", type);

        // in case setType is called after having added listItems
        // to the list, those items need to be updated
        if (type == "multi-select") {
            for (var i = 0; i < items.length; i++) {
                items[i].setCheckable(true);
            }
        } else if (type == "single-select") {
            for (var i = 0; i < items.length; i++) {
                items[i].setSelectable(true);
            }
        }
    };

    this.add = function (listItem) {
        listItem.parent = this;

        if (type == "multi-select") {
            listItem.setCheckable(true);
        } else if (type == "single-select") {
            listItem.setSelectable(true);
        }

        items.push(listItem);
        ul.appendChild(listItem.toHTMLElement());
    };

    this.removeSelectedItem = function () {
        for (var i = 0; i < items.length; i++) {
            if (items[i].isSelected) {
                items[i].unselect();
                break;
            }
        }
    };

    this.getCheckedItems = function () {
        var checkedItems = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].isChecked) {
                checkedItems.push(items[i]);
            }
        }
        return checkedItems;
    };

    this.setSelectedItem = function (selectedItem_) {
        selectedItem = selectedItem_;
    };

    this.getSelectedItem = function () {
        return selectedItem;
    };

    this.toHTMLElement = function () {
        /*if (header) {
            ul.appendChild(header.toHTMLElement());
        }
        for (var i = 0; i < items.length; i++) {
            ul.appendChild(items[i].toHTMLElement());
        }*/
        return ul;
    };
}

module.exports = list;