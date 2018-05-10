//@flow
import test from 'ava';
import {fake} from 'sinon';
import ChildProcess from 'child_process';
import {promisify} from 'util';
const exec = promisify(ChildProcess.exec);

const proxyquire = require('proxyquire').noCallThru();

const actionFake = fake();

class commander {
    command() { return this }
    action() {
        actionFake();
        return this;
    }
    arguments() { return this }
    option() { return this }
    parse() { return this }
}

test('blueflag-test can lint itself', (t: Object) => {
    return exec('yarn lint').then(() => t.pass())
});

test('blueflag-test can flow itself', (t: Object) => {
    return exec('yarn flow').then(() => t.pass())
})
