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

export type Options = {
    name: string,
    mode: 'production' | 'development',
    environment: *,
    src: string,
    dest: string,
    loaderPaths?: string[]
};

export default function config(options: Options): * {
    let {
        name,
        mode,
        environment,
        src,
        dest,
        loaderPaths = []
    } = options;

    const production = mode === 'production';

    let include = [
        src,
        ...loaderPaths
    ];

    // @INTENT: use babel on js/jsx files
    const JS_LOADER = {
        test: /\.jsx?$/,
        include,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true
            }
        }
    };

    // @INTENT: load graphql files raw style
    const GRAPHQL_LOADER = {
        test: /\.graphql$/,
        include,
        use: 'raw-loader'
    };

    // @INTENT: load image files and assets
    const FILE_LOADER = {
        test: /\.(png|svg|jpg|gif|ttf|woff|woff2|eot|otf|ico)$/,
        include,
        use: {
            loader: 'file-loader',
            options: {
                name: 'assets/[hash].[ext]'
            }
        }
    };

    const POSTCSS_LOADER = {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            sourceMap: true,
            plugins: () => [
                autoprefixer({browsers: ['ie >= 9', 'last 2 versions']})
            ]
        }
    };

    // @INTENT: load sass files
    const CSS_LOADER = {
        test: /\.s?css$/,
        include,
        use: [
            // extract to file or style tag
            production
                ? {
                    loader: MiniCssExtractPlugin.loader
                }
                : {
                    loader: 'style-loader',
                    options: {
                        sourceMap: true,
                        convertToAbsoluteUrls: true
                    }
                },
            'css-loader',
            POSTCSS_LOADER,
            'sass-loader'
        ].filter(ii => ii)
    };

    const stringEnvironment = Object.keys(environment)
        .reduce((env: {}, key: string): {} => {
            env[`process.env.${key}`] = JSON.stringify(environment[key]);
            return env;
        }, {});

    return {
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
        module: {
            rules: [
                JS_LOADER,
                GRAPHQL_LOADER,
                FILE_LOADER,
                CSS_LOADER
            ]
        },
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
}
