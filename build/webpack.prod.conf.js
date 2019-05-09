'use strict';
const path = require('path');
const utils = require('./utils');
const libs = require('./libs');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : require('../config/prod.env');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true,
        }),
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js'),
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env,
        }),
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
            template: 'src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin (now optimization.splitChunks with Webpack 4, is it still necessary?)
            chunksSortMode: 'dependency',
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*'],
            },
        ]),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: '../report/webpack-bundle-analysis.html',
            openAnalyzer: false,
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                    },
                },
                sourceMap: config.build.productionSourceMap,
            }),
            // Compress extracted CSS. We are using this plugin so that possible
            // duplicated CSS from different components can be deduped.
            new OptimizeCSSPlugin({
                cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true },
            }),
        ],
        splitChunks: {
            name: true,
            cacheGroups: {
                // any required modules inside node_modules are extracted to vendor, except our own internal libs
                vendor: {
                    name: 'vendor',
                    test: libs.buildRegExpExcluding(libs.INTERNAL_LIBS),
                    chunks: 'all',
                },
                commons: {
                    chunks: 'async',
                    name: 'asyncCommonJS',
                    minChunks: 3,
                    // Ignores `minSize`, `maxSize`, and other defaults.
                    enforce: true,
                    priority: 0,
                },
            },
        },
    },
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8,
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;