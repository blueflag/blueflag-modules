#!/usr/bin/env node
// @flow

import commander from 'commander';
import pkg from '../package.json';
import Create from './Create';
import Delete from './Delete';
import Protect from './Protect';
import SetTeam from './SetTeam';
import TestCommand from './TestCommand';
import BranchRestrictionPush from './BranchRestrictionPush';
import Github from './service/Github';

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

commander
    .command('branch-restriction-push')
    .arguments('<repo> <branch> <users>')
    .action((repo: string, branch: string, users: string): ?Promise<> => {
        return BranchRestrictionPush(commander, {repo, branch, users});
    });

commander
    .command('test-command')
    .action((repo: string, branch: string, users: string): ?Promise<> => {
        return TestCommand(() => {
            return Github.repos.getProtectedBranchUserRestrictions({owner: 'blueflag', repo: 'possum-learningRecord', branch: 'master'});
        });
    });


commander.parse(process.argv);
