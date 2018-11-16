//@flow
import test from 'ava';
import {stub} from 'sinon';

const proxyquire = require('proxyquire').noCallThru();

const flowSpy = stub().callsFake(() => ({on: () => {}}));

const flow = proxyquire('../flow', {
    'child_process': {
        spawn: flowSpy
    }
}).default;

test('flow will call esflow ChildProcess.spawn', (tt: Object) => {
    flow();
    tt.is(flowSpy.callCount, 1);
});
