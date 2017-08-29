//@flow
import Github from './service/Github';
import PromiseErrorHandler from './request/PromiseErrorHandler';
import Loader from './request/Loader';
import inquirer from 'inquirer';
import Console from './request/Console';


export default function Create(program: Object, arg: string): Promise<> {
    const [owner, repo] = arg.split('/');
    return inquirer
        .prompt([
            {
                name: 'repo',
                message: 'Please type in the name of the repository to confirm.'
            },
            {
                name: 'remove',
                type: 'confirm',
                message: `Are ABSOLUTELY SURE you want to delete ${arg}`,
                default: false
            }
        ])
        .then((prompt: Object): Object => {
            if(prompt.repo !== repo) {
                return Promise.reject(`${prompt.repo} did not match ${repo}`);
            }
            if(!prompt.remove) {
                return Promise.reject(`${arg} was not deleted`);
            }

            Loader.start(`Deleting ${arg}`);
            return {owner,repo};
        })
        .then(Github.repos.delete)
        .then(() => {
            Loader.stop();
            Console.success(`${arg} was deleted.`);
        })
        .catch(PromiseErrorHandler);
}

