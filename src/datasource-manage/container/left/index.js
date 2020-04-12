/**
 * 功能: 数据源管理left
 * 作者: tanglimei
 * 日期: 2020.02.04
 */
import { connect, hot, createSelector } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import view from '../../components/left'

const getState = state => state.dataSourceManage.left 

const selector = createSelector([getState], storeDatas => {
    const headers = storeDatas.get('headers').toJS()
    const dataSource = storeDatas.get('dataSource').toJS()
    const headerShow = headers.filter(item => item.checked)
    const dataSourceType = storeDatas.get('dataSourceType').toJS()
    return {
        dataSource,
        headers,
        headerShow,
        dataSourceType
    }
})

export default connect(selector, actionCreator)(hot(module)(view))
