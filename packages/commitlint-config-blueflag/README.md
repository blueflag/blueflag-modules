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

- `fix`: Fixed something that was broken in the latest release of the public api
- `add`: Added something to the public api that doesn't break any existing api
- `BREAK`: Changed something that breaks the public api
- `amend`: Fixed something that hasn't been released yet. Amends can only apply to changes introduced since the latest release. Can apply to previously committed fix, feat or BREAK.

Non-semver types: Will not trigger a version bump and can be omitted from a changelog.

- `refactor`: changes that don't affect the api or behaviour of executing code. e.g. style, performance, linting, internal flow types, merge commits.
- `test`: any changes to tests
- `docs`: any changes to docs
- `build`: any changes to build scripts, CI, or compilation.

### Problems

The following rules are considered problems for `blueflag-commitlint-config` and will yield a non-zero exit code when not met.

Consult [docs/rules](https://conventional-changelog.github.io/commitlint/#/reference-rules) for a list of available rules.

#### type-enum
* **condition**: `type` is found in value
* **rule**: `always`
* **value**

  ```js
  [
    'fix',
    'add',
    'break',
    'amend',
    'refactor',
    'test',
    'docs',
    'build'
  ]
  ```

```sh
echo "foo: some message" # fails
echo "fix: some message" # passes
```

#### type-empty
* **condition**: `type` is empty
* **rule**: `never`

```sh
echo ": some message" # fails
echo "fix: some message" # passes
```

#### scope-case
* **condition**: `scope` is in case `value`
* **rule**: `always`
```js
  'lowerCase'
```

```sh
echo "fix(SCOPE): some message" # fails
echo "fix(scope): some message" # passes
```

#### subject-case
* **condition**: `subject` is in one of the cases `['sentence-case', 'start-case', 'pascal-case', 'upper-case']`
* **rule**: `never`

```sh
echo "fix(SCOPE): Some message" # fails
echo "fix(SCOPE): Some Message" # fails
echo "fix(SCOPE): SomeMessage" # fails
echo "fix(SCOPE): SOMEMESSAGE" # fails
echo "fix(scope): some message" # passes
echo "fix(scope): some Message" # passes
```

#### subject-empty
* **condition**: `subject` is empty
* **rule**: `never`

```sh
echo "fix:" # fails
echo "fix: some message" # passes
```

#### subject-full-stop
* **condition**: `subject` ends with `value`
* **rule**: `never`
* **value**
```js
  '.'
```

```sh
echo "fix: some message." # fails
echo "fix: some message" # passes
```


#### header-max-length
* **condition**: `header` has `value` or less characters
* **rule**: `always`
* **value**
```js
  72
```

```sh
echo "fix: some message that is way too long and breaks the line max-length by several characters" # fails
echo "fix: some message" # passes
```

