// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire')
    .noCallThru()
    .noPreserveCache();


function stubFile(): Function {
    return proxyquire('../TestCommand', {
        './request/Console': {success: spy(), log: spy()},
        './request/Loader': {start: spy(), stop: spy()},
    }).default;
}

test('TestCommand returns a promise', (tt: Object): Promise<any> => {
    return stubFile()(Promise.resolve).then(() => tt.pass());
});
