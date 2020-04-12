const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const config = require('../project.config')

const {
    isProd, entry, output, resolve, plugins, optimization,
    jsxLoader, imgLoader, fontLoader, cssLoaderUse, mediaLoader, injectionLoader,
    defaultPath: { ROOT_PATH, APP_PATH },
    devServer
} = config
const firstloader = isProd ? MiniCssExtractPlugin.loader : 'style-loader'
const cssLoaders = [
    firstloader, 'css-loader', 'postcss-loader', 'sass-loader', 'sass-resources-loader'
]

const baseconfig = {
    mode: isProd ? 'production' : 'development',
    entry,
    output,
    resolve,
    plugins,
    context: ROOT_PATH,
    watch: !isProd,
    cache: !isProd,
    devtool: !isProd ? 'cheap-module-eval-source-map' : false,
    module: {
        rules: [
            ...jsxLoader,
            ...imgLoader,
            ...fontLoader,
            mediaLoader,
            injectionLoader,
            {
                test: /\.css$/,
                use: [
                    firstloader,
                    'css-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                include: APP_PATH,
                use: cssLoaderUse(cssLoaders, true),
                exclude: /node_modules|src[\\\/]{1}css/
            },
            {
                test: /\.scss$/,
                use: cssLoaderUse(cssLoaders, false),
                include: /node_modules|src[\\\/]{1}css/
            },
            {
                test: /\.less$/,
                include: [
                    APP_PATH,
                    path.resolve(__dirname, '../node_modules/antd-theme-fe-ml')
                ],
                use: cssLoaderUse([
                    firstloader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ], false)
            }
        ]
    },
    optimization,
    devServer
}

if (isProd) delete baseconfig.devServer

module.exports = baseconfig
