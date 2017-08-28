import Github from 'github';

const github = new Github({})

// user token
github.authenticate({
    type: "token",
    token: process.env.GITHUB_TOKEN,
    Promise: Promise
});

export default github;
