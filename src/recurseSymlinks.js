#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export default function recurseSymlinks(callback) {
    return function recurseNodeModules(currentPath, depth, parentWasLast) {

        const nodeModules = path.resolve(currentPath,'node_modules');

        if (fs.existsSync(nodeModules)) {
            var files = fs.readdirSync(nodeModules)
                .filter(file => fs.lstatSync(path.resolve(nodeModules, file)).isSymbolicLink());

            files
                .forEach((file, index) => {

                    const modulePath = path.resolve(nodeModules, file);

                    const pkg = path.resolve(modulePath, 'package.json');
                    const version = JSON.parse(fs.readFileSync(pkg, 'utf8')).version;
                    var isLast = index === files.length - 1;
                    var indent = '';
                    var branch = '├─';
                    var hook = '└─';
                    var wall = '│ ';
                    var space = '  ';

                    indent = [isLast ? hook : branch]
                        .concat(Array(Math.max(0, depth.length - 1)).fill(parentWasLast ? space : wall))
                        .concat(depth.length > 1 ? [wall] : [])
                        .concat(depth.length === 1 ? [parentWasLast ? space : wall] : [])
                        .reverse()
                        .join('');

                    console.log(chalk.grey(indent) + callback({version, file, modulePath, isLast, parentWasLast}));

                    if(depth.indexOf(file) === -1) {
                        recurseNodeModules(modulePath, depth.concat(file), isLast);
                    }
                });
        }
    }
}
