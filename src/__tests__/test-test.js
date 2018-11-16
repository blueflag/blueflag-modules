//@flow
import test from 'ava';
import {fake} from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

function Test(runStatus: Object, exit: * = fake(), finish: * = fake()): * {
    class api {
        on() {}
        run() { return runStatus}
    }
    class logger {
        finish = finish
        start = fake()
        exit = exit
    }
    class reporter {on = fake()}

    return proxyquire('../test', {
        'ava/api': api,
        'ava/lib/logger': logger,
        'ava/lib/reporters/verbose': reporter
    }).default({});
}

test('test will throw if run fails', (t: Object) => {
    return Test(Promise.reject('foo'))
        .catch((err) => {
            console.log(err);
            t.pass();
        })
});

test('test will exit if fails are zero', (t: Object) => {
    const finishSpy = fake();
    return Test(Promise.resolve({failCount: 9999}), fake(), finishSpy)
        .then((data) => {
            t.is(finishSpy.firstCall.args[0].failCount, 9999);
        })
});


test('test will exit if fails are zero', (t: Object) => {
    const exitSpy = fake();
    return Test(Promise.resolve({failCount: 0}), exitSpy)
        .then((data) => {
            t.is(exitSpy.firstCall.args[0], 0);
        })
});

test('test will exit if rejections are zero', (t: Object) => {
    const exitSpy = fake();
    return Test(Promise.resolve({failCount: 0}), exitSpy)
        .then((data) => {
            t.is(exitSpy.firstCall.args[0], 0);
        })
});

test('test will exit if exceptions are zero', (t: Object) => {
    const exitSpy = fake();
    return Test(Promise.resolve({failCount: 0}), exitSpy)
        .then((data) => {
            t.is(exitSpy.firstCall.args[0], 0);
        })
});

