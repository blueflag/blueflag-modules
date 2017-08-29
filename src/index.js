#!/usr/bin/env node
// @flow

import commander from 'commander';
import pkg from '../package.json';
import Create from './Create';
import Delete from './Delete';
import Protect from './Protect';


commander
    .version(pkg.version)
    .arguments('[cmd] [arg]')
    .action((command: string, arg: string): ?Promise<> => {
        switch(command) {
            case 'create':
                return Create(commander, arg);

            case 'delete':
                return Delete(commander, arg);

            case 'protect':
                return Protect(commander, arg);
        }
    });

commander.parse(process.argv);
