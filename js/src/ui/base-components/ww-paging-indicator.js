import BaseComponent from "./ww-base-component";

export default class PagingIndicator extends BaseComponent {
    constructor(pageCount = 3, selectedPage = 0) {
        super("div");
        this.setPageCount(pageCount);
        this.setSelectedPage(selectedPage);
        this.dots = [];

        this.addClass("ww-paging-indicator");
        this.el.setAttribute("data-page-count", this.pageCount);
        this.el.setAttribute("data-selected-page", this.selectedPage);
    }

    setSelectedPage(selectedPage) {
        if (0 < selectedPage < this.dots.length) {
            for (let i = 0; i < this.dots.length; i++) {
                this.dots[i].removeAttribute("selected");
            }
            this.dots[selectedPage].setAttribute("selected", "");
            this.selectedPage = selectedPage;
            this.el.setAttribute("data-selected-page", selectedPage);
        }
        return this;
    }

    setPageCount(pageCount) {
        this.pageCount = pageCount;
        this.el.setAttribute("data-page-count", pageCount);
        this.el.innerHTML = "";
        this.dots = [];
        for (let i = 0; i < pageCount; i++) {
            let dot = document.createElement("div");
            BaseComponent.addClass(dot, "ww-paging-indicator__dot");
            this.el.appendChild(dot);

            if (i === this.selectedPage) {
                dot.setAttribute("selected", "");
            }

            this.dots.push(dot);
        }
        return this;
    }

    getSelectedPage() {
        return this.selectedPage;
    }

    getPageCount() {
        return this.pageCount;
    }

    show() {
        this.css("display", "flex");
    }

    hide() {
        this.css("display", "none");
    }
}