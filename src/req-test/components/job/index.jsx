import {
    React,
    PropTypes,
    moment
} from 'framework/Util'
import { Icon } from 'antd'
import './scss/index.scss'

const Job = function ({ 
    name,
    status,
    time,
    index
}) { 
    return (
        <div className={`job job${index}`}>
            <div className="status">
                {
                    status === 'success' 
                        ? <Icon type="check-circle" className="icon-success" /> 
                        : (
                            <Icon type="close-circle" className="icon-fail" />
                        )
                }
            </div>
            <div className="name">{name}</div>
            <div className="time">{moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
    )
}

Job.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}

// Job.defaultProps = {
// 
// }

export default Job
