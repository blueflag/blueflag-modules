#!/usr/bin/env node
// @flow

import commander from 'commander';
import chalk from 'chalk';

import Lint from './lint';
import Flow from './flow';
import FlowCoverage from './flowCoverage';

function log(...args: Array<any>) {
    // eslint-disable-next-line no-console
    console.log(chalk.cyan('blueflag-tests'), ...args);
}

process.env.NODE_ENV = 'test';

commander
    .command('flow')
    .action((): ?Promise<*> => {
        log('Running flow');
        return Flow();
    });

commander
    .command('flow-coverage')
    .option('-M --monorepo')
    .option('-m --min-coverage <n>')
    .action(({monorepo, minCoverage}: *): ?Promise<*> => {
        log('Running flow coverage');
        return FlowCoverage({monorepo, minCoverage});
    });

commander
    .command('lint')
    .arguments('[singleFile]')
    .option('-M --monorepo')
    .action((singleFile: string, {require, monorepo}: Object): ?Promise<*> => {
        log('Running linter');
        return Lint({singleFile, require, monorepo});
    });


commander.parse(process.argv);
