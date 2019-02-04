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

// @INTENT: use babel on js/jsx files
const JS_LOADER = {
    test: /\.jsx?$/,
    include: path.resolve('./src'),
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
    include: path.resolve('./src'),
    use: 'raw-loader'
};

const FILE_LOADER = {
    test: /\.(png|svg|jpg|gif|ttf|woff|woff2|eot|otf|ico)$/,
    include: path.resolve('./src'),
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


export default function config({name, mode, dirname}: *): * {
    const production = mode === 'production';
    const src = path.join(dirname, 'src');
    const build = path.join(dirname, 'build');

    const CSS_LOADER = {
        test: /\.s?css$/,
        include: path.resolve('./src'),
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

    return {
        cache: production,
        devtool: production ? 'source-map' : undefined,
        entry: {
            [name]: path.join(src, 'index.js')
        },
        output: {
            path: build,
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
            production && new MiniCssExtractPlugin({
                filename: `[name]-[hash].css`
            }),
            new CleanWebpackPlugin(['build'], {
                root: dirname,
                verbose: true,
                allowExternal: true
            }),
            new webpack.IgnorePlugin(/\.flow$/),
            new HtmlWebpackPlugin({
                template: 'src/index.static.jsx'
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
            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT || 3000,
            publicPath: '/',
            hot: true,
            stats: 'minimal',
            historyApiFallback: true
        }
    };
}
