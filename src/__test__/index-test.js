// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();

function stubFile() {
    const CreateSpy = spy();
    const DeleteSpy = spy();
    const ProtectSpy = spy();

    const stub = {
        './Create': CreateSpy,
        './Delete': DeleteSpy,
        './Protect': ProtectSpy
    };

    proxyquire('../index', stub);

    return {
        CreateSpy,
        DeleteSpy,
        ProtectSpy
    };
}


test('Commander calls the requied function', (tt: Object) => {
    process.argv = ['/','/', 'create', 'foo/bar'];
    tt.is(stubFile().CreateSpy.callCount, 1);
});


test('Commander calls the requied function', (tt: Object) => {
    process.argv = ['/','/', 'delete', 'foo/bar'];
    tt.is(stubFile().DeleteSpy.callCount, 1);
});

test('Commander calls the requied function', (tt: Object) => {
    process.argv = ['/','/', 'protect', 'foo/bar'];
    tt.is(stubFile().ProtectSpy.callCount, 1);
});
