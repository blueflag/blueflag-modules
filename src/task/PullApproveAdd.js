// @flow
import PullApprove from '../service/PullApprove';
import Loader from '../request/Loader';
import Console from '../request/Console';

export default function PullApproveAdd(owner: string, repo: string): Function {
    return (): Promise<> => {
        Loader.start('Adding Pull Approve');
        return PullApprove
            .add({owner, repo})
            .catch((error: Object): Promise<> => {
                const {data} = error;
                // Recover from already pull approved repos
                if(data.response.status === 400 && data.response.data.join().indexOf('duplicate key') !== -1) {
                    Console.log('Repo already has Pull Approve!');
                    return Promise.resolve();
                }
                return Promise.reject(error);
            });
    };
}
