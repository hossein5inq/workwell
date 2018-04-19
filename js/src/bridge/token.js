module.exports = {
    serviceToken: {
        tokenId: "",
        expiresIn: 0
    },
    setServiceToken: function (serviceToken_) {
        this.serviceToken.tokenId = serviceToken_;
        //this.appToken.expiresIn = body.expires_in;
    },
    getServiceToken: function () {
        return this.serviceToken;
    }
}