import {
    React,
    PureComponent,
} from 'framework/Util'
import { Button } from 'antd'
import http from './ajax'

const cacheObj = {}


const reqFun = (url, methods, query, key) => new Promise((resolve, reject) => {
    http.ajax({
        type: methods,
        url,
        data: query,
        beforeSend(xhr) {
            if (cacheObj[key]){
                cacheObj[key].queue.push(xhr)
                cacheObj[key].status = 'running'
            }
        },
        success(result) { 
            // resolve(result)

            // 【test】 请求太快了，所以就用这个模拟了
            setTimeout(() => {
                cacheObj[key].status = 'free'
                resolve(result)
            }, 10000)
        }, 
        error(xhr, err){
            reject(xhr, err)
        },
        complete(){
            if (cacheObj[key]) {
                // cacheObj[key].status = 'free'
                // 【test】 请求太快了，所以就把这个cacheObj[key].status = 'free'放在sucess处了
                // cacheObj[key].status = 'free'
            }
        }
    })
})

const repeatReq = (url, methods, query, key) => new Promise((resolve, reject) => {
    reqFun(url, methods, query, key).then(res => {
        cacheObj[key].data = res
        resolve(res)
    }).catch(err => {
        const { errorCount, autoRefreshCount } = cacheObj[key]
        cacheObj[key].errorCount = errorCount + 1
        if (autoRefreshCount - errorCount > 0) {
            console.log(`自动重试第${cacheObj[key].errorCount}次`)
            repeatReq(url, methods, query, key)
        } else {
            console.log('请求失败', err)
        }
        reject(err)
    }).catch(err => { console.log(err) })
})


// const paramsReq = () => new Promise((resolve, reject) => {
//     repeatReq().then(res => {
//         resolve(res)
//     }).catch(err => reject(err))
// })

const waitBeforeReq = (currentReq, key) => new Promise(resolve => {
    // const interval = setInterval(() => {
    // if (cacheObj[key].data && cacheObj[key]?.status === 'free' && currentReq.readyState === 4) {
    debugger
    currentReq.addEventListener('load', function () {
        // clearInterval(interval)
        resolve(cacheObj[key].data)
        resolve(this.responseText)
    })
    //     clearInterval(interval)
    //     resolve(cacheObj[key].data)
    // }
    // }, 500)
})

function ajaxReq(url, methods, query) {
    const key = `${url}-${methods}}`
    // const key = `${url}-${methods}-${JSON.stringify(query)}`
    
    if (cacheObj[key]){
        if (cacheObj[key]?.status === 'free' && cacheObj[key]?.data){
            // 已经请求过的取缓存中的数据
            return Promise.resolve(cacheObj[key].data)
        } if (cacheObj[key].status === 'running'){
            // 如果前一个请求正在进行中，则挂起等待正在请求的那个请求完成直接取请求到的值
            // const currentReq = cacheObj[key].queue.find(item => item.readyState !== 4)
            // 【test】为了测试，请求太快了，没法模拟正在请求中的，暂时改成找到=4的
            const currentReq = cacheObj[key].queue.find(item => item.readyState === 4)
            return waitBeforeReq(currentReq)
        }
    } 
    // 之前没有出现过就在缓存中增加一条记录并发起请求
    cacheObj[key] = {
        status: 'free', // 当前接口请求的状态
        data: null, // 缓存数据
        errorCount: 0,
        autoRefreshCount: 5, // 自动重试的总次数
        queue: [], // 请求队列
    }
    return repeatReq(url, methods, query, key)
}
class XxxxXxx extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        ajaxReq('/api/allDataSourceType', 'GET', { a: 1 }).then(res => {
            console.log(1, res)
        })
        setTimeout(() => {
            this.reqclick()
        }, 5000)
    }

    reqclick=() => {
        ajaxReq('/api/allDataSourceType', 'GET', { a: 1 }).then(res => {
            console.log(2, res)
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.reqclick}>点击</Button>
            </div>
        )
    }
}

// XxxxXxx.propTypes = {
// 
// }

// XxxxXxx.defaultProps = {
// 
// }

export default XxxxXxx
