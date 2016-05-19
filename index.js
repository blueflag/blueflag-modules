module.exports = {
    parser: 'babel-eslint',
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    plugins: [
        "react"
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    rules: {
        strict: 0,
        'no-console': 0,
        indent: ['error', 4, {
            SwitchCase: 1 
        }],

        // React
        'react/no-danger': 0,
        'react/prop-types': [2, {
            ignore: ['children']
        }],
        'react/display-name': 0,
        'react/jsx-closing-bracket-location': [1, {
            selfClosing: 'line-aligned',
            nonEmpty: 'after-props'
        }]
    }
}
