// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

const authSpy = spy();

proxyquire('../Github', {
    'github': () => ({
        authenticate: authSpy
    })
}).default;


test('Github.follow', (tt: AssertContext) => {
    tt.is(authSpy.callCount, 1);
});
