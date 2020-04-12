/**
 * 功能：组件发生错误时显示界面
 * 作者：安超
 * 日期： 2019/7/15
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import './scss/index.scss'

const ErrorBoundaryFallbackComponent = function ({ componentStack, error }) {
    const showError = function () {
        Modal.error({
            title: '崩溃信息',
            content: `错误：${error.toString()}; 原因:${componentStack}`
        })
    }
    
    return (
        <div styleName="errorboundary-common">
            <div className="error-pic" role="presentation" onClick={showError} />
            <div className="text-center error-text">抱歉，您访问的页面崩溃了！</div>
        </div>
    )
}

ErrorBoundaryFallbackComponent.propTypes = {
    componentStack: PropTypes.string,
    error: PropTypes.object
}

ErrorBoundaryFallbackComponent.defaultProps = {
    componentStack: '组件接收到非法数据！',
    error: new Error('不合理的处理')
}

export default ErrorBoundaryFallbackComponent
