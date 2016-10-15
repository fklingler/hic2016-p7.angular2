const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const jsonImporter = require('node-sass-json-importer');

const ENVIRONMENT = process.env.WEBPACK_ENV || process.env.NODE_ENV || 'development';

// Webpack Config
const BASE_CONFIG = {
    devtool: 'cheap-module-source-map',
    cache: true,
    debug: true,

    entry: {
        polyfills: root('src/polyfills.browser.ts'),
        vendor: root('src/vendor.browser.ts'),
        main: root('src/main.browser.ts')
    },

    output: {
        path: root('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
        new HtmlWebpackPlugin({ template: root('src/index.html') }),
        new webpack.ProvidePlugin({
            'jQuery':        'jquery',
            '$':             'jquery',
            'jquery':        'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env.ENV': JSON.stringify(ENVIRONMENT),
            'process.env.API_URL': JSON.stringify(process.env.API_URL || 'https://hackingindustrycamp2016-api.scalingo.io')
        }),
    ],

    module: {
        preLoaders: [
            { test: /\.ts$/, exclude: /node_modules/, loader: 'tslint' },
            { test: /\.s[a|c]ss$/, exclude: /node_modules/, loader: 'sasslint' }
        ],

        loaders: [
            // Scripts
            { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
            { test: /theme-inspinia\.js$/, loader: 'exports?ColorAdmin' },
            // JSON
            { test: /\.json$/, loader: 'json' },
            // Templates
            { test: /\.pug$/, loader: 'pug-html-loader?doctype=html' },
            // Styles
            { test: /\.global\.scss$/, loaders: ['style', 'css', 'resolve-url', 'sass'] }, // global styles
            { test: /^(?!.*global).*\.scss$/, loaders: ['exports?module.exports.toString()', 'css', 'resolve-url', 'sass'] }, // scoped styles
            { test: /node_modules.*\.css$/, loaders: ['style', 'css', 'resolve-url'] }, // global styles from vendors
            // Fonts
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            // Images
            { test: /\.(jpe?g|png|gif|svg)$/i, loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]}
        ]
    },

    resolve: {
        root: [root('src')],
        extensions: ['', '.ts', '.js', '.json']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    },

    sasslint: {
        configFile: root('.sass-lint.yml')
    },


    sassLoader: {
        // Apply the JSON importer via sass-loader's options.
        importer: jsonImporter
    }
};

const PROD_CONFIG = {
    devtool: null,

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ]
};

module.exports = webpackMerge(BASE_CONFIG, ENVIRONMENT == 'production' ? PROD_CONFIG : {});

function root(upath) {
    var fullpath = [__dirname].concat(upath.split('/'));
    return path.join(...fullpath);
}

function modulesRoot(upath) {
    var fullpath = [__dirname, 'node_modules'].concat(upath.split('/'));
    return path.join(...fullpath);
}
