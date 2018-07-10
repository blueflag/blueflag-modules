// @flow
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "packages/**/*.{js,jsx}",
        "src/**/*.{js,jsx}",
        "!**/lib/**",
        "!**/node_modules/**"
    ],
    coverageReporters: ["json", "lcov", "text-summary"],
    setupTestFrameworkScriptFile: "jest-enzyme",
    testEnvironment: "enzyme"
};
