/*
 * Created by anchao on 2016/6/29.
 */
import { Menu } from 'antd'
import { React, PropTypes, NavLink, withRouter } from 'framework/Util'
// import config from 'conf'
// import dialog from 'dialog'
import UserDropDown from '../user-drop-down'
import './scss/index.scss'

const Header = function ({ 
    username, 
    logout,
    resources,
    logoHref,
}) {
    const logoutFn = () => {
        logout()
        // .then(res => {
        //     if (res.statusCode === 200) {
        //         history.replace(config.url.login.path)
        //     } else {
        //         dialog.alert({
        //             infoType: 'error',
        //             content: <div>{res.message}</div>
        //         })
        //     }
        // })
    }


    return (
        <div styleName="header" className="clearfix">
            <div className="pull-left app-title">
                {logoHref ? (
                    <a target="_blank" className="logo-href" rel="noopener noreferrer" href={logoHref}>
                        <span className="logo cona-logo cona" />
                        <span className="app-name">知识中心</span>  
                    </a>
                ) : (
                    <>
                        <span className="logo cona-logo cona" />
                        <span className="app-name">知识中心</span>  
                    </>
                )}
            </div>
            <div className="pull-left navigation">
                <Menu mode="horizontal" theme="dark" className="custom-header-nav">
                    <Menu.Item>
                        {resources?.map(item => (
                            <NavLink
                                replace
                                to={item.url}
                                key={item.id}
                                activeClassName="active"
                            ><span className={`${item.icon} cona`} />
                                {item.cn || item.menuName}
                            </NavLink>
                        ))}
                    </Menu.Item>
                </Menu>
            </div>
            <div className="pull-right headrright">
                <UserDropDown
                    username={username}
                    logout={logoutFn}
                />
            </div>
        </div>
    )
}

Header.propTypes = {
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    resources: PropTypes.array.isRequired,
    logoHref: PropTypes.string.isRequired,
}

export default withRouter(Header)
