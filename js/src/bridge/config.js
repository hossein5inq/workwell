import {refreshLocalizedElements} from "../ui/localized-utils";

export const compatibiltyVersion = 1;

export let os = undefined;

export let locale = "en";

export function getCompatibilityVersion() {
    return compatibiltyVersion;
}

export function getLocale() {
    if (window.localStorage.workwellUserLocale)
        return window.localStorage.workwellUserLocale;
    else
        return locale;
}

export function setLocale(locale_) {
    locale = locale_.split("-")[0];
    window.localStorage.workwellUserLocale = locale;
    refreshLocalizedElements(locale);
}

export function setOS(os_) {
    os = os_;
}