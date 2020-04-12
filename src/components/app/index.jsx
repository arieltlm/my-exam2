/**
 * 功能：受限组件入口
 * 作者：安超
 * 日期： 2018/3/19
 */
import {
    React,
    PureComponent,
    PropTypes,
    Route,
    Redirect,
    Switch
} from 'framework/Util'
import ErrorPage from 'kg-error-page-fe-ml'
import Header from '../header'
import './scss/index.scss'

class App extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            loadedUserInfo: false,
            username: '',
            tenantConfig: ''
        }
    }

    componentDidMount() {
        const { getUserInfo } = this.props
        // 暂时隐去登陆
        getUserInfo()
            .then(res => {
                const { statusCode, data: { username, tenantConfig } } = res
                if (statusCode === 200 || statusCode === 403){
                    this.setState({
                        username,
                        tenantConfig,
                        loadedUserInfo: true,
                    })
                }
            })
    }

    render() {
        const { match: { url }, logout, navModules } = this.props
        const { loadedUserInfo, username, tenantConfig } = this.state
        let logoHref = ''

        try {
            logoHref = tenantConfig ? JSON.parse(tenantConfig)?.portal : ''
        } catch (err){
            console.log(err)
        }
        if (loadedUserInfo) {
            // 暂时隐去登陆
            // if (username.length === 0) {
            //     return null
            // }
            return (
                <div styleName="chief">
                    <Header
                        username={username}
                        logout={logout}
                        resources={navModules}
                        logoHref={logoHref}
                    />
                    { navModules.length > 0 
                        ? (
                            <Switch>
                                {navModules.map(item => (
                                    <Route key={item.id} path={item.url} component={item.component} />
                                ))}
                            
                                <Route path={url} render={() => <Redirect to={navModules[0]?.url} />} />
                            </Switch>
                        ) : (
                            <ErrorPage />
                        )}
                </div>
            )
        }

        return <div />
    }
}

App.propTypes = {
    match: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    navModules: PropTypes.array.isRequired,
}

export default App
