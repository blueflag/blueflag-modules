// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire')
    .noCallThru()
    .noPreserveCache();


function stubFile(): Function {
    return proxyquire('../SetTeam', {
        './request/Console': {success: spy(), log: spy()},
        './request/Loader': {start: spy(), stop: spy()},
        './request/PromiseErrorHandler': (error) => Promise.reject(error),
        './service/Github': {},
        './task/SetTeamToRepo': () => () => Promise.resolve()
    }).default;
}

test('SetTeam returns a promise', (tt: Object): Promise<any> => {
    var Create = stubFile();
    return Create({}, {repo: 'foo/foo'}).then(() => tt.pass());
});
