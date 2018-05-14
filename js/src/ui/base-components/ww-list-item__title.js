const BaseComponent = require("./ww-base-component");

class ListItemTitle extends BaseComponent {

    constructor() {
        super("div");

        this.addClass("ww-list-item__title");
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
        this.el.innerHTML = value;
        return this;
    }

}

module.exports = ListItemTitle;