module.exports = {
    entry: {
        index: "./js/index.js"
    },
    output: {
        path: __dirname,
        filename: "./distribution/[name].bundle.js"
    }
};