// @flow
import test from 'ava';
const proxyquire = require('proxyquire').noCallThru();

const GetRepo = proxyquire('../GetRepo', {
    '../service/Github': {
        repos: {
            get: data => Promise.resolve(data)
        }
    },
    '../request/Loader': {
        start: () => {}
    }
}).default;


test('GetRepo', (tt: Object): Promise<any> => {
    return GetRepo('foo', 'bar')()
        .then(payload => {
            tt.is(payload.repo, 'bar');
            tt.is(payload.owner, 'foo');
        });
});
