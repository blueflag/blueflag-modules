#!/usr/bin/env node

// import fs from 'fs';

// import chalk from 'chalk';
import pkg from '../package.json';
import program from 'commander';

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
        console.log('dr-symlink.modules');
        break;

    case 'unstaged':
        console.log('dr-symlink.unstaged');
        break;

    default:
        console.log('dr-symlink');
        break;
}
