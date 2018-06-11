const BaseComponent = require("./ww-base-component");

class Icon extends BaseComponent {

    constructor() {
        super("i");

        this.addClass("ww-icon");
    }

    setType(type) {
        this.addClass("icon-" + type);
        return this;
    }

}


module.exports = Icon;