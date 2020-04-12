const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ip = 'localhost'
// const ip = '0.0.0.0'

const port = 4445
const ROOT_PATH = path.resolve(__dirname, './')
const APP_PATH = path.resolve(ROOT_PATH, 'src')
const projectEnName = 'example'

const development = {
    env: { NODE_ENV: JSON.stringify('development') },
    domain: '',
}
const production = {
    env: { NODE_ENV: JSON.stringify('production') },
    domain: '',
}

// 开发环境|生产环境
const isProd = process.env.NODE_ENV === 'production'
process.traceDeprecation = false

const entry = (function () {
    let app = [
        `webpack-dev-server/client?http://${ip}:${port}`,
        'webpack/hot/only-dev-server',
        './src/index.js'
    ]
    
    if (isProd) {
        app = './src/index.js'
    }
    
    return {
        app
    }
}())

const output = (function () {
    let obj = {
        path: path.join(ROOT_PATH, 'dev'),
        publicPath: '/',
        filename: `static/scripts/${projectEnName}-[name].js`,
        // chunkFilename: 'static/scripts/[name].js',
        // sourceMapFilename: '[file].map',
        // hotUpdateChunkFilename: 'hot/hot-update.js',
        // hotUpdateMainFilename: 'hot/hot-update.json'
    }
    
    if (isProd) {
        // publicPath使用./时，组件中图片路径会有问题
        obj = {
            path: path.join(ROOT_PATH, 'dist'),
            publicPath: '/',
            filename: `static/scripts/${projectEnName}-[name]-[chunkhash:10].js`,
            chunkFilename: `static/scripts/${projectEnName}-[name]-[chunkhash:10].js`
        }
    }
    
    return obj
}())

const jsxLoader = [
    {
        test: /\.jsx?$/,
        include: APP_PATH,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
            emitWarning: true,
            formatter: require('eslint-friendly-formatter')
        }
    },
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader']
    }
]

const cssLoaderUse = function (loaders, useCssModules = false) {
    const defaultOpt = { sourceMap: !isProd }
    return loaders.map(loader => {
        let options = defaultOpt
        
        if (loader === 'css-loader') {
            // mini-css-extract-plugin能够处理
            if (useCssModules) {
                options = {
                    sourceMap: !isProd,
                    modules: {
                        mode: 'local',
                        localIdentName: '[local]__[path][name]_[hash:base64:5]'
                    },
                }
            } else {
                options = {
                    sourceMap: !isProd
                }
            }
        }
        
        if (loader === 'less-loader') {
            options = {
                javascriptEnabled: true
            }
        }
        
        if (loader === 'postcss-loader') {
            options = {
                ...defaultOpt,
                config: {
                    path: './'
                }
            }
        }
        
        if (loader === 'sass-loader') {
            options = isProd ? {
                sassOptions: {
                    outputStyle: 'compressed'
                }
            } : {
                sassOptions: {
                    outputStyle: 'expanded'
                }
            }
        }
        
        if (loader === 'sass-resources-loader') {
            options = {
                resources: [
                    path.join(ROOT_PATH, 'node_modules/compass-mixins/lib/_compass.scss'),
                    path.join(ROOT_PATH, 'node_modules/compass-mixins/lib/_animate.scss'),
                    path.join(ROOT_PATH, 'node_modules/compass-mixins/lib/_lemonade.scss'),
                    path.join(APP_PATH, 'css/common/variables.scss'),
                    path.join(APP_PATH, 'css/common/mixins/mixins.scss')
                ]
            }
        }
        
        if (loader === 'style-loader') {
            options = {
                injectType: 'styleTag'
            }
        }
        
        return {
            loader,
            options
        }
    })
}

const imgLoader = (function () {
    return [
        { type: 'png', mimetype: 'image/png' },
        { type: 'jpg', mimetype: 'image/jpg' },
        { type: 'jpeg', mimetype: 'image/jpeg' },
        { type: 'gif', mimetype: 'image/gif' },
        { type: 'svg', mimetype: 'image/svg' }
    ].map(item => ({
        test: new RegExp(`\\.(${item.type})(\\?.*)?$`),
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: `static/images/[name]-${isProd ? '[hash]' : '[path]'}.[ext]`,
            mimetype: item.mimetype
        }
    }))
}())

// 字体配置参考：https://github.com/shakacode/bootstrap-sass-loader
const fontLoader = (function () {
    return [
        { type: 'woff', mimetype: 'application/font-woff' },
        { type: 'woff2', mimetype: 'application/font-woff2' },
        { type: 'otf', mimetype: 'font/opentype' },
        { type: 'ttf', mimetype: 'application/octet-stream' },
        { type: 'eot', mimetype: 'application/vnd.ms-fontobject' },
        { type: 'svg', mimetype: 'image/svg+xml' }
    ].map(item => ({
        test: new RegExp(`\\.(${item.type})(\\?.*)?$`),
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'static/fonts/[name].[ext]',
            mimetype: item.mimetype
        }
    }))
}())

const mediaLoader = {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: 'static/media/[name].[ext]'
    }
}

const injectionLoader = {
    test: path.join(APP_PATH, 'conf/injection.js'),
    loader: `imports-loader?domain=>
                ${isProd ? JSON.stringify(production.domain) : JSON.stringify(development.domain)}`
}

const optimization = {
    splitChunks: {
        cacheGroups: {
            commons: {
                chunks: 'initial',
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0
            },
            vendor: {
                test: /node_modules/,
                chunks: 'initial',
                name: 'vendor',
                priority: 10,
                enforce: true
            }
        }
    },
    minimizer: []
}

const copyArgs = [
    {
        from: 'src/project-conf.js',
        to: 'static/scripts/project-conf.js'
    },
    {
        from: 'src/images',
        to: 'static/images'
    }
]

let plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(isProd ? copyArgs : copyArgs.concat([
        {
            from: 'dll/vendor.dll.js',
            to: 'static/scripts/vendor.dll.js'
        }
    ])),
    new StyleLintPlugin({
        files: ['src/**/*.scss'],
        failOnError: false,
        emitErrors: true,
        syntax: 'scss',
    }),
    new HtmlWebpackPlugin({
        template: path.join(APP_PATH, 'index.html'),
        title: 'example-%lastDeployTime%',
        dll: isProd ? '' : '<script src="/static/scripts/vendor.dll.js"></script>',
        description: '这是一个示例工程',
        filename: 'index.html',
        favicon: 'src/images/favicon.ico',
        inject: true,
        minify: {
            removeComments: true
        },
        cache: false
    })
]

if (isProd) {
    plugins = plugins.concat([
        new MiniCssExtractPlugin({
            filename: 'static/css/[name]-[chunkhash:10].css',
            chunkFilename: 'static/css/[id]-[chunkhash:10].css'
        })
    ])
    
    optimization.minimizer = optimization.minimizer.concat([
        new OptimizeCSSPlugin({ discardComments: { removeAll: true } }),
        new TerserPlugin({
            parallel: true,
            cache: true
        })
    ])
} else {
    plugins = plugins.concat([
        // new webpack.DllReferencePlugin({
        //    manifest: path.resolve(__dirname, 'dll/vendor-manifest.json')
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin()
    ])
}

const proxies = [{
    target: `http://${ip}`,
    proxyPort: 3003,
    headers: {
    },
    paths: ['/api']
}]

const devServer = {
    contentBase: path.join(ROOT_PATH, 'dev'),
    publicPath: '/',
    historyApiFallback: true,
    // clientLogLevel: 'none',
    host: ip,
    port,
    disableHostCheck: true,
    open: true,
    // openPage: 'index.html',
    hot: true,
    inline: true,
    compress: true,
    stats: {
        colors: true,
        errors: true,
        warnings: true,
        modules: false,
        chunks: false
    },
    proxy: (function () {
        const obj = {}
        proxies.forEach(proxyConf => {
            const { target, proxyPort, headers, paths } = proxyConf
            const origin = `${target}:${proxyPort}`
            paths.forEach(apiPath => {
                obj[apiPath] = {
                    target: origin,
                    changeOrigin: true,
                    headers
                }
            })
        })
        
        return obj
    }())
}

module.exports = {
    ip,
    port,
    isProd,
    entry,
    output,
    jsxLoader,
    cssLoaderUse,
    imgLoader,
    fontLoader,
    mediaLoader,
    injectionLoader,
    development,
    production,
    optimization,
    plugins,
    defaultPath: {
        ROOT_PATH,
        APP_PATH
    },
    resolve: {
        modules: [
            APP_PATH,
            'node_modules'
        ],
        alias: {
            '@': APP_PATH,
            framework: path.join(APP_PATH, 'framework'),
            // 'react-dom': '@hot-loader/react-dom',
            conf: path.join(APP_PATH, 'conf'),
            dialog: path.join(APP_PATH, 'framework/dialog'),
            loading: path.join(APP_PATH, 'framework/loading'),
            plugins: path.join(APP_PATH, 'plugins'),
            particles: path.join(APP_PATH, 'plugins/particles.js'),
        },
        extensions: ['.js', '.jsx', '.json', '.css']
    },
    devServer,
    proxies
}
