//@flow
const path = process.cwd();

require('app-module-path')
    .addPath(`${path}/src`);

require('dotenv')
    .config({path, silent: true});
