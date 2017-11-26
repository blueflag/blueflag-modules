// @flow
import Github from '../service/Github';
import Loader from '../request/Loader';


export default function AddProtectedBranchUserRestrictions(args: Object): Function {
    const {owner, repo, branch, users} = args;

    return (): Promise<> => {
        Loader.start(`Letting ${args.users} push to ${args.branch}`);
        return Promise.resolve()
            .then(() => Github.repos.addProtectedBranchAdminEnforcement({owner, repo, branch}))
            .then(() => Github.repos.addProtectedBranchUserRestrictions({owner, repo, branch, users}))
        ;
    };
}
