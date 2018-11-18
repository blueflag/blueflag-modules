//@flow
import flowCoverage from '../flowCoverage';
import flowCoverageReport from 'flow-coverage-report';
jest.mock('flow-coverage-report', () => jest.fn());

test('will call flow-coverage-report with config', () => {
    flowCoverage({});
    expect(flowCoverageReport).toHaveBeenCalled();
});

