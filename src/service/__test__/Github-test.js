// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

const authSpy = spy();

const Github = proxyquire('../Github', {
    'github': () => ({
        authenticate: authSpy
    })
}).default;


test('Github.follow', (tt: AssertContext): Promisegg<void> => {
    tt.is(authSpy.callCount, 1);
});
