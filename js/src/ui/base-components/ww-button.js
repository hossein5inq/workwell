import BaseComponent from "./ww-base-component";

export default class Button extends BaseComponent {

    constructor(text) {
        super("button");

        this.addClass("ww-button");
        this.setText(text);
    }

    setText(text){
        this.text = text;
        this.el.innerHTML = text;
        return this;
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

    setType(type) {
        this.addClass("ww-button-" + type);
        return this;
    }
}