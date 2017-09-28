'use strict';

var path = process.cwd();

require('app-module-path').addPath(path + '/src');

require('dotenv').config({ path: path, silent: true });