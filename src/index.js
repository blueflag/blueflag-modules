#!/usr/bin/env node
// @flow

import commander from 'commander';
import pkg from '../package.json';
import chalk from 'chalk';

import Test from './test';
import Lint from './lint';
import Flow from './flow';
import Coverage from './coverage';

function log(...args: Array<any>) {
    console.log(chalk.cyan('blueflag-tests'), ...args);
}

process.env.NODE_ENV = 'test';

commander
    .version(pkg.version)
    .option('-m --min-coverage <n>')
    .arguments('[cmd]')
    .action((command: string): ?Promise<> => {

        const flags = commander.options
            .reduce((ff, ii) => ff.concat(ii.short, ii.long), []);

        commander.extraFlags = commander.rawArgs
            .slice(3)
            .filter(extra => flags.every(flag =>  extra.indexOf(flag) === -1));

        switch(command) {
            case 'coverage':
                log('Covering tests');
                Coverage(commander);
                return;

            case 'test':
                log('Running tests');
                return Test();

            case 'lint':
                log('Linting code');
                return Lint(commander);

            case 'flow':
                log('Checking types');
                return Flow();
        }
    });


commander.parse(process.argv);
