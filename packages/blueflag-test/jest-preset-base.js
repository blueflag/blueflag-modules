// @flow
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "(src|packages)/**/*.{js,jsx}",
        "!**/lib/**",
        "!**/node_modules/**"
    ],
    coverageReporters: ["json", "lcov", "text-summary"],
    testMatch: [
        "**/__tests__/**/*-test.js?(x)",
        "**/__test__/**/*-test.js?(x)"
    ]
};
