# proto-blueflag-webpack

## Getting Started

```
yarn add --dev @blueflag/proto-blueflag-webpack
```

```js
// webpack.config.js
const extend = require('@blueflag/proto-blueflag-webpack').default;

module.exports = function(env, args) {
    return extend({
        name: 'bigdatr-client-main', 
        mode: args.mode,
        dirname: __dirname,
        environment: {},
        src: 'src',
        dest: 'dist',
        loaderPaths: [
            `${__dirname}/node_modules/camelcase`
        ]
    })({
        // extend the config here
    });
}
```

```json
// package.json
{
    "scripts": {
        "build": "webpack -p",
        "build-dev": "webpack -d",
        "watch": "webpack-dev-server --progress --hot -d",
    }
}
```


## Default Export
Higher-order function that returns a webpack-merge merging function.

* `name` - The name of your project.
* `mode` - A webpack mode. This can be passed in from command line flags if your config exports a function. `-p, -d`
* `dirname` - The root of your project.
* `environment` - An object containing environment variables that will be accessible via `process.env.<VARIABLE_NAME>`
* `src` - The path to the source directory to build from
* `dest` - The path to the destination directory to build to
* `loaderPaths?` - An optional array of additional paths for loaders to include

```js
extend({
    name: string, 
    mode: 'production' | 'development', 
    dirname: string,
    environment: {[key: string]: any},
    src: string,
    dest: string,
    loaderPaths?: string[]
}): Function 
```


## Features
* SCSS/CSS loading
* Image Loading
* Graphql Loading
* React
* Dev Server
* `~` aliasing to `<ROOT>/src`


