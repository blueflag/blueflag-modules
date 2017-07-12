#!/usr/bin/env node

// import fs from 'fs';
// import chalk from 'chalk';
import pkg from '../package.json';
import program from 'commander';
import modules from './modules';
import test from './test';

program
    .version(pkg.version)
    .option('-d, --dir <items>', 'Directory to recursivly ', val => val.split(','))
    // .option('-d, --dry', 'show commands without running them')
    // .option('-c, --concurrent', 'run commands concurrently')

program
    .command('modules')
    .description('list symlink node modules and thier versions');

program
    .command('unstaged')
    .description('list unstaged changes in symlinked node modules');

program.parse(process.argv);

switch (program.args[0]) {
    case 'test':
        test(program, {});
        break;

    default:
        modules(program, {});
        break;
}
