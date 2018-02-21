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

Test will run all files below the current directory (not in `node_modules`) with the name `*-test`.

Tests can use [ava](https://github.com/avajs/ava)
