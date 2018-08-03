import BaseComponent from "./ww-base-component";
import Icon from "./ww-icon";
import {getMobileOperatingSystem} from "../../bridge/utils";
import {get, getLocale} from "../i18n";

export default class Picker extends BaseComponent {

    constructor() {
        super("div");

        this.el.hasBeenAttached = false;
        this.el.assistiveTextAdded = false;
        this.el.selectedIndex = 0;
        this.el.selectedValue = "";
        this.el.required = false;

        this.el.picker = document.createElement("div");
        this.el.pickerLeftPart = document.createElement("div");
        this.el.pickerRightPart = document.createElement("div");
        this.el.pickerLeftLabelPart = document.createElement("div");
        this.el.pickerLeftValuePart = document.createElement("div");
        this.el.pickerSelect = document.createElement("select");
        this.el.assistiveText = document.createElement("div");

        this.el.pickerLeftPart.appendChild(this.el.pickerLeftLabelPart);
        this.el.pickerLeftPart.appendChild(this.el.pickerLeftValuePart);
        this.el.pickerRightPart.appendChild(
            new Icon().setType("down-arrow").toHTMLElement()
        );
        this.el.picker.appendChild(this.el.pickerLeftPart);
        this.el.picker.appendChild(this.el.pickerRightPart);
        this.el.appendChild(this.el.picker);

        this.addClass("ww-picker__container");
        this.addClass("ww-no-select");

        this.el.picker.addEventListener("touchstart", () => {
            this.el.picker.setAttribute("data-active", "");
        }, true);

        this.el.picker.addEventListener("touchend", () => {
            this.el.picker.removeAttribute("data-active", "");
        }, true);

        BaseComponent.addClass(this.el.picker, "ww-picker");
        BaseComponent.addClass(this.el.picker, "ww-no-select");
        BaseComponent.addClass(this.el.pickerLeftPart, "ww-picker__left");
        BaseComponent.addClass(this.el.pickerRightPart, "ww-picker__right");
        BaseComponent.addClass(this.el.pickerLeftLabelPart, "ww-picker__left--label");
        BaseComponent.addClass(this.el.pickerLeftValuePart, "ww-picker__left--value");
        BaseComponent.addClass(this.el.pickerSelect, "ww-picker__select");
        BaseComponent.addClass(this.el.assistiveText, "ww-input__assistive-text");

        this.el.onAttachedToDom = () => {
            this.el.pickerLeftLabelPart.style.top = this.el.pickerLeftLabelPart.offsetTop - 14 + "px";
            if (getMobileOperatingSystem() === "ios") {
                let parent = this.el.parentNode;
                if (BaseComponent.hasClass(parent, "ww-list-item__center")) {
                    BaseComponent.addClass(parent, "ww-list-item__center--with-picker");
                }
                this.el.style.height = this.el.parentNode.offsetHeight + "px";
            }
            this.el.hasBeenAttached = true;
        };

        this.onClick(() => {
            let e = document.createEvent("MouseEvents");
            e.initMouseEvent("mousedown", true, true, window);
            this.el.pickerSelect.dispatchEvent(e);
        });

        this.el.pickerSelect.addEventListener("change", () => {
            this.setSelectedIndex(this.el.pickerSelect.value);
        });

        document.body.appendChild(this.el.pickerSelect);
    }

    setLabel(label) {
        this.el.label = this.el.required ? label + "*" : label;
        this.el.pickerLeftLabelPart.innerHTML = this.el.label;
        return this;
    }

    getLabel() {
        return this.el.label;
    }

    setOptions(options) {
        this.el.options = options;
        if (options[0]) {
            this.el.pickerLeftValuePart.innerHTML = options[0];
            this.el.selectedValue = options[0];
            this.el.selectedIndex = 0;
        }

        for (let option in options) {
            let opt = new Option(options[option], option);
            this.el.pickerSelect.options[this.el.pickerSelect.options.length] = opt;
        }
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

    getSelectedIndex() {
        return this.el.selectedIndex;
    }

    setSelectedIndex(index) {
        this.el.selectedIndex = index;
        this.el.selectedValue = this.el.options[index];
        this.el.pickerLeftValuePart.innerHTML = this.el.selectedValue;
        return this;
    }

    getSelectedValue() {
        return this.el.selectedValue;
    }

    setSelectedValue(value) {
        for (let option in this.el.options) {
            if (this.el.options[option] === value) {
                this.el.selectedIndex = option;
                this.el.selectedValue = value;
                this.el.pickerLeftValuePart.innerHTML = value;
            }
        }
        return this;
    }

    setAssistiveText(text) {
        if (getMobileOperatingSystem() === "android") {
            if (!this.el.assistiveTextAdded) {
                this.el.assistiveTextAdded = true;
                this.el.appendChild(this.el.assistiveText);
            }
            this.el.assistiveText.innerHTML = text;
        }
        return this;
    }

    setRequired(required) {
        if (required) {
            this.setLabel(this.getLabel() + "*");
            this.setAssistiveText("*" + get(getLocale(), "required"));
        }
        this.el.required = required;
        return this;
    }
}