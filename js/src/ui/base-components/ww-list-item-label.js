const uiUtils = require("../ui-utils");
const BaseComponent = require("./ww-base-component");

class ListItemLabel extends BaseComponent {

    constructor() {
        super("div");

        uiUtils.addClass(this.el, "ww-list-item__label");

        this.getValue = function () {
            return this.value;
        };

        this.setValue = function (val) {
            this.value = val;
            this.innerHTML = val;
        };
    }

}

module.exports = ListItemLabel;