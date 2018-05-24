// @flow
import test from 'ava';
const proxyquire = require('proxyquire').noCallThru();

const CreateRepo = proxyquire('../CreateRepo', {
    '../service/Github': {
        repos: {
            createForOrg: data => Promise.resolve(data)
        }
    },
    '../request/Loader': {
        start: () => {}
    }
}).default;


test('CreateRepo', (tt: Object): Promise<any> => {
    return CreateRepo('foo', 'bar')()
        .then(payload => {
            tt.is(payload.auto_init, true);
            tt.is(payload.homepage, 'https://foo.github.io/bar');
            tt.is(payload.name, 'bar');
            tt.is(payload.org, 'foo');
            tt.is(payload.private, true);
        });
});
