var env = require('babel-preset-env');
var react = require('babel-preset-react');
var stage3 = require('babel-preset-stage-3');
var transformRuntime = require('babel-plugin-transform-runtime');
var transfromClassProperties = require('babel-plugin-transform-class-properties');

module.exports = function(context, options) {
    options = options || {};

    var disabled = options.disabled || [];
    var browser = options.browser || false;
    var library = options.library || false;
    var config = options.config || {};

    var presets = [];
    var plugins = [];

    // babel-preset-env
    if(disabled.indexOf('env') === -1) {
        presets.push([
            env,
            Object.assign({
                targets: browser ? {browsers: 'last 2 versions'} : {node: 'current'}
            }, config.env)
        ])
    }

    // babel-preset-react
    if(disabled.indexOf('react') === -1) {
        presets.push([
            react,
            config.react
        ]);
    }

    // babel-preset-stage-3
    if(disabled.indexOf('stage-3') === -1) {
        presets.push([
            stage3,
            config['stage-3']
        ]);
    }

    // babel-plugin-transform-runtime (don't use for client side libraries)
    if(disabled.indexOf('transform-runtime') === -1 && !(library && browser)) {
        plugins.push([
            transformRuntime,
            config['transform-runtime']
        ]);
    }

    // babel-plugin-transform-class-properties
    if(disabled.indexOf('transform-class-properties') === -1) {
        plugins.push([
            transfromClassProperties,
            config['transform-class-properties']
        ]);
    }

    return {
        presets: presets,
        plugins: plugins
    };
}
