import BaseComponent from "./ww-base-component";

export default class Icon extends BaseComponent {

    constructor() {
        super("i");

        this.addClass("ww-icon");
    }

    setType(type) {
        this.addClass("icon-" + type);
        return this;
    }

}