import InputMaterial from "./ww-input--material";
import BaseComponent from "./ww-base-component";
import anime from "animejs";

export default class TextAreaMaterial extends InputMaterial {
    constructor() {
        super();

        this.labelActiveColor = "#1f5295";
        this.labelColor = "#a5a5a5";
        this.borderColor = "#c6c6c6";

        this.textarea = document.createElement("textarea");
        BaseComponent.addClass(this.textarea, "ww-textarea");

        this.inputSubContainerCenterPart.replaceChild(this.textarea, this.el.input);

        this.textarea.addEventListener("focus", () => {
            if (this.textarea.value.trim() === "") {
                this.inputSubContainerCenterPart.style.height = this.textarea.offsetHeight + "px";

                let textAreaStyle = getComputedStyle(this.textarea);
                let h = this.textarea.offsetHeight - parseFloat(textAreaStyle.paddingTop) - parseFloat(textAreaStyle.paddingBottom);

                this.textarea.style.maxHeight = h + "px";
                this.textarea.style.height = h + "px";
                this.textarea.style.minHeight = h + "px";
                this.textarea.style.marginTop = parseFloat(textAreaStyle.paddingTop) + parseFloat(textAreaStyle.paddingBottom) - 6 + "px";
                this.textarea.style.paddingTop = "0";
            }

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
        });

        this.textarea.addEventListener("blur", () => {
            if (this.textarea.value.trim() === "") {
                this.textarea.style.maxHeight = "111px";
                this.textarea.style.height = "111px";
                this.textarea.style.minHeight = "111px";
                this.textarea.style.marginTop = "0";
                this.textarea.style.paddingTop = "26px";

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
        });
    }
}