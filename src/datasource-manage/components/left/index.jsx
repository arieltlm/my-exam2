/**
 * 功能: 数据源管理left
 * 作者: tanglimei
 * 日期: 2020.02.04
 */
import {
    React,
    PureComponent,
    PropTypes,
} from 'framework/Util'
import dialog from 'dialog'
import config from 'conf'
import TableHeaderSel from '@/components/table-header-change'
import TableTransfer from '@/components/table-transfer'
import { Button, Icon, Tooltip } from 'antd'
import ModalCreditDataSource from '../../container/left-credit-modal'
import ModalSyncDataSource from '../../container/left-sync-modal'

import './scss/index.scss'

const { 
    constant: {
        componentHeight: {
            headerHg, contentPd, titleBoxHg, btnGroupHg, tableHeaderHg, contentXsPd
        } 
    } 
} = config


class dataSourceLeft extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            currentDataSourceId: '',
            scrollY: 0,
        }
    }

    componentDidMount() {
        const { getDataSourceType } = this.props
        // 获取数据源类型列表
        getDataSourceType()
        this.getTableList()
        this.handleWindowResize()
        window.addEventListener('resize', this.handleWindowResize)
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize)
    }

    handleWindowResize = () => {
        this.setState({ 
            scrollY: Math.max(100, document.body.clientHeight - headerHg - contentXsPd
                - contentPd - titleBoxHg - btnGroupHg - tableHeaderHg)
        })
    }

    getTableList = () => {
        const { getDataSourceTableList } = this.props
        getDataSourceTableList()
            .then(res => {
                if (res.statusCode === 200){
                    const { data: { dataSource } } = res
                    const dataSourceInfoId = dataSource[0]?.dataSourceInfoId
                    // 请求右边原始表表格
                    this.getOriginTableList(dataSourceInfoId)
                }
            })
    }

    // 获取原始表字段列表
    getOriginTableList = dataSourceInfoId => {
        const { getOriginTableList, setSearchValue } = this.props
        // 清空检索信息
        setSearchValue('')

        this.setState({
            currentDataSourceId: dataSourceInfoId
        }, () => {
            getOriginTableList({
                params: { 
                    dataSourceInfoId,
                    keyword: '',
                }
            })
        })
    }

    // 新增数据源
    handleCreate = () => {
        dialog.open({
            title: '新增数据源',
            width: 664,
            customClass: 'credit-datasource',
            content: <ModalCreditDataSource 
                getTableData={this.getTableList}
            />
        })
    }

    // 编辑数据源
    handleEdit =record => {
        dialog.open({
            title: '修改数据源',
            width: 664,
            customClass: 'credit-datasource',
            content: <ModalCreditDataSource 
                record={record}
                getTableData={this.getTableList}
                editFlag
            />
        })
    }

    // 同步数据源
    handleSync = () => {
        const { clearSyncCurrentData } = this.props
        dialog.open({
            title: '同步数据源',
            width: 980,
            content: <ModalSyncDataSource getTableData={this.getTableList} />,
            cancel: () => {
                dialog.hide()
                this.getTableList()
                clearSyncCurrentData()
            }
        })
    }

    // 数据源名称联动右边信息
    handleClickName = record => {
        const { setCurrentDataSource } = this.props
        const { dataSourceInfoId } = record
        setCurrentDataSource(record)
        this.getOriginTableList(dataSourceInfoId)
    }

    formatHeader = () => {
        const { headerShow } = this.props
       
        const cols = headerShow.map(item => {
            // 数据源名称可点击联动右边
            if (item.en === 'dataSourceName'){
                return {
                    ...item,
                    render: (text, record) => (
                        <Tooltip placement="topLeft" title={text}>
                            <Button type="link" className="click-btn" onClick={() => this.handleClickName(record)}>
                                {text}
                            </Button>
                        </Tooltip>
                    )
                }
            }
            // 状态对应
            if (item.en === 'status') {
                return {
                    ...item,
                    render: text => (
                        text === 1 ? (
                            <span className="status-link success">
                                <Icon type="check-circle" theme="filled" />
                                连接成功
                            </span>
                        ) : (
                            <span className="status-link error">
                                <Icon type="close-circle" theme="filled" />
                                连接失败
                            </span>
                        )
                    )
                }
            }
            // 状态对应
            if (item.en === 'password') {
                return {
                    ...item,
                    render: () => '******'
                }
            }

            return { ...item }
        })
        
        cols.push({
            cn: '操作',
            en: 'opera',
            fixed: 'right',
            render: (text, record) => (
                <Button type="link" onClick={() => this.handleEdit(record)}>编辑</Button>
            )
        })

        return cols
    }
    

    render() {
        const { 
            headers, 
            setDataSourceTableHeader, 
            changeTableHeader, 
            dataSource, 
        } = this.props

        const { currentDataSourceId, scrollY } = this.state

        const tableInfo = {
            dataSource,
            headers: this.formatHeader(),
            showPage: false,
            noShowHeaderDesc: true,
            scroll: { x: 1400, y: scrollY },
            rowClassName: record => (record.dataSourceInfoId === currentDataSourceId ? 'highlight' : '')
        }
        return (
            <div styleName="datasource-left">
                <div className="left-resize-btn" />
                <div className="title-box">数据源</div>
                <div className="content-box">
                    <div className="btn-groups">
                        <Button type="primary" onClick={this.handleCreate}>新增数据源</Button>
                        <Button type="primary" onClick={this.handleSync}>同步数据源</Button>
                        <TableHeaderSel
                            headers={headers} 
                            setTableHeaders={setDataSourceTableHeader}
                            changeTableHeader={changeTableHeader}
                        />
                    </div>
                    <div className="table-box">
                        <TableTransfer {...tableInfo} />
                    </div>
                </div>
            </div>
        )
    }
}

dataSourceLeft.propTypes = {
    getDataSourceTableList: PropTypes.func.isRequired,
    changeTableHeader: PropTypes.func.isRequired,
    setDataSourceTableHeader: PropTypes.func.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    getDataSourceType: PropTypes.func.isRequired,
    getOriginTableList: PropTypes.func.isRequired,
    setCurrentDataSource: PropTypes.func.isRequired,
    clearSyncCurrentData: PropTypes.func.isRequired,
    // store中
    headers: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    headerShow: PropTypes.array.isRequired,
}


export default dataSourceLeft
