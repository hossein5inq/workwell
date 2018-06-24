const BaseComponent = require("./ww-base-component");

class ListItemLabel extends BaseComponent {

    constructor() {
        super("div");

        this.addClass("ww-list-item__label");
    }

    getValue() {
        return this.el.value;
    }

    setValue(value) {
        this.el.value = value;
        this.el.innerHTML = value;
        return this;
    }

}

module.exports = ListItemLabel;