/**
 * 功能：工具类
 * 作者：安超
 * 日期：2018-12-07
 */

const childProcess = require('child_process')

const execCmd = function (cmd, cb) {
    childProcess.exec(cmd, (error, stdout) => {
        if (!error){
            cb(stdout)
        } else {
            console.log('err=', error)
        }
    })
}

module.exports = {
    execCmd
}
