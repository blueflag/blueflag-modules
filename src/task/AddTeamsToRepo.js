// @flow
import Github from '../service/Github';
import Loader from '../request/Loader';


export default function AddTeamsToRepo(org: string, repo: string): Function {
    function addRepoToTeam(id: string, permission: string): Promise<> {
        return Github.orgs.addTeamRepo({id, org, repo, permission});
    }

    return (): Promise<> => {
        Loader.start('Adding teams to repo');
        return Promise.resolve()
            .then(() => Github.orgs.getTeams({org}))
            .then((teams: Object): Object => {
                return teams.data.reduce((rr: Object, ii: Object): Object => {
                    rr[ii.name] = ii;
                    return rr;
                }, {});
            })
            .then((teams: Object): Promise<> => {
                if(!teams['Developers']) {
                    return Promise.reject(`${org} is missing a 'Developers' team.`);
                }
                if(!teams['Admins']) {
                    return Promise.reject(`${org} is missing a 'Admins' team.`);
                }
                if(!teams['Bots']) {
                    return Promise.reject(`${org} is missing a 'Bots' team.`);
                }

                return Promise.all([
                    addRepoToTeam(teams['Admins'].id, 'admin'),
                    addRepoToTeam(teams['Developers'].id, 'push'),
                    addRepoToTeam(teams['Bots'].id, 'pull')
                ]);
            });
    };
}
