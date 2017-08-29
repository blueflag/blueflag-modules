//@flow
import PromiseErrorHandler from './request/PromiseErrorHandler';
import Loader from './request/Loader';
import Console from './request/Console';
import AddBranchProtection from './task/AddBranchProtection';
import CommitPullApproveConfig from './task/CommitPullApproveConfig';
import AddTeamsToRepo from './task/AddTeamsToRepo';
import FollowRepoBuild from './task/FollowRepoBuild';
import CreateRepo from './task/CreateRepo';
import GetRepo from './task/GetRepo';

const pullApproveUrl = (id, org, name) => `https://pullapprove.com/activate-repo/?gh_id=${id}&gh_url=https://api.github.com/repos/${org}/${name}&gh_full_name=${org}/${name}`;

export default function Create(program: Object, arg: string): Promise<> {
    const [org, name] = arg.split('/');
    return Promise.resolve()
        .then(CreateRepo(org, name))
        .then(CommitPullApproveConfig(org, name))
        .then(AddBranchProtection(org, name))
        .then(AddTeamsToRepo(org, name))
        .then(FollowRepoBuild(org, name))
        .then(GetRepo(org, name))
        .then((ii: Object) => {
            Loader.stop();
            Console.log(pullApproveUrl(ii.data.id, org, name));
            Console.success('Repo Created!');
        })
        .catch(PromiseErrorHandler);
}

