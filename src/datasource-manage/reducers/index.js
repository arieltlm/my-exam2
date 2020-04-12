/**
 * 功能: 数据源管理页面
 * 作者: tanglimei
 * 日期: 2020.02.04
 */
import { combineReducers } from 'framework/Util'
// 引入该模块下的所有子reducers
import left from './left'
import right from './right'

export default combineReducers({ 
    left,
    right
})
