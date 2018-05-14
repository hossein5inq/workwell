module.exports = {
    requestToken: "",
    maxRetries: 5,
    tryNb: 0,
    setRequestTokenFunction: function (fn) {
        this.requestToken = function (callback) {
            if (this.tryNb < this.maxRetries) {
                fn(callback);
                this.tryNb++;
            } else {
                this.tryNb = 0;
                console.log("Number of max bridge calls exceeded !! Something is wrong with the token ID !");
            }
        };
    },
    getRequestTokenFunction: function () {
        return this.requestToken;
    },
    resetTries: function () {
        this.tryNb = 0;
    }
};
