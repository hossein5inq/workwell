import BaseComponent from "./ww-base-component";
import anime from "animejs";
import {get, getLocale} from "../i18n";

export default class InputMaterial extends BaseComponent {

    constructor(type = "text") {
        super("div");

        this.assistiveTextAdded = false;
        this.labelActiveColor = "#1f5295";
        this.labelColor = "#a5a5a5";
        this.borderColor = "#c6c6c6";
        this.el.required = false;

        this.el.inputSubContainer = document.createElement("div");
        this.inputSubContainerCenterPart = document.createElement("div");
        this.labelContainer = document.createElement("div");
        this.el.label = document.createElement("span");
        this.el.input = document.createElement("input");
        this.assistiveText = document.createElement("div");
        this.el.hasBeenAttached = false;

        this.labelContainer.appendChild(this.el.label);
        this.inputSubContainerCenterPart.appendChild(this.labelContainer);
        this.inputSubContainerCenterPart.appendChild(this.el.input);
        this.el.inputSubContainer.appendChild(this.inputSubContainerCenterPart);
        this.el.appendChild(this.el.inputSubContainer);

        this.addClass("ww-input__container");
        BaseComponent.addClass(this.el.label, "ww-input__label");
        BaseComponent.addClass(this.el.inputSubContainer, "ww-input__sub-container");
        BaseComponent.addClass(this.inputSubContainerCenterPart, "ww-input__center");
        BaseComponent.addClass(this.labelContainer, "ww-input__label-container");
        BaseComponent.addClass(this.assistiveText, "ww-input__assistive-text");
        BaseComponent.addClass(this.el.input, "ww-input");

        this.setType(type);

        this.el.input.addEventListener("focus", () => {
            this.onFocusAnimation();
        });

        this.el.input.addEventListener("blur", () => {
            if (this.el.input.value.trim() === "") {
                this.onBlurAnimation();
            }
        });

        this.el.onAttachedToDom = () => {
            let obj = this.el.inputSubContainer;
            this.labelContainer.style.height = obj.offsetHeight - 2 + "px";
            this.el.label.style.top = obj.offsetHeight / 2 - this.el.label.offsetHeight / 2 + "px";
            if (this.el.input.value.trim() !== "") {
                this.onFocusAnimation();
            }
            this.el.hasBeenAttached = true;
        };
    }

    onFocusAnimation() {
        anime({
            targets: this.el.label,
            translateY: "-9",
            fontSize: "12px",
            color: this.labelActiveColor,
            duration: 100,
            easing: "easeOutExpo"
        });

        anime({
            targets: this.el.inputSubContainer,
            borderColor: this.labelActiveColor,
            duration: 100,
            easing: "easeOutExpo"
        });
    }

    onBlurAnimation() {
        anime({
            targets: this.el.label,
            translateY: "1",
            fontSize: "16px",
            color: this.labelColor,
            duration: 100,
            easing: "easeOutExpo"
        });

        anime({
            targets: this.el.inputSubContainer,
            borderColor: this.borderColor,
            duration: 100,
            easing: "easeOutExpo"
        });
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
        this.el.input.type = type;
        if (type === "number") {
            this.el.input.pattern = "[0-9]*";
            this.el.input.inputmode = "numeric";
            this.onInput(() => {
                // maxLength doesn't work with 'number' type so this is a little hack
                if (this.getMaxLength() > -1) {
                    // -1 is the default value of the maxLength (if nothing was set)
                    if (this.getValue().length > this.getMaxLength())
                        this.setValue(this.getValue().slice(0, this.getMaxLength()));
                }
            });
        }
        return this;
    }

    getPlaceholder() {
        return this.el.placeholder;
    }

    setPlaceholder(placeholder) {
        let obj = this.el.inputSubContainer;
        this.el.placeholder = this.el.required ? placeholder + "*" : placeholder;
        this.el.label.innerHTML = this.el.placeholder;
        this.el.label.style.top = obj.offsetHeight / 2 - this.el.label.offsetHeight / 2 + "px";
        return this;
    }

    setAssistiveText(text) {
        if (!this.assistiveTextAdded) {
            this.assistiveTextAdded = true;
            this.el.appendChild(this.assistiveText);
        }
        this.assistiveText.innerHTML = text;
        return this;
    }

    onInput(fn) {
        this.el.addEventListener("input", fn);
        return this;
    }

    setValue(value) {
        this.el.input.value = value;
        if (this.el.hasBeenAttached) {
            if (value === "") {
                this.onBlurAnimation();
            } else {
                this.onFocusAnimation();
            }
        }
        return this;
    }

    getValue() {
        return this.el.input.value;
    }

    setMaxLength(maxLength) {
        this.el.input.maxLength = maxLength;
        return this;
    }

    getMaxLength() {
        return this.el.input.maxLength;
    }

    setRequired(required) {
        this.el.required = required;
        if (required) {
            this.el.placeholder += "*";
            this.el.label.innerHTML = this.el.placeholder;
            this.setAssistiveText("*" + get(getLocale(), "required"));
        }
        return this;
    }

    setHeader(text) {
        this.setPlaceholder(text);
        return this;
    }
}