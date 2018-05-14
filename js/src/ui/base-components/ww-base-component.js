const Utils = require("../../bridge/utils");

module.exports = class BaseComponent {
    constructor(htmlElement) {
        this.el = document.createElement(htmlElement);
        this.el.onAttachedToDom = () => {
            for (let i = 0; i < this.el.childNodes.length; i++) {
                if (this.el.childNodes[i].hasOwnProperty("onAttachedToDom")) {
                    this.el.childNodes[i].onAttachedToDom();
                }
            }
        };
    }

    static addClass(el, className) {
        if (Utils.getMobileOperatingSystem() === "android") {
            if (className.startsWith("ww-")) {
                if (el.classList)
                    el.classList.add(className + "--material");
                else
                    el.className += " " + className + "--material";
            }
        }

        if (el.classList)
            el.classList.add(className);
        else
            el.className += " " + className;
    }

    static removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
            if (Utils.getMobileOperatingSystem() === "android") {
                el.classList.remove(className + "--material");
            }
        }
        else {
            if (Utils.getMobileOperatingSystem() === "android") {
                let replacement = className + "--material";
                el.className = el.className.replace(new RegExp("(^|\\b)" + replacement.split(" ").join("|") + "(\\b|$)", "gi"), " ");
            }
            el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
        }
    }

    static hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className);
        else
            return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
    }

    addClass(className) {
        BaseComponent.addClass(this.el, className);
    }

    removeClass(className) {
        BaseComponent.removeClass(this.el, className);
    }

    hasClass(className) {
        return BaseComponent.hasClass(this.el, className);
    }

    setId(id) {
        this.id = id;
        this.el.id = id;
        return this;
    }

    getId() {
        return this.id;
    }

    css(attribute, value) {
        this.el.style[attribute] = value;
        return this;
    }

    toHTMLElement() {
        return this.el;
    }
};