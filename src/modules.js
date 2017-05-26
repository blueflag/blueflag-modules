#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import recurseSymlinks from './recurseSymlinks';


export default function modules(program, config) {
    recurseSymlinks(({file, version}) => {
        return file + chalk.grey(`: ${chalk.yellow(version)}`)
    })('.', []);
}
