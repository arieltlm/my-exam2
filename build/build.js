const webpack = require('webpack')
const chalk = require('chalk')
const path = require('path')
const childProcess = require('child_process')
const fs = require('fs')
const config = require('./webpack.config')

webpack(config, (err, stats) => {
    if (err) throw err

    process.stdout.write(`${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    })}\n\n`)

    if (stats.hasErrors()) {
        console.log(chalk.red('  打包出错.\n'))
        process.exit(1)
    }

    console.log(chalk.cyan('打包完成~~'))
    
    // 生成提交日志
    // %H提交对象（commit）的完整哈希字串  %ad作者修订日期（可以用 --date= 选项定制格式）
    childProcess.exec('git log --pretty="%H - %ad" --date=iso-local --since="2018-11-05"', function (error, stdout) {
        if(!error){
            const DIST_PATH = path.resolve(__dirname, '../dist')
            fs.appendFileSync(`${DIST_PATH}/web-commit.log`,'', 'utf-8')
            fs.writeFileSync(`${DIST_PATH}/web-commit.log`,stdout, 'utf-8')
        } else {
            console.log('err=', error)
        }
    })
})

