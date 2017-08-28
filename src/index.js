#!/usr/bin/env node
// @flow

import commander from 'commander';
import pkg from '../package.json';
import Create from './Create';
import Delete from './Delete';
import Protect from './Protect';

import Github from './service/Github';
import GetRepo from './task/GetRepo';
import Console from './request/Console';
import Loader from './request/Loader';

commander
    .version(pkg.version)
    .arguments('<cmd> [arg]')
    .action((command, arg) => {
        switch(command) {
            case 'create':
                return Create(commander, arg);

            case 'delete':
                return Delete(commander, arg);

            case 'protect':
                return Protect(commander, arg);

            case 'test':
                Loader.start('getting repo');
                return Promise.resolve()
                    .then(() => Github.orgs.getTeams({org: 'blueflag'}))
                    .then(Console.log)
                    // .then(GetRepo('blueflag', 'test-repo'))
                    // .then(() => Loader.start('got repo'))

            default:
                return;
        }
    });

commander.parse(process.argv);
