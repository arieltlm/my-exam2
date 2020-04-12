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
    id: 'pipeline',
    menuName: 'pipeline',
    menuId: 'pipeline',
    icon: 'cona-shujuyuanguanli',
    url: app.pipeline.path,
    // component: lazyload(import('@/datasource-manage/components/main'))
    component: lazyload(import('@/req-test/components/main'))
}]

const selector = createSelector([userInfo], store => {
    // const resources = store.get('resources').toJS()
    console.log(store)
    const resources = [{ id: 122, en: 'pipeline', cn: 'pipeline组件' }] 
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
