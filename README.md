# babel-preset-blueflag
[![babel-preset-blueflag npm](https://img.shields.io/npm/v/babel-preset-blueflag.svg?style=flat-square)](https://www.npmjs.com/package/stampy)

A preset for Blue Flag's oppinions on babel plugins

## Installation

```
npm install --save babel-preset-blueflag
```

```js
// Place this in your configs
{
  presets: ['blueflag']
}

```

## `babel-preset-env`

`babel-preset-blueflag` uses [`babel-preset-env`](https://github.com/babel/babel-preset-env) to automatically determine the Babel plugins and polyfills you need based on your supported environments. By default if `browser` is set to `true` then the env settings will be:

```
{
  "targets": {
    "browsers": ["last 2 versions"]
  }
}
```

otherwise they will be:

```
{
  "targets": {
    "node": "current"
  }
}
```

## Configuration

`babel-preset-blueflag` can be configured to provide different plugins and presets, as well as to pass configuration to those plugins and presets.

Configuration can be passed by wrapping the preset in an array and placing a configuration object as
the second item in the array.

```
{
    presets: [
        ['blueflag', {

        }]
    ]
}

```

The follow options are supported:

### `library`
`boolean` - defaults to `false`.

Doesn't do anything at the moment.

### `browser`
`boolean` - defaults to `false`

Whether this project is to be used in a browser. If set to true then `babel-preset-env`'s target will
be set to target the last 2 versions of major browsers.

### `disabled`
`String[]` - defaults to `[]`

An array of plugins/presets that shouldn't be enabled. The plugin/preset prefix should be excluded,
eg. `['env', 'transform-runtime', 'transform-class-properties', 'react', 'stage-3']`


### `config`
`Object` - defaults to `{}`

An object containing configuration to be passed on to the preset's child plugins and presets. eg.

```
{
    presets: [
        ['blueflag', {
            config: {
                env: {
                    targets: {
                        browsers: 'last 3 versions'
                    }
                }
            }
        }]
    ]
}
```


## Plugins & Presets
```
babel-plugin-transform-runtime
babel-plugin-transform-class-properties
babel-preset-env
babel-preset-react
babel-preset-stage-3
 ```
