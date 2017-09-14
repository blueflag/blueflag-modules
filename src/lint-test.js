//@flow
import test from 'ava';
import {spy} from 'sinon';

const proxyquire = require('proxyquire').noCallThru();

const lintSpy = spy();
const lint = proxyquire('./lint', {
    'eslint/lib/cli': {
        execute: lintSpy
    }
}).default;

test('lint will call eslint Cli.execute', (tt: Object) => {
    lint();
    tt.is(lintSpy.callCount, 1);
});
