import Github from '../service/Github';
import Loader from '../request/Loader';


export default function CommitPullApproveConfig(owner, repo) {
    return () => {
        Loader.start('Adding .pullapprove.yml');
        return Promise.resolve()
            .then(() => Github.repos.createFile({
                owner,
                repo,
                path: '.pullapprove.yml',
                message: 'Add .pullapprove.yml',
                content: Buffer.from('version: 2\nextends: default-template').toString('base64')
            }))
    }
}
¡
