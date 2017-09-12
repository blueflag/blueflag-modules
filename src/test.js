#!/usr/bin/env node
// @flow

import Api from 'ava/Api';
import Logger from 'ava/lib/Logger';
import VerboseReporter from 'ava/lib/reporters/verbose';


export default function Test() {
    const TEST_DIR = process.cwd();

    const api = new Api({
        failFast: true,
        failWithoutAssertions: true,
        // serial: ,
        require: [
            // './pretest',
            'babel-register'
        ],
        cacheEnabled: true,
        powerAssert: true,
        // explicitTitles: conf.watch,
        // match: arrify(conf.match),
        babelConfig: {
            presets: ['blueflag'],
            plugins: ['istanbul'],
            sourceMaps: 'inline'
        },
        resolveTestsFrom: TEST_DIR,
        projectDir: TEST_DIR,
        timeout: '3s',
        concurrency: 2
        // updateSnapshots: conf.updateSnapshots,
        // snapshotDir: conf.snapshotDir ? path.resolve(projectDir, conf.snapshotDir) : null,
        // color: true
    });

    const reporter = new VerboseReporter({color: true});
    const logger = new Logger(reporter);

    logger.start();


    api.on('test-run', (runStatus: Object) => {
        reporter.api = runStatus;
        runStatus.on('test', logger.test);
        runStatus.on('error', logger.unhandledError);

        runStatus.on('stdout', logger.stdout);
        runStatus.on('stderr', logger.stderr);
    });

    api
        .run(['src/**/*-test.js'])
        .then((runStatus: Object) => {
            logger.finish(runStatus);
            logger.exit(runStatus.failCount > 0 || runStatus.rejectionCount > 0 || runStatus.exceptionCount > 0 ? 1 : 0);
        })
        .catch((err: Error) => {
            // Don't swallow exceptions. Note that any expected error should already
            // have been logged.
            setImmediate(() => {
                throw err;
            });
        });
}

