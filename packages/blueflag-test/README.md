# blueflag-test

## Installation

```
yarn add --dev blueflag-test
```

### package.json

```json
{
    "scripts": {
        "flow": "blueflag-test flow",
        "flow-coverage": "blueflag-test flow-coverage",
        "lint": "blueflag-test lint",
        "test": "yarn jest",
        "test-all": "yarn lint && yarn flow && yarn test && yarn flow-coverage"
    }
}
```

### jest.config.js

blueflag-test pre loads jest with support for [enzyme] with the [jest-enzyme] package. 
This loads enzyme-adapter-16 into each test file, gives you the `shallow`, `mount` and `render` globals,
and extends expect with some handy enzyme matchers.

```
module.exports = {
    preset 'blueflag-test',
    ...config overrides
}
```

### .flowconfig
You might need to shim some flow types

1. If you are using immutable 3.8.x
2. If you are testing with any enzyme globals

```
[libs]
./node_modules/blueflag-test/flow-typed-shims/immutable-3.8.x/
./node_modules/blueflag-test/flow-typed-shims/jest-enzyme-6.0.x/

[ignore]
<PROJECT_ROOT>/node_modules/immutable
```

[jest-enzyme]: https://github.com/FormidableLabs/enzyme-matchers
