import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Loading(props) {
    const {
        show
    } = props

    return (
        <div
            className={classNames('loadingdiv', { hide: !show })}
        >
            <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw" /></div>
        </div>
    )
}

/*
  @show: 是否显示loading画面
 */

Loading.propTypes = {
    show: PropTypes.bool
}

Loading.defaultProps = {
    show: false
}

export default Loading
