import {
    React,
    PropTypes,
} from 'framework/Util'
// import {  } from 'antd'
import Job from '../job'
import './scss/index.scss'


const Stage = function ({
    title, 
    jobs,
    stageWidth
}) { 
    return (
        <div className="stage" style={{ width: stageWidth }}>
            <div className="title">{title}</div>
            {jobs.map((jobItem, index) => (
                <Job
                    key={jobItem.name} 
                    name={jobItem.name}
                    status={jobItem.status}
                    time={jobItem.time}
                    index={index}
                />
            ))}
        </div>
    )
}

Stage.propTypes = {
    title: PropTypes.string.isRequired,
    jobs: PropTypes.array.isRequired,
    stageWidth: PropTypes.number.isRequired,
}

// Stage.defaultProps = {
// 
// }

export default Stage
