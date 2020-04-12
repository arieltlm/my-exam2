/**
 * 功能: 弹框提示信息
 * 作者: 唐李梅
 * 日期: 2020.02.07
 */
import { React } from 'framework/Util'
import { Button, Icon, Divider } from 'antd'
import dialog from 'dialog'


import './scss/index.scss'

function MessageModal(){
    return (
        <div styleName="message-info" className="clearfix">
            <div className="message-status message-error">
                <Icon type="exclamation-circle" theme="filled" />
                <span>正在同步中, 请稍后进行查看</span>
            </div> 
            <Divider />
            <Button type="primary" onClick={() => dialog.hide()}>确定</Button>
        </div>
    )
}

export default MessageModal
