#!/usr/bin/env node
// @flow

import commander from 'commander';
import chalk from 'chalk';

import Test from './test';
import Lint from './lint';
import Flow from './flow';
import FlowCoverage from './flowCoverage';
import Coverage from './coverage';

function log(...args: Array<any>) {
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

commander
    .command('test')
    .arguments('[glob]')
    .option('-r --require <string>')
    .option('-M --monorepo')
    .action((glob: string, {require, monorepo}: Object): ?Promise<*> => {
        log('Running tests');
        return Test({glob, require, monorepo});
    });

commander
    .command('coverage')
    .arguments('[testCommand...]')
    .option('-m --min-coverage <n>')
    .option('-M --monorepo')
    .action((testCommand: string[], {minCoverage, monorepo}: Object): ?Promise<*> => {
        log('Running coverage');
        return Coverage({testCommand, minCoverage, monorepo});
    });


commander.parse(process.argv);
