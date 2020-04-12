export const urlPrefix = '/dsm-web'
// export const urlPrefix = 'api'


export const dbType = {
    dbType: [
        { enName: 'int', cnName: '整数' },
        { enName: 'decimal', cnName: '小数' },
        { enName: 'varchar', cnName: '字符串' },
        { enName: 'text', cnName: '文本' },
        { enName: 'bool', cnName: '布尔' },
        { enName: 'time', cnName: '时间' },
        { enName: 'date', cnName: '日期' },
        { enName: 'datetime', cnName: '日期时间' }
    ]
}

export const timeFormat = {
    dateMinute: 'YYYY-MM-DD HH:mm',
    dateTime: 'YYYY-MM-DD HH:mm:ss',
    date: 'YYYY-MM-DD',
    dateYear: 'YYYY',
    dateMonth: 'YYYY-MM',
    dateWeek: 'dddd',
    time: 'HH:mm:ss',
    dateTimeNoSeparator: 'YYYYMMDDHHmmss',
    dateNoSeparator: 'YYYYMMDD'
}

// export const formItemLayout = {
//     labelCol: {
//         xs: { span: 27 },
//         sm: { span: 4 },
//     },
//     wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 20 },
//     },
// }

// export const noLableFormItemLayout = {
//     wrapperCol: {
//         xs: {
//             span: 24,
//             offset: 0,
//         },
//         sm: {
//             span: 18,
//             offset: 6,
//         },
//     },
// }

// 正则表达式
export const regexp = {
    dataSourceNameReg: /^[a-zA-Z0-9_]+$/, // 数据源名称-英文数字下划线
    // urlReg: /^[a-zA-Z0-9_\/\:\.\-\@\;]+$/, // url-中文英文数字/:
    textInputReg: /^\w+$/, // 文本输入-英文数字下划线
    passwordReg: /^\w{1,32}$/, // 密码
    typeNameReg: /^[a-zA-Z0-9]+$/, // 数据源类型名称-英文数字
}

export const validatorDic = {
    dataSourceName: { cn: '数据源名称', desc: '英文数字下划线', reg: regexp.dataSourceNameReg },
    // url: { cn: 'url', desc: '英文数字/:;-@下划线点', reg: regexp.urlReg },
    database: { cn: '库名', desc: '英文数字下划线', reg: regexp.textInputReg },
    owner: { cn: 'owner', desc: '英文数字下划线', reg: regexp.textInputReg },
    schema: { cn: 'schema', desc: '英文数字下划线', reg: regexp.textInputReg },
    // username: { cn: '用户名', desc: '英文数字下划线', reg: regexp.textInputReg },
    // description: { cn: '描述', desc: '中文英文数字下划线', reg: regexp.dataSourceNameReg },
    dataSourceTypeName: { cn: '数据源类型名称', desc: '英文数字', reg: regexp.typeNameReg },
}

export const DELETE_STATUS = 2

export const statusDic = {
    0: { classNa: 'nostate', text: '' },
    1: { classNa: 'synced', text: '已同步' },
    2: { classNa: 'delete', text: '已删除' },
    3: { classNa: 'refreshed', text: '有更新' },
}

export const componentHeight = {
    headerHg: 64,
    contentPd: 48,
    contentXsPd: 32,
    titleBoxHg: 48,
    btnGroupHg: 48,
    tableHeaderHg: 40
}
