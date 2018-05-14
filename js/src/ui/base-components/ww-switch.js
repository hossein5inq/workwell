const BaseComponent = require("./ww-base-component");

class Switch extends BaseComponent {
    constructor() {
        super("div");

        this.handle = document.createElement("div");
        this.handleBackground = document.createElement("div");
        this.handleContainer = document.createElement("div");
        this.longPressTimerDuration = 220;
        this.clickMaxDuration = 150;

        this.addClass("ww-switch");
        BaseComponent.addClass(this.handle, "ww-switch__handle");
        BaseComponent.addClass(this.handleBackground, "ww-switch__handle-background");
        BaseComponent.addClass(this.handleContainer, "ww-switch__handle-container");

        this.toggleOff();

        this.handleContainer.appendChild(this.handleBackground);
        this.handleContainer.appendChild(this.handle);
        this.el.appendChild(this.handleContainer);

        this.el.addEventListener("touchstart", (event) => {
            event.preventDefault();

            this.touchStartTime = (new Date()).getTime();
            let touchObj = event.changedTouches[0];
            this.startx = parseInt(touchObj.clientX);
            this.longPressTimer = setTimeout(() => {
                BaseComponent.addClass(this.handleBackground, "ww-switch__handle-active-background");
            }, this.longPressTimerDuration);
        }, false);

        this.el.addEventListener("touchmove", (event) => {
            event.preventDefault();
            let touchObj = event.changedTouches[0];
            let dist = parseInt(touchObj.clientX) - this.startx;
            this.startx = parseInt(touchObj.clientX);
            let left = this.handleContainer.offsetLeft + dist;
            let w = this.el.offsetWidth - this.handleContainer.offsetWidth;

            if (left < 0) {
                left = 0;
            } else if (left > w) {
                left = w;
            }
            this.handleContainer.style.left = left + "px";
            BaseComponent.addClass(this.handleContainer, "ww-switch__handle-active-container");
            BaseComponent.addClass(this.handleBackground, "ww-switch__handle-active-background");
        }, false);

        this.el.addEventListener("touchend", () => {
            window.clearTimeout(this.longPressTimer);
            BaseComponent.removeClass(this.handleBackground, "ww-switch__handle-active-background");
            BaseComponent.removeClass(this.handleContainer, "ww-switch__handle-active-container");

            let w = this.el.offsetWidth - this.handleContainer.offsetWidth;

            let touchEndTime = (new Date()).getTime();
            if (touchEndTime - this.touchStartTime <= this.clickMaxDuration) {
                // it's a click event
                this.toggle();
            } else {
                // it's not a click event
                if (this.handleContainer.offsetLeft >= 0 && this.handleContainer.offsetLeft <= (w / 2)) {
                    this.toggleOff();
                } else if (this.handleContainer.offsetLeft > (w / 2) && this.handleContainer.offsetLeft <= w) {
                    this.toggleOn();
                }
            }
        }, false);
    }

    toggle() {
        if (this.isOn) {
            this.toggleOff();
        } else {
            this.toggleOn();
        }
    }

    toggleOff() {
        this.isOn = false;
        this.handleContainer.removeAttribute("style");
        BaseComponent.removeClass(this.handle, "ww-switch__handle-on");
        BaseComponent.removeClass(this.handleContainer, "ww-switch__handle-container-on");
        BaseComponent.addClass(this.handleContainer, "ww-switch__handle-container-off");
        this.removeClass("ww-switch-on");

        return this;
    }

    toggleOn() {
        this.isOn = true;
        this.handleContainer.removeAttribute("style");
        BaseComponent.addClass(this.handle, "ww-switch__handle-on");
        BaseComponent.removeClass(this.handleContainer, "ww-switch__handle-container-off");
        BaseComponent.addClass(this.handleContainer, "ww-switch__handle-container-on");
        this.addClass("ww-switch-on");

        return this;
    }
}

module.exports = Switch;