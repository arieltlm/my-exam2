/**
 * 功能: 原始表字段弹框
 * 作者: tanglimei
 * 日期: 2020.02.06
 */
import { connect, hot, createSelector } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import view from '../../components/right-origin-field-modal'

const getStateRight = state => state.dataSourceManage.right 

const selector = createSelector([getStateRight], storeDatasRight => {
    const headers = storeDatasRight.get('fieldHeaders').toJS()
    const headerShow = headers.filter(item => item.checked)
    return {
        headers,
        headerShow,
    }
})

export default connect(selector, actionCreator)(hot(module)(view))
