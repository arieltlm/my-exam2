/**
 * Created by anchao on 2016/6/29.
 */
import * as actionCreator from './actions/actionCreator'
import store from '../store'

const loading = {
    show() {
        store.dispatch(actionCreator.showLoading())

        return this
    },

    hide() {
        store.dispatch(actionCreator.hideLoading())

        return this
    },
    
    getLoadingStatus() {
        return store.getState().loading.show
    },

    increaseInvoke() {
        store.dispatch(actionCreator.increaseInvoke())

        return this
    },

    decreaseInvoke() {
        store.dispatch(actionCreator.decreaseInvoke())

        return this
    },

    getInvokeCount() {
        return store.getState().loading.invokeCount
    }
}

export default loading
