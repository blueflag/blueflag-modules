// @flow
import Github from '../service/Github';
import Loader from '../request/Loader';
import Console from '../request/Console';

export default function CommitPullApproveConfig(owner: string, repo: string, templateName: string): Function {
    return (): Promise<> => {
        Loader.start('Adding .pullapprove.yml');
        return Promise.resolve()
            .then(() => Github.repos.createFile({
                owner,
                repo,
                path: '.pullapprove.yml',
                message: 'Add .pullapprove.yml',
                content: Buffer.from(`version: 2\nextends: ${templateName}-template`).toString('base64')
            }))
            .catch((error: Object): Promise<> => {
                // Dont fail if pullapprove already exists
                if(error.code === 422 && error.message.indexOf(`\\"sha\\" wasn't supplied.`) !== -1) {
                    Console.log('.pullapprove.yml already exists.');
                    return Promise.resolve();
                }
                return Promise.reject(error);
            });
    };
}
