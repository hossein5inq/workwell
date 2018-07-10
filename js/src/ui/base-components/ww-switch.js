import BaseComponent from "./ww-base-component";

export default class Switch extends BaseComponent {
    constructor() {
        super("div");

        this.el.handle = document.createElement("div");
        this.el.handleBackground = document.createElement("div");
        this.el.handleContainer = document.createElement("div");
        this.longPressTimerDuration = 220;
        this.clickMaxDuration = 150;

        this.addClass("ww-switch");
        BaseComponent.addClass(this.el.handle, "ww-switch__handle");
        BaseComponent.addClass(this.el.handleBackground, "ww-switch__handle-background");
        BaseComponent.addClass(this.el.handleContainer, "ww-switch__handle-container");

        this.el.handleContainer.appendChild(this.el.handleBackground);
        this.el.handleContainer.appendChild(this.el.handle);
        this.el.appendChild(this.el.handleContainer);

        this.el.addEventListener("touchstart", (event) => {
            event.preventDefault();

            this.touchStartTime = (new Date()).getTime();
            let touchObj = event.changedTouches[0];
            this.startx = parseInt(touchObj.clientX);
            this.longPressTimer = setTimeout(() => {
                BaseComponent.addClass(this.el.handleBackground, "ww-switch__handle-active-background");
            }, this.longPressTimerDuration);
        }, false);

        this.el.addEventListener("touchmove", (event) => {
            event.preventDefault();
            let touchObj = event.changedTouches[0];
            let dist = parseInt(touchObj.clientX) - this.startx;
            this.startx = parseInt(touchObj.clientX);
            let left = this.el.handleContainer.offsetLeft + dist;
            let w = this.el.offsetWidth - this.el.handleContainer.offsetWidth;

            if (left < 0) {
                left = 0;
            } else if (left > w) {
                left = w;
            }
            this.el.handleContainer.style.left = left + "px";
            BaseComponent.addClass(this.el.handleContainer, "ww-switch__handle-active-container");
            BaseComponent.addClass(this.el.handleBackground, "ww-switch__handle-active-background");
        }, false);

        this.el.addEventListener("touchend", () => {
            window.clearTimeout(this.longPressTimer);
            BaseComponent.removeClass(this.el.handleBackground, "ww-switch__handle-active-background");
            BaseComponent.removeClass(this.el.handleContainer, "ww-switch__handle-active-container");

            let w = this.el.offsetWidth - this.el.handleContainer.offsetWidth;

            let touchEndTime = (new Date()).getTime();
            if (touchEndTime - this.touchStartTime <= this.clickMaxDuration) {
                // it's a click event
                this.toggle();
            } else {
                // it's not a click event
                if (this.el.handleContainer.offsetLeft >= 0 && this.el.handleContainer.offsetLeft <= (w / 2)) {
                    this.toggleOff();
                } else if (this.el.handleContainer.offsetLeft > (w / 2) && this.el.handleContainer.offsetLeft <= w) {
                    this.toggleOn();
                }
            }
        }, false);

        this.el.onToggleFunction = () => {

        };

        this.toggleOff();
    }

    toggle() {
        if (this.el.isOn) {
            this.toggleOff();
        } else {
            this.toggleOn();
        }
    }

    toggleOff() {
        this.el.isOn = false;
        this.el.handleContainer.removeAttribute("style");
        BaseComponent.removeClass(this.el.handle, "ww-switch__handle-on");
        BaseComponent.removeClass(this.el.handleContainer, "ww-switch__handle-container-on");
        BaseComponent.addClass(this.el.handleContainer, "ww-switch__handle-container-off");
        this.removeClass("ww-switch-on");
        this.el.onToggleFunction();

        return this;
    }

    toggleOn() {
        this.el.isOn = true;
        this.el.handleContainer.removeAttribute("style");
        BaseComponent.addClass(this.el.handle, "ww-switch__handle-on");
        BaseComponent.removeClass(this.el.handleContainer, "ww-switch__handle-container-off");
        BaseComponent.addClass(this.el.handleContainer, "ww-switch__handle-container-on");
        this.addClass("ww-switch-on");
        this.el.onToggleFunction();

        return this;
    }

    onToggle(fn) {
        this.el.onToggleFunction = () => {
            fn(this.el.isOn);
        };
    }
}