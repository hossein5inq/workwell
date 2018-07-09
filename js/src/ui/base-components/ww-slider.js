import BaseComponent from "./ww-base-component";

export default class Slider extends BaseComponent {

    constructor(currentValue = 0, min = 0, max = 100, step = 1) {
        super("div");

        let element = this.el;
        this.handle = document.createElement("div");
        this.handleBackground = document.createElement("div");
        this.handleContainer = document.createElement("div");
        this.longPressTimerDuration = 220;

        this.addClass("ww-slider");
        BaseComponent.addClass(this.handle, "ww-slider__handle");
        BaseComponent.addClass(this.handleBackground, "ww-slider__handle-background");
        BaseComponent.addClass(this.handleContainer, "ww-slider__handle-container");

        this.handleContainer.appendChild(this.handleBackground);
        this.handleContainer.appendChild(this.handle);
        this.el.appendChild(this.handleContainer);

        this.el.min = min;
        this.el.max = max;
        this.el.step = step;
        this.el.currentValue = currentValue;

        this.el.addEventListener("touchstart", (event) => {
            event.preventDefault();
            if (BaseComponent.hasClass(event.target, "ww-slider")) {
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

        this.el.onAttached = () => {
            this.setCurrentValue(this.el.currentValue);
        };

        this.el.onDragFunction = () => {

        };

        this.el.onReleaseFunction = () => {

        };

        this.el.onAttachedToDom = () => {
            this.setCurrentValue(this.el.currentValue);
        };
    }

    setMin(min) {
        this.el.min = min;
        if (this.el.currentValue < this.el.min) {
            this.setCurrentValue(this.el.min);
        }
        return this;
    }

    setMax(max) {
        this.el.max = max;
        return this;
    }

    setStep(step) {
        this.el.step = step;
        return this;
    }

    onDrag(fn) {
        this.el.onDragFunction = fn;
        return this;
    }

    onRelease(fn) {
        this.el.onReleaseFunction = fn;
        return this;
    }

    onHandleTouchDown(this_, event) {
        let touchObj = event.changedTouches[0];
        this.startX = parseInt(touchObj.clientX);
        this.longPressTimer = setTimeout(function () {
            BaseComponent.addClass(this_.handleBackground, "ww-slider__handle-active-background");
        }, this.longPressTimerDuration);
    }

    onHandleTouchUp() {
        window.clearTimeout(this.longPressTimer);
        BaseComponent.removeClass(this.handleBackground, "ww-slider__handle-active-background");
        BaseComponent.removeClass(this.handleContainer, "ww-slider__handle-active-container");
        this.el.onReleaseFunction(this.el.currentValue);
    }

    onSliderBarTouchDown(element, event) {
        let touchObj = event.changedTouches[0];
        this.startX = parseInt(touchObj.clientX);

        let targetInPixels = touchObj.clientX - this.el.offsetLeft;
        let width = this.el.offsetWidth;

        let steps = (this.el.max - this.el.min) / this.el.step;
        let pixelsPerStep = width / steps;
        let stepNumber = Math.floor(targetInPixels / pixelsPerStep);

        this.setCurrentValue((stepNumber * this.el.step) + parseFloat(this.el.min));
    }

    onSlide(event) {
        let touchObj = event.changedTouches[0];
        this.startX = parseInt(touchObj.clientX);

        let targetInPixels = touchObj.clientX - this.el.offsetLeft;
        let steps = (this.el.max - this.el.min) / this.el.step;
        let pixelsPerStep = this.el.offsetWidth / steps;

        if (targetInPixels > this.el.offsetWidth) {
            targetInPixels = this.el.offsetWidth;
        } else if (targetInPixels < 0) {
            targetInPixels = 0;
        }
        let stepNumber = Math.floor(targetInPixels / pixelsPerStep);

        this.setCurrentValue((stepNumber * this.el.step) + parseFloat(this.el.min));

        BaseComponent.addClass(this.handleContainer, "ww-slider__handle-active-container");
        BaseComponent.addClass(this.handleBackground, "ww-slider__handle-active-background");
    }

    getCurrentValue() {
        return this.el.currentValue;
    }

    setCurrentValue(value) {
        if (Math.round(value) !== value) {
            this.el.currentValue = Number(value).toFixed(1);
        } else {
            this.el.currentValue = value;
        }
        let style_ = this.el.currentStyle || window.getComputedStyle(this.el);

        let steps = (this.el.max - this.el.min) / this.el.step;
        let pixelsPerStep = this.el.offsetWidth / steps;
        let middle = ((value - this.el.min) / this.el.step) * pixelsPerStep;

        this.el.onDragFunction(this.el.currentValue);
        this.handleContainer.style.left = parseInt(middle - this.handleContainer.offsetWidth / 2) + "px";

        this.el.style.background = style_.backgroundColor + " linear-gradient(" +
            "to right," +
            style_.color + " 0%," +
            style_.color + " " + middle + "px," +
            style_.backgroundColor + " " + middle + "px," +
            style_.backgroundColor + " 100%)";

        return this;
    }

}