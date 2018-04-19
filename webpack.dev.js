const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin(['dist/js/workwell.js'])
    ],
    output: {
        path: __dirname,
        filename: "dist/js/workwell.js",
        libraryTarget: "umd",
        library: "Workwell"
    },
    devtool: 'inline-source-map'
});