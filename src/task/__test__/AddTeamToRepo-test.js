// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

const stubbAddTeamToRepo = (teams) => proxyquire('../AddTeamToRepo', {
    '../service/Github': {
        orgs: {
            addTeamRepo: (data) => Promise.resolve(data),
            getTeams: () => ({data: teams})
        }
    },
    '../request/Loader': {
        start: spy()
    }
}).default;


test('AddTeamToRepo', (tt: Object): Promise<> => {

    const AddTeamToRepo = stubbAddTeamToRepo([
        {name: 'baz', id: 1}
    ]);

    return AddTeamToRepo('foo', 'bar', 'baz', 'qux')().then(data => {
        tt.is(data.org, 'foo');
        tt.is(data.repo, 'bar');
        tt.is(data.id, 1);
        tt.is(data.permission, 'qux');
    });
});
