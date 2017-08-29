//@flow
import PromiseErrorHandler from './request/PromiseErrorHandler';
import Loader from './request/Loader';
import AddBranchProtection from './task/AddBranchProtection';

export default function Protect(program: Object, arg: string): Promise<> {
    const [org, name] = arg.split('/');
    Loader.start();
    return Promise.resolve()
        .then(AddBranchProtection(org, name))
        .then(() => {
            Loader.stop();
            console.log('Master branch Protected.');
        })
        .catch(PromiseErrorHandler);
}

