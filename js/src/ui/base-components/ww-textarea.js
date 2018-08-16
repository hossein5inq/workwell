import BaseComponent from "./ww-base-component";
import {getMobileOperatingSystem} from "../../bridge/utils";

export default class TextArea extends BaseComponent {

    constructor() {
        super("textarea");

        this.el.headerAdded = false;
        this.el.headerDiv = document.createElement("div");

        BaseComponent.addClass(this.el.headerDiv, "ww-input-header");
        this.addClass("ww-textarea");
        this.el.required = false;

        this.el.onAttachedToDom = () => {
            if (this.el.headerAdded) {
                this.el.insertAdjacentElement("beforebegin", this.el.headerDiv);
            }

            if (getMobileOperatingSystem() === "ios") {
                let parent = this.el.parentNode;
                if (BaseComponent.hasClass(parent, "ww-list-item__center")) {
                    BaseComponent.addClass(parent, "ww-list-item__center--with-textarea");
                }
            }
        };
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
        this.el.addEventListener("input", fn);
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setAssistiveText(text) {
        this.assistiveText = text;
        return this;
    }

    setPlaceholder(placeholder) {
        this.placeholder = this.el.required ? placeholder + "*" : placeholder;
        this.el.placeholder = this.placeholder;
        return this;
    }

    getPlaceholder() {
        return this.el.placeholder;
    }

    setValue(value) {
        this.el.value = value;
        if (value === "") {
            // To fix safari-mobile issue
            this.el.focus();
            this.el.blur();
        }
        return this;
    }

    getValue() {
        return this.el.value;
    }

    setMaxLength(maxLength) {
        this.el.maxLength = maxLength;
        return this;
    }

    getMaxLength() {
        return this.el.maxLength;
    }

    setRequired(required) {
        if (required) {
            this.setPlaceholder(this.getPlaceholder() + "*");
        }
        this.el.required = required;
        return this;
    }

    setHeader(text) {
        this.el.headerAdded = true;
        this.el.headerDiv.innerHTML = text;
        return this;
    }
}