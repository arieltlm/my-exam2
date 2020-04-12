/**
 * 功能: 数据源管理right
 * 作者: tanglimei
 * 日期: 2020.02.04
 */
import { Immutable } from 'framework/Util'
import { handleActions } from 'framework'
import { 
    GET_ORIGIN_TABLE_DATASOURCE_MANAGE,
    SET_ORIGIN_TABLE_HEADERS_DATASOURCE_MANAGE,
    GET_ORIGIN_FIELD_LIST_DATASOURCE_MANAGE,
    SET_ORIGIN_FIELD_LIST_HEADERS_DATASOURCE_MANAGE,
    SET_SEARCH_VALUE_DATASOURCE_MANAGE,
} from '../actions/actionTypes'

/**
 * dataSource 原始表列表数据
 * headers 原始表列表headers
 * fieldHeaders 原始表字段列表headers
 * searchValue 右侧检索信息
 */
const initialState = Immutable.fromJS({
    dataSource: [],
    headers: [],
    fieldHeaders: [],
    searchValue: ''
})

const reducer = handleActions(
    {
        [GET_ORIGIN_TABLE_DATASOURCE_MANAGE]: {
            success: (state, action) => {
                const { tables, headers } = action.payload
                return state.set('dataSource', Immutable.fromJS(tables || []))
                    .set('headers', Immutable.fromJS(headers))
            }
        },
        [SET_ORIGIN_TABLE_HEADERS_DATASOURCE_MANAGE]: (state, action) => state.set('headers', Immutable.fromJS(action.payload)),
        [SET_SEARCH_VALUE_DATASOURCE_MANAGE]: (state, action) => state.set('searchValue', Immutable.fromJS(action.payload)),
        [GET_ORIGIN_FIELD_LIST_DATASOURCE_MANAGE]: {
            success: (state, action) => {
                const { headers } = action.payload
                return state.set('fieldHeaders', Immutable.fromJS(headers))
            }
        },
        [SET_ORIGIN_FIELD_LIST_HEADERS_DATASOURCE_MANAGE]: (state, action) => state.set('fieldHeaders', Immutable.fromJS(action.payload)),
    },
    initialState
)

export default reducer
