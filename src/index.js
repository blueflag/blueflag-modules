#!/usr/bin/env node
// @flow

import commander from 'commander';
import pkg from '../package.json';
import Create from './Create';
import Delete from './Delete';
import Protect from './Protect';
import SetTeam from './SetTeam';

commander
    .version(pkg.version)
    .option('-c --circle-token <value>')
    .option('-g --github-token <value>')
    .option('-p --pullapprove-token <value>')
    .option('-P --pullapprove-template [template=default]', 'Pull Approve template', /^(default|library)/g, 'default')
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

            case 'test':
                console.log(commander);
                return Promise.resolve();
        }
    });

commander
    .command('set-team')
    .arguments('<repo> <team> <permission>')
    .action((repo: string, team: string, permission: string): ?Promise<> => {
        return SetTeam(commander, {repo, team, permission});
    });

commander.parse(process.argv);
