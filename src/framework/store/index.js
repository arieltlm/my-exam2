/**
 * Created by anchao on 2015/12/7.
 */

import { applyMiddleware, combineReducers, createStore } from 'redux'
import Immutable from 'immutable'
import { routerReducer } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import dialog from '../dialog/reducers'
import loading from '../loading/reducers'
import reducers from '../../conf/reducers'

// state日志
const logger = createLogger({
    stateTransformer: state => Immutable.fromJS(state).toJS(),
    collapsed: true
})

const store = createStore(
    combineReducers({
        dialog,
        loading,
        ...reducers,
        routing: routerReducer
    }),
    process.env.NODE_ENV === 'production' ? applyMiddleware(thunkMiddleware) : applyMiddleware(thunkMiddleware, logger)
)

export default store
