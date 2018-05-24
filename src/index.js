#!/usr/bin/env node
// @flow

import commander from 'commander';
import pkg from '../package.json';
import chalk from 'chalk';
import Create from './Create';
import Delete from './Delete';
import Protect from './Protect';
import SetTeam from './SetTeam';
import TestCommand from './TestCommand';
import BranchRestrictionPush from './BranchRestrictionPush';
import Github from './service/Github';

const missingEnv = Array()
    .concat('PULL_APPROVE_TOKEN')
    .concat('CIRCLE_CI_TOKEN')
    .filter(token => !process.env[token]);

if(missingEnv.length) {
    console.log(chalk.yellow('Warning:'), missingEnv.join(', '), 'missing from environment.');
}

commander
    .version(pkg.version)
    .action((arg: string) => {
        console.log(chalk.red(arg), `is not a valid command. Try one of these instead: \n`);
        console.log(chalk.yellow(commander.commands.map(ii => ii._name).join('\n')));
        console.log('');
    });

commander
    .command('create')
    .description('Create and protect a new repo.')
    .arguments('<repo>')
    .option('-c --circle-token <value>')
    .option('-p --pullapprove-token <value>')
    .option('-P --pullapprove-template [template=default]', 'Pull Approve template', /^(default|library)/g, 'default')
    .action((repo: string, command: Object): ?Promise<any> => {
        return Create(command, repo);
    });

commander
    .command('protect')
    .description('Protect an existing repo.')
    .arguments('<repo>')
    .option('-c --circle-token <value>')
    .option('-p --pullapprove-token <value>')
    .option('-P --pullapprove-template [template=default]', 'Pull Approve template', /^(default|library)/g, 'default')
    .action((repo: string, command: Object): ?Promise<any> => {
        return Protect(command, repo);
    });

commander
    .command('delete')
    .description('Delete an existing repo.')
    .arguments('<repo>')
    .action((repo: string, command: Object): ?Promise<any> => {
        return Delete(command, repo);
    });

commander
    .command('set-team')
    .description('Set permissions for a team on a repo.')
    .arguments('<repo> <team> <permission>')
    .option('-p --pullapprove-token <value>')
    .action((repo: string, team: string, permission: string, command: Object): ?Promise<any> => {
        return SetTeam(command, {repo, team, permission});
    });

commander
    .command('branch-restriction-push')
    .description('Let a user have push rights to a branch on a repo.')
    .arguments('<repo> <branch> <users>')
    .action((repo: string, branch: string, users: string, command: Object): ?Promise<any> => {
        return BranchRestrictionPush(command, {repo, branch, users});
    });

commander
    .command('test-command')
    .action((): ?Promise<any> => {
        return TestCommand((): Promise<any> => {
            return Github.repos.getProtectedBranchUserRestrictions({owner: 'blueflag', repo: 'fronads', branch: 'master'});
        });
    });


commander.parse(process.argv);

if(commander.args.length === 0) {
    commander.help();
}
