
// @INTENT: use babel on js/jsx files
export const JS_LOADER = {
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
export const GRAPHQL_LOADER = {
    test: /\.graphql$/,
    include,
    use: 'raw-loader'
};

// @INTENT: load image files and assets
export const FILE_LOADER = {
    test: /\.(png|svg|jpg|gif|ttf|woff|woff2|eot|otf|ico|pdf)$/,
    include,
    use: {
        loader: 'file-loader',
        options: {
            name: 'assets/[hash].[ext]'
        }
    }
};

export const POSTCSS_LOADER = {
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
export const CSS_LOADER = {
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

