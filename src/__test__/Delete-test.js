// @flow
import test from 'ava';
import {spy} from 'sinon';
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();


function stubFile(inquireData) {
    return proxyquire('../Delete', {
        './request/Console': {success: spy()},
        './request/Loader': {start: spy(), stop: spy()},
        './request/PromiseErrorHandler': () => Promise.reject(),
        './service/Github': {
            repos: {
                delete: spy()
            }
        },
        'inquirer': {
            prompt: () => Promise.resolve(inquireData)
        }
    }).default;
}



test('Delete returns a promise', (tt: Object): Promise<any> => {
    var Delete = stubFile({repo: 'foo', remove: true});
    return Delete({}, 'foo/foo').then(() => tt.pass());
});

test('Delete rejects if repo doesnt match', (tt: Object): Promise<any> => {
    var Delete = stubFile({repo: 'foo', remove: true});
    return Delete({}, 'foo/bar').catch(() => tt.pass());
});

test('Delete rejects if remove is false', (tt: Object): Promise<any> => {
    var Delete = stubFile({repo: 'bar', remove: false});
    return Delete({}, 'foo/bar').catch(() => tt.pass());
});
