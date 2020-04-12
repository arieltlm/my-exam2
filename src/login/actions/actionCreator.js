/**
 * 功能：所有动作配置
 * 作者：安超
 * 日期： 2018/3/19
 */

import { createActions } from 'framework'
import config from 'conf'
import actionTypes from './actionTypes'

const { 
    constant: { 
        urlPrefix, 
    } 
} = config

const actionCreator = createActions({
    login: {
        url: '/api/login',
        method: 'post'
    },
    logout: {
        url: `${urlPrefix}/logout`,
    },
    getUserInfo: {
        // url: `${urlPrefix}/login/getUserInfo`,
        url: '/api/getUserInfo',
        actionType: actionTypes.SET_USER_INFO_LOGIN
    }
})

export default actionCreator
