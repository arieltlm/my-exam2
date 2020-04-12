/**
 * 功能：公共资源包编译配置
 * 作者：安超
 * 日期：2019-03-06
 */

const path = require('path')
const webpack = require('webpack')
const { dependencies } = require('../package.json')
const rootPath = path.resolve(__dirname, '../')

module.exports = {
    mode: "production",
    entry: {
        vendor: Object.keys(dependencies)
    },
    output: {
        path: path.join(rootPath, 'dll'),
        filename: "[name].dll.js",
        library: "[name]_library"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(rootPath, 'dll', '[name]-manifest.json'),
            name: "[name]_library",
            context: rootPath
        })
    ]
}