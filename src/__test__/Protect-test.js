// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru();

const CreateSpy = spy();
const DeleteSpy = spy();
const ProtectSpy = spy();

const Protect = proxyquire('../Protect', {
    './service/Github': CreateSpy,
    './task/AddBranchProtection': () => Promise.resolve()
}).default;


test('Protect returns a promise', (tt: Object): Promise<> => {
    return Protect({}, 'foo/bar').then(() => tt.pass());
});
