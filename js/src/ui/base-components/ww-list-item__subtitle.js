const BaseComponent = require("./ww-base-component");

class ListItemSubtitle extends BaseComponent {

    constructor() {
        super("div");

        this.addClass("ww-list-item__subtitle");
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

module.exports = ListItemSubtitle;