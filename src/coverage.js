#!/usr/bin/env node
// @flow

import ChildProcess from 'child_process';


export default function Coverage(program: Object) {
    const {minCoverage = 80} = program;
    const cwd = process.cwd();

    let nycBin = `${cwd}/node_modules/proto-blueflag-test/node_modules/.bin/nyc`;
    let blueflagTestBin = `${cwd}/node_modules/.bin/blueflag-test`;

    // blueflag-test is running itself
    if(cwd.indexOf('proto-blueflag-test') !== -1) {
        nycBin = `${cwd}/node_modules/nyc/bin/nyc.js`;
        blueflagTestBin = `${cwd}/scripts/run`;
    }


    const args = [
        `--all`,
        `--check-coverage`,
        `--branches=${minCoverage}`,
        `--functions=${minCoverage}`,
        `--lines=${minCoverage}`,
        `--statements=${minCoverage}`,
        `--include=src/**`,
        `--exclude=**/*-test.js`,
        `--reporter=text`,
        `--reporter=lcov`,
        `--extension=.jsx`,
        `--extension=.js`,
        blueflagTestBin,
        `test`
    ];

    ChildProcess
        .spawn(nycBin, args, {
            stdio: 'inherit',
            cwd: process.cwd()
        })
        .on('exit', process.exit)
        .on('error', err => console.log(err));
}


