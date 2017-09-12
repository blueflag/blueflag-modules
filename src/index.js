#!/usr/bin/env node
// @flow

import commander from 'commander';
import pkg from '../package.json';
// import Create from './Create';
// import Delete from './Delete';
import Test from './test';
import Lint from './lint';

commander
    .version(pkg.version)
    .arguments('[cmd]')
    .action((command: string, arg: string): ?Promise<> => {
        switch(command) {
            case 'coverage':
                console.log('coverage');
                return;

            case 'check-coverage':
                console.log('check-coverage');
                return;

            case 'test':
                Test();
                return;

            case 'lint':
                Lint();
                return;

            case 'flow':
                console.log('flow');
                return;

            case 'all':
                console.log('all');
                return;
        }
    });

commander.parse(process.argv);
