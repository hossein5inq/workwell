var i18n = require("./i18n");

module.exports = {
    refreshLocalizedElements: function (locale) {
        // When the locale is changed but there was already elements in the DOM
        // ww-search-inputs (iOS)
        var searchBarCancelTextElements = document.getElementsByClassName('ww-search-bar-text-container');
        for (var i = 0; i < searchBarCancelTextElements.length; i++) {
            searchBarCancelTextElements[i].innerText = i18n.get(locale, "cancel-search-input");
        }
    }
};