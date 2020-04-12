export const urlPrefix = '/dsm-web'

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
