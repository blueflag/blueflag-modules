#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

exports.default = Test;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _api = require('ava/api');

var _api2 = _interopRequireDefault(_api);

var _logger = require('ava/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _verbose = require('ava/lib/reporters/verbose');

var _verbose2 = _interopRequireDefault(_verbose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Test() {
    var TEST_DIR = process.cwd();

    var api = new _api2.default({
        failFast: true,
        failWithoutAssertions: true,
        require: [_path2.default.resolve(__dirname, 'config', 'pretest'), 'babel-register'],
        cacheEnabled: true,
        powerAssert: true,
        babelConfig: {
            presets: ['blueflag'],
            plugins: ['istanbul'],
            sourceMaps: 'inline'
        },
        resolveTestsFrom: TEST_DIR,
        projectDir: TEST_DIR,
        timeout: '5s'
    });

    var reporter = new _verbose2.default({ color: true });
    var logger = new _logger2.default(reporter);

    logger.start();

    api.on('test-run', function (runStatus) {
        reporter.api = runStatus;
        runStatus.on('test', logger.test);
        runStatus.on('error', logger.unhandledError);

        runStatus.on('stdout', logger.stdout);
        runStatus.on('stderr', logger.stderr);
    });

    api.run(['src/**/*-test.js']).then(function (runStatus) {
        logger.finish(runStatus);
        logger.exit(runStatus.failCount > 0 || runStatus.rejectionCount > 0 || runStatus.exceptionCount > 0 ? 1 : 0);
    }).catch(function (err) {
        // Don't swallow exceptions. Note that any expected error should already
        // have been logged.
        (0, _setImmediate3.default)(function () {
            throw err;
        });
    });
}