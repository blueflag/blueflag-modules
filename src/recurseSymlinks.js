#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import {Try} from 'fronads';

export default function recurseSymlinks(callback, options) {
    return function recurseNodeModules(currentPath, depth, parentWasLast) {
        const {log = true, program} = options;
        const dir = program.dir && program.dir.length ? program.dir[0] : 'node_modules';
        const nodeModules = path.resolve(currentPath, dir);

        if (fs.existsSync(nodeModules)) {
            var files = fs.readdirSync(nodeModules)
                .filter(file => fs.lstatSync(path.resolve(nodeModules, file)).isSymbolicLink());

            files
                .forEach((file, index) => {

                    const modulePath = path.resolve(nodeModules, file);

                    const pkg = path.resolve(modulePath, 'package.json');

                    const version = Try(() => JSON.parse(fs.readFileSync(pkg, 'utf8')))
                        .map(ii => ii.version)
                        .toMaybe()
                        .value('no package.json');

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

                    if(log) {
                        console.log(chalk.grey(indent) + callback({version, file, modulePath, isLast, parentWasLast}));
                    } else {
                        callback({version, file, modulePath, isLast, parentWasLast})
                    }

                    if(depth.indexOf(file) === -1) {
                        recurseNodeModules(modulePath, depth.concat(file), isLast);
                    }
                });
        }
    };
}
