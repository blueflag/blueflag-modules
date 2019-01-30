//@flow
import type {Options} from './config';

import merge from 'webpack-merge';
import config from './config';

// @intent configure the extend function like a hoc

/*
 * @intent
 * Extend the default config via the function provided to extend
 */
export default function extend(options: Options): * {
    return (customConfig: *) => merge(config(options), customConfig);
}
