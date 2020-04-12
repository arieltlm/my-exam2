/**
 * 功能： loading视图
 * 作者：
 * 日期： 2018/3/27
 */

import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Loading from '../components'


const mapStateToProps = state => state.loading
const selector = createSelector([mapStateToProps], loadingState => ({
    ...loadingState
}))

export default connect(selector)(Loading)
