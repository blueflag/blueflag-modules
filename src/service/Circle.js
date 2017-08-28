import Gromit from 'gromit';

const requester = Gromit({
    baseUrl: `https://circleci.com/api/v1.1/`,
    params: {
        'circle-token': process.env.CIRCLE_CI_TOKEN
    }
});

export default {
    follow: ({owner, repo}) => requester.post(`project/github/${owner}/${repo}/follow`)
};
