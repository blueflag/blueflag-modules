// @flow
import Circle from '../service/Circle';
import Loader from '../request/Loader';

export default function FollowRepoBuild(owner: string, repo: string): Function {
    return (): Promise<> => {
        Loader.start('Following repo on circle');
        return Circle
            .follow({owner, repo});
    };
}
