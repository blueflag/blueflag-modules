// @flow
import test from 'ava';
const proxyquire = require('proxyquire').noCallThru();

const Circle = proxyquire('../Circle', {
    'gromit': () => ({
        post: (data) => Promise.resolve(data)
    })
}).default;


test('Circle.follow', (tt: Object): Promise<> => {
    return Circle
        .follow({owner: 'foo', repo: 'bar'})
        .then((data) => tt.is(data, `project/github/foo/bar/follow`))
});
