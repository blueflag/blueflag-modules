#!/usr/bin/env node
// @flow

import {CLIEngine} from 'eslint';

export default function Lint({monorepo, singleFile}: Object): Object {
    const fileGlob = `src/**/*.{js,jsx}`;
    const src = singleFile
        ? [singleFile]
        : [
            monorepo
                ? `${process.cwd()}/packages/*/${fileGlob}`
                : `${process.cwd()}/${fileGlob}`
        ]
    ;

    var cli = new CLIEngine({
        baseConfig: {
            baseDirectory: process.cwd(),
            extends: [
                "eslint-config-blueflag",
                "eslint-config-blueflag/react",
                "eslint-config-blueflag/flow"
            ]
        }
    });

    var report = cli.executeOnFiles(src);
    var formatter = cli.getFormatter('stylish');
    // eslint-disable-next-line no-console
    console.log(formatter(report.results));

    if(report.errorCount > 0) {
        process.exit(1);
    }

    return cli;
}

