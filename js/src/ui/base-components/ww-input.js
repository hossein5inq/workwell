import BaseComponent from "./ww-base-component";

export default class Input extends BaseComponent {

    constructor(type = "text") {
        super("input");

        this.el.headerAdded = false;
        this.el.headerDiv = document.createElement("div");

        BaseComponent.addClass(this.el.headerDiv, "ww-input-header");
        this.addClass("ww-input");
        this.setType(type);
        this.el.required = false;

        this.el.onAttachedToDom = () => {
            if (this.el.headerAdded) {
                this.el.insertAdjacentElement("beforebegin", this.el.headerDiv);
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

    setType(type) {
        this.el.type = type;
        if (type === "number") {
            this.el.pattern = "[0-9]*";
            this.el.inputmode = "numeric";
        }
        return this;
    }

    setAssistiveText(text) {
        this.assistiveText = text;
        return this;
    }

    getPlaceholder() {
        return this.el.placeholder;
    }

    setPlaceholder(placeholder) {
        this.placeholder = this.el.required ? placeholder + "*" : placeholder;
        this.el.placeholder = this.placeholder;
        return this;
    }

    onInput(fn) {
        this.el.addEventListener("input", fn);
        return this;
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