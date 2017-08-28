import Github from '../service/Github';

export default function GetRepo(owner, repo) {
    return () => Github.repos
        .get({
            owner,
            repo
        })
}
