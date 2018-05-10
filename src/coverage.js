// @flow

import ChildProcess from 'child_process';
import path from 'path';
import {remove} from 'fs-extra';


export default function Coverage(program: Object): Promise<*> {
    const cwd = process.cwd();

    return remove(`${cwd}/node_modules/.cache/nyc`)
        .then(() => {
            const {
                minCoverage = 80,
                monorepo = false,
                testCommand = []
            } = program;

            let nycBin = path.resolve(__dirname, '../node_modules/.bin/nyc');
            let blueflagTestBin = `${cwd}/node_modules/.bin/blueflag-test`;

            // blueflag-test is running itself
            if(cwd.indexOf('blueflag-test') !== -1) {
                nycBin = `${cwd}/node_modules/nyc/bin/nyc.js`;
                blueflagTestBin = `${cwd}/scripts/run`;
            }

            const args: string[] = []
                .concat([
                    `--all`,
                    `--check-coverage`,
                    `--sourceMaps=false`,
                    `--branches=${minCoverage}`,
                    `--functions=${minCoverage}`,
                    `--lines=${minCoverage}`,
                    `--statements=${minCoverage}`,
                    `--include=${monorepo ? 'packages' : 'src'}`,
                    `--extension=.jsx`,
                    `--extension=.js`,
                    `--reporter=text`,
                    `--reporter=lcov`,
                    `--exclude=**/lib/**`,
                    `--exclude=**/dist/**`,
                    `--exclude=**/__test__/**`,
                    (monorepo ? `--exclude=packages/*-docs` : ``)
                ])
                .concat(testCommand.length > 0
                    ? testCommand
                    : [
                        blueflagTestBin,
                        `test`,
                        (monorepo ? `--monorepo` : ``)
                    ]
                )
                .filter(ii => ii)
            ;

            ChildProcess
                .spawn(nycBin, args, {
                    stdio: 'inherit',
                    cwd
                })
                .on('exit', process.exit)
                .on('error', err => console.log(err));

        });
}


