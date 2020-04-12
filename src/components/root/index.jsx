/**
 * 功能：根组件
 * 日期： 2016/3/26
 */

import { lazyload } from 'framework'
import {
    React,
    Route,
    Redirect,
    Switch,
    hot,
    ErrorBoundary
} from 'framework/Util'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import config from 'conf'
import Dialog from 'framework/dialog/container'
import Loading from 'framework/loading/container'
import './scss/index.scss'

const { url } = config
const MainAppView = lazyload(import('@/container/app'))
const NotFindView = lazyload(import('@/components/error'))

const RootRoutesView = function (){
    return (
        <ConfigProvider locale={zhCN}>
            <ErrorBoundary>
                <div styleName="containerchild">
                    <Switch>
                        <Route path={url.root} exact render={() => <Redirect to={url.app.root.path} />} />
                        {/* <Route path={url.login.path} component={lazyload(import('@/login/container'))} /> */}
                        <Route path={url.app.root.path} component={MainAppView} />
                        <Route component={NotFindView} />
                    </Switch>
                    <Dialog />
                    <Loading />
                </div>
            </ErrorBoundary>
        </ConfigProvider>
    )
}

export default hot(module)(RootRoutesView)
