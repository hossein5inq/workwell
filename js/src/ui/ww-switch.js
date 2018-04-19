var uiUtils = require("./ui-utils");
var utils = require("../bridge/utils");

function switchComponent() {
    var el = this;
    var id;
    var os = utils.getMobileOperatingSystem();

    var defaultClass = "ww-switch";
    var defaultHandleClass = "ww-switch__handle";
    var defaultHandleBackgroundClass = "ww-switch__handle-background";
    var defaultHandleContainerClass = "ww-switch__handle-container";

    var div = document.createElement("div");
    var handle = document.createElement("div");
    var handleBackground = document.createElement("div");
    var handleContainer = document.createElement("div");
    var isSwitched = false;
    var longPressTimer;
    var longPressTimerDuration = 220;
    var clickMaxDuration = 150;
    var touchStartTime;
    var startx;

    uiUtils.addClass(div, defaultClass);
    uiUtils.addClass(handle, defaultHandleClass);
    uiUtils.addClass(handleBackground, defaultHandleBackgroundClass);
    uiUtils.addClass(handleContainer, defaultHandleContainerClass);

    handleContainer.appendChild(handleBackground);
    handleContainer.appendChild(handle);
    div.appendChild(handleContainer);

    div.addEventListener("touchstart", function (event) {
        event.preventDefault();

        touchStartTime = (new Date()).getTime();
        var touchobj = event.changedTouches[0];
        startx = parseInt(touchobj.clientX);
        longPressTimer = setTimeout(function () {
            uiUtils.addClass(handleBackground, "ww-switch__handle-active-background");
        }, longPressTimerDuration);
    }, false);

    div.addEventListener("touchend", function (event) {
        window.clearTimeout(longPressTimer);
        uiUtils.removeClass(handleBackground, "ww-switch__handle-active-background");
        uiUtils.removeClass(handleContainer, "ww-switch__handle-active-container");

        var w = div.offsetWidth - handleContainer.offsetWidth;

        var touchEndTime = (new Date()).getTime();
        if (touchEndTime - touchStartTime <= clickMaxDuration) {
            // it's a click event
            el.toggleSwitch();
        } else {
            // it's not a click event
            if (handleContainer.offsetLeft >= 0 && handleContainer.offsetLeft <= (w / 2)) {
                el.switchOff();
            } else if (handleContainer.offsetLeft > (w / 2) && handleContainer.offsetLeft <= w) {
                el.switchOn();
            }
        }
    }, false);

    div.addEventListener("touchmove", function (event) {
        event.preventDefault();
        var touchobj = event.changedTouches[0];
        var dist = parseInt(touchobj.clientX) - startx;
        startx = parseInt(touchobj.clientX);
        var left = handleContainer.offsetLeft + dist;
        var w = div.offsetWidth - handleContainer.offsetWidth;

        if (os == "ios")
            w = w - 2;

        if (left < 0) {
            left = 0;
        } else if (left > w) {
            left = w;
        }
        handleContainer.style.left = left + "px";
        uiUtils.addClass(handleContainer, "ww-switch__handle-active-container");
        uiUtils.addClass(handleBackground, "ww-switch__handle-active-background");
    }, false);

    div.isSwitchedOn = function () {
        return el.isOn();
    };

    this.setId = function (id_) {
        id = id_;
        div.id = id_;
    }

    this.getId = function () {
        return id;
    }

    this.toggleSwitch = function () {
        if (isSwitched) {
            this.switchOff();
        } else {
            this.switchOn();
        }
    }

    this.switchOn = function () {
        isSwitched = true;
        handleContainer.removeAttribute("style");
        uiUtils.addClass(handle, defaultHandleClass + "-on");
        uiUtils.removeClass(handleContainer, defaultHandleContainerClass + "-off");
        uiUtils.addClass(handleContainer, defaultHandleContainerClass + "-on");
        uiUtils.addClass(div, defaultClass + "-on");
    }

    this.switchOff = function () {
        isSwitched = false;
        handleContainer.removeAttribute("style");
        uiUtils.removeClass(handle, defaultHandleClass + "-on");
        uiUtils.removeClass(handleContainer, defaultHandleContainerClass + "-on");
        uiUtils.addClass(handleContainer, defaultHandleContainerClass + "-off");
        uiUtils.removeClass(div, defaultClass + "-on");
    }

    this.isOn = function () {
        return isSwitched;
    }

    this.toHTMLElement = function () {
        return div;
    }
}

module.exports = switchComponent;