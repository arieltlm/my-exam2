/**
 * 功能: 运维中心假数据
 * 作者: tanglimei
 * 日期: 2019.12.04
 */
module.exports = {
    getUserInfo: {
        data: { 
            username: 'admin', 
            chineseName: 'admin',
            tenantConfig: '',
            password: '******',
            resources: [{ id: 122, en: 'pipeline', cn: 'pipeline' }] 
        }, 
        statusCode: 200, 
        message: '当前用户没有任何权限，请联系管理员!'
    },
    allDataSourceType: {
        data: {
            allDataSourceType: [
                'mysql',
                'oracle',
                'hive',
                'postgresql',
                'other'
            ]
        },
        statusCode: 300,
        message: '成功'
    },
}
