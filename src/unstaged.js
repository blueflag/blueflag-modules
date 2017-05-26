import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import git from 'git-utils';

import recurseSymlinks from './recurseSymlinks';

// const statusIndexNew = 1 << 0;
// const statusIndexModified = 1 << 1;
// const statusIndexDeleted = 1 << 2;
// const statusIndexRenamed = 1 << 3;
// const statusIndexTypeChange = 1 << 4;
// const statusWorkingDirNew = 1 << 7;
// const statusWorkingDirModified = 1 << 8;
// const statusWorkingDirDelete = 1 << 9;
// const statusWorkingDirTypeChange = 1 << 10;
// const statusIgnored = 1 << 14;

// const modifiedStatusFlags = statusWorkingDirModified
//     | statusIndexModified
//     | statusWorkingDirDelete
//     | statusIndexDeleted
//     | statusWorkingDirTypeChange
//     | statusIndexTypeChange;

// const newStatusFlags = statusWorkingDirNew
//     | statusIndexNew;

// const deletedStatusFlags = statusWorkingDirDelete
//     | statusIndexDeleted;

// const indexStatusFlags = statusIndexNew
//     | statusIndexModified
//     | statusIndexDeleted
//     | statusIndexRenamed
//     | statusIndexTypeChange;

const stagedMap = {
    [1 << 0]: 'New',
    [1 << 1]: 'Modified',
    [1 << 2]: 'Deleted',
    [1 << 3]: 'Renamed',
    [1 << 4]: 'TypeChange'
};

const unstagedMap = {
    [1 << 7]: 'New',
    [1 << 8]: 'Modified',
    [1 << 9]: 'Delete',
    [1 << 10]: 'TypeChange'
};



export default function modules(program, config) {
    recurseSymlinks(({file, version, modulePath}) => {
        var repo = git.open(modulePath);
        var status = repo.getStatus();
        var ahead = repo.getAheadBehindCount();
        var files = Object.keys(status)
            .map(path => {
                return {
                    staged: stagedMap[status[path]],
                    unstaged: unstagedMap[status[path]]
                };
            })
            .reduce((count, item) => {
                if(item.staged) {
                    count.staged++;
                }
                if(item.unstaged) {
                    count.unstaged++;
                }
                return count;
            },{staged: 0, unstaged: 0});

        // console.log(files.staged, files.unstaged);
        var changes = Object.keys(files)
            .filter(ii => files[ii] > 0)
            .map(ii =>`${files[ii]} ${ii}`)
            // .join(', ');

        var aheadBehind = Object.keys(ahead)
            .filter(ii => ahead[ii] > 0)
            .map(ii => chalk.green(`${ahead[ii]} ${ii}`))
            // .join(', ');

        return file + chalk.grey(': ') + chalk.yellow(changes.concat(aheadBehind).join(', '));
    })('.', []);
}
