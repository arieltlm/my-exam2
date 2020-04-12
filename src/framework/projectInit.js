/**
 * 功能：工程初始化
 * 作者：安超
 * 日期： 2018/5/11
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import axios from 'axios'
import { createHashHistory } from 'history'
import store from 'framework/store'
import RootRoutesView from '@/components/root'
import dialog from './dialog'

// 初始化工程
const projectInit = function (oContainer, callback = () => {}) {
    const history = createHashHistory()
    /*
     * 触发方式
     * 1. 引入import { Prompt } from 'framework/Util'
     * 2. 在路由组件内部渲染此组件<Prompt message="此API尚未发布，请确认是否离开?" when={whenFlag} />
     */
    const getConfirmation = (msg, cb) => {
        dialog.confirm({
            content: <div>{msg}</div>,
            ok(){
                cb(true)
                dialog.hide()
            },
            cancel(){
                cb(false)
                dialog.hide()
            }
        })
    }
    
    history.listen(() => {
        const { CancelToken } = axios
        window.projectConf.source = CancelToken.source()
    })

    ReactDOM.render(
        <Provider store={store}>
            <Router hashHistory={history} getUserConfirmation={getConfirmation}>
                <RootRoutesView />
            </Router>
        </Provider>,
        oContainer,
        callback
    )
}

export default projectInit
