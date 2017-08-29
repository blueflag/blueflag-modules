// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();


function stubFile(inquireData) {
    return proxyquire('../Create', {
        './request/Console': {success: spy(), log: spy()},
        './request/Loader': {start: spy(), stop: spy()},
        './request/PromiseErrorHandler': (error) => Promise.reject(error),
        './service/Github': {},
        './task/AddBranchProtection': () => () => Promise.resolve(),
        './task/AddTeamsToRepo': () => () => Promise.resolve(),
        './task/CommitPullApproveConfig': () => () => Promise.resolve(),
        './task/CreateRepo': () => () => Promise.resolve(),
        './task/FollowRepoBuild': () => () => Promise.resolve(),
        './task/GetRepo': () => () => Promise.resolve({data: {id: 'foo'}}),
    }).default;
}



test('Create returns a promise', (tt: AssertContext): Promise<> => {
    var Create = stubFile({repo: 'foo', remove: true});
    return Create({}, 'foo/foo').then(() => tt.pass());
});
