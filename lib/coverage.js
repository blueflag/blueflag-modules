#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Coverage;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Coverage(program) {
    var _program$minCoverage = program.minCoverage,
        minCoverage = _program$minCoverage === undefined ? 80 : _program$minCoverage;

    var cwd = process.cwd();

    var nycBin = _path2.default.resolve(__dirname, '../node_modules/.bin/nyc');
    var blueflagTestBin = cwd + '/node_modules/.bin/blueflag-test';

    // blueflag-test is running itself
    if (cwd.indexOf('blueflag-test') !== -1) {
        nycBin = cwd + '/node_modules/nyc/bin/nyc.js';
        blueflagTestBin = cwd + '/scripts/run';
    }

    var args = [].concat(['--all', '--check-coverage', '--branches=' + minCoverage, '--functions=' + minCoverage, '--lines=' + minCoverage, '--statements=' + minCoverage, '--include=src', '--reporter=text', '--reporter=lcov']).concat(program.extraFlags).concat([blueflagTestBin, 'test']);

    _child_process2.default.spawn(nycBin, args, {
        stdio: 'inherit',
        cwd: process.cwd()
    }).on('exit', process.exit).on('error', function (err) {
        return console.log(err);
    });
}