#!/usr/bin/env node

// import fs from 'fs';
// import chalk from 'chalk';
import pkg from '../package.json';
import program from 'commander';
import unstaged from './unstaged';
import modules from './modules';

program
    .version(pkg.version)
    // .option('-l, --lurkles <items>', 'A list of config files to merge', val => val.split(','))
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
    case 'modules':
        modules(program, {});
        break;

    case 'unstaged':
        unstaged(program, {});
        break;

    default:
        console.log('dr-symlink');
        break;
}
