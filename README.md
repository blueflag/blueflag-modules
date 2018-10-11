# proto-blueflag-webpack

## Getting Started

```
yarn add @blueflag/proto-blueflag-webpack
```

```js
// webpack.config.js
const extend = require('proto-blueflag-webpack').default;

module.exports = function(env, args) {
    return extend({
        name: 'bigdatr-client-main', 
        mode: args.mode,
        dirname: __dirname
    })({
        // extend the config here
    });
}
```


### Default Export
Higher-order function that returns a webpack-merge merging function.

* `name` - The name of your project.
* `mode` - A webpack mode. This can be passed in from command line flags if your config exports a function. `-p, -d`
* `dirname` - The root of your project.

```js
extend({
    name: string, 
    mode: 'production' | 'development', 
    dirname: string 
}): Function 
```

