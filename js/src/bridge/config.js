export const compatibiltyVersion = 1;

export let os = undefined;

export function getCompatibilityVersion() {
    return compatibiltyVersion;
}

export function setOS(os_) {
    os = os_;
}