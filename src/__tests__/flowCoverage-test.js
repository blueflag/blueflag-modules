//@flow
import flowCoverage from '../flowCoverage';
import flowCoverageReport from 'flow-coverage-report';
jest.mock('flow-coverage-report', () => jest.fn(ii => ii));

test('will call flow-coverage-report with config', () => {
    flowCoverage({});
    expect(flowCoverageReport).toHaveBeenCalled();
});

test('will set correct globs for monorepos', () => {
    expect(flowCoverage({monorepo: true}).globIncludePatterns)
        .toEqual(['packages/**/*.{js,jsx}']);
    expect(flowCoverage({}).globIncludePatterns)
        .toEqual(['src/**/*.{js,jsx}']);
});

