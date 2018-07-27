import InputMaterial from "./ww-input--material";
import BaseComponent from "./ww-base-component";
import anime from "animejs";

export default class TextAreaMaterial extends InputMaterial {
    constructor() {
        super();

        this.labelActiveColor = "#1f5295";
        this.labelColor = "#a5a5a5";
        this.borderColor = "#c6c6c6";

        this.el.textarea = document.createElement("textarea");
        BaseComponent.addClass(this.el.textarea, "ww-textarea");

        this.inputSubContainerCenterPart.replaceChild(this.el.textarea, this.el.input);

        this.el.textarea.addEventListener("focus", () => {
            if (this.el.textarea.value.trim() === "") {
                this.inputSubContainerCenterPart.style.height = this.el.textarea.offsetHeight + "px";

                let textAreaStyle = getComputedStyle(this.el.textarea);
                let h = this.el.textarea.offsetHeight - parseFloat(textAreaStyle.paddingTop) - parseFloat(textAreaStyle.paddingBottom);

                this.el.textarea.style.maxHeight = h + "px";
                this.el.textarea.style.height = h + "px";
                this.el.textarea.style.minHeight = h + "px";
                this.el.textarea.style.marginTop = parseFloat(textAreaStyle.paddingTop) + parseFloat(textAreaStyle.paddingBottom) - 6 + "px";
                this.el.textarea.style.paddingTop = "0";

                this.onFocusAnimation();
            }
        });

        this.el.textarea.addEventListener("blur", () => {
            if (this.el.textarea.value.trim() === "") {
                this.el.textarea.style.maxHeight = "111px";
                this.el.textarea.style.height = "111px";
                this.el.textarea.style.minHeight = "111px";
                this.el.textarea.style.marginTop = "0";
                this.el.textarea.style.paddingTop = "26px";

                this.onBlurAnimation();
            }
        });

        this.el.onAttachedToDom = () => {
            let obj = this.el.inputSubContainer;
            this.labelContainer.style.height = obj.offsetHeight - 2 + "px";
            this.el.label.style.top = obj.offsetHeight / 2 - this.el.label.offsetHeight / 2 + "px";
            if (this.el.textarea.value.trim() !== "") {
                this.inputSubContainerCenterPart.style.height = this.el.textarea.offsetHeight + "px";

                let textAreaStyle = getComputedStyle(this.el.textarea);
                let h = this.el.textarea.offsetHeight - parseFloat(textAreaStyle.paddingTop) - parseFloat(textAreaStyle.paddingBottom);

                this.el.textarea.style.maxHeight = h + "px";
                this.el.textarea.style.height = h + "px";
                this.el.textarea.style.minHeight = h + "px";
                this.el.textarea.style.marginTop = parseFloat(textAreaStyle.paddingTop) + parseFloat(textAreaStyle.paddingBottom) - 6 + "px";
                this.el.textarea.style.paddingTop = "0";

                this.onFocusAnimation();
            }
            this.el.hasBeenAttached = true;
        };
    }

    onFocusAnimation() {
        anime({
            targets: this.el.label,
            translateY: "-35",
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

    setValue(value) {
        this.el.textarea.value = value;
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
        return this.el.textarea.value;
    }
}