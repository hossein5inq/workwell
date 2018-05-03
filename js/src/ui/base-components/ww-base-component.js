module.exports = class BaseComponent {
    constructor(htmlElement) {
        this.el = document.createElement(htmlElement);
    }

    setId(id) {
        this.id = id;
        this.el.id = id;
    }

    getId() {
        return this.id;
    }

    css(attribute, value) {
        this.el.style[attribute] = value;
    }

    toHTMLElement() {
        return this.el;
    }
};