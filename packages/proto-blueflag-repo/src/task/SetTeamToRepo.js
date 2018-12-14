// @flow
import Github from '../service/Github';
import Loader from '../request/Loader';


export default function SetTeamToRepo(args: Object): Function {
    const {repo, team, permission, org} = args;

    function addRepoToTeam(id: string, permission: string): Promise<any> {
        return Github.orgs.addTeamRepo({id, org, repo, permission});
    }

    return (): Promise<any> => {
        Loader.start(`Setting ${permission} rights to ${team} on ${repo}`);
        return Promise.resolve()
            .then(() => Github.orgs.getTeams({org}))
            .then((teams: Object): Object => {
                return teams.data.reduce((rr: Object, ii: Object): Object => {
                    rr[ii.name] = ii;
                    return rr;
                }, {});
            })
            .then((teams: Object): Promise<any> => {
                if(!teams[team]) {
                    return Promise.reject(`${org} is missing a '${team}' team.`);
                }

                return addRepoToTeam(teams[team].id, permission);
            });
    };
}
