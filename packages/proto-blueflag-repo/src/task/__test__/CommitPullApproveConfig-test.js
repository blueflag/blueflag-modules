// @flow
import test from 'ava';
const proxyquire = require('proxyquire')
    .noCallThru()
    .noPreserveCache();


function stubFile(reject: ?Object): * {
    return proxyquire('../CommitPullApproveConfig', {
        '../service/Github': {
            repos: {
                createFile: data => reject ? Promise.reject(reject) : Promise.resolve(data)
            }
        },
        '../request/Loader': {start: () => {}},
        '../request/Console': {log: () => {}}
    }).default;
}



test('CommitPullApproveConfig', (tt: Object): Promise<any> => {
    const CommitPullApproveConfig = stubFile();
    return CommitPullApproveConfig('foo', 'bar')()
        .then((payload: Object) => {
            tt.is(payload.path, '.pullapprove.yml');
            tt.is(payload.owner, 'foo');
            tt.is(payload.repo, 'bar');
            tt.is(payload.message, 'Add .pullapprove.yml');
            tt.is(payload.content, 'dmVyc2lvbjogMgpleHRlbmRzOiB1bmRlZmluZWQtdGVtcGxhdGU=');
        });
});



test('CommitPullApproveConfig reject', (tt: Object): Promise<any> => {
    const CommitPullApproveConfig = stubFile({
        code: 'foo'
    });

    return CommitPullApproveConfig('foo', 'bar')()
        .catch(err => tt.is(err.code, 'foo'));
});

test('CommitPullApproveConfig pass through if pullapprove already exists', (tt: Object): Promise<any> => {
    const CommitPullApproveConfig = stubFile({
        code: 422,
        message: `\\"sha\\" wasn't supplied.`
    });

    return CommitPullApproveConfig('foo', 'bar')()
        .then(() => tt.pass());
});
