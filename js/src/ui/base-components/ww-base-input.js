import BaseComponent from "./ww-base-component";

export default class BaseInput extends BaseComponent {

    constructor(type = "text") {
        super(type);
    }

    static pad(n) {
        return n < 10 ? "0" + n : "" + n;
    }

    getElement() {
        return this.el;
    }

    disable() {
        this.el.setAttribute("disabled", "");
        return this;
    }

    enable() {
        this.el.removeAttribute("disabled");
        return this;
    }

    onClick(fn) {
        this.el.addEventListener("click", fn);
        return this;
    }

    onInput(fn) {
        this.getElement().addEventListener("input", fn);
        return this;
    }

    setDateFormat(dateFormat) {
        this.el.dateFormat = dateFormat;
        return this;
    }

    setMaxLength(maxLength) {
        this.getElement().maxLength = maxLength;
        return this;
    }

    getMaxLength() {
        return this.getElement().maxLength;
    }

    getValue() {
        return this.getElement().value;
    }

    getPlaceholder() {
        return this.el.placeholder;
    }
}