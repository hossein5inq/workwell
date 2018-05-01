module.exports = class BaseComponent {
    constructor(htmlElement) {
        this.el = document.createElement(htmlElement);
        let _ = this;
        this.el.onAttached = function () {
            _.onAttachedToDom(this);
        }
    }

    onAttachedToDom(el_) {

    }

    setId(id_) {
        this.id = id_;
        this.el.id = id_;
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