#!/usr/bin/env node
// @flow

import FlowBin from 'flow-bin';
import ChildProcess from 'child_process';

export default function Flow() {
    ChildProcess
        .spawn(FlowBin, ['check'], {
            stdio: 'inherit',
            cwd: process.cwd()
        })
        .on('exit', process.exit);
}
