//@flow
import PromiseErrorHandler from './request/PromiseErrorHandler';
import Loader from './request/Loader';
import Console from './request/Console';
import AddBranchProtection from './task/AddBranchProtection';
import CommitPullApproveConfig from './task/CommitPullApproveConfig';
import AddTeamsToRepo from './task/AddTeamsToRepo';
import FollowRepoBuild from './task/FollowRepoBuild';
import CreateRepo from './task/CreateRepo';
import PullApproveAdd from './task/PullApproveAdd';

export default function Create(program: Object, arg: string): Promise<any> {
    const [org, name] = arg.split('/');
    return Promise.resolve()
        .then(CreateRepo(org, name))
        .then(CommitPullApproveConfig(org, name, program.pullapproveTemplate))
        .then(AddBranchProtection(org, name))
        .then(AddTeamsToRepo(org, name))
        .then(FollowRepoBuild(org, name))
        .then(PullApproveAdd(org, name))
        .then(() => {
            Loader.stop();
            Console.success('Repo Created!');
        })
        .catch(PromiseErrorHandler);
}

