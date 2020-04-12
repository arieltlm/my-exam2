/**
 * 功能: 数据源信息right-top
 * 作者: tanglimei
 * 日期: 2020.02.04
 */
import {
    React,
    PropTypes,
} from 'framework/Util'
import { Descriptions } from 'antd'
import './scss/index.scss'


const RightTopInfo = function ({
    currentDataSource
}) {
    return (
        <div styleName="right-top-info">
            <Descriptions column={2}>
                <Descriptions.Item label="数据源id">
                    {currentDataSource.dataSourceInfoId}
                </Descriptions.Item>
                <Descriptions.Item label="数据源类型">
                    {currentDataSource.dataSourceType}
                </Descriptions.Item>
                <Descriptions.Item label="数据源名称">
                    {currentDataSource.dataSourceName}
                </Descriptions.Item>
                <Descriptions.Item label="状态">
                    { 
                        currentDataSource.status === 1 
        && <span className="success">连接成功</span> 
                    }
                    {
                        currentDataSource.status === 0 
        && <span className="error">连接失败</span>
                    }
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

RightTopInfo.propTypes = {
    currentDataSource: PropTypes.object.isRequired
}

export default RightTopInfo
