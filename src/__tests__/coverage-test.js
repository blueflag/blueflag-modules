//@flow
import {remove} from 'fs-extra';
import {spawn} from 'child_process';
import coverage from '../coverage';


jest.mock('fs-extra', () => ({
    remove: jest.fn(() => Promise.resolve())
}));

jest.mock('child_process', () => ({
    spawn: jest.fn(() => ({on: jest.fn(() => ({on: jest.fn()}))}))
}));

test('coverage has different args for monorepos', () => {
    return coverage({monorepo: true})
        .then(() => {
            expect(spawn).toHaveBeenCalled();
            expect(spawn.mock.calls[0][1][7]).toBe('--include=packages');
            expect(spawn.mock.calls[0][1][15]).toBe('--exclude=packages/*-docs');
        });
});

test('coverage has different args for normal repos', () => {
    return coverage({})
        .then(() => {
            expect(spawn.mock.calls[1][1][7]).toBe('--include=src');
            expect(spawn.mock.calls[1][1][15]).not.toBe('--exclude=packages/*-docs');
        });
});

test('coverage can take an custom test command', () => {
    return coverage({testCommand: ['foo']})
        .then(() => {
            expect(spawn.mock.calls[2][1][15]).toBe('foo');
        });
});
