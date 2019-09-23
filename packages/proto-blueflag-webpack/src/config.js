//@flow

/*
 * @intent
 * The most common use cases of webpack. Not the simple but the common.
 * People can override if they dont like the common cases.
 */
import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import * as loaders from './loaders';

export type Options = {
    name: string,
    configType: 'client' | 'server',
    mode: 'production' | 'development',
    environment: *,
    src: string,
    dest: string,
    loaderPaths?: string[]
};

export default function config(options: Options): * {
    let {
        configType = 'client',
        name,
        mode,
        environment,
        src,
        dest,
        loaderPaths = [],
        loaders
    } = options;

    const production = mode === 'production';

    let include = [
        src,
        ...loaderPaths
    ];

    const stringEnvironment = Object.keys(environment)
        .reduce((env: {}, key: string): {} => {
            env[`process.env.${key}`] = JSON.stringify(environment[key]);
            return env;
        }, {});

    const baseConfig = {
        cache: production,
        devtool: production ? 'source-map' : undefined,
        entry: {
            [name]: path.join(src, 'index.js')
        },
        output: {
            path: dest,
            filename: '[name]-[hash].js',
            chunkFilename: '[id]-[chunkhash].js',
            publicPath: '/'
        },
        resolve: {
            alias: {
                ['~']: src
            },
            extensions: ['.jsx', '.js']
        },
    };

    const clientConfig = {
        module: {
            rules: (config.loaders || [
                'JS_LOADER',
                'GRAPHQL_LOADER',
                'FILE_LOADER',
                'CSS_LOADER',
                'POSTCSS_LOADER'
            ]).map(ll => loaders[ll])
        },
        plugins: [
            new webpack.DefinePlugin(stringEnvironment),
            production && new MiniCssExtractPlugin({
                filename: `[name]-[hash].css`
            }),
            new CleanWebpackPlugin([dest], {
                root: path.resolve(dest, '..'),
                verbose: true,
                allowExternal: true
            }),
            new webpack.IgnorePlugin(/\.flow$/),
            new HtmlWebpackPlugin({
                template: path.join(src, 'index.static.jsx')
            })

        ].filter(ii => ii),
        devServer: {
            host: process.env.HOST || environment.HOST || '0.0.0.0',
            port: process.env.PORT || environment.PORT || 3000,
            clientLogLevel: 'none',
            publicPath: '/',
            hot: true,
            stats: 'minimal',
            historyApiFallback: true
        }
    };

    const serverConfig = {
        output: {
            libraryTarget: 'commonjs2',
            path: dest,
            filename: '[name]-[hash].js',
            chunkFilename: '[id]-[chunkhash].js'
        },
        module: {
            rules: (config.loaders || [
                'JS_LOADER',
                'GRAPHQL_LOADER',
            ]).map(ll => loaders[ll])
        },
        plugins: [
            new webpack.DefinePlugin(stringEnvironment),
            new CleanWebpackPlugin([dest], {
                root: path.resolve(dest, '..'),
                verbose: true,
                allowExternal: true
            }),
            new webpack.IgnorePlugin(/\.flow$/),

        ]
    };

    return {
        ...baseConfig,
        ...(configType === 'client' ? clientConfig : serverConfig)
    };

}
