import xhrReq from './xhr-req'

const cacheObj = {}

function newCache(){
    return {
        status: 'free', // 当前接口请求的状态
        data: null, // 缓存数据
        errorCount: 0,
        autoRefreshCount: 3, // 自动重试的总次数
        queue: [new Date()], // 请求队列
    }
}

function waitBeforeReq(currentObj){
    console.log(currentObj)
    const interval = setInterval(() => {
        if (currentObj.data && currentObj.status === 'free'){
            clearInterval(interval)
        }
    }, 1000)
}

function startReq(url, method, query, key){
    xhrReq({
        url, method, query
    }).then(res => {
        cacheObj[key] = res
    })
}

function setRequest(url, method, query){
    const key = `${url}${method}${query}`
    if (cacheObj[key]){
        if (cacheObj[key].status === 'free' && cacheObj[key].data){
            // 已经请求过的取缓存中的数据
            return cacheObj[key].data
        }
        if (cacheObj[key].status === 'running'){
            // 如果前一个请求正在进行中，则挂起等待前一个请求完成直接取请求到的值
            waitBeforeReq(cacheObj[key])
        }
    } else {
        // 之前没有出现过就在缓存中增加一条记录并发起请求
        cacheObj[key] = newCache()
        startReq(url, method, query, key)
    }
    return false
}


export default setRequest
