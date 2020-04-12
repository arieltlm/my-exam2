/**
 * 功能：ajax 统一配置
 * 作者：
 * 日期：2019-05-30
 */
import axios from 'axios'
import qs from 'qs'
import loading from 'loading'
import { packageLogInfo } from './Util'

// ajax 统一配置
const instance = axios.create({
    method: 'get',
    baseURL: '',
    timeout: 0,
    responseType: 'json',
    paramsSerializer: params => qs.stringify(params, { indices: false }),
})

instance.interceptors.request.use(
    config => ({ ...config, cancelToken: window.projectConf.source.token }),
    err => (Promise.reject(err))
)

const handleWithParameter = function (url, {
    method = 'GET',
    headers = {},
    contentType = 'application/json; charset=UTF-8',
    params = {},
    data = {},
    hasLoading = true
}) {
    const locHref = window.location.href
    const firstShapeIndex = locHref.indexOf('#')
    const lastShapeIndex = locHref.lastIndexOf('#')
    const Location = `${locHref.slice(0, firstShapeIndex)}${locHref.slice(lastShapeIndex)}`
    instance.defaults.headers = {
        ...instance.defaults.headers,
        ...headers,
        Location,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': contentType
    }
    
    // url替换参数
    let urlNew = url
    const strParams = []
    const paramsNew = { ...params }
    const keys = Object.keys(params)
    keys.forEach(key => {
        const reg = new RegExp(`:${key}`, 'g')
        if (reg.test(urlNew)) {
            urlNew = urlNew.replace(reg, params[key])
            delete paramsNew[key]
        } else {
            strParams.push(`${key}=${params[key]}`)
        }
    })

    // 如果设置了显示，并隐藏时，则触发显示
    if (hasLoading && !loading.getLoadingStatus()) {
        loading.show()
    }

    // 设置了加载，则自动计数
    if (hasLoading) {
        loading.increaseInvoke()
    }
    
    switch (method.toLowerCase()) {
    case 'get':
        return instance.get(urlNew, { params: paramsNew })
    case 'delete':
        return instance.delete(urlNew, { params: paramsNew, data })
    case 'post':
        return instance.post(urlNew, data, { params: strParams.length > 0 ? paramsNew : {} })
    case 'put':
        return instance.put(urlNew, data, { params: strParams.length > 0 ? paramsNew : {} })
    default: {
        const res = {
            then: resolve => resolve({
                statusCode: 300,
                message: 'method方式错误'
            })
        }
        return Promise.resolve(res)
    }
    }
}

// 发送日志接口
const sendLog = function ({
    opId = -1,
    content = '',
    payload = {},
    state = {}
}) {
    return new Promise((resolve => {
        const operateId = typeof opId === 'number' ? opId : opId(payload, state)
        const operateContent = typeof content === 'string' ? content : content(payload, state)
        console.log('operateId', operateId, 'operateContent=', operateContent)
        
        setTimeout(() => handleWithParameter('/api/sendLog', {
            method: 'post',
            data: {
                content: packageLogInfo({
                    opId: operateId,
                    content: operateContent
                })
            }
        }).then(resolve), 1000)
    }))
}

export {
    handleWithParameter,
    sendLog
}
