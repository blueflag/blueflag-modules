// @flow
import Github from '../service/Github';
import Loader from '../request/Loader';

export default function AddBranchProtection(owner: string, repo: string): Function {
    return (): Promise<> => {
        Loader.start('Adding branch protection.');
        return Github.repos
            .updateBranchProtection({
                owner,
                repo,
                branch: 'master',
                required_status_checks: {
                    strict: true,
                    contexts: [
                        'ci/circleci',
                        'code-review/pullapprove'
                    ]
                },
                required_pull_request_reviews: {
                    dismiss_stale_reviews: true
                },
                restrictions: null,
                enforce_admins: false
            });
    };
}
