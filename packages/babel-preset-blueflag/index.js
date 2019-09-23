var env = require('@babel/preset-env');
var react = require('@babel/preset-react');
var flow = require('@babel/preset-flow');
var transformRuntime = require('@babel/plugin-transform-runtime');
var transfromClassProperties = require('@babel/plugin-proposal-class-properties');
var graphqlTag = require('babel-plugin-graphql-tag');
var extractFlowType = require('babel-plugin-extract-flow-type');

module.exports = function(context, options) {
    options = options || {};

    var disabled = options.disabled || [];
    var browser = options.browser || false;
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

    // babel-preset-flow
    if(disabled.indexOf('flow') === -1) {
        presets.push([
            flow,
            config.flow
        ]);
    }

    // babel-plugin-transform-runtime
    if(disabled.indexOf('transform-runtime') === -1) {
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

    // graphql-tag
    if(disabled.indexOf('graphql-tag') === -1) {
        plugins.push([
            graphqlTag,
            config['graphql-tag']
        ]);
    }

    // babel-plugin-extract-flow-type
    if(disabled.indexOf('extract-flow-type') === -1) {
        plugins.push([
            extractFlowType,
            config['extract-flow-type'] || {srcDir: 'src', outDir: 'lib'}
        ]);
    }

    return {
        presets: presets,
        plugins: plugins
    };
}
