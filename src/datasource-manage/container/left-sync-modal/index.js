/**
 * 功能: 同步数据源
 * 作者: tanglimei
 * 日期: 2020.02.07
 */
import { connect, hot, createSelector } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import view from '../../components/left-sync-modal'


const getState = state => state.dataSourceManage.left 

const selector = createSelector([getState], storeDatas => {
    const dataSource = storeDatas.get('dataSource').toJS()
    const syncCurrentDatas = storeDatas.get('syncCurrentDatas').toJS()
    const syncCurrentTables = storeDatas.get('syncCurrentTables').toJS()


    return {
        dataSource,
        syncCurrentDatas,
        syncCurrentTables,
    }
})

export default connect(selector, actionCreator)(hot(module)(view))
