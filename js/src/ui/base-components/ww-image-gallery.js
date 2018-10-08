import BaseComponent from "./ww-base-component";
import PagingIndicator from "./ww-paging-indicator";
import {chooseImage} from "../../bridge/sdk";
import {get, getLocale} from "../i18n";

export default class ImageGallery extends BaseComponent {

    constructor() {
        super("div");
        this.el.galleryBanner = document.createElement("div");
        this.el.addPhotoDiv = document.createElement("div");
        this.el.changePhotoContainer = document.createElement("div");
        this.el.replacePhotoDiv = document.createElement("div");
        this.el.removePhotoDiv = document.createElement("div");
        this.el.topLayer = document.createElement("div");
        this.el.pagingIndicator = new PagingIndicator();
        this.el.x0 = null;
        this.el.i = 0;
        this.el.n = 0;
        this.el.maxImages = 3; // default
        this.el.slides = [];
        this.el.images = [];

        this.addClass("ww-image-gallery__container");
        BaseComponent.addClass(this.el.galleryBanner, "ww-image-gallery");
        BaseComponent.addClass(this.el.addPhotoDiv, "ww-image-gallery__add-photo");
        BaseComponent.addClass(this.el.changePhotoContainer, "ww-image-gallery__change-photo-container");
        BaseComponent.addClass(this.el.replacePhotoDiv, "ww-image-gallery__replace-photo");
        BaseComponent.addClass(this.el.removePhotoDiv, "ww-image-gallery__remove-photo");
        BaseComponent.addClass(this.el.topLayer, "ww-image-gallery__top-layer");

        this.el.pagingIndicator.setPageCount(0);
        this.el.pagingIndicator.hide();
        this.el.pagingIndicator.addClass("ww-image-gallery__paging-indicator");

        this.el.replacePhotoDiv.innerHTML = get(getLocale(), "replace-photo");
        this.el.removePhotoDiv.innerHTML = get(getLocale(), "remove-photo");

        this.el.changePhotoContainer.appendChild(this.el.replacePhotoDiv);
        this.el.changePhotoContainer.appendChild(this.el.removePhotoDiv);
        this.el.topLayer.appendChild(this.el.addPhotoDiv);
        this.el.topLayer.appendChild(this.el.changePhotoContainer);
        this.el.topLayer.appendChild(this.el.pagingIndicator.toHTMLElement());
        this.el.appendChild(this.el.galleryBanner);
        this.el.appendChild(this.el.topLayer);

        this.el.galleryBanner.style.setProperty("--n", 1);
        this.el.galleryBanner.style.setProperty("--i", 0);

        this.el.addEventListener("mousedown", (e) => {
            this.lock(e);
        }, false);
        this.el.addEventListener("touchstart", (e) => {
            this.lock(e);
        }, false);

        this.el.addEventListener("mouseup", (e) => {
            this.move(e);
        }, false);
        this.el.addEventListener("touchend", (e) => {
            this.move(e);
        }, false);

        this.el.addEventListener("touchmove", (e) => {
            e.preventDefault();
        }, false);

        this.el.addPhotoDiv.addEventListener("click", () => {
            chooseImage({
                success: (res) => {
                    this.addImage(res.base64, true);
                    this.toggleEditMode();
                },
                error: (res) => {
                    console.log("error", res);
                }
            });
        });

        this.el.replacePhotoDiv.addEventListener("click", () => {
            chooseImage({
                success: (res) => {
                    let url = "data:image/png;base64," + res.base64;
                    url = url.replace(/(\r\n|\n|\r)/gm, "");
                    this.el.slides[this.el.i].style.backgroundImage = "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.48)), url('" + url + "')";
                    this.el.images[this.el.i].url = res.base64;
                    this.el.images[this.el.i].isBase64 = true;
                },
                error: (res) => {
                    console.log("error", res);
                }
            });
        });

        this.el.removePhotoDiv.addEventListener("click", () => {
            this.el.galleryBanner.removeChild(this.el.slides[this.el.i]);
            this.el.slides.splice(this.el.i, 1);
            this.el.images.splice(this.el.i, 1);
            this.el.n--;
            this.el.pagingIndicator.setPageCount(this.el.n);
            if (this.el.i > 0) {
                // goToLeft
                this.el.i--;
                this.el.galleryBanner.style.setProperty("--i", this.el.i);
                this.el.pagingIndicator.setSelectedPage(this.el.i);
            }
            this.toggleEditMode();
        });

        this.toggleNormalMode();
    }

    unify(e) {
        return e.changedTouches ? e.changedTouches[0] : e;
    }

    lock(e) {
        this.el.x0 = this.unify(e).clientX;
    }

    move(e) {
        const N = this.el.galleryBanner.children.length;
        if (this.el.x0 || this.el.x0 === 0) {
            let dx = this.unify(e).clientX - this.el.x0;
            let s = Math.sign(dx);

            if ((this.el.i > 0 || s < 0) && (this.el.i < N - 1 || s > 0)) {
                this.el.galleryBanner.style.setProperty("--i", this.el.i - s);
                this.el.i = this.el.i - s;
                this.el.pagingIndicator.setSelectedPage(this.el.i);
            }

            this.el.x0 = null;
        }
    }

    toggleEditMode() {
        if (this.el.n === 0) {
            this.el.changePhotoContainer.style.display = "none";
            this.el.addPhotoDiv.style.display = "block";
            this.el.addPhotoDiv.innerHTML = get(getLocale(), "add-photo");
            this.el.topLayer.style.justifyContent = "center";
            BaseComponent.removeClass(this.el.addPhotoDiv, "ww-image-gallery__add-another-photo");
            this.el.pagingIndicator.hide();
        } else if (this.el.n === 1) {
            BaseComponent.addClass(this.el.addPhotoDiv, "ww-image-gallery__add-another-photo");
            this.el.addPhotoDiv.innerHTML = get(getLocale(), "add-another-photo");
            this.el.changePhotoContainer.style.display = "flex";
            this.el.pagingIndicator.hide();
        } else {
            BaseComponent.addClass(this.el.addPhotoDiv, "ww-image-gallery__add-another-photo");
            this.el.addPhotoDiv.innerHTML = get(getLocale(), "add-another-photo");
            this.el.changePhotoContainer.style.display = "flex";
            this.el.pagingIndicator.setPageCount(this.el.n);
            this.el.pagingIndicator.show();
        }
        if (this.el.n === this.el.maxImages) {
            this.el.addPhotoDiv.style.display = "none";
        } else {
            this.el.addPhotoDiv.style.display = "block";
        }
        return this;
    }

    toggleNormalMode() {
        this.el.addPhotoDiv.style.display = "none";
        this.el.changePhotoContainer.style.display = "none";
        return this;
    }

    addImage(imageUrl, isBase64 = false) {
        if (this.el.n < this.el.maxImages) {
            let url = imageUrl;
            if (isBase64) {
                url = "data:image/png;base64," + imageUrl;
                url = url.replace(/(\r\n|\n|\r)/gm, "");
            }
            let slide = document.createElement("div");
            BaseComponent.addClass(slide, "ww-image-gallery__slide");
            slide.style.backgroundImage = "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.48)), url('" + url + "')";
            this.el.galleryBanner.appendChild(slide);
            this.el.n++;
            this.el.galleryBanner.style.setProperty("--n", this.el.n);
            if (this.el.n > 1) {
                this.el.pagingIndicator.setPageCount(this.el.n);
                this.el.pagingIndicator.show();
            }
            this.el.changePhotoContainer.style.display = "flex";
            BaseComponent.addClass(this.el.addPhotoDiv, "ww-image-gallery__add-another-photo");
            if (this.el.n === this.el.maxImages) {
                this.el.addPhotoDiv.style.display = "none";
            }
            this.el.slides.push(slide);
            this.el.images.push({
                isBase64: isBase64,
                url: isBase64 ? imageUrl : url
            });
        } else {
            console.error("The maximum number of images has been reached");
        }
        return this;
    }

    getMaxImages() {
        return this.el.maxImages;
    }

    setMaxImages(maxImages) {
        this.el.maxImages = maxImages;
        this.el.pagingIndicator.setPageCount(Math.min(this.el.n, maxImages));
        return this;
    }

    getImages() {
        return this.el.images;
    }

}