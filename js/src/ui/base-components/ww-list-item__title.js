const BaseComponent = require("./ww-base-component");

class ListItemTitle extends BaseComponent {

    constructor() {
        super("div");

        this.addClass("ww-list-item__title");
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

module.exports = ListItemTitle;