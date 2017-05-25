#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
// import chalk from 'chalk';

function recurseNodeModules(currentPath, depth = 0) {
    const nodeModules = path.resolve(currentPath,'node_modules');

    // console.log('=>', nodeModules);
    fs.readdir(nodeModules, (err, files) => {
        if(files) {
            files.forEach(file => {

                const modulePath = path.resolve(nodeModules, file);

                const isLink = fs.lstatSync(modulePath).isSymbolicLink();

                if(isLink) {
                    const pkg = path.resolve(modulePath, 'package.json');
                    const version = JSON.parse(fs.readFileSync(pkg, 'utf8')).version;
                    console.log(`${Array(depth).fill(' - ')}${file}:`, version);
                    recurseNodeModules(modulePath, depth + 1);
                }
            });
        }
    });
}
export default function modules(program, config) {
    recurseNodeModules('.');
}
