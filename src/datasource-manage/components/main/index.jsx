/**
 * 功能: 数据源管理入口
 * 作者: tanglimei
 * 日期: 2020.02.03
 */
import {
    React,
    PureComponent,
} from 'framework/Util'
import HResize from '@/components/h-resize'
import DataSourceLeft from '../../container/left'
import DataSourceRight from '../../container/right'

import './scss/index.scss'

class DataSourceManageView extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            leftDivWidthInit: 100, // 左边div宽度
        }
        this.hresizeDiv = React.createRef()
    }

    componentDidMount() {
        this.resizeBroswer()
        window.addEventListener('resize', this.resizeBroswer)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeBroswer)
    }

    resizeBroswer = () => {
        const contentDivWidth = this.hresizeDiv.current.offsetWidth - 48
        this.setState({
            leftDivWidthInit: contentDivWidth / 2,
        })
    }

    render() {
        const { leftDivWidthInit } = this.state
        return (
            <div styleName="main-view" ref={this.hresizeDiv}>
                <HResize
                    leftDiv={<DataSourceLeft />}
                    rightDiv={<DataSourceRight />}
                    vNumInit={leftDivWidthInit}
                    vNumLeftLimit={400}
                    vNumRightLimit={400}
                />
            </div>
        )
    }
}

export default DataSourceManageView
