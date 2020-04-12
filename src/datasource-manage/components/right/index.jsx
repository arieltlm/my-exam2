/**
 * 功能: 数据源管理right
 * 作者: tanglimei
 * 日期: 2020.02.04
 */
import {
    React,
    PropTypes,
} from 'framework/Util'
// import {  } from 'antd'
import Rightbottom from '../../container/right-bottom'
import RightTop from '../right-top'
import './scss/index.scss'

function dataSourceRight({
    currentDataSource
}){
    return (
        <div styleName="datasource-right">
            <div className="right-resize-btn" />
            <RightTop currentDataSource={currentDataSource} />
            <Rightbottom />
        </div>
    )
}

dataSourceRight.propTypes = {
    currentDataSource: PropTypes.object.isRequired
}


export default dataSourceRight
