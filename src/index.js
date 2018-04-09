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
    .arguments('[cmd] [arg]')
    .action((command: string, arg: string): ?Promise<*> => {

        const flags = commander.options
            .reduce((ff, ii) => ff.concat(ii.short, ii.long), []);

        commander.extraFlags = commander.rawArgs
            .slice(3)
            .filter(extra => flags.every(flag => extra.indexOf(flag) === -1));


        switch(command) {
            case 'coverage':
                log('Covering tests');
                Coverage(commander);
                return;

            case 'lint':
                log('Linting code');
                return Lint(commander);

            case 'lint-file':
                log(`Linting ${arg}`);
                commander.singleFile = arg;
                return Lint(commander);

            case 'flow':
                log('Checking types');
                return Flow();
        }
    });


commander
    .command('test')
    .arguments('[glob]')
    .action((glob: string): ?Promise<> => {
        return Test({glob});
    });


commander.parse(process.argv);
