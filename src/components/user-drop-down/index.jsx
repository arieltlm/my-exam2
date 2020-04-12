/**
 * 功能: header右边用户等
 * 作者: tanglimei
 * 日期: 2020.02.21
 */
import {
    React,
    PropTypes,
} from 'framework/Util'
import UserDropDown from 'user-drop-down-fe-ml'


const HeaderRight = function ({ 
    username,
    logout,
}) { 
    const handleClick = ({ key }) => {
        if (key === 'logout'){
            logout()
        } 
    }
    
    const userInfo = [
        {
            key: 'user',
            label: username,
            icon: 'user',
            disabled: true,
            isDivider: true
        },
        {
            key: 'logout',
            label: '退出',
            icon: 'login'
        }
    ]
    return (
        <UserDropDown userInfo={userInfo} handleClick={handleClick} />
    )
}

HeaderRight.propTypes = {
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
}

// HeaderRight.defaultProps = {
// 
// }

export default HeaderRight
