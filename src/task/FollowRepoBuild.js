import Circle from '../service/Circle';
import Loader from '../request/Loader';

export default function FollowRepoBuild(owner, repo) {
    return () => {
        Loader.start('Following repo on circle');
        return Circle
            .follow({owner, repo})
    }
}
