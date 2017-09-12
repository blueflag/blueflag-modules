#!/usr/bin/env node
// @flow

import Cli from 'eslint/lib/cli';
import path from 'path';

export default function Lint() {
    const CONFIG_DIR = path.resolve(__dirname, "./config/eslint-config.json");
    process.exitCode = Cli.execute(['NOT-REAL-OR-IMPORTANT-ESLINT-BIN'].concat(` src -c ${CONFIG_DIR} --ext js,jsx --debug`.split(' ')));
}

