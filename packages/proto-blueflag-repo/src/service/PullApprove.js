// @flow
import Gromit from 'gromit';

function requester(): Object {
    return Gromit({
        baseUrl: `https://pullapprove.com/api/`,
        headers: {
            Authorization: `Token ${process.env.PULL_APPROVE_TOKEN || ''}`
        }
    });
}

export default {
    add: ({owner, repo}: Object): Promise<any> => {
        return requester().post(`orgs/${owner}/repos/`, {name: repo});
    }
};


