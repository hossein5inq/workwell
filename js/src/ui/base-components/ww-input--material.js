import BaseComponent from "./ww-base-component";
import BaseInput from "./ww-base-input";
import anime from "animejs";
import {get, getLocale} from "../i18n";
import {showDateTimePicker} from "../../bridge/sdk";

export default class InputMaterial extends BaseInput {

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

        this.el.input.addEventListener("focus", () => {
            if (this.el.inputType !== "date") {
                this.onFocusAnimation();
            }
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

        this.setType(type);
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

    addDateTypeHack() {
        this.el.dateFormat = "dd/mm/yyyy";
        this.el.input.type = "text";
        this.el.input.readOnly = true;
        this.onClick(() => {
            showDateTimePicker({
                maxDate: 1000000000000000000,
                success: (res) => {
                    if (res && res.date) {
                        const selectedDate = new Date(res.date * 1000);
                        const date = selectedDate.getDate();
                        const month = selectedDate.getMonth();
                        const year = selectedDate.getFullYear();
                        if (this.el.dateFormat === "dd-mm-yyyy") {
                            this.setValue(BaseInput.pad(date) + "-" + BaseInput.pad(month + 1) + "-" + year);
                        } else if (this.el.dateFormat === "mm-dd-yyyy") {
                            this.setValue(BaseInput.pad(month + 1) + "-" + BaseInput.pad(date) + "-" + year);
                        } else if (this.el.dateFormat === "mm/dd/yyyy") {
                            this.setValue(BaseInput.pad(month + 1) + "/" + BaseInput.pad(date) + "/" + year);
                        } else {
                            this.setValue(BaseInput.pad(date) + "/" + BaseInput.pad(month + 1) + "/" + year);
                        }
                    }
                }
            });
        });
    }

    addDecimalTypeHack() {
        this.el.input.type = "number";
        this.el.input.inputmode = "numeric";
        this.el.input.pattern = "[0-9]*";

        this.onInput(() => {
            // maxLength doesn't work with 'number' type so this is a little hack
            if (this.getMaxLength() > -1) {
                // -1 is the default value of the maxLength (if nothing was set)
                if (String(Math.floor(this.getValue())).length > this.getMaxLength()) {
                    this.setValue(this.getValue().slice(0, this.getMaxLength()));
                }
            }
        });
    }

    setType(type) {
        this.el.inputType = type;
        if (type === "date") {
            this.addDateTypeHack();
        } else if (type === "number" || type === "decimal") {
            this.addDecimalTypeHack();
        } else if (type === "text") {
            this.el.input.type = type;
        }
        return this;
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

    getElement() {
        return this.el.input;
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