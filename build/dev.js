const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const opn = require('opn')
const chalk = require('chalk')
const config = require('./webpack.config')
const projectConf = require('../project.config')

const {
    ip, port,
    devServer
} = projectConf

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, devServer)

server.listen(port, ip, () => {
    const link = `http://${ip}:${port}`
    console.log(chalk.cyan(`服务地址：${link}`))

    opn(link)
        .then(() => {
            console.log(chalk.cyan('请求成功 ...'))
        })
        .catch((err) => {
            console.log(chalk.red(err));
        })
})
