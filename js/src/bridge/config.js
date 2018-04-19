var localizedUtils = require("../ui/localized-utils");

module.exports = {
    compatibilityVersion: 1,
    os: undefined,
    locale: "en",
    getCompatibilityVersion: function () {
        return module.exports.compatibilityVersion;
    },
    getLocale: function () {
        if (window.localStorage.workwellUserLocale)
            return window.localStorage.workwellUserLocale;
        else
            return module.exports.locale;
    },
    setLocale: function (locale_) {
        module.exports.locale = locale_.split("-")[0];
        window.localStorage.workwellUserLocale = module.exports.locale;
        localizedUtils.refreshLocalizedElements(module.exports.locale);
    },
    setOS: function (os_) {
        module.exports.os = os_;
    }
};