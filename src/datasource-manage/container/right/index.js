/**
 * 功能: 数据源管理right
 * 作者: tanglimei
 * 日期: 2020.02.05
 */
import { connect, hot, createSelector } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import view from '../../components/right'

const getState = state => state.dataSourceManage.left

const selector = createSelector([getState], storeDatas => {
    const currentDataSource = storeDatas.get('currentDataSource').toJS()
    return {
        currentDataSource,
    }
})

export default connect(selector, actionCreator)(hot(module)(view))
