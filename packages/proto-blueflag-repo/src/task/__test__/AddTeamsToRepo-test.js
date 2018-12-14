// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

const stubbAddTeamsToRepo = (teams) => proxyquire('../AddTeamsToRepo', {
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


test('AddTeamsToRepo', (tt: Object): Promise<any> => {

    const AddTeamsToRepo = stubbAddTeamsToRepo([
        {name: 'Admins', id: 1},
        {name: 'Developers', id: 2},
        {name: 'Bots', id: 3},
    ]);

    return AddTeamsToRepo('foo', 'bar')().then(data => {
        tt.is(data[0].permission, 'admin');
        tt.is(data[1].permission, 'push');
        tt.is(data[2].permission, 'pull');
    })
});


test('AddTeamsToRepo failure', (tt: Object): Promise<any> => {
    const AddTeamsToRepo = stubbAddTeamsToRepo([
        {name: 'Admins', id: 1},
        {name: 'Zevelopers', id: 2},
        {name: 'Bots', id: 3},
    ]);

    return AddTeamsToRepo('foo', 'bar')().catch(data => {
        tt.is(data, `foo is missing a 'Developers' team.`);
    })
});


test('AddTeamsToRepo failure', (tt: Object): Promise<any> => {
    const AddTeamsToRepo = stubbAddTeamsToRepo([
        {name: 'Zadmins', id: 1},
        {name: 'Developers', id: 2},
        {name: 'Bots', id: 3},
    ]);

    return AddTeamsToRepo('foo', 'bar')().catch(data => {
        tt.is(data, `foo is missing a 'Admins' team.`);
    })
});


test('AddTeamsToRepo failure', (tt: Object): Promise<any> => {
    const AddTeamsToRepo = stubbAddTeamsToRepo([
        {name: 'Admins', id: 1},
        {name: 'Developers', id: 2},
        {name: 'ZBots', id: 3},
    ]);

    return AddTeamsToRepo('foo', 'bar')().catch(data => {
        tt.is(data, `foo is missing a 'Bots' team.`);
    })
});
