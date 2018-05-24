// @flow
import test from 'ava';
const proxyquire = require('proxyquire').noCallThru();

const PullApprove = proxyquire('../PullApprove', {
    'gromit': () => ({
        post: (url, payload) => Promise.resolve({url, payload})
    })
}).default;


test('PullApprove.add', (tt: Object): Promise<any> => {
    return PullApprove
        .add({owner: 'foo', repo: 'bar'})
        .then(({url, payload}: Object) => {
            tt.is(url, `orgs/foo/repos/`);
            tt.is(payload.name, 'bar');
        });
});
