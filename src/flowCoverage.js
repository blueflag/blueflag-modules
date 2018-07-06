#!/usr/bin/env node
// @flow

import flowCoverageReport from 'flow-coverage-report';
import FlowBin from 'flow-bin';

export default function FlowCoverage(program: *): Promise<*> {
    const {monorepo = false} = program;
    const {minCoverage = 50} = program;

    const config = {
        reportTypes: ['text', 'html'],
        flowCommandPath: FlowBin,
        projectDir: process.cwd(),
        globExcludePatterns: [
            '**/node_modules/**',
            '**/lib/**',
            '**/dist/**',
            'packages/*-docs/**'
        ],
        globIncludePatterns: monorepo
            ? ['packages/**/*.{js,jsx}']
            : ['src/**/*.{js,jsx}'],
        threshold: minCoverage,
        outputDir: './flow-coverage',
        concurrentFiles: 1,
        strictCoverage: false,
        excludeNonFlow: false,
        noConfig: false,
        htmlTemplateOptions: {
            autoHeightSource: true,
            showMeterBar: false
        }
    };

    return flowCoverageReport(config);
}
