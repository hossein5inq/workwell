import BaseComponent from "./ww-base-component";
import BaseInput from "./ww-base-input";
import {showDateTimePicker} from "../../bridge/sdk";

export default class Input extends BaseInput {

    constructor(type = "text") {
        super("input");

        this.el.headerAdded = false;
        this.el.headerDiv = document.createElement("div");

        BaseComponent.addClass(this.el.headerDiv, "ww-input-header");
        this.addClass("ww-input");
        this.setType(type);
        this.el.required = false;
        this.el.dateFormat = "dd/mm/yyyy";
        this.el.inputType = type;

        this.el.onAttachedToDom = () => {
            if (this.el.headerAdded) {
                this.el.insertAdjacentElement("beforebegin", this.el.headerDiv);
            }
        };
    }

    setType(type) {
        this.el.inputType = type;
        if (type === "date") {
            type = "text";
            this.el.readOnly = true;
            this.onClick(() => {
                this.el.blur();
                this.setPlaceholder("");
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
        this.el.type = type;
        if (type === "number") {
            this.el.pattern = "[0-9]*";
            this.el.inputmode = "numeric";
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

    setAssistiveText(text) {
        this.assistiveText = text;
        return this;
    }

    setPlaceholder(placeholder) {
        this.placeholder = this.el.required ? placeholder + "*" : placeholder;
        this.el.placeholder = this.placeholder;
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