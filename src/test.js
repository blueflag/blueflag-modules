#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import recurseSymlinks from './recurseSymlinks';
import unstaged from './unstaged';


export default function modules(program, config) {
    recurseSymlinks(({file, version, modulePath}) => {
        const {changes, aheadBehind} = unstaged({modulePath});
        const gitStatus = changes.concat(aheadBehind).join(', ');

        if(gitStatus) {
            console.log(chalk.red('Error:'), chalk.yellow(file), 'is symlinked and has unstaged changes')
            process.exit(1);
        }
    }, {log: false, program})('.', []);
}
