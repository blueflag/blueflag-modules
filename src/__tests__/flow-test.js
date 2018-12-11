//@flow
import flow from '../flow';
import ChildProcess from 'child_process';

jest.mock('child_process', () => ({
    spawn: jest.fn().mockImplementation(() => ({on: jest.fn()}))
}));


test('flow will call esflow ChildProcess.spawn', () => {
    flow();
    expect(ChildProcess.spawn).toHaveBeenCalled();
});
