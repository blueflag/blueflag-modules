// @flow
import Github from '../service/Github';
import Loader from '../request/Loader';


export default function AddTeamToRepo(org: string, repo: string, team: string, access: string): Function {
    function addRepoToTeam(id: string, permission: string): Promise<> {
        return Github.orgs.addTeamRepo({id, org, repo, permission});
    }

    return (): Promise<> => {
        Loader.start('Adding team to repo');
        return Promise.resolve()
            .then(() => Github.orgs.getTeams({org}))
            .then((teams: Object): Object => {
                return teams.data.reduce((rr: Object, ii: Object): Object => {
                    rr[ii.name] = ii;
                    return rr;
                }, {});
            })
            .then((teams: Object): Promise<> => {
                if(!teams[team]) {
                    return Promise.reject(`${org} is missing a '${team}' team.`);
                }

                return addRepoToTeam(teams[team].id, access);
            });
    };
}
