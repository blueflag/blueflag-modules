//@flow
import test from 'ava';
import lint from '../lint';

test('lint will apply the chosen config', (tt: Object) => {
    const config = lint({}).config;
    tt.is(config.options.baseConfig.baseDirectory, process.cwd());
});
