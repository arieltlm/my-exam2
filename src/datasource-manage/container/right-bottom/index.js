/**
 * 功能: 数据源管理right
 * 作者: tanglimei
 * 日期: 2020.02.05
 */
import { connect, hot, createSelector } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import view from '../../components/right-bottom'

const getStateLeft = state => state.dataSourceManage.left 
const getStateRight = state => state.dataSourceManage.right 

const selector = createSelector([getStateLeft, getStateRight], (storeDatasLeft, storeDatasRight) => {
    const currentDataSource = storeDatasLeft.get('currentDataSource').toJS()
    const headers = storeDatasRight.get('headers').toJS()
    const dataSource = storeDatasRight.get('dataSource').toJS()
    const searchValue = storeDatasRight.get('searchValue')
    const headerShow = headers.filter(item => item.checked)

    return {
        dataSource,
        headers,
        headerShow,
        currentDataSource,
        searchValue,
    }
})

export default connect(selector, actionCreator)(hot(module)(view))
