// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();

const PromiseErrorHandler = proxyquire('../PromiseErrorHandler', {
    './request/Loader': {start: spy(), stop: spy()}
}).default;



test.beforeEach(() => spy(console, 'log'));
test.afterEach(() => console.log.restore());

test('PromiseErrorHandler will plain log if error parsing fails', (tt: AssertContext): Promisegg<void> => {
    PromiseErrorHandler('fake object');
    tt.is(console.log.callCount, 1);
});


test('PromiseErrorHandler will try and log all error items', (tt: AssertContext): Promisegg<void> => {
    PromiseErrorHandler({message: `{"message": "foo", "errors": [{"message": "bar"}]}`});
    tt.is(console.log.callCount, 2);
});
