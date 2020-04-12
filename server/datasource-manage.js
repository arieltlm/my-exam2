/**
 * 功能: 运维中心假数据
 * 作者: tanglimei
 * 日期: 2019.12.04
 */
module.exports = {
    getUserInfo: {
        data: { 
            username: 'conacona', 
            chineseName: 'conacona',
            tenantConfig: '{"portal":"http://175.24.16.196:8270"}',
            password: '******',
            resources: [{ id: 122, en: 'datasource', cn: '数据源管理' }] 
        }, 
        statusCode: 200, 
        message: '当前用户没有任何权限，请联系管理员!'
    },
    allDataSourceInfo: {
        statusCode: 200,
        message: '',
        data: {
            dataSource: (function (){
                const res = []
                for (let i = 1; i < 101; i++) {
                    res.push({
                        dataSourceInfoId: i,
                        dataSourceType: ['hive', 'oracle', 'postgresql', 'newType'][i % 4],
                        dataSourceName: `test${i}`,
                        status: [0, 1][i % 2],
                        url: 'jdbc:mysql://ws03.mlamp.co:3306/cona_data_wjw',
                        schema: 'value',
                        database: 'value',
                        owner: 'test',
                        description: '描述',
                        username: 'root',
                        password: 1231313,
                        sampleDataSize: 5
                    })
                }
                return res
            }()),
            headers: [
                { tableConfId: 112, en: 'dataSourceInfoId', cn: '数据源id', checked: true, tableConfDesc: '目标表的自增ID' },
                { tableConfId: 113, en: 'dataSourceName', cn: '数据源名称', checked: true, tableConfDesc: '目标表的目标表英文名' },
                { tableConfId: 114, en: 'dataSourceType', cn: '数据源类型', checked: true },
                { tableConfId: 115, en: 'status', cn: '状态', checked: true },
                { tableConfId: 116, en: 'url', cn: 'url', checked: true },
                { tableConfId: 117, en: 'schema', cn: 'schema', checked: true },
                { tableConfId: 118, en: 'database', cn: '数据库', checked: true },
                { tableConfId: 118, en: 'owner', cn: 'owner', checked: true },
                { tableConfId: 118, en: 'username', cn: '用户名', checked: true },
                { tableConfId: 118, en: 'password', cn: '密码', checked: true },
                { tableConfId: 118, en: 'description', cn: '描述信息', checked: true },
            ]
        }
    },
    allTables: {
        statusCode: 200,
        message: '',
        data: {
            tables: (function (){
                const res = []
                for (let i = 1; i < 40; i++) {
                    res.push({
                        tableId: i,
                        tableType: ['hive', 'oracle', 'postgresql'][i % 3],
                        tableNameEn: 'ddafa',
                        tableNameCn: '数据源名称',
                        description: '描述',
                    })
                }
                return res
            }()),
            headers: [
                { tableConfId: 112, en: 'tableId', cn: '原始表id', checked: true, tableConfDesc: '目标表的自增ID' },
                { tableConfId: 113, en: 'tableNameEn', cn: '原始表英文名', checked: true, tableConfDesc: '目标表的目标表英文名' },
                { tableConfId: 114, en: 'tableNameCn', cn: '原始表中文名', checked: true },
                { tableConfId: 115, en: 'tableType', cn: '原始表类型', checked: true },
                { tableConfId: 118, en: 'description', cn: '描述信息', checked: true },
            ]
        }
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
    upload: {
        data: {
            driver: [
                'org.postgresql.Driver'
            ]
        },
        statusCode: 200,
        message: '成功'
    },
    newDataSource: {
        data: {
            result: 'success'
        },
        statusCode: 200,
        message: '成功'
    },
    editDataSource: {
        data: {
            result: 'success'
        },
        statusCode: 200,
        message: '成功'
    },
    allFields: {
        statusCode: 200,
        message: '',
        data: {
            fields: (function (){
                const res = []
                for (let i = 1; i < 25; i++) {
                    res.push({
                        label: ['地址', '身份证地址', '名字', '企业名称', '身份证信息'][i % 5],
                        dataSourceInfoId: i,
                        dataSourceType: ['hive', 'oracle', 'postgresql', 'newType'][i % 4],
                        dataSourceName: `test${i}`,
                        status: [0, 1][i % 2],
                        url: 'jdbc:mysql://ws03.mlamp.co:3306/cona_data_wjw',
                        schema: 'value',
                        database: 'value',
                        owner: 'test',
                        description: '描述',
                        username: 'root',
                        password: 1231313,
                        sampleDataSize: 5
                    })
                }
                return res
            }()),
            headers: [
                { tableConfId: 111, en: 'label', cn: '标签', checked: true, tableConfDesc: '目标表的自增ID' },
                { tableConfId: 112, en: 'dataSourceInfoId', cn: '数据源id', checked: true, tableConfDesc: '目标表的自增ID' },
                { tableConfId: 113, en: 'dataSourceName', cn: '数据源名称', checked: true, tableConfDesc: '目标表的目标表英文名' },
                { tableConfId: 114, en: 'dataSourceType', cn: '数据源类型', checked: true },
                { tableConfId: 115, en: 'status', cn: '状态', checked: true },
                { tableConfId: 116, en: 'url', cn: 'url', checked: true },
                { tableConfId: 117, en: 'schema', cn: 'schema', checked: true },
                { tableConfId: 118, en: 'database', cn: '数据库', checked: true },
                { tableConfId: 118, en: 'owner', cn: 'owner', checked: true },
                { tableConfId: 118, en: 'username', cn: '用户名', checked: true },
                { tableConfId: 118, en: 'password', cn: '密码', checked: true },
                { tableConfId: 118, en: 'description', cn: '描述信息', checked: true },
            ],
            status: 0
        }
    },
    syncTable: {
        data: (function (){
            const res = []
            for (let i = 1; i < 5; i++) {
                const tables = []
                for (let j = 1; j < 20; j++){
                    tables.push({
                        tableName: `table${j}`,
                        status: [0, 1, 2, 3][j % 4],
                        tableId: `${j}0`
                    })
                }
                res.push({
                    dataSourceInfoId: i,
                    dataSourceType: ['hive', 'oracle', 'postgresql', 'owner'][i % 4],
                    dataSourceName: `test${i}`,
                    owner: 'zhang',
                    schema: '123131',
                    database: 'value',
                    conn: [true, false][i % 2],
                    tables
                })
            }
            return res
        }()),
        statusCode: 200,
        message: '成功'
    },
    syncDataSource: {
        data: {
            result: 'unconnected'
        },
        statusCode: 500,
        message: '失败'
    }
}
