import BaseComponent from "./ww-base-component";

export default class ListItemSubtitle extends BaseComponent {

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