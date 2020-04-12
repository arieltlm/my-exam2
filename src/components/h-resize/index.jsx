/**
 * 功能: 可调整宽的Div
 * 作者： tlm
 * 日期：2019-09-24
 */
import { React, PropTypes, PureComponent, _, classNames, noop } from 'framework/Util'

import './scss/index.scss'

class ResizeDiv extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isVResize: false,
            isResizeStart: false,
            vNum: props.vNumInit
        }

        this.resizeOffsetInfo = {
            clientTop: 0,
            clientLeft: 0
        }
        this.resizeDivRef = React.createRef()
    }

    componentDidMount() {
        this.initResizeInfo()
        window.addEventListener('resize', _.debounce(this.initResizeInfo, 500))
    }

    componentWillUnmount() {
        // window.removeEventListener('resize', _.debounce(this.initResizeInfo, 500))
        window.removeEventListener('resize', this.initResizeInfo)
    }

    /**
     * 获取元素的偏移信息
     */
    getEleOffset = ele => {
        let clientTop = ele.offsetTop
        let clientLeft = ele.offsetLeft
        let current = ele.offsetParent
        while (current !== null) {
            clientTop += current.offsetTop
            clientLeft += current.offsetLeft
            current = current.offsetParent
        }
        return {
            clientTop,
            clientLeft,
            width: ele.offsetWidth
        }
    };

    /**
     * 初始化resize信息
     */
    initResizeInfo = () => {
        const hEle = this.resizeDivRef.current
        if (hEle) {
            this.resizeOffsetInfo = this.getEleOffset(hEle)
            this.containerWidth = this.resizeOffsetInfo.width
        }

        const { onChangeFinish } = this.props
        onChangeFinish()
    };

    /**
     * 开始拖动垂直调整块
     */
    vResizeDown = () => {
        const { isResizeStart } = this.state
        const { vNumInit } = this.props

        if (!isResizeStart) {
            this.setState({
                vNum: vNumInit
            })
        }
        this.setState({
            isVResize: true,
            isResizeStart: true
        })
    };

    /**
     * 拖动垂直调整块
     */
    vResizeOver = e => {
        const { isVResize, vNum } = this.state
        const { vNumLeftLimit, vNumRightLimit } = this.props
        const { containerWidth } = this
        if (isVResize && vNum >= vNumLeftLimit && containerWidth - vNum >= vNumRightLimit) {
            let newValue = e.clientX - this.resizeOffsetInfo.clientLeft
            // 左边最小宽度
            if (newValue < vNumLeftLimit) {
                newValue = vNumLeftLimit
            }
            // 右边最小宽度
            if (containerWidth - newValue < vNumRightLimit) {
                newValue = containerWidth - vNumRightLimit
            }
            if (newValue > containerWidth - vNumLeftLimit) {
                newValue = containerWidth - vNumLeftLimit
            }
            this.setState({
                vNum: newValue
            })
        }
    };

    /**
     * 只要鼠标松开或者离开区域，那么就停止resize
     */
    stopResize = () => {
        this.setState({
            isVResize: false
        })

        const { onChangeFinish } = this.props
        onChangeFinish()
    };

    render() {
        const { isVResize, vNum, isResizeStart } = this.state
        const { vNumInit, leftDiv, rightDiv, offsetLeftResize } = this.props
        const vNumVal = isResizeStart ? vNum : vNumInit
        const hCursor = isVResize ? 'col-resize' : 'default'
        return (
            <div
                styleName="hresize-container"
                role="presentation"
                ref={this.resizeDivRef}
                onMouseUp={this.stopResize}
                onMouseMove={this.vResizeOver}
                onMouseLeave={this.stopResize}
            >
                <div
                    style={{ width: vNumVal,
                        cursor: hCursor,
                    }}
                    className="hresize-left"
                >
                    {leftDiv}
                </div>
                <div
                    role="presentation"
                    style={{ left: vNumVal - offsetLeftResize, }}
                    draggable={false}
                    onMouseDown={this.vResizeDown}
                    className={classNames({ 'mouse-resize': isVResize }, 'h-resize')}
                />
                <div
                    style={{ left: vNumVal + 24,
                        cursor: hCursor,
                    }}
                    className="hresize-right"
                >
                    {rightDiv}
                </div>
            </div>
        )
    }
}

/**
 * leftDiv 左边元素
 * rightDiv 右边元素
 * vNumInit 左边元素的初始宽度
 * vNumLeftLimit 左边最小宽度
 * vNumRightLimit 右边最小宽度
 * offsetLeftResize 中间拖拽的线向左偏移的距离
 */
ResizeDiv.propTypes = {
    vNumInit: PropTypes.number.isRequired,
    leftDiv: PropTypes.element.isRequired,
    rightDiv: PropTypes.element.isRequired,
    vNumLeftLimit: PropTypes.number,
    vNumRightLimit: PropTypes.number,
    offsetLeftResize: PropTypes.number,
    onChangeFinish: PropTypes.func
}
ResizeDiv.defaultProps = {
    vNumLeftLimit: 30,
    vNumRightLimit: 30,
    offsetLeftResize: 2,
    onChangeFinish: noop
}

export default ResizeDiv
