#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

var _lint = require('./lint');

var _lint2 = _interopRequireDefault(_lint);

var _flow = require('./flow');

var _flow2 = _interopRequireDefault(_flow);

var _coverage = require('./coverage');

var _coverage2 = _interopRequireDefault(_coverage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function log() {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, [_chalk2.default.cyan('blueflag-tests')].concat(args));
}

process.env.NODE_ENV = 'test';

_commander2.default.version(_package2.default.version).option('-m --min-coverage <n>').arguments('[cmd] [arg]').action(function (command, arg) {

    var flags = _commander2.default.options.reduce(function (ff, ii) {
        return ff.concat(ii.short, ii.long);
    }, []);

    _commander2.default.extraFlags = _commander2.default.rawArgs.slice(3).filter(function (extra) {
        return flags.every(function (flag) {
            return extra.indexOf(flag) === -1;
        });
    });

    switch (command) {
        case 'coverage':
            log('Covering tests');
            (0, _coverage2.default)(_commander2.default);
            return;

        case 'lint':
            log('Linting code');
            return (0, _lint2.default)(_commander2.default);

        case 'lint-file':
            log('Linting ' + arg);
            _commander2.default.singleFile = arg;
            return (0, _lint2.default)(_commander2.default);

        case 'flow':
            log('Checking types');
            return (0, _flow2.default)();
    }
});

_commander2.default.command('test').arguments('[glob]').action(function (glob) {
    return (0, _test2.default)({ glob: glob });
});

_commander2.default.parse(process.argv);