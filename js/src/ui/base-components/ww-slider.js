const uiUtils = require("../ui-utils");
const BaseComponent = require("./ww-base-component");

class Slider extends BaseComponent {

    constructor(currentValue = 0, min = 0, max = 100) {
        super("div");

        let element = this.el;
        this.handle = document.createElement("div");
        this.handleBackground = document.createElement("div");
        this.handleContainer = document.createElement("div");
        this.longPressTimerDuration = 220;

        uiUtils.addClass(this.el, "ww-slider");
        uiUtils.addClass(this.handle, "ww-slider__handle");
        uiUtils.addClass(this.handleBackground, "ww-slider__handle-background");
        uiUtils.addClass(this.handleContainer, "ww-slider__handle-container");

        this.handleContainer.appendChild(this.handleBackground);
        this.handleContainer.appendChild(this.handle);
        this.el.appendChild(this.handleContainer);

        this.el.min = min;
        this.el.max = max;
        this.el.currentValue = currentValue;

        this.el.addEventListener("touchstart", (event) => {
            event.preventDefault();
            if (uiUtils.hasClass(event.target, "ww-slider")) {
                this.onSliderBarTouchDown(element, event);
            } else {
                this.onHandleTouchDown(this, event);
            }
        }, false);

        this.el.addEventListener("touchend", () => {
            this.onHandleTouchUp();
        }, false);

        this.el.addEventListener("touchmove", (event) => {
            event.preventDefault();
            this.onSlide(event);
        }, false);

        this.onChangeFunction = function () {

        };

        this.el.onChange = function (fn) {
            this.onChangeFunction = fn;
        }.bind(this);
    }

    onAttachedToDom(el_) {
        this.setCurrentValue(this.el.currentValue);
    }

    onHandleTouchDown(this_, event) {
        let touchObj = event.changedTouches[0];
        this.startX = parseInt(touchObj.clientX);
        this.longPressTimer = setTimeout(function () {
            uiUtils.addClass(this_.handleBackground, "ww-slider__handle-active-background");
        }, this.longPressTimerDuration);
    }

    onHandleTouchUp() {
        window.clearTimeout(this.longPressTimer);
        uiUtils.removeClass(this.handleBackground, "ww-slider__handle-active-background");
        uiUtils.removeClass(this.handleContainer, "ww-slider__handle-active-container");
    }

    onSliderBarTouchDown(element, event) {
        let touchObj = event.changedTouches[0];
        this.startX = parseInt(touchObj.clientX);

        let targetInPixels = touchObj.clientX - this.el.offsetLeft;
        let width = this.el.offsetWidth;
        let step = width / this.el.max;

        this.setCurrentValue(targetInPixels / step);
    }

    onSlide(event) {
        let touchObj = event.changedTouches[0];
        let dist = parseInt(touchObj.clientX) - this.startX;
        this.startX = parseInt(touchObj.clientX);
        let handleContainerStyle = this.handleContainer.currentStyle || window.getComputedStyle(this.handleContainer);
        let left = parseInt(handleContainerStyle.left) + dist;

        let w = parseInt(this.el.offsetWidth - (this.handleContainer.offsetWidth / 2));

        if (left < -(this.handleContainer.offsetWidth / 2)) {
            left = -(this.handleContainer.offsetWidth / 2);
        } else if (left > w) {
            left = w + 1;
        }

        let step = this.el.offsetWidth / this.el.max;
        let middle = left + this.handleContainer.offsetWidth / 2;

        this.setCurrentValue(middle / step);

        this.onChangeFunction(this.el.currentValue);

        uiUtils.addClass(this.handleContainer, "ww-slider__handle-active-container");
        uiUtils.addClass(this.handleBackground, "ww-slider__handle-active-background");
    }

    setCurrentValue(value) {
        this.el.currentValue = parseInt(value);
        let width = this.el.offsetWidth;

        let style_ = this.el.currentStyle || window.getComputedStyle(this.el);

        let step = width / this.el.max;
        let middle = step * value;

        this.handleContainer.style.left = parseInt(middle - this.handleContainer.offsetWidth / 2) + "px";

        this.el.style.background = style_.backgroundColor + " linear-gradient(" +
            "to right," +
            style_.color + " 0%," +
            style_.color + " " + middle + "px," +
            style_.backgroundColor + " " + middle + "px," +
            style_.backgroundColor + " 100%)";
    }
}

module.exports = Slider;