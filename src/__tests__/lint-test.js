//@flow
import lint from '../lint';

test('lint will apply the chosen config', () => {
    const config = lint({}).config;
    expect(config.options.baseConfig.baseDirectory).toBe(process.cwd());
});
