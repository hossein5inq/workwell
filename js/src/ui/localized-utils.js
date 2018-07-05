import {get} from "./i18n";

export function refreshLocalizedElements(locale) {
    // When the locale is changed but there was already elements in the DOM
    // ww-search-inputs (iOS)
    let searchBarCancelTextElements = document.getElementsByClassName("ww-search-bar-text-container");
    for (let i = 0; i < searchBarCancelTextElements.length; i++) {
        searchBarCancelTextElements[i].innerText = get(locale, "cancel-search-input");
    }
}