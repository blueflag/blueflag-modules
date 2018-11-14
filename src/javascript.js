module.exports = {
    rules: {
        strict: 0,
        'newline-per-chained-call': ["error", {"ignoreChainWithDepth": 3}],
        'object-curly-spacing': 2,
        'space-in-parens': 2,
        'no-console': 2,
        indent: [2, 4, {
            SwitchCase: 1
        }],
        "semi": [2, "always"],
        "comma-dangle": [2, "never"]
    }
}
