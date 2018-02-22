# blueflag-test

## Installation

```
yarn add --dev blueflag-test
```

## package.json

```json
{
    "scripts": {
        "flow": "blueflag-test flow",
        "lint": "blueflag-test lint",
        "test": "blueflag-test test",
        "coverage": "blueflag-test coverage",
        "test-all": "yarn lint && yarn flow && yarn coverage"
    }
}
```

## Test

`blueflag-test test` will run all test files that match the glob: `src/**/*-test.js`.

[ava](https://github.com/avajs/ava)
