import React from 'react';
import test from 'ava';
import protoblueflagtest from './index';

test('protoblueflagtest does the right thing', tt => {
    tt.is(protoblueflagtest(123), 246, 'protoblueflagtest should add 123');
    tt.is(protoblueflagtest(), 123, 'protoblueflagtest should return 123 when given no arguments');
});
