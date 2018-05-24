// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire')
    .noCallThru()
    .noPreserveCache();


function stubFile(): Function {
    return proxyquire('../BranchRestrictionPush', {
        './request/Console': {success: spy(), log: spy()},
        './request/Loader': {start: spy(), stop: spy()},
        './request/PromiseErrorHandler': (error) => Promise.reject(error),
        './service/Github': {},
        './task/AddProtectedBranchUserRestrictions': () => () => Promise.resolve()
    }).default;
}

test('BranchRestrictionPush returns a promise', (tt: Object): Promise<any> => {
    var BranchRestrictionPush = stubFile();
    return BranchRestrictionPush({}, {repo: 'foo/foo', users: 'bar,baz', branch: 'master'}).then(() => tt.pass());
});
