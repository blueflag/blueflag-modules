import Github from '../service/Github';
import Loader from '../request/Loader';

export default function CreateRepo(org, name) {
    return () => {
        Loader.start('Creating repository.');
        return Github
            .repos
            .createForOrg({
                auto_init: true,
                homepage: `https://${org}.github.io/${name}`,
                name,
                org,
                private: true
            });
    }
}
