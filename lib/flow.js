#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Flow;

var _flowBin = require('flow-bin');

var _flowBin2 = _interopRequireDefault(_flowBin);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Flow() {
    _child_process2.default.spawn(_flowBin2.default, ['check'], {
        stdio: 'inherit',
        cwd: process.cwd()
    }).on('exit', process.exit);
}