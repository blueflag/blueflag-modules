// @flow
import chalk from 'chalk';
import Loader from './Loader';

export default {
    success: (arg: *): * => {
        Loader.stop();
        console.log(chalk.green('Success:'), arg);
        return arg;
    },
    log: (arg: *): * => {
        Loader.stop();
        console.log(chalk.magenta('Log:'), arg);
        return arg;
    },
    error: (arg: *): * => {
        Loader.stop();
        console.log(chalk.red('Error:'), arg);
        return arg;
    }
};
