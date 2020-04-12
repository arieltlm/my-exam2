/**
 * Created by anchao on 2016/7/26.
 */
import {
    createSelector,
    connect,
    hot
} from 'framework/Util'
import { lazyload } from 'framework'
import config from 'conf'
import actionCreator from '@/login/actions/actionCreator'
import App from '../../components/app'

const userInfo = state => state.login

const { url: { app } } = config

const appUrls = [{
    id: 'datasource',
    menuName: '数据源管理',
    menuId: 'datasource',
    icon: 'cona-shujuyuanguanli',
    url: app.datasourceManage.path,
    // component: lazyload(import('@/datasource-manage/components/main'))
    component: lazyload(import('@/req-test/components/main'))
}]

const selector = createSelector([userInfo], store => {
    const resources = store.get('resources').toJS()
    const navModules = []
    appUrls.forEach(appItem => {
        const it = resources.find(item => item.en === appItem.menuId)
        if (it){
            navModules.push(appItem)
        }
    })
    return ({
        navModules
    })
})

export default connect(selector, actionCreator)(hot(module)(App))
