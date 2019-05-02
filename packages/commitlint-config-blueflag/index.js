module.exports = {
    rules: {
        'body-leading-blank': [1, 'always'],
        'footer-leading-blank': [1, 'always'],
        'header-max-length': [2, 'always', 72],
        'scope-case': [2, 'always', 'lower-case'],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'break',
                // if any breaking change is made to an API, use break
                'add',
                // adding a feature that doesn't exist in the last released or deployed version
                // or changing a feature that exists in the last released or deployed version
                // do not make breaking changes in an add commit
                'fix',
                // fixing a bug that exists in the last released or deployed version
                // do not make breaking changes or add features in a fix commit
                'amend',
                // fixing a bug that exists in code that hasn't yet been released or deployed
                // (its not a fix if the thing being fixed has never been released)
                'refactor',
                // changes that don't affect the api or behaviour of executing code.
                // e.g. style, performance, linting, internal flow types, merge commits.
                'test',
                // a commit specifically for adding tests
                'docs',
                // a commit specifically for adding documentation
                'build',
                // a commit that addresses the build process of the app, including ci and repo setup
                // and anything else that is not executing code in the app, tests or docs
                'wip'
                // a work in progress commit so that chunks of half finished work may be commited temporarily
                // PRs should be rejected if they contain any wip commits
                // wip commits should be reset and re-commited properly when they're done
                // once you're ready, ensure nobody else has uncomitted work on your branch
                // and then use "git reset <LAST_NON-WIP_COMMIT_HASH>" to undo the wip commit
                // then re-commit your work using proper commit messages
                // and run "git push -f" to force push your work to the origin
            ]
        ]
    }
};
