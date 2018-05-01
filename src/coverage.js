#!/usr/bin/env node
// @flow

import ChildProcess from 'child_process';
import path from 'path';


export default function Coverage(program: Object) {
    const {minCoverage = 80, testCommand = []} = program;
    const cwd = process.cwd();

    let nycBin = path.resolve(__dirname, '../node_modules/.bin/nyc');
    let blueflagTestBin = `${cwd}/node_modules/.bin/blueflag-test`;

    // blueflag-test is running itself
    if(cwd.indexOf('blueflag-test') !== -1) {
        nycBin = `${cwd}/node_modules/nyc/bin/nyc.js`;
        blueflagTestBin = `${cwd}/scripts/run`;
    }


    const args = []
        .concat([
            `--all`,
            `--check-coverage`,
            `--branches=${minCoverage}`,
            `--functions=${minCoverage}`,
            `--lines=${minCoverage}`,
            `--statements=${minCoverage}`,
            `--include=src`,
            `--include=packages/*/src`,
            `--extension=jsx`,
            `--reporter=text`,
            `--reporter=lcov`
        ])
        .concat(testCommand.length > 0
            ? testCommand
            : [blueflagTestBin, `test`]
        )
    ;

    ChildProcess
        .spawn(nycBin, args, {
            stdio: 'inherit',
            cwd: process.cwd()
        })
        .on('exit', process.exit)
        .on('error', err => console.log(err));
}


