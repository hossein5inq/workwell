import BaseComponent from "./ww-base-component";

export default class ListItemTitle extends BaseComponent {

    constructor(value) {
        super("div");

        this.addClass("ww-list-item__title");
        if (value)
            this.setValue(value);
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