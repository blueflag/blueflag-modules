import chalk from 'chalk';
import Loader from './Loader';
import {Try} from 'fronads';

const parseGithubError = (error) => () => JSON.parse(error.message);


export default function(error) {
    Loader.stop();
    Try(parseGithubError(error))
        .map((err) => {
            console.log(chalk.red('Error:'), err.message);
            err.errors && console.log(chalk.red('Error:'), err.errors.map(ii => ii.message).join('\n'));
        })
        .leftMap(() => {
            console.log(chalk.red('Error:'), error);
        })
};
