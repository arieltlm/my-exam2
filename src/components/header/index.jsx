/*
 */
import { Menu } from 'antd'
import { React, PropTypes, NavLink, withRouter } from 'framework/Util'
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
    }


    return (
        <div styleName="header" className="clearfix">
            <div className="pull-left app-title">
                {logoHref ? (
                    <a target="_blank" className="logo-href" rel="noopener noreferrer" href={logoHref}>
                        <span className="logo" />
                        <span className="app-name">test中心</span>
                    </a>
                ) : (
                    <>
                        <span className="logo" />
                        <span className="app-name">test中心</span>
                    </>
                )}
            </div>
            <div className="pull-left navigation">
                <Menu mode="horizontal" theme="dark" className="custom-header-nav">
                    <Menu.Item>
                        {resources?.map(item => (
                            <NavLink replace to={item.url} key={item.id} activeClassName="active">
                                <span className={`${item.icon} cona`} />
                                {item.cn || item.menuName}
                            </NavLink>
                        ))}
                    </Menu.Item>
                </Menu>
            </div>
            <div className="pull-right headrright">
                <UserDropDown username={username} logout={logoutFn} />
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
