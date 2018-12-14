// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();

const Console = proxyquire('../Console', {
    './request/Loader': {start: spy(), stop: spy()}
}).default;


test('Console passes first argument through and logs to console', (tt: Object) => {
    spy(console, 'log');

    tt.is(Console.log('foo'), 'foo');
    tt.is(Console.success('foo'), 'foo');
    tt.is(Console.error('foo'), 'foo');

    tt.is(console.log.callCount, 3);
});
