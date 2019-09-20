module.exports = {
    plugins: [
        "jest"
    ],
    env: {
        jest: true
    },
    globals: {
        mount: true,
        shallow: true,
        render: true,
    },
    rules: {
        "jest/no-disabled-tests": "error",
        "jest/no-focused-tests": "error"
    }
};
