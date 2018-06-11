const BaseComponent = require("./ww-base-component");

class BannerSubtitle extends BaseComponent {

    constructor() {
        super("div");

        this.addClass("ww-banner__subtitle");
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

module.exports = BannerSubtitle;