'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proxyquire = require('proxyquire').noCallThru();

var lintSpy = (0, _sinon.spy)();
var lint = proxyquire('./lint', {
    'eslint/lib/cli': {
        execute: lintSpy
    }
}).default;

(0, _ava2.default)('lint will call eslint Cli.execute', function (tt) {
    lint({});
    tt.is(lintSpy.callCount, 1);
});