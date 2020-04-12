/**
 * 功能: 同步数据源
 * 作者: tanglimei
 * 日期: 2020.02.06
 */
import {
    React,
    PureComponent,
    PropTypes,
    classNames,
} from 'framework/Util'
import { Input, Tooltip, Checkbox, message } from 'antd'
import config from 'conf'
import dialog from 'dialog'
import FooterButton from '@/components/footer-button'
import SyncColumn from '../left-sync-column'
import './scss/index.scss'

const { Search } = Input
const { constant: { statusDic, DELETE_STATUS } } = config

class ModalSyncDataSource extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            searchVal: '', // 检索值
            searchValResult: '' // 检索最终值
        }
    }

    componentDidMount() {
        const { currentCreitToSyncData, getDataSourceTableList } = this.props


        if (currentCreitToSyncData){
            // 由新增跳转过来的请求表信息
            this.getSyncTables(currentCreitToSyncData.dataSourceName)
        } else {
            // 请求数据源列表
            getDataSourceTableList()
        }
    }

    getSyncTables = dataSourceName => {
        const { getSyncCurrentData } = this.props
        getSyncCurrentData({
            params: { dataSourceName }
        }).then(res => {
            if (res.statusCode === 200) {
                this.setState({ 
                    searchVal: '',
                })
            }
        })
    }

    // 切换当前数据源
    handleClick = currentDatas => {
        const { dataSourceName } = currentDatas
        this.getSyncTables(dataSourceName)
    }

    // 全选
    handleAllCheck = e => {
        console.log('e.target.checked :', e.target.checked)
        const { syncCurrentTables, setSyncTablesCheck } = this.props
        const syncCurrentTablesChecked = syncCurrentTables.filter(item => item.checked)
        const delListLen = syncCurrentTables.filter(item => item.status === DELETE_STATUS).length

        let changeTbList 

        if (syncCurrentTables.length > 16){
            changeTbList = syncCurrentTables.map((tbItem, index) => {
                // 已删除不可去掉
                if (tbItem.status === DELETE_STATUS){
                    return { 
                        ...tbItem, 
                        checked: true
                    }
                }
                // 选中个数不能超过16个,已经选中的少于16时为"全选“,已经选中的等于16时，为“取消全选”
                if (index < (16 - delListLen) && syncCurrentTablesChecked.length < 16){
                    return ({ 
                        ...tbItem, 
                        checked: true 
                    })
                }
                return ({ 
                    ...tbItem, 
                    checked: false 
                })
            })
            if (syncCurrentTablesChecked.length < 16){
                message.info('已选中16张表,最多可选中16张表')
            }
        } else {
            changeTbList = syncCurrentTables.map(tbItem => {
                if (tbItem.status === DELETE_STATUS){
                    return { 
                        ...tbItem, 
                        checked: true
                    }
                }
                return { 
                    ...tbItem, 
                    checked: e.target.checked 
                }
            })
        }
        
       
        setSyncTablesCheck(changeTbList)
    }

    // 选中表格
    handleCheck = (tbCheckId, e) => {
        const { syncCurrentTables, setSyncTablesCheck } = this.props
        const tbListCheckedLen = syncCurrentTables.filter(item => item.checked).length

        // 选中不能超过16
        if (e.target.checked && tbListCheckedLen === 16){
            message.warning('选中个数不能超过16个')
        } else {
            const changeTbList = syncCurrentTables.map(tbItem => (tbItem.tableId === tbCheckId 
                ? { ...tbItem, checked: e.target.checked } : { ...tbItem }))
           
            setSyncTablesCheck(changeTbList)
        }
    }

    // 检索数据表
    handleSearch= value => {
        this.setState({ 
            searchValResult: value
        })
    }

    handleChange = e => {
        this.setState({ 
            searchVal: e.target.value
        })
    }

    handleCancel = () => {
        const { getTableData } = this.props
        dialog.hide()
        getTableData()
        this.handleClearCurrentData()
    }

    // 清空当前列表
    handleClearCurrentData = () => {
        const { clearSyncCurrentData } = this.props
        clearSyncCurrentData()
    }

    handleSubmit=() => {
        const { syncDataSource, getTableData, syncCurrentTables, syncCurrentDatas } = this.props
        // 当前条数据
        const { dataSourceInfoId, dataSourceName } = syncCurrentDatas
        const tbListChecked = []
        
        syncCurrentTables.forEach(item => {
            if (item.checked) {
                tbListChecked.push({
                    tableName: item.tableName, 
                    tableId: item.tableId,
                    status: item.status
                })
            }
        })
        const reqData = {
            dataSourceInfoId,
            dataSourceName,
            tables: tbListChecked
        }
        syncDataSource({
            data: reqData
        }).then(res => {
            if (res.statusCode === 200){
                message.success(res.message)
                dialog.hide()
                this.handleClearCurrentData()
            } 
            getTableData()
        })
    }

    render() {
        const { searchVal, searchValResult } = this.state
        const { dataSource, syncCurrentTables, syncCurrentDatas, currentCreitToSyncData } = this.props

        const dataSourceList = currentCreitToSyncData ? [syncCurrentDatas] : dataSource

        const dataSourceInfoId = syncCurrentDatas?.dataSourceInfoId
        // 当前数据表选中项的长度
        const allCheckedlen = syncCurrentTables.filter(item => item.checked)?.length
        // 半全选的状态
        const indeterminate = allCheckedlen > 0 && syncCurrentTables.length > allCheckedlen
        // 是否全选
        const checkedAll = allCheckedlen === syncCurrentTables.length
        // 当前仅删除的选中项
        const nowTbListCheckedStatus = syncCurrentTables.filter(item => item.status === DELETE_STATUS)
        // 全是已删除的话,不可取消全选-disabled
        const checkedAllDis = nowTbListCheckedStatus.length === syncCurrentTables.length

        // 当前展示的
        const nowTbList = syncCurrentTables.filter(item => item.tableName.includes(searchValResult))
        
        return (
            <div styleName="sync-datasource">
                <div className="sync-content main-content-modal">
                    <div className="info-box">
                        <div className="title">选择数据源</div>
                        <ul className="list">
                            {dataSourceList.length > 0 ? dataSourceList.map(item => (
                                <li
                                    key={`datasource${item.dataSourceInfoId}`}
                                    role="presentation"
                                    className={classNames({ active: dataSourceInfoId === item.dataSourceInfoId })}
                                    onClick={() => this.handleClick(item)}
                                >
                                    <span className="cona cona-shujuyuan" />
                                    <Tooltip placement="topLeft" title={item.dataSourceName}>
                                        <span>{item.dataSourceName}</span>
                                    </Tooltip>
                                </li>
                            )) : (
                                <li className="no-data">暂无数据</li>
                            )}
                        </ul>
                    </div>
                    <SyncColumn
                        title="选择数据库"
                        key="database" 
                        iconName="cona-shujuku1"
                        text={syncCurrentDatas?.database}
                    />
                    {syncCurrentDatas.dataSourceType === 'oracle' && (
                        <SyncColumn
                            title="选择owner"
                            key="oracle"
                            iconName="cona-owenr"
                            text={syncCurrentDatas?.owner}
                        />
                    )}
                    {syncCurrentDatas.dataSourceType === 'pgsql' && (
                        <SyncColumn
                            title="选择schema"
                            key="pgsql" 
                            iconName="cona-schema"
                            text={syncCurrentDatas?.schema}
                        />
                    )}
                    <div className="info-box table-list">
                        <Search
                            allowClear
                            maxLength={32}
                            value={searchVal}
                            className="search-table"
                            placeholder="请输入搜索表名"
                            onChange={this.handleChange}
                            onSearch={this.handleSearch}
                        />
                        <div className="check-all">
                            <Checkbox
                                checked={checkedAll} 
                                onChange={this.handleAllCheck}
                                indeterminate={indeterminate}
                                disabled={checkedAllDis}
                            >全选
                            </Checkbox>
                            <div className="sync-tree-sel">
                                <span className="sync-tree-sel-label">已选择 </span>
                                <span className="sync-tree-sel-num">{allCheckedlen} / {syncCurrentTables.length}</span>
                            </div>
                        </div>
                        <ul className="checkbox-group">
                            {nowTbList?.map(tbItem => (
                                <li key={`tb${tbItem.tableId + tbItem.tableName}`}>
                                    <Checkbox
                                        checked={tbItem.checked}
                                        disabled={tbItem.disabled}
                                        onChange={e => this.handleCheck(tbItem.tableId, e)}
                                    >
                                        <span className="cona cona-shujubiao cona-data-table" />
                                        <Tooltip placement="topLeft" title={tbItem.tableName}>
                                            <span className="item-name">{tbItem.tableName}</span>
                                        </Tooltip>
                                    </Checkbox>
                                    <span className={`status ${statusDic[tbItem.status].classNa}`}>
                                        {statusDic[tbItem.status].text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {dataSourceInfoId && !syncCurrentDatas.conn && <div className="msg">连接失败，请检查数据源信息</div>}
                <FooterButton
                    handleSubmit={this.handleSubmit} 
                    handleCancel={this.handleCancel}
                    leftBtnText="暂不同步"
                    rightBtnText="同步"
                    ensureBtnDis={allCheckedlen < 1 || !syncCurrentDatas.conn}
                />
            </div>
        )
    }
}
/**
 * dataSource 数据源列表
 * syncCurrentDatas 当前条数据源库表信息
 * syncCurrentTables 当前条数据源的数据表列表
 * currentCreitToSyncData 由新增跳转过来的当前条数据
 * getTableData 获取数据源方法-左边表格
 */

ModalSyncDataSource.propTypes = {
    // store
    syncCurrentDatas: PropTypes.object,
    syncCurrentTables: PropTypes.array,
    dataSource: PropTypes.array.isRequired,
    // props
    currentCreitToSyncData: PropTypes.object,
    getTableData: PropTypes.func.isRequired,
    // actionCreator中
    getDataSourceTableList: PropTypes.func.isRequired,
    getSyncCurrentData: PropTypes.func.isRequired,
    syncDataSource: PropTypes.func.isRequired,
    setSyncTablesCheck: PropTypes.func.isRequired,
    clearSyncCurrentData: PropTypes.func.isRequired,
}

ModalSyncDataSource.defaultProps = {
    currentCreitToSyncData: null,
    syncCurrentDatas: null,
    syncCurrentTables: []
}

export default ModalSyncDataSource
