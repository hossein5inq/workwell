const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist/js/workwell.min.js'])
    ],
    output: {
        path: __dirname,
        filename: "dist/js/workwell.min.js",
        libraryTarget: "umd",
        library: "Workwell"
    },
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: true
            },
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});