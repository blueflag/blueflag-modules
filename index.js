var es2015 = require('babel-preset-es2015');
var es2016 = require('babel-preset-es2016');
var es2017 = require('babel-preset-es2017');
var react = require('babel-preset-react');
var stage3 = require('babel-preset-stage-3');
var transformRuntime = require('babel-plugin-transform-runtime');

module.exports = {
    plugins: []
        .concat(es2015.plugins)
        .concat(es2016.plugins)
        .concat(es2017.plugins)
        .concat(react.plugins)
        .concat(stage3.plugins)
        .concat(transformRuntime.plugins)
}
