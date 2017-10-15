#!/usr/bin/env node
// @flow

import Cli from 'eslint/lib/cli';
import path from 'path';

export default function Lint(program: Object) {
    const CONFIG_DIR = path.resolve(__dirname, "./config/eslint-config.json");
    const SRC_DIR = `${process.cwd()}/src`;
    process.exitCode = Cli.execute(
        ['NOT-REAL-OR-IMPORTANT-ESLINT-BIN']
            .concat(` ${SRC_DIR} -c ${CONFIG_DIR} --ext js,jsx --debug`.split(' '))
            .concat(program.extraFlags)
    );
}

