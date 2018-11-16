//@flow
import test from 'ava';
import {fake} from 'sinon';

const proxyquire = require('proxyquire').noCallThru();
const remove = fake.returns(Promise.resolve());


test('coverage has different args for monorepos', (t: Object) => {
    const spawn = fake.returns({on: fake.returns({on: fake()})})
    const coverage = proxyquire('../coverage', {
        'fs-extra': {remove},
        'child_process': {spawn}
    }).default;

    return coverage({monorepo: true})
        .then(() => {
            t.is(spawn.callCount, 1);
            t.is(spawn.firstCall.args[1][7], '--include=packages');
            t.is(spawn.firstCall.args[1][15], '--exclude=packages/*-docs');
        })
});

test('coverage has different args for normal repos', (t: Object) => {
    const spawn = fake.returns({on: fake.returns({on: fake()})})
    const coverage = proxyquire('../coverage', {
        'fs-extra': {remove},
        'child_process': {spawn}
    }).default;

    return coverage({})
        .then(() => {
            t.is(spawn.firstCall.args[1][7], '--include=src');
            t.not(spawn.firstCall.args[1][15], '--exclude=packages/*-docs');
        })
});

test('coverage can take an custom test command', (t: Object) => {
    const spawn = fake.returns({on: fake.returns({on: fake()})})
    const coverage = proxyquire('../coverage', {
        'fs-extra': {remove},
        'child_process': {spawn}
    }).default;

    return coverage({testCommand: ['foo']})
        .then(() => {
            t.is(spawn.firstCall.args[1][15], 'foo');
        })
});
