/**
 * 功能：登录容器
 * 日期：2018/7/4
 */

import { connect, hot } from 'framework/Util'
import actionCreator from '../actions/actionCreator'
import Login from '../components/login'

export default connect(() => ({}), actionCreator)(hot(module)(Login))
