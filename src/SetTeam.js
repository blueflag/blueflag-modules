//@flow
import PromiseErrorHandler from './request/PromiseErrorHandler';
import Loader from './request/Loader';
import Console from './request/Console';
import SetTeamToRepo from './task/SetTeamToRepo';


export default function SetTeam(program: Object, args: Object): Promise<> {
    const [org, repo] = args.repo.split('/');
    Loader.start();
    return Promise.resolve()
        .then(SetTeamToRepo({...args, org, repo}))
        .then(() => {
            Loader.stop();
            Console.success('Repo Team Updated!');
        })
        .catch(PromiseErrorHandler);
}

