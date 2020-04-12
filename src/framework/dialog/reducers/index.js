/**
 * 功能：弹窗的状态
 * 作者：安超
 * 日期： 2018/3/27
 */

import { handleActions } from 'redux-actions'
import actionTypes from '../actions/actionTypes'

const initialState = {
    title: '',
    content: null,
    width: 500,
    dialogType: 'confirm',
    show: false,
    footer: null
}

export default handleActions({
    [actionTypes.SHOWDIALOG_COMMON](state, action) {
        return {
            ...state,
            ...action.payload,
            show: true
        }
    },
    
    [actionTypes.HIDEDIALOG_COMMON](state) {
        return {
            ...state,
            title: '',
            content: null,
            show: false,
        }
    },
    
    [actionTypes.SETFOOTER_COMMON](state, action) {
        return {
            ...state,
            ...action.payload
        }
    }
}, initialState)
