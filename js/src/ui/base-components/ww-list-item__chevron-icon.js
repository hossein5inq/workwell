const ListItemIcon = require("./ww-list-item__icon");

class ListItemChevronIcon extends ListItemIcon {

    constructor() {
        super("i");

        this.addClass("icon-chevron");
    }

}

module.exports = ListItemChevronIcon;