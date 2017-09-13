#!/usr/bin/env node
// @flow

import ChildProcess from 'child_process';

export default function Coverage(program: Object) {
    const {minCoverage = 80} = program;
    const cwd = process.cwd();
    const args = [
        '--all',
        // '--instrument=false',
        '--check-coverage',
        `--branches=${minCoverage}`,
        `--functions=${minCoverage}`,
        `--lines=${minCoverage}`,
        `--statements=${minCoverage}`,
        '--include=src/**',
        '--reporter=text',
        '--reporter=lcov',
        '--extension=.jsx',
        '--extension=.js',
        `${cwd}/node_modules/.bin/blueflag-test`,
        'test'
    ];

    const command = `${cwd}/node_modules/proto-blueflag-test/node_modules/.bin/nyc`;

    ChildProcess
        .spawn(command, args, {
            stdio: 'inherit',
            cwd: process.cwd()
        })
        .on('exit', process.exit);
}


