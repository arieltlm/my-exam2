/**
 * 功能: 模块功能
 * 作者： Deve
 * 日期：2018.10.16
 */
import { React, PureComponent, PropTypes, noop } from 'framework/Util'
import { Table } from 'antd'
import './scss/index.scss'

class CommonTable extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            currPageIndex: 1
        }
    }

    setNormaldata = data => {
        data.header.forEach(it => {
            const item = it
            const { key } = item
            item.dataIndex = key
            if (!data.notSort) {
                item.sorter = (a, b) => {
                    const num = a[key] > b[key] ? 1 : -1
                    return num
                }
            }
        })
        data.body.forEach((it, index) => {
            const item = it
            item.key = `数据列${index}`
        })
        return data
    }

    changeEvent = (pagination, filters, sorter) => {
        const { onChangeCB } = this.props
        onChangeCB(pagination, filters, sorter)
        this.setState({ currPageIndex: pagination.current })
    }
    

    render() {
        const { data, pageSize, rowSelection, scroll, showPage, currPage, total, paginationOptions, rowClassName, ...other } = this.props
        const { currPageIndex } = this.state
        const pageIndex = currPage < 1 ? currPageIndex : currPage
        const normalData = this.setNormaldata(data)
        const mRowSelection = rowSelection
        const pagination = showPage ? { pageSize, current: pageIndex, total, ...paginationOptions } : false
        return (
            <div styleName="tablebox-public-common">
                <Table
                    {...other}
                    columns={normalData.header}
                    rowSelection={mRowSelection}
                    dataSource={data.body}
                    pagination={pagination}
                    onChange={this.changeEvent}
                    scroll={scroll ? { ...scroll } : {}}
                    rowClassName={rowClassName}
                />
            </div>
        )
    }
}

CommonTable.propTypes = {
    onChangeCB: PropTypes.func,
    data: PropTypes.object.isRequired,
    pageSize: PropTypes.number,
    currPage: PropTypes.number,
    rowSelection: PropTypes.object,
    scroll: PropTypes.object,
    showPage: PropTypes.bool,
    total: PropTypes.number,
    paginationOptions: PropTypes.object,
    rowClassName: PropTypes.func
}

CommonTable.defaultProps = {
    pageSize: 30,
    currPage: 0,
    rowSelection: null,
    onChangeCB: noop,
    scroll: null,
    showPage: true,
    total: null,
    paginationOptions: null,
    rowClassName: noop
}

export default CommonTable
