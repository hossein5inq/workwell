const BaseComponent = require("./ww-base-component");

class List extends BaseComponent {

    constructor() {
        super("ul");
        this.items = [];
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
        this.items.push(el);
        this.el.appendChild(el.toHTMLElement());
        return this;
    }
}

module.exports = List;