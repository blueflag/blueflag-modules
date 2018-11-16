//@flow
import test from 'ava';

test('jest-preset returns an object', (t: Object) => {
    t.is(typeof require('../../jest-preset.js'), 'object');
});
