//@flow
import lint from '../lint';
import {CLIEngine} from 'eslint';
const mockExecuteOnFiles = jest.fn(() => ({results: null}));

jest.mock('eslint', () => ({
    CLIEngine: jest.fn()
        .mockImplementation(() => ({
            executeOnFiles: mockExecuteOnFiles,
            getFormatter: jest.fn(() => jest.fn())
        }))
}));

jest.spyOn(process, 'exit').mockImplementation(() => null);
jest.spyOn(console, 'log').mockImplementation(() => null);

// Clear mocks
beforeEach(() => {
    CLIEngine.mockClear();
    mockExecuteOnFiles.mockClear();
});

describe('successful linting', () => {

    test('lint will apply the chosen config', () => {
        lint({});
        expect(CLIEngine).toBeCalledWith({
            baseConfig: {
                baseDirectory: process.cwd(),
                extends: [
                    'eslint-config-blueflag',
                    'eslint-config-blueflag/react',
                    'eslint-config-blueflag/flow'
                ]
            }
        });
    });

    test('will lint a single file if provided', () => {
        lint({
            singleFile: 'foo.js'
        });
        expect(mockExecuteOnFiles).toBeCalledWith(['foo.js']);
    });

    test('will lint monorepos', () => {
        lint({monorepo: true});
        expect(mockExecuteOnFiles).toBeCalledWith([`${process.cwd()}/packages/*/src/**/*.{js,jsx}`]);
    });

    test('will lint single repos', () => {
        lint({monorepo: false});
        expect(mockExecuteOnFiles).toBeCalledWith([`${process.cwd()}/src/**/*.{js,jsx}`]);
    });


});

describe('failed linting', () => {
    test('will exit out if there are any errors', () => {
        mockExecuteOnFiles.mockImplementation(() => ({errorCount: 1}));
        lint({});
        expect(process.exit).toBeCalledWith(1);
    });
});



