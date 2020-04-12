/**
 * 功能: 同步数据源数据源-库-表列
 * 作者: tanglimei
 * 日期: 2020.02.07
 */
import {
    React,
    PropTypes,
} from 'framework/Util'
import { Tooltip } from 'antd'

const SyncColumn = function ({ 
    iconName,
    title, 
    text, 
}) { 
    return (
        <div className="info-box">
            <div className="title">{title}</div>
            <ul className="list">
                {text ? (
                    <li className="active">
                        <span className={`cona ${iconName}`} />
                        <Tooltip placement="topLeft" title={text}>
                            <span>{text}</span>
                        </Tooltip>
                    </li>
                ) : (
                    <li className="no-data">暂无数据</li>
                )}
            </ul>
        </div>
    )
}

SyncColumn.propTypes = {
    text: PropTypes.string, 
    iconName: PropTypes.string,
    title: PropTypes.string,
}
SyncColumn.defaultProps = {
    text: '', 
    iconName: '', 
    title: ''
}

export default SyncColumn
