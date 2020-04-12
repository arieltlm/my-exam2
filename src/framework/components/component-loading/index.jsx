/**
 * 功能：组件加载间隙动画
 * 作者：安超
 * 日期： 2018/5/3
 */

import React from 'react'
import PropTypes from 'prop-types'

export default function Loading(props) {
    const {
        isLoading, pastDelay, error, timedOut 
    } = props
    if (isLoading) {
        if (timedOut) {
            return <div>Loader timed out!</div>
        }

        if (pastDelay) {
            return <div className="loadingdiv"><div><i className="fa fa-spinner fa-pulse fa-3x fa-fw" /></div></div>
        }

        return null
    }

    if (error) {
        console.log(error)
        return <div>Error! Component failed to load</div>
    }

    return null
}
Loading.defaultProps = {
    error: null
}

Loading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    pastDelay: PropTypes.bool.isRequired,
    timedOut: PropTypes.bool.isRequired,
    error: PropTypes.object
}
