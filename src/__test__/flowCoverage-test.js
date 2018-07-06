//@flow
import test from 'ava';
import {stub} from 'sinon';
const proxyquire = require('proxyquire').noCallThru();


test('will call flow-coverage-report with config', (tt: Object) => {
    const flowCoverageSpy = stub().resolves();
    const flowCoverage = proxyquire('../flowCoverage', {
        'flow-coverage-report': flowCoverageSpy
    }).default;

    flowCoverage({});
    tt.is(flowCoverageSpy.callCount, 1);
});

test('will catch ', (tt: Object) => {
    const flowCoverageSpy = stub().resolves();
    const flowCoverage = proxyquire('../flowCoverage', {
        'flow-coverage-report': flowCoverageSpy
    }).default;

    flowCoverage({});
    tt.is(flowCoverageSpy.callCount, 1);
});
