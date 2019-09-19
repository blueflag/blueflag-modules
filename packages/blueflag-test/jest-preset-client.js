// @flow
const base = require('./jest-preset-base');
module.exports = {
    ...base,
    setupTestFrameworkScriptFile: "jest-enzyme",
    testEnvironment: "enzyme"
};
