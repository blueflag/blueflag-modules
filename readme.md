# Blue Flag linting configurations

# Installation

```
npm install eslint-config-blueflag
```

```js
// .eslintrc
{
    "extends": "eslint-config-blueflag"
}
```

## Global linters (Sublime Linter)

If your linter cant handle using the current directory to find binaries you will need to install 
the plugins globally. Make sure you install eslint 2.4.0 though. The babel parser is having issues with 
later versions.

```js
eslint@2.4.0
eslint-plugin-flow-vars
eslint-plugin-flowtype
eslint-plugin-react

// one liner
npm install -g eslint@2.4.0 eslint-plugin-flow-vars eslint-plugin-flowtype eslint-plugin-react

```
