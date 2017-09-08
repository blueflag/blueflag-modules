// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();


function stubFile(rejectData) {
    const fn = rejectData
        ? () => Promise.reject(rejectData)
        : (data) => Promise.resolve(data);

    return proxyquire('../PullApproveAdd', {
        '../service/PullApprove': {
            add: fn
        },
        '../request/Loader': {start: spy()},
        '../request/Console': {log: spy()}
    }).default;
}


test('PullApproveAdd', (tt: Object): Promise<> => {
    const PullApproveAdd = stubFile();
    return PullApproveAdd('foo', 'bar')()
        .then((payload: Object) => {
            tt.is(payload.owner, 'foo');
            tt.is(payload.repo, 'bar');
        });
});


test('PullApproveAdd reject', (tt: Object): Promise<> => {
    const PullApproveAdd = stubFile({
        data: {
            response: {
                data: [],
                status: 'foo'
            }
        }
    });
    return PullApproveAdd('foo', 'bar')()
        .catch((payload: Object) => {
            tt.is(payload.data.response.status, 'foo');
        });
});


test('PullApproveAdd reject duplicate keys', (tt: Object): Promise<> => {
    const PullApproveAdd = stubFile({
        data: {
            response: {
                data: ['duplicate key'],
                status: 400
            }
        }
    });
    return PullApproveAdd('foo', 'bar')()
        .then(() => tt.pass());
});
