#!/usr/bin/env node
// @flow

import commander from 'commander';
import pkg from '../package.json';
import chalk from 'chalk';
// import Create from './Create';
// import Delete from './Delete';
import Test from './test';
import Lint from './lint';
import Flow from './flow';

function log(...args: Array<any>) {
    console.log(chalk.cyan('blueflag-tests'), ...args);
}

commander
    .version(pkg.version)
    .arguments('[cmd]')
    .action((command: string): ?Promise<> => {
        switch(command) {
            case 'coverage':
                console.log('coverage');
                return;

            case 'check-coverage':
                console.log('check-coverage');
                return;

            case 'test':
                log('Running tests.');
                return Test();

            case 'lint':
                log('Linting code.');
                return Lint();

            case 'flow':
                log('Checking types.');
                return Flow();
        }
    });

commander.parse(process.argv);
