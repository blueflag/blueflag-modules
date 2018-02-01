#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Lint;

var _cli = require('eslint/lib/cli');

var _cli2 = _interopRequireDefault(_cli);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Lint(program) {
    var CONFIG_DIR = _path2.default.resolve(__dirname, "./config/eslint-config.json");
    var SRC_DIR = program.singleFile || process.cwd() + '/src';
    process.exitCode = _cli2.default.execute(['NOT-REAL-OR-IMPORTANT-ESLINT-BIN'].concat((' ' + SRC_DIR + ' -c ' + CONFIG_DIR + ' --ext js,jsx --debug').split(' ')).concat(program.extraFlags));
}