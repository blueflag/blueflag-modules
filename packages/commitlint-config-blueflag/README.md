# blueflag-commitlint-config

Shareable `commitlint` config enforcing Blueflag commit lint format.
Use with [@commitlint/cli](https://npm.im/@commitlint/cli) and [@commitlint/prompt-cli](https://npm.im/@commitlint/prompt-cli).

## Getting started

```sh
yarn add --dev blueflag-commitlint-config @commitlint/cli
echo "module.exports = {extends: ['blueflag-commitlint-config']};" > commitlint.config.js
```

## Rules

### Types

Semver types: These types will trigger a version bump, and are important to a changelog.

- `break`: Changed something that breaks the public api
- `add`: adding a feature that doesn't exist in the last released or deployed version or changing a feature that exists in the last released or deployed version. Do not make breaking changes in an add commit
- `fix`: Fixing a bug that exists in the last released or deployed version. Do not make breaking changes or add features in a fix commit
- `amend`: Fixed something that hasn't been released yet. Amends can only apply to changes introduced since the latest release. Can apply to previously committed fix, feat or BREAK.

Non-semver types: Will not trigger a version bump and can be omitted from a changelog.

- `refactor`: changes that don't affect the api or behaviour of executing code. e.g. style, performance, linting, internal flow types, merge commits.
- `test`: any changes to tests
- `docs`: any changes to docs
- `build`: a commit that addresses the build process of the app, including ci and repo setup, and anything else that is not executing code in the app, tests or docs
- `wip`: a work in progress commit so that chunks of half finished work may be commited temporarily. PRs should be rejected if they contain any wip commits. wip commits should be reset and re-commited properly when they're done. Once you're ready, ensure nobody else has uncomitted work on your branch and then use `git reset <LAST_NON-WIP_COMMIT_HASH>` to undo the wip commit, then re-commit your work using proper commit messages and run `git push -f` to force push your work to the origin

