import BaseComponent from "./ww-base-component";
import anime from "animejs";
import {getMobileOperatingSystem} from "../../bridge/utils";

export default class ListItem extends BaseComponent {

    constructor() {
        super("li");
        this.el.leftAdded = false;
        this.el.centerAdded = false;
        this.el.rightAdded = false;
        this.el.leftDiv = document.createElement("div");
        this.el.centerDiv = document.createElement("div");
        this.el.rightDiv = document.createElement("div");
        this.el.isTouching = false;
        this.el.isEnabled = true;

        this.addClass("ww-list-item");
        BaseComponent.addClass(this.el.leftDiv, "ww-list-item__left");
        BaseComponent.addClass(this.el.centerDiv, "ww-list-item__center");
        BaseComponent.addClass(this.el.rightDiv, "ww-list-item__right");

        this.el.onAttachedToDom = () => {
            let leftChildren = this.el.leftDiv.childNodes;
            let centerChildren = this.el.centerDiv.childNodes;
            let rightChildren = this.el.rightDiv.childNodes;

            for (let i = 0; i < leftChildren.length; i++) {
                if (leftChildren[i].hasOwnProperty("onAttachedToDom")) {
                    leftChildren[i].onAttachedToDom();
                }
            }

            for (let i = 0; i < centerChildren.length; i++) {
                if (centerChildren[i].hasOwnProperty("onAttachedToDom")) {
                    centerChildren[i].onAttachedToDom();
                }
            }

            for (let i = 0; i < rightChildren.length; i++) {
                if (rightChildren[i].hasOwnProperty("onAttachedToDom")) {
                    rightChildren[i].onAttachedToDom();
                }
            }
        };

        this.el.handleTouchStart = () => {
            if (this.el.isEnabled) {
                this.el.setAttribute("data-active", "");
                this.getLeftDiv().setAttribute("data-active", "");
                this.getCenterDiv().setAttribute("data-active", "");
                this.getRightDiv().setAttribute("data-active", "");

                // HACK FOR IOS
                let previousSibling = this.el.previousElementSibling;
                if (previousSibling && getMobileOperatingSystem() === "ios" && BaseComponent.hasClass(previousSibling, "ww-list-item")) {
                    this.el.isTouching = true;
                    let gradients = {
                        start: "#FFFFFF",
                        end: "#FFFFFF"
                    };

                    anime({
                        targets: gradients,
                        start: "#FFFFFF",
                        end: "#D3D3D3",
                        duration: 200,
                        easing: "easeOutExpo",
                        update: (a) => {
                            if (this.el.isTouching) {
                                let value = a.animations[1].currentValue;
                                previousSibling.style.backgroundImage = "linear-gradient(0deg, " + value + " 0%, " + value + " 100%)";
                            }
                        }
                    });
                }
                // END OF HACK
            }
        };

        this.el.handleTouchEnd = () => {
            if (this.el.isEnabled) {
                this.el.removeAttribute("data-active");
                this.getLeftDiv().removeAttribute("data-active");
                this.getCenterDiv().removeAttribute("data-active");
                this.getRightDiv().removeAttribute("data-active");

                // HACK FOR IOS
                let previousSibling = this.el.previousElementSibling;
                if (previousSibling && getMobileOperatingSystem() === "ios" && BaseComponent.hasClass(previousSibling, "ww-list-item")) {
                    this.el.isTouching = false;
                    let gradients = {
                        start: "#FFFFFF",
                        end: "#FFFFFF"
                    };

                    anime({
                        targets: gradients,
                        start: "#FFFFFF",
                        end: "#FFFFFF",
                        duration: 200,
                        easing: "easeOutExpo",
                        complete: () => {
                            previousSibling.style.backgroundImage = "none";
                        },
                        update: (a) => {
                            if (!this.el.isTouching) {
                                let value = a.animations[1].currentValue;
                                previousSibling.style.backgroundImage = "linear-gradient(0deg, " + value + " 0%, " + value + " 100%)";
                            }
                        }
                    });
                }
                // END OF HACK
            }
        };
    }

    onClick(fn) {
        this.el.addEventListener("click", () => {
            if (this.el.isEnabled) {
                fn();
            }
        });
        return this;
    }

    setTappable(tappable) {
        if (tappable) {
            this.addClass("ww-list-item--tappable");
            this.el.addEventListener("touchstart", this.el.handleTouchStart, true);
            this.el.addEventListener("touchend", this.el.handleTouchEnd, true);
        } else {
            this.removeClass("ww-list-item--tappable");
            this.el.removeEventListener("touchstart", this.el.handleTouchStart, true);
            this.el.removeEventListener("touchend", this.el.handleTouchEnd, true);
        }
        return this;
    }

    addToCenter(el) {
        if (!this.el.centerAdded) {
            this.el.centerAdded = true;
            this.el.appendChild(this.el.centerDiv);
        }
        if (typeof el.toHTMLElement === "function") {
            // the method is defined
            this.el.centerDiv.appendChild(el.toHTMLElement());
        } else {
            this.el.centerDiv.appendChild(el);
        }
        return this;

    }

    addToRight(el) {
        if (!this.el.rightAdded) {
            this.el.rightAdded = true;
            this.el.appendChild(this.el.rightDiv);
        }
        if (typeof el.toHTMLElement === "function") {
            // the method is defined
            this.el.rightDiv.appendChild(el.toHTMLElement());
        } else {
            this.el.rightDiv.appendChild(el);
        }
        return this;
    }

    addToLeft(el) {
        if (!this.el.leftAdded) {
            this.el.leftAdded = true;
            this.el.appendChild(this.el.leftDiv);
        }
        if (typeof el.toHTMLElement === "function") {
            // the method is defined
            this.el.leftDiv.appendChild(el.toHTMLElement());
        } else {
            this.el.leftDiv.appendChild(el);
        }
        return this;
    }

    getLeftDiv() {
        if (!this.el.leftAdded) {
            // case when it's coming from dom-html (ui.js) file (not dynamically created)
            this.el.leftAdded = true;
            let leftDivElements = this.el.getElementsByClassName("ww-list-item__left");
            if (leftDivElements.length > 0)
                this.el.leftDiv = leftDivElements[0];
        }
        return this.el.leftDiv;
    }

    getCenterDiv() {
        if (!this.el.centerAdded) {
            // case when it's coming from dom-html (ui.js) file (not dynamically created)
            this.el.centerAdded = true;
            let centerDivElements = this.el.getElementsByClassName("ww-list-item__center");
            if (centerDivElements.length > 0)
                this.el.centerDiv = centerDivElements[0];
        }
        return this.el.centerDiv;
    }

    getRightDiv() {
        if (!this.el.rightAdded) {
            // case when it's coming from dom-html (ui.js) file (not dynamically created)
            this.el.rightAdded = true;
            let rightDivElements = this.el.getElementsByClassName("ww-list-item__right");
            if (rightDivElements.length > 0)
                this.el.rightDiv = rightDivElements[0];
        }
        return this.el.rightDiv;
    }

    hide() {
        this.css("display", "none");
        return this;
    }

    show() {
        this.css("display", "flex");
        return this;
    }

    disable() {
        this.addClass("ww-list-item--disable");
        this.el.isEnabled = false;
        return this;
    }

    enable() {
        this.removeClass("ww-list-item--disable");
        this.el.isEnabled = true;
        return this;
    }
}