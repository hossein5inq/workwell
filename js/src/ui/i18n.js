const defaultLocale = "en";
let locale = defaultLocale;

const i18n = {
    en: {
        "cancel-search-input": "Cancel",
        "required": "Required"
    },
    fr: {
        "cancel-search-input": "Annuler",
        "required": "Requis"
    }
};

export function get(locale, key) {
    return i18n[locale][key];
}

export function getLocale() {
    if (window.localStorage.workwellUserLocale)
        return window.localStorage.workwellUserLocale;
    else
        return defaultLocale;
}

export function setLocale(locale_) {
    locale_ = locale_.split("-")[0];
    for (let key in i18n) {
        if (key === locale_) {
            locale = locale_;
            break;
        }
    }
    window.localStorage.workwellUserLocale = locale;
    //refreshLocalizedElements(locale);
}
