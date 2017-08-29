// @flow
import test from 'ava';
const proxyquire = require('proxyquire').noCallThru();

const CommitPullApproveConfig = proxyquire('../CommitPullApproveConfig', {
    '../service/Github': {
        repos: {
            createFile: data => Promise.resolve(data)
        }
    },
    '../request/Loader': {
        start: () => {}
    }
}).default;


test('CommitPullApproveConfig', (tt: AssertContext): Promisegg<void> => {
    return CommitPullApproveConfig('foo', 'bar')()
        .then(payload => {
            tt.is(payload.path, '.pullapprove.yml');
            tt.is(payload.owner, 'foo');
            tt.is(payload.repo, 'bar');
            tt.is(payload.message, 'Add .pullapprove.yml');
            tt.is(payload.content, 'dmVyc2lvbjogMgpleHRlbmRzOiBkZWZhdWx0LXRlbXBsYXRl');
        });
});
