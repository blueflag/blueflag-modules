#!/usr/bin/env node
// @flow

import {CLIEngine} from 'eslint';

export default function Lint(program: Object) {
    const fileGlob = `src/**/*.{js,jsx}`;
    const src = program.singleFile
        ? [program.singleFile]
        : [
            `${process.cwd()}/packages/**/${fileGlob}`,
            `${process.cwd()}/${fileGlob}`
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
    console.log(formatter(report.results));

    if(report.errorCount > 0) {
        process.exit(1);
    }
}

