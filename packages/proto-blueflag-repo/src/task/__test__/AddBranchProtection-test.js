// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

const taskSpy = spy();

const AddBranchProtection = proxyquire('../AddBranchProtection', {
    '../service/Github': {
        repos: {
            updateBranchProtection: taskSpy
        }
    },
    '../request/Loader': {
        start: spy()
    }
}).default;


test('AddBranchProtection', (tt: Object) => {
    AddBranchProtection('foo', 'bar')();

    const payload = taskSpy.firstCall.args[0];

    tt.is(payload.branch, 'master');
    tt.is(payload.owner, 'foo');
    tt.is(payload.repo, 'bar');
    tt.is(payload.required_status_checks.strict, true);
    tt.is(payload.required_status_checks.contexts[0], 'ci/circleci');
    tt.is(payload.required_status_checks.contexts[1], 'code-review/pullapprove');
    tt.is(payload.required_pull_request_reviews.dismiss_stale_reviews, true);
    tt.is(taskSpy.callCount, 1);
});
