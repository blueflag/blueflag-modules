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
        return file + chalk.grey(`: ${chalk.yellow(version)}${gitStatus ? ` ${chalk.red(gitStatus)}` : ''}`);
    }, {program})('.', []);
}
