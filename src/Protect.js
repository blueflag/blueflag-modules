//@flow
import PromiseErrorHandler from './request/PromiseErrorHandler';
import Loader from './request/Loader';
import AddBranchProtection from './task/AddBranchProtection';
import AddTeamsToRepo from './task/AddTeamsToRepo';
import Console from './request/Console';
import FollowRepoBuild from './task/FollowRepoBuild';
import CommitPullApproveConfig from './task/CommitPullApproveConfig';
import PullApproveAdd from './task/PullApproveAdd';

export default function Protect(program: Object, arg: string): Promise<any> {
    const [org, name] = arg.split('/');
    Loader.start();

    return Promise.resolve()
        .then(CommitPullApproveConfig(org, name, program.pullapproveTemplate))
        .then(AddBranchProtection(org, name))
        .then(AddTeamsToRepo(org, name))
        .then(FollowRepoBuild(org, name))
        .then(PullApproveAdd(org, name))
        .then(() => {
            Loader.stop();
            Console.success('Repo Protected!');
        })
        .catch(PromiseErrorHandler);
}

