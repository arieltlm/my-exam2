/**
 * 功能: 数据源管理left新增
 * 作者: tanglimei
 * 日期: 2020.02.04
 */
import { connect, hot, createSelector } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import view from '../../components/left-credit-modal'

const getState = state => state.dataSourceManage.left 

const selector = createSelector([getState], storeDatas => {
    const dataSourceType = storeDatas.get('dataSourceType').toJS()
    return {
        dataSourceType
    }
})

export default connect(selector, actionCreator)(hot(module)(view))
