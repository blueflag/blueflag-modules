#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
// import chalk from 'chalk';

function recurseNodeModules(currentPath, depth) {
    const nodeModules = path.resolve(currentPath,'node_modules');

    // console.log('=>', nodeModules);
    if (fs.existsSync(nodeModules)) {
        fs.readdirSync(nodeModules).forEach(file => {

            const modulePath = path.resolve(nodeModules, file);

            const isLink = fs.lstatSync(modulePath).isSymbolicLink();

            if(isLink) {
                const pkg = path.resolve(modulePath, 'package.json');
                const version = JSON.parse(fs.readFileSync(pkg, 'utf8')).version;
                console.log(`${[].concat(depth).fill('| ').join('')}${file}:`, version);

                if(depth.indexOf(file) === -1) {
                    recurseNodeModules(modulePath, depth.concat(file));
                }
            }
        });
    }
}
export default function modules(program, config) {
    recurseNodeModules('.', []);
}
