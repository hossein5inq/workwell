import BaseComponent from "./ww-base-component";

export default class FAB extends BaseComponent {

    constructor() {
        super("div");

        this.el.icon = document.createElement("div");
        this.el.currentTheme = "";

        this.el.appendChild(this.el.icon);

        this.addClass("ww-fab");

        this.el.onAttachedToDom = () => {
            this.onAttachedToDom();
        };

        this.setPosition("right");
    }

    onClick(fn) {
        this.el.addEventListener("click", fn);
        return this;
    }

    onAttachedToDom() {
        this.updateTopPosition();
    }

    updateTopPosition() {
        if (BaseComponent.hasClass(this.el.parentNode, "ww-banner")) {
            let parentTop = this.el.parentNode.offsetTop;
            let parentHeight = this.el.parentNode.offsetHeight;
            this.el.style.top = parentTop + parentHeight - this.el.offsetHeight / 2 + "px";
            this.el.parentNode.style.marginBottom = this.el.offsetHeight / 2 + "px";
        }
        return this;
    }

    setIcon(el) {
        if (typeof el.toHTMLElement === "function") {
            // the method is defined
            this.el.appendChild(el.toHTMLElement());
        } else {
            this.el.appendChild(el);
        }

        return this;
    }

    setTheme(theme) {
        this.el.removeAttribute(this.el.currentTheme);
        this.el.setAttribute(theme, "");
        this.el.currentTheme = theme;
        return this;
    }

    setPosition(position) {
        this.el.setAttribute("data-position", position);
        this.el.currentPosition = position;
        return this;
    }

}