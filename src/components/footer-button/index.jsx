/**
 * 功能：表单底部按钮
 * 作者：tlm
 * 日期：2019.09.27
 */
import { React, PropTypes, noop } from 'framework/Util'
import { Button } from 'antd'
import dialog from 'dialog'
import './scss/index.scss'

const FooterButton = function (props) {
    const { handleSubmit, handleCancel, leftBtnText, rightBtnText, ensureBtnDis } = props
    return (
        <div styleName="footer-button-common" className="dialog-footer-btn-group">
            <Button type="primary" onClick={handleSubmit} disabled={ensureBtnDis}>
                {rightBtnText}
            </Button>
            <Button onClick={handleCancel}>
                {leftBtnText}
            </Button>
        </div>
    )
}

FooterButton.propTypes = {
    handleSubmit: PropTypes.func,
    handleCancel: PropTypes.func,
    leftBtnText: PropTypes.string,
    rightBtnText: PropTypes.string,
    ensureBtnDis: PropTypes.bool,
}

FooterButton.defaultProps = {
    handleSubmit: noop,
    handleCancel: () => { dialog.hide() },
    leftBtnText: '取消',
    rightBtnText: '确定',
    ensureBtnDis: false
}

export default FooterButton
