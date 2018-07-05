export let serviceToken = {
    tokenId: "",
    expiresIn: 0
};

export function setServiceToken(serviceToken_) {
    serviceToken.tokenId = serviceToken_;
}

export function getServiceToken() {
    return serviceToken;
}