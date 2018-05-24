//@flow
import PromiseErrorHandler from './request/PromiseErrorHandler';
import Loader from './request/Loader';
import Console from './request/Console';
import AddProtectedBranchUserRestrictions from './task/AddProtectedBranchUserRestrictions';


export default function BranchRestrictionPush(program: Object, args: Object): Promise<any> {
    const [owner, repo] = args.repo.split('/');
    const users = args.users.split(',');
    return Promise.resolve()
        .then(AddProtectedBranchUserRestrictions({...args, owner, repo, users}))
        .then(() => {
            Loader.stop();
            Console.success(`${args.users} can push to ${args.branch}`);
        })
        .catch(PromiseErrorHandler);
}

