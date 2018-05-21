const BaseComponent = require("./ww-base-component");

class ListItemIcon extends BaseComponent {

    constructor() {
        super("i");

        this.addClass("ww-list-item__icon");
    }

}

module.exports = ListItemIcon;