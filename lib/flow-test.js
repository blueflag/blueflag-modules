'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _sinon = require('sinon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proxyquire = require('proxyquire').noCallThru();

var flowSpy = (0, _sinon.stub)().callsFake(function () {
    return { on: function on() {} };
});

var flow = proxyquire('./flow', {
    'child_process': {
        spawn: flowSpy
    }
}).default;

(0, _ava2.default)('flow will call esflow ChildProcess.spawn', function (tt) {
    flow();
    tt.is(flowSpy.callCount, 1);
});