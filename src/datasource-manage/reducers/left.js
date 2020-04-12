/**
 * 功能: 数据源管理left
 * 作者: tanglimei
 * 日期: 2020.02.04
 */
import { Immutable } from 'framework/Util'
import { handleActions } from 'framework'
import config from 'conf'
import { 
    GET_DATASOURCE_TABLE_LIST_DATASOURCE_MANAGE,
    SET_DATASOURCE_LIST_HEADERS_DATASOURCE_MANAGE,
    SET_DATA_SOURCE_TYPE_DATASOURCE_MANAGE,
    SET_CURRENT_DATASOURCE_MANAGE,
    GET_SYNC_CURRENT_DATA_DATASOURCE_MANAGE,
    SET_SYNC_TABLES_DATASOURCE_MANAGE,
    CLEAR_SYNC_CURRENT_DATA_DATASOURCE_MANAGE,
} from '../actions/actionTypes'

const { constant: { DELETE_STATUS } } = config

/**
 * dataSource 数据源列表数据
 * headers 数据源列表headers
 * dataSourceType 数据源类型列表
 * currentDataSource 当前数据源信息
 */
const initialState = Immutable.fromJS({
    dataSource: [],
    headers: [],
    dataSourceType: [],
    currentDataSource: {},
    syncCurrentDatas: {},
    syncCurrentTables: [],
})

const reducer = handleActions(
    {
        [GET_DATASOURCE_TABLE_LIST_DATASOURCE_MANAGE]: {
            success: (state, action) => {
                const { dataSource, headers } = action.payload
                return state.set('dataSource', Immutable.fromJS(dataSource))
                    .set('headers', Immutable.fromJS(headers))
                    .set('currentDataSource', Immutable.fromJS(dataSource[0] || {}))
            }
        },
        [SET_DATASOURCE_LIST_HEADERS_DATASOURCE_MANAGE]: (state, action) => state.set('headers', Immutable.fromJS(action.payload)),
        // 设置当前条数据
        [SET_CURRENT_DATASOURCE_MANAGE]: (state, action) => state.set('currentDataSource', Immutable.fromJS(action.payload)),
        // 数据源类型
        [SET_DATA_SOURCE_TYPE_DATASOURCE_MANAGE]: {
            success: (state, action) => state.set('dataSourceType', Immutable.fromJS(action.payload))
        },
        // 获取同步数据源当前条数据源库表信息
        [GET_SYNC_CURRENT_DATA_DATASOURCE_MANAGE]: {
            success: (state, action) => {
                const syncCurrentTables = action.payload?.tables?.map(item => (item.status === DELETE_STATUS
                    ? { ...item, checked: true, disabled: true } : { ...item, checked: false }))

                return state.set('syncCurrentDatas', Immutable.fromJS(action.payload))
                    .set('syncCurrentTables', Immutable.fromJS(syncCurrentTables))
            } 
        },
        // 清空当前数据源信息
        [CLEAR_SYNC_CURRENT_DATA_DATASOURCE_MANAGE]: state => state.set('syncCurrentDatas', Immutable.fromJS({}))
            .set('syncCurrentTables', Immutable.fromJS([])),
        // 设置当前条数据表选中情况
        [SET_SYNC_TABLES_DATASOURCE_MANAGE]: (state, action) => state.set('syncCurrentTables', Immutable.fromJS(action.payload)),
    },
    initialState
)

export default reducer
