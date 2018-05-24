// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

// const CreateSpy = spy();
// const DeleteSpy = spy();
// const ProtectSpy = spy();

const Protect = proxyquire('../Protect', {
    './request/Console': {success: spy(), log: spy()},
    './request/Loader': {start: spy(), stop: spy()},
    './request/PromiseErrorHandler': () => Promise.resolve(),
    './task/AddBranchProtection': () => Promise.resolve(),
    './task/AddTeamsToRepo': () => Promise.resolve(),
    './task/CommitPullApproveConfig': () => Promise.resolve(),
    './task/FollowRepoBuild': () => Promise.resolve(),
    './task/PullApproveAdd': () => Promise.resolve()
}).default;


test('Protect returns a promise', (tt: Object): Promise<any> => {
    return Protect({}, 'foo/bar').then(() => tt.pass());
});
