'use strict';

// Rollup plugins
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require("rollup-plugin-commonjs");
const postcss = require("rollup-plugin-postcss");
const uglify = require("rollup-plugin-uglify");
const eslint = require("rollup-plugin-eslint");

const env = process.env.NODE_ENV || 'development';
var uglifyScript = {};
var ext = '';

if (env === 'production') {
    uglifyScript = uglify({
        compress: true
    });

    ext = '.min';
}

module.exports = {
    input: 'js/src/index.js',
    output: {
        name: 'Workwell',
        file: 'dist/js/workwell' + ext + '.js',
        format: 'umd',
        sourcemap: true
    },
    plugins: [
        uglifyScript,
        postcss({
            extensions: ['.css'],
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        eslint({}),
        commonjs(),
        babel({
            exclude: '/node_modules/**',
        })
    ]
};