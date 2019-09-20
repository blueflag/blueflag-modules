module.exports = {
    plugins: [
        'react'
    ],
    extends: [
        'plugin:react/recommended',
    ],
    settings: {
        react: {
            version: 'detect'
        }
    }
    rules: {
        // React
        'react/no-danger': 0,
        'react/no-children-prop': 0,
        'react/no-unescaped-entities': 0,
        'react/prop-types': [2, {
            ignore: ['children']
        }],
        'react/display-name': 0,
        'react/jsx-key': 0,
        'react/jsx-indent-props': [2, 4],
        'react/jsx-closing-bracket-location': [1, 'line-aligned']
    }
}
