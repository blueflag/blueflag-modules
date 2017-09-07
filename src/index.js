#!/usr/bin/env node
// @flow

import commander from 'commander';
import pkg from '../package.json';
import Create from './Create';
import Delete from './Delete';
import Protect from './Protect';

commander
    .version(pkg.version)
    .option('-c --circle-token <value>')
    .arguments('[cmd] [arg]')
    .action((command: string, arg: string): ?Promise<> => {
        process.env.CIRCLE_CI_TOKEN = commander.circleToken || process.env.CIRCLE_CI_TOKEN || '';
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
