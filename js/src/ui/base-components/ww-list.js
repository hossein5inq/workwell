import BaseComponent from "./ww-base-component";

export default class List extends BaseComponent {

    constructor() {
        super("ul");
        this.el.items = [];
        this.headerAdded = false;
        this.headerDiv = document.createElement("li");

        BaseComponent.addClass(this.headerDiv, "ww-list-header");
        this.addClass("ww-list");
    }

    setHeader(headerText) {
        if (!this.headerAdded) {
            this.headerAdded = true;
            this.el.insertBefore(this.headerDiv, this.el.firstChild);
        }
        this.headerDiv.innerHTML = headerText;
        return this;
    }

    add(el) {
        if (typeof this.el.items === "undefined") {
            this.el.items = [];
        }
        this.el.items.push(el);
        if (typeof el.toHTMLElement === "function") {
            // the method is defined
            this.el.appendChild(el.toHTMLElement());
        } else {
            this.el.appendChild(el);
        }
        return this;
    }

    removeItemWithId(listItemId) {
        let index = -1;
        let el = null;
        for (let i = 0; i < this.el.items.length; i++) {
            if (this.el.items[i].getId() === listItemId) {
                index = i;
                el = this.el.items[i];
                break;
            }
        }

        if (el)
            el.remove();
        if (index > -1) {
            this.el.items.splice(index, 1);
        }

        if (this.el.items.length === 0) {
            this.remove();
        }
    }
}