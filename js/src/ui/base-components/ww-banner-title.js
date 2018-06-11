const BaseComponent = require("./ww-base-component");

class BannerTitle extends BaseComponent {

    constructor() {
        super("div");

        this.addClass("ww-banner__title");
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

module.exports = BannerTitle;