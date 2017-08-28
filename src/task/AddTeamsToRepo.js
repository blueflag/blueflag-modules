import Github from '../service/Github';
import Loader from '../request/Loader';


export default function AddTeamsToRepo(org, repo) {
    function addRepoToTeam(id, permission) {
        return Github.orgs.addTeamRepo({id, org, repo, permission})
    }

    return () => {
        Loader.start('Adding teams to repo');
        return Promise.resolve()
            .then(() => Github.orgs.getTeams({org}))
            .then(teams => {
                return teams.data.reduce((rr, ii) => {
                    rr[ii.name] = ii;
                    return rr;
                }, {})
            })
            .then(teams => {
                if(!teams['Developers']) {
                    return Promise.reject(`${org} is missing a 'Developers' team.`)
                }
                if(!teams['Admins']) {
                    return Promise.reject(`${org} is missing a 'Admins' team.`)
                }
                if(!teams['Bots']) {
                    return Promise.reject(`${org} is missing a 'Bots' team.`)
                }

                return Promise.all([
                    addRepoToTeam(teams['Admins'].id, 'admin'),
                    addRepoToTeam(teams['Developers'].id, 'push'),
                    addRepoToTeam(teams['Bots'].id, 'pull'),
                ])
            })
    }
}
