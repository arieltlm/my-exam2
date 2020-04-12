/**
 * 功能：生成模拟数据
 * 作者：安超
 * 日期： 2018/1/31
 */

const datasourceManage = require('./datasource-manage')


module.exports = function () {
    return {
        ...datasourceManage,
    }
}
