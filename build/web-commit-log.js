/**
 * 功能：生成指定时间段的提交的日志
 * 作者：安超
 * 日期：2018-12-07
 */

const path = require('path')
const childProcess = require('child_process')
const fs = require('fs')

// 生成提交日志
// %H提交对象（commit）的完整哈希字串  %ad作者修订日期（可以用 --date= 选项定制格式）
childProcess.exec('git log --pretty="%H - %an, %ad : %s" --date=iso-local --since="2018-12-05"', (error, stdout) => {
    if (!error){
        const DIST_PATH = path.resolve(__dirname, '../dist')
        const webCommitLogPath = `${DIST_PATH}/web-commit.log`
        const indexHTMLPath = `${DIST_PATH}/index.html`
        fs.appendFileSync(webCommitLogPath, '', 'utf-8')
        fs.writeFileSync(webCommitLogPath, stdout, 'utf-8')
    
        // 写入最后一次提交的commitId
        const lastCommitInfo = stdout.split(/[\n]/)[0].split(' - ')[0]
        const indexHTML = fs.readFileSync(indexHTMLPath, 'utf-8')
        fs.writeFileSync(indexHTMLPath, indexHTML.replace('%lastCommitId%', lastCommitInfo), 'utf-8')
    } else {
        console.log('err=', error)
    }
})
