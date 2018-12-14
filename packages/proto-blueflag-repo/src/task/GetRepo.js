// @flow
import Github from '../service/Github';

export default function GetRepo(owner: string, repo: string): Function {
    return () => Github.repos
        .get({
            owner,
            repo
        });
}
