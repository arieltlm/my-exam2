/**
 * Created by anchao on 2016/6/29.
 */
import { createAction } from 'redux-actions'
import actionTypes from './actionTypes'

const actionCreator = {
    showDialog: createAction(actionTypes.SHOWDIALOG_COMMON),
    hideDialog: createAction(actionTypes.HIDEDIALOG_COMMON),
    setFooter: createAction(actionTypes.SETFOOTER_COMMON)
}

export default actionCreator
