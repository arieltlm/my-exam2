/**
 * 功能: 测试连接的状态
 * 作者: tanglimei
 * 日期: 2020.02.05
 */
import {
    React,
    PropTypes,
} from 'framework/Util'
import { Icon } from 'antd'
import './scss/index.scss'

const LinkStatus = function ({ 
    linkStatus
}) { 
    switch (linkStatus) {
    case 'success':
        return (
            <div className="test-link-text success">
                <Icon type="check-circle" theme="filled" />
                <span>恭喜您，连接成功</span>
            </div>
        )
    case 'error': 
        return (
            <div className="test-link-text error">
                <Icon type="close-circle" theme="filled" />
                <span>连接失败，请检查信息是否有误。</span>
            </div>
        )
    case 'runing': 
        return (
            <div className="test-link-text runing">
                <Icon type="info-circle" theme="filled" />
                <span>连接测试中,请稍等...</span>
            </div>
        )
    default:
        return (
            <div className="test-link-text wait">
                <Icon type="exclamation-circle" theme="filled" />
                <span>待测试，请完善信息进行测试连接</span>
            </div>
        )
    }
}

LinkStatus.propTypes = {
    linkStatus: PropTypes.string
}

LinkStatus.defaultProps = {
    linkStatus: 'wait'
}

export default LinkStatus
