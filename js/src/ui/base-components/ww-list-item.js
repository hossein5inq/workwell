const BaseComponent = require("./ww-base-component");
const anime = require("animejs");
const Utils = require("../../bridge/utils");

class ListItem extends BaseComponent {

    constructor() {
        super("li");
        this.leftAdded = false;
        this.centerAdded = false;
        this.rightAdded = false;
        this.leftDiv = document.createElement("div");
        this.centerDiv = document.createElement("div");
        this.rightDiv = document.createElement("div");
        this.isTouching = false;

        this.addClass("ww-list-item");
        BaseComponent.addClass(this.leftDiv, "ww-list-item__left");
        BaseComponent.addClass(this.centerDiv, "ww-list-item__center");
        BaseComponent.addClass(this.rightDiv, "ww-list-item__right");

        this.el.onAttachedToDom = () => {
            let leftChildren = this.leftDiv.childNodes;
            let centerChildren = this.centerDiv.childNodes;
            let rightChildren = this.rightDiv.childNodes;

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
    }

    onClick(fn) {
        this.el.addEventListener("click", fn);
        return this;
    }

    setTappable(tappable) {
        if (tappable) {
            this.addClass("ww-list-item--tappable");
            this.el.addEventListener("touchstart", () => {
                this.el.setAttribute("data-active", "");
                this.getLeftDiv().setAttribute("data-active", "");
                this.getCenterDiv().setAttribute("data-active", "");
                this.getRightDiv().setAttribute("data-active", "");

                // HACK FOR IOS
                let previousSibling = this.el.previousElementSibling;
                if (Utils.getMobileOperatingSystem() === "ios" && BaseComponent.hasClass(previousSibling, "ww-list-item")) {
                    this.isTouching = true;
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
                            if (this.isTouching) {
                                let value = a.animations[1].currentValue;
                                previousSibling.style.backgroundImage = "linear-gradient(0deg, " + value + " 0%, " + value + " 100%)";
                            }
                        }
                    });
                }
                // END OF HACK
            }, true);

            this.el.addEventListener("touchend", () => {
                this.el.removeAttribute("data-active");
                this.getLeftDiv().removeAttribute("data-active");
                this.getCenterDiv().removeAttribute("data-active");
                this.getRightDiv().removeAttribute("data-active");

                // HACK FOR IOS
                let previousSibling = this.el.previousElementSibling;
                if (Utils.getMobileOperatingSystem() === "ios" && BaseComponent.hasClass(previousSibling, "ww-list-item")) {
                    this.isTouching = false;
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
                            if (!this.isTouching) {
                                let value = a.animations[1].currentValue;
                                previousSibling.style.backgroundImage = "linear-gradient(0deg, " + value + " 0%, " + value + " 100%)";
                            }
                        }
                    });
                }
                // END OF HACK
            }, true);
        } else {
            this.removeClass("ww-list-item--tappable");
        }
        return this;
    }

    addToCenter(el) {
        if (!this.centerAdded) {
            this.centerAdded = true;
            this.el.appendChild(this.centerDiv);
        }
        if (typeof el.toHTMLElement === "function") {
            // the method is defined
            this.centerDiv.appendChild(el.toHTMLElement());
        } else {
            this.centerDiv.appendChild(el);
        }
        return this;

    }

    addToRight(el) {
        if (!this.rightAdded) {
            this.rightAdded = true;
            this.el.appendChild(this.rightDiv);
        }
        if (typeof el.toHTMLElement === "function") {
            // the method is defined
            this.rightDiv.appendChild(el.toHTMLElement());
        } else {
            this.rightDiv.appendChild(el);
        }
        return this;
    }

    addToLeft(el) {
        if (!this.leftAdded) {
            this.leftAdded = true;
            this.el.appendChild(this.leftDiv);
        }
        if (typeof el.toHTMLElement === "function") {
            // the method is defined
            this.leftDiv.appendChild(el.toHTMLElement());
        } else {
            this.leftDiv.appendChild(el);
        }
        return this;
    }

    getLeftDiv() {
        if (!this.leftAdded) {
            // case when it's coming from dom-html (ui.js) file (not dynamically created)
            this.leftAdded = true;
            let leftDivElements = this.el.getElementsByClassName("ww-list-item__left");
            if (leftDivElements.length > 0)
                this.leftDiv = leftDivElements[0];
        }
        return this.leftDiv;
    }

    getCenterDiv() {
        if (!this.centerAdded) {
            // case when it's coming from dom-html (ui.js) file (not dynamically created)
            this.centerAdded = true;
            let centerDivElements = this.el.getElementsByClassName("ww-list-item__center");
            if (centerDivElements.length > 0)
                this.centerDiv = centerDivElements[0];
        }
        return this.centerDiv;
    }

    getRightDiv() {
        if (!this.rightAdded) {
            // case when it's coming from dom-html (ui.js) file (not dynamically created)
            this.rightAdded = true;
            let rightDivElements = this.el.getElementsByClassName("ww-list-item__right");
            if (rightDivElements.length > 0)
                this.rightDiv = rightDivElements[0];
        }
        return this.rightDiv;
    }
}

module.exports = ListItem;