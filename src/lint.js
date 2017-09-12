#!/usr/bin/env node
// @flow

import Cli from 'eslint/lib/cli';
import path from 'path';

export default function Lint() {
    // const TEST_DIR = process.cwd();
    const CONFIG_DIR = path.resolve(__dirname, "./config/eslint-config.json");
    // console.log(process.argv, `src -c ${CONFIG_DIR} --ext js,jsx --debug`.split(' '));
    process.exitCode = Cli.execute(['/eslint??'].concat(` src -c ${CONFIG_DIR} --ext js,jsx --debug`.split(' ')));
}

