/**
 * 功能：错误边界
 * 作者：安超
 * 日期： 2019/7/15
 */

import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundaryFallbackComponent from '../errorboundary-fallbackcomponent'

class ErrorBoundary extends React.Component {
    constructor(props, context) {
        super(props, context)
        
        this.state = {
            error: null,
            info: null
        }
    }
    
    componentDidCatch(error, info) {
        const { onError } = this.props
        if (typeof onError === 'function') {
            onError.call(this, error, info ? info.componentStack : '')
        }
        
        this.setState({
            error,
            info
        })
    }
    
    render() {
        const { children, FallbackComponent } = this.props
        const { error, info } = this.state
        if (error !== null) {
            return (
                <FallbackComponent
                    componentStack={info ? info.componentStack : ''}
                    error={error}
                />
            )
        }
        
        return children
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.element,
    FallbackComponent: PropTypes.func,
    onError: PropTypes.func
}

ErrorBoundary.defaultProps = {
    children: null,
    FallbackComponent: ErrorBoundaryFallbackComponent,
    onError: (error, info) => { console.log('error=', error, 'info=', info) }
}

export default ErrorBoundary
