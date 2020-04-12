/**
 * 功能：loading的状态
 * 作者：安超
 * 日期： 2018/3/27
 */

import { handleActions } from 'redux-actions'
import {
    SHOWLOADING_COMMON,
    HIDELOADING_COMMON,
    INCREASEINVOKE_COMMON,
    DECREASEINVOKE_COMMON
} from '../actions/actionTypes'

const initialState = {
    show: false,
    invokeCount: 0
}

export default handleActions({
    [SHOWLOADING_COMMON](state) {
        return {
            ...state,
            show: true
        }
    },
    
    [HIDELOADING_COMMON]() {
        return {
            show: false,
            invokeCount: 0
        }
    },

    [INCREASEINVOKE_COMMON](state) {
        const { invokeCount } = state
        return {
            ...state,
            invokeCount: invokeCount + 1
        }
    },

    [DECREASEINVOKE_COMMON](state) {
        const { invokeCount } = state
        if (invokeCount === 0) {
            return state
        }

        return {
            ...state,
            invokeCount: invokeCount - 1
        }
    }
}, initialState)
