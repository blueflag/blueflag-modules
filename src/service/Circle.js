// @flow
import Gromit from 'gromit';

function requester(): Object {
    return Gromit({
        baseUrl: `https://circleci.com/api/v1.1/`,
        params: {
            'circle-token': process.env.CIRCLE_CI_TOKEN
        }
    });
}

export default {
    follow: ({owner, repo}: Object): Promise<> => {
        return requester().post(`project/github/${owner}/${repo}/follow`);
    }
    // createUserCheckoutKey: ({owner, repo}: Object): Promise<> => {
    //     return requester().post(`project/github/${owner}/${repo}/checkout-key`, {
    //         type: 'github-user-key'
    //     });
    // }
};


