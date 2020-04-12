/**
 * 功能：表格表头选择
 * 作者：tlm
 * 日期：2019.07.25
 */
import { React, PureComponent, PropTypes, noop, withRouter } from 'framework/Util'
import { Dropdown, Checkbox, Icon, Button } from 'antd'
import './scss/index.scss'

class TableHeaderSel extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            dropdownVisible: false
        }
    }

    submitChangeChecked = newHeaders => {
        const { setTableHeaders, changeTableHeader } = this.props
        changeTableHeader({ 
            data: { 
                data: newHeaders
            } 
        })
        setTableHeaders(newHeaders)
    }

    onCheckAllChange = e => {
        const { headers } = this.props
        const newHeaders = []
        headers.forEach(item => {
            const newItems = { 
                ...item, 
                checked: e.target.checked 
            }
            newHeaders.push(newItems)
        })
        this.submitChangeChecked(newHeaders)
    }

    onChanges = (index, e) => {
        const { headers } = this.props
        const newHeaders = [...headers]
        newHeaders[index].checked = e.target.checked 
        this.submitChangeChecked(newHeaders)
    }

    menu = () => {
        const { headers, hideField } = this.props
        const filterLen = headers.filter(cur => cur.checked).length
        const checkAll = filterLen === headers.length
        const indeterminate = filterLen > 0 && filterLen < headers.length
        return (
            <div className="check-header">
                <div className="check-all">
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={checkAll}
                    >
                        全选
                    </Checkbox>
                </div>
                {headers.map((item, index) => (
                    !hideField.includes(item.en)
                    && (
                        <Checkbox
                            checked={item.checked}
                            key={index}
                            onChange={e => this.onChanges(index, e)}
                        >{item.cn}
                        </Checkbox>
                    )
                ))}
                
            </div>
        )
    }

    handleDropdownButtonVisibleChange = visible => {
        this.setState({ dropdownVisible: visible })
    }

    render() {
        const { headerTitle } = this.props
        const { dropdownVisible } = this.state
        return (
            <div styleName="table-header-sel">
                <Dropdown
                    visible={dropdownVisible}
                    overlay={this.menu()} 
                    icon={<Icon type="down" />} 
                    trigger={['click']}
                    placement="bottomRight"
                    onVisibleChange={this.handleDropdownButtonVisibleChange}
                >
                    <Button>
                        {
                            headerTitle
                        }
                        <Icon type="caret-down" />
                    </Button>
                </Dropdown>
            </div>
        )
    }
}

/**
 * headers 表头数据
 * headerTitle button文字
 * setTableHeaders 设置表头
 * changeTableHeader 设置表头请求
 * hideField 不显示字段列表
 */
TableHeaderSel.propTypes = {
    headers: PropTypes.array,
    headerTitle: PropTypes.node,
    setTableHeaders: PropTypes.func,
    changeTableHeader: PropTypes.func,
    hideField: PropTypes.array,
}
TableHeaderSel.defaultProps = {
    headers: [],
    headerTitle: '显示字段',
    setTableHeaders: noop,
    changeTableHeader: noop,
    hideField: [],
}
export default withRouter(TableHeaderSel)
