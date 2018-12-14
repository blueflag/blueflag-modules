// @flow
import test from 'ava';
const proxyquire = require('proxyquire').noCallThru();

const FollowRepoBuild = proxyquire('../FollowRepoBuild', {
    '../service/Circle': {
        follow: data => Promise.resolve(data)
    },
    '../request/Loader': {
        start: () => {}
    }
}).default;


test('FollowRepoBuild', (tt: Object): Promise<any> => {
    return FollowRepoBuild('foo', 'bar')()
        .then(payload => {
            tt.is(payload.repo, 'bar');
            tt.is(payload.owner, 'foo');
        });
});
