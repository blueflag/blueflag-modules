# proto-blueflag-test

## Installation

```
yarn add --dev git+ssh://git@github.com/blueflag/proto-blueflag-test.git#v0.x.x
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
