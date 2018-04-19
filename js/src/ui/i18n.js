module.exports = {
    en: {
        "cancel-search-input": "Cancel"
    },
    fr: {
        "cancel-search-input": "Annuler"
    },
    get: function (locale, key) {
        return module.exports[locale][key];
    }
};
