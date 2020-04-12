/**
 * Created by Anchao on 2017/6/29.
 * 非业务底层扩展封装
 */
import {
    createAction as originalCreateAction,
    handleAction,
    handleActions as originalHandleActions,
    combineActions
} from 'redux-actions'
import loadable from 'react-loadable'
import qs from 'qs'
import { message as mesAntd } from 'antd'
import loading from 'loading'
import { handleWithParameter, sendLog } from './ajax'
import ComLoading from './components/component-loading'

const noop = () => {
}

/*
* pre: ajax提交前
* success: ajax连接成功返回正确结果后
* error: ajax连接成功返回错误结果后
* fail: ajax连接失败（网络错误）
* always: ajax无论成功与失败都要执行
 */
const suffix = ['pre', 'success', 'error', 'fail', 'always']

/* 日志记录
 * log为actionCreator内配置参数，log为视图调用时传入的配置， 支持对象和布尔false
 * opId 日志id,
 * content: 日志内容,
 * isAutoSend: 是否自动发送日志，有些场景是需要用户触发才会记录日志，初始化界面时发送请求不需要记录到日志
 * afterSuccess: 发送日志的时机，是在接口成功之后还是调用接口之前，
 * getContent: 动态获得content，优先级低于content，
 * getOpId: 动态获得埋点id，优先级低于opId
 */
const logConf = {
    opId: -1,
    content: '',
    isAutoSend: true,
    afterSuccess: false,
    getContent: noop,
    getOpId: noop,
}

// 初始化工程中的所有state
const projectInitState = 'PROJECT_INIT_STATE_PUBLIC'

// 增强createAction
const createAction = (settings = {}) => payload => {
    // settings在actionCreator里配置，payload在view里调用时传入，支持log: false写法
    // 判断log在哪里配置
    const isInActionCreator = typeof settings !== 'string'
    const isInView = !!payload && payload.log !== undefined
    
    if (!isInActionCreator && !isInView) {
        return dispatch => {
            dispatch(originalCreateAction(settings)(payload))
        }
    } 
    const { log } = settings
    let { actionType } = settings
    let { log: newLog, ...rest } = payload
        
    if (!isInActionCreator) {
        actionType = settings
    }
        
    if (!isInView) {
        rest = payload
    }
    
    if (newLog === false) {
        newLog = { isAutoSend: false }
    }

    const logConfig = {
        ...logConf,
        ...log,
        ...newLog
    }
        
    return (dispatch, getState) => {
        dispatch(originalCreateAction(actionType)(rest))
        // 前置Pre action调用接口时发送，避免重复
        if (logConfig.isAutoSend && !/_PRE$/i.test(actionType)) {
            sendLog({
                opId: logConfig.opId === -1 ? logConfig.getOpId : logConfig.opId,
                content: logConfig.content.length === 0 ? logConfig.getContent : logConfig.content,
                payload: isInActionCreator ? rest : settings,
                state: getState()
            })
        }
    }
}

// 增强createActions, 可以配置{}
const createActions = function (actionMap) {
    const eventNames = Object.keys(actionMap)
    const fnsMap = {
        projectInit: createAction(projectInitState),
        sendLog: ({ opId, content }) => (dispatch, getState) => e => {
            sendLog({
                opId,
                content,
                payload: e,
                state: getState()
            })
        }
    }
    eventNames.forEach(eventName => {
        const configOrFn = actionMap[eventName]
        
        if (typeof configOrFn !== 'function') {
            const { log = {}, ...rest } = configOrFn
            const config = {
                method: 'GET',
                actionType: 'hasNotConfigActionType',
                hasLoading: true,
                handleError: true,
                ...rest
            }
            
            fnsMap[eventName] = (settings = {
                extra: {
                    preventDefault: false
                }
            }) => (dispatchFn, getState) => {
                // 配置actionType后，不执行此action时使用
                const dispatch = settings.extra && settings.extra.preventDefault ? noop : dispatchFn
                // 在发ajax之前控制loading画面并计算调用次数
                // if ((config.hasLoading) && !loading.getLoadingStatus()) loading.show()
                
                const logConfig = {
                    ...logConf,
                    ...log,
                    ...(settings.log ? settings.log : {})
                }
                
                const logParams = {
                    opId: logConfig.opId === -1 ? logConfig.getOpId : logConfig.opId,
                    content: logConfig.content.length === 0 ? logConfig.getContent : logConfig.content,
                    payload: settings,
                    state: getState()
                }
                // 配置了log
                const needSendLogBefore = ((log === false || Object.keys(log).length > 0)
                    || settings.log === false || (settings.log !== undefined && Object.keys(settings.log).length > 0))
                    && logParams.opId !== -1 && logConfig.isAutoSend && !logConfig.afterSuccess
                if (needSendLogBefore) {
                    sendLog(logParams)
                }
                
                dispatch(createAction(`${config.actionType}_PRE`)(settings))
                return handleWithParameter(
                    config.url,
                    {
                        ...settings,
                        ...config
                    }
                ).then(res => {
                    if ((config.hasLoading) && loading.getLoadingStatus()) {
                        loading.decreaseInvoke()
                        setTimeout(() => {
                            if (loading.getInvokeCount() === 0) {
                                loading.hide()
                            }
                        }, 30)
                    }

                    const { statusCode, message } = res.data
                    const params = res.config.params === undefined ? res.config.data : res.config.params
                    const dt = qs.parse(params)
                    
                    let data = {}
                    // 是否需要接口传递的参数
                    if (config.needFormData) {
                        data = { data: res }
                    } else {
                        data = res.data.data === undefined ? { ...res.data, data: dt } : res.data
                    }
                    
                    // always只有在成功时才返回数据，非200或异常都不返回数据
                    if (statusCode === 200) {
                        dispatch(createAction(`${config.actionType}_SUCCESS`)(data.data))
                        dispatch(createAction(`${config.actionType}_ALWAYS`)(data.data))
                        
                        if (!needSendLogBefore && logConfig.afterSuccess) {
                            sendLog(logParams)
                        }
                        
                        return res.data
                    }
                    
                    // 302时默认跳转到指定页面，接口要求返回绝对地址
                    if (statusCode === 302) {
                        window.location.replace(res.data.data)
                        return res.data
                    }


                    if (statusCode === 403) {
                        return res.data
                    }

                    if (config.handleError) {
                        if (statusCode === 401 && !config.url.endsWith('/login')) {
                            window.location.replace(window.location.origin)
                        } else {
                            mesAntd.error(message)
                        }
                    }
                    
                    dispatch(createAction(`${config.actionType}_ERROR`)(message))
                    dispatch(createAction(`${config.actionType}_ALWAYS`)())
                    
                    return res.data
                }).catch(({ message, response }) => {
                    loading.hide()
                    if (response) {
                        dispatch(createAction(`${config.actionType}_FAIL`)())
                        dispatch(createAction(`${config.actionType}_ALWAYS`)())
                        mesAntd.error(`${response.statusText}😂！`)
                        return {
                            statusCode: response.status,
                            message: response.statusText
                        }
                    } 
                    if (message && config.handleError) {
                        mesAntd.error(`${message}！`)
                    } else {
                        console.log(`未知错误${message}😂！`)
                    }
                    
                    
                    return {
                        statusCode: 500,
                        message
                    }
                })
            }
        } else {
            fnsMap[eventName] = configOrFn
        }
    })
    return fnsMap
}

// 增强handleActions，可以配置{}
const handleActions = function (reducerMap, defaultState) {
    const result = { ...reducerMap }
    Object.keys(result).forEach(actionType => {
        const fnOrObject = result[actionType]
        if (fnOrObject && typeof fnOrObject !== 'function') {
            delete result[actionType]
            const keys = Object.keys(fnOrObject)
            // 补充没有的默认配置
            suffix.forEach(str => {
                if (!keys.includes(str)) {
                    keys.push(str)
                    fnOrObject[str] = state => (state)
                }
            })
            
            keys.forEach(suffixAction => {
                result[`${actionType}_${suffixAction.toUpperCase()}`] = fnOrObject[suffixAction]
            })
        }
    })
    
    result[projectInitState] = function () {
        window.localStorage.clear()
        return defaultState
    }
    
    return originalHandleActions(result, defaultState)
}

// 懒加载组件
const lazyload = importUrl => loadable({
    loading: ComLoading,
    loader: () => importUrl
})

export {
    createAction,
    originalCreateAction,
    createActions,
    handleAction,
    handleActions,
    originalHandleActions,
    combineActions,
    lazyload
}
