/**
 * 功能：数据源管理所有动作配置
 * 作者：唐李梅
 * 日期： 2020.2.4
 */

import { createActions, createAction } from 'framework'
import config from 'conf'

import {
    GET_DATASOURCE_TABLE_LIST_DATASOURCE_MANAGE,
    SET_DATASOURCE_LIST_HEADERS_DATASOURCE_MANAGE,
    SET_SEARCH_VALUE_DATASOURCE_MANAGE,
    GET_ORIGIN_TABLE_DATASOURCE_MANAGE,
    SET_ORIGIN_TABLE_HEADERS_DATASOURCE_MANAGE,
    SET_DATA_SOURCE_TYPE_DATASOURCE_MANAGE,
    GET_ORIGIN_FIELD_LIST_DATASOURCE_MANAGE,
    SET_ORIGIN_FIELD_LIST_HEADERS_DATASOURCE_MANAGE,
    SET_CURRENT_DATASOURCE_MANAGE,
    GET_SYNC_CURRENT_DATA_DATASOURCE_MANAGE,
    SET_SYNC_TABLES_DATASOURCE_MANAGE,
    CLEAR_SYNC_CURRENT_DATA_DATASOURCE_MANAGE,
} from './actionTypes'

const { 
    constant: { 
        urlPrefix, 
    } 
} = config

const actionCreator = createActions({
    // 获取数据源列表
    getDataSourceTableList: {
        // url: `${urlPrefix}/allDataSourceInfo`,
        url: `${urlPrefix}/sync/allDataSourceInfo`,
        method: 'GET',
        actionType: GET_DATASOURCE_TABLE_LIST_DATASOURCE_MANAGE
    },
    setDataSourceTableHeader: createAction(SET_DATASOURCE_LIST_HEADERS_DATASOURCE_MANAGE),
    // 设置当前条数据
    setCurrentDataSource: createAction(SET_CURRENT_DATASOURCE_MANAGE),
    // 表头改变显示
    changeTableHeader: {
        url: `${urlPrefix}/origin/tableConf`,
        method: 'PUT',
        hasLoading: false
    },
    // 设置检索值
    setSearchValue: createAction(SET_SEARCH_VALUE_DATASOURCE_MANAGE),
    // 获取数据源类型
    getDataSourceType: {
        // url: `${urlPrefix}/allDataSourceType`,
        url: `${urlPrefix}/sync/allDataSourceType`,
        method: 'GET',
        actionType: SET_DATA_SOURCE_TYPE_DATASOURCE_MANAGE
    },
    // 测试数据源
    testDataSource: {
        url: `${urlPrefix}/sync/testConn`,
        // url: `${urlPrefix}/newDataSource`,
        method: 'POST',
        hasLoading: false
    },
    // 新增和测试数据源
    newDataSource: {
        url: `${urlPrefix}/sync/newDataSource`,
        // url: `${urlPrefix}/newDataSource`,
        method: 'POST',
        handleError: false
    },
    // 编辑数据源
    editDataSource: {
        // url: `${urlPrefix}/editDataSource`,
        url: `${urlPrefix}/sync/editDataSource`,
        method: 'POST',
    },
    // 上传jar
    uploadJar: {
        url: `${urlPrefix}/sync/upload/jar`,
        // url: `${urlPrefix}/upload`,
        method: 'POST',
    },
    // 获取当前数据源下的原始表
    getOriginTableList: {
        // url: `${urlPrefix}/allTables`,
        url: `${urlPrefix}/origin/allTables`,
        method: 'GET',
        actionType: GET_ORIGIN_TABLE_DATASOURCE_MANAGE
    },
    setOriginTableHeader: createAction(SET_ORIGIN_TABLE_HEADERS_DATASOURCE_MANAGE),
    // 获取当前所有的字段列表
    getOriginFieldList: {
        // url: `${urlPrefix}/allFields`,
        url: `${urlPrefix}/origin/allFields`,
        method: 'GET',
        actionType: GET_ORIGIN_FIELD_LIST_DATASOURCE_MANAGE
    },
    setOriginFieldHeader: createAction(SET_ORIGIN_FIELD_LIST_HEADERS_DATASOURCE_MANAGE),
    // 手动同步
    syncClick: {
        // url: `${urlPrefix}/allFields`,
        url: `${urlPrefix}/sync/syncTable`,
        method: 'GET',
        actionType: GET_ORIGIN_FIELD_LIST_DATASOURCE_MANAGE
    },
    // 获取同步时需要的某数据源对应的数据库表信息
    getSyncCurrentData: {
        url: `${urlPrefix}/sync/getDataSource`,
        method: 'GET',
        actionType: GET_SYNC_CURRENT_DATA_DATASOURCE_MANAGE
    },
    // 清空当前数据源信息
    clearSyncCurrentData: createAction(CLEAR_SYNC_CURRENT_DATA_DATASOURCE_MANAGE),
    // 设置同步数据表的选中情况
    setSyncTablesCheck: createAction(SET_SYNC_TABLES_DATASOURCE_MANAGE),
    // 同步数据源
    syncDataSource: {
        url: `${urlPrefix}/sync/syncDataSource`,
        // url: `${urlPrefix}/syncDataSource`,
        method: 'POST',
    }
})

export default actionCreator
