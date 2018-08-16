import BaseComponent from "./ww-base-component";

export default class Banner extends BaseComponent {

    constructor() {
        super("div");

        this.addClass("ww-banner");
    }

    add(el) {
        if (typeof el.toHTMLElement === "function") {
            // the method is defined
            this.el.appendChild(el.toHTMLElement());
        } else {
            this.el.appendChild(el);
        }

        return this;
    }

    setBackgroundImage(src) {
        this.el.setAttribute("data-image", src);
        this.el.style.backgroundImage = "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.48)), url('" + src + "')";
        return this;
    }

}