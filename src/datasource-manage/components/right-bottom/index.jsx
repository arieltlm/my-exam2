/**
 * 功能: 数据源管理right
 * 作者: tanglimei
 * 日期: 2020.02.04
 */
import {
    React,
    PureComponent,
    PropTypes,
} from 'framework/Util'
import { Button, Input, Tooltip } from 'antd'
import dialog from 'dialog'
import config from 'conf'
import TableTransfer from '@/components/table-transfer'
import TableHeaderSel from '@/components/table-header-change'
import OriginFieldModal from '../../container/right-origin-field-modal'
import './scss/index.scss'

const { Search } = Input

const { 
    constant: {
        componentHeight: {
            headerHg, contentPd, titleBoxHg, btnGroupHg, tableHeaderHg, contentXsPd
        } 
    } 
} = config

class RightOriginTable extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            scrollY: 0,
        }
    }

    componentDidMount() {
        this.handleWindowResize()
        window.addEventListener('resize', this.handleWindowResize)
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize)
    }

    handleWindowResize = () => {
        const rightTopHeight = 88
        
        this.setState({ 
            scrollY: Math.max(100, document.body.clientHeight - headerHg - contentXsPd
                - contentPd - titleBoxHg - btnGroupHg - tableHeaderHg - rightTopHeight - 16),
        })
    }

    // 获取原始表列表
    getTableList = searchValue => {
        const { 
            currentDataSource: { 
                dataSourceInfoId 
            }, 
            getOriginTableList 
        } = this.props
        getOriginTableList({
            params: { 
                dataSourceInfoId,
                keyword: searchValue,
            }
        })
    }

    // search输入框内容可控change
    handleChange = e => {
        const { setSearchValue } = this.props
        setSearchValue(e.target.value)
    }

    // 检索
    handleSearch = value => {
        this.getTableList(value)
    }


    handleClickName = record => {
        const { tableId } = record
        dialog.open({
            title: '原始表字段',
            width: 968,
            content: <OriginFieldModal tableId={tableId} />
        })
    }


    formatHeader = () => {
        const { headerShow } = this.props
       
        const cols = headerShow.map(item => {
            if (item.en === 'tableId'){
                // 增加百分比来解决火狐错位问题
                return { ...item, width: '10%' }
            }
            // 原始表名称可点击
            if (item.en === 'tableNameEn'){
                return {
                    ...item,
                    width: '20%',
                    render: (text, record) => (
                        <Tooltip placement="topLeft" title={text}>
                            <Button type="link" className="click-btn" onClick={() => this.handleClickName(record)}>
                                {text}
                            </Button>
                        </Tooltip>

                    )
                }
            }
            return { ...item, width: '20%' }
        })
        
        return cols
    }

    render() {
        const { 
            headers, 
            setOriginTableHeader, 
            changeTableHeader, 
            dataSource, 
            searchValue,
        } = this.props

        const { scrollY } = this.state
        

        const tableInfo = {
            dataSource,
            headers: this.formatHeader(),
            showPage: false,
            noShowHeaderDesc: true,
            scroll: { x: 500, y: scrollY },
        }
        return (
            <div styleName="right-origin-table">
                <div className="title-box">原始表</div>
                <div className="content-box">
                    <div className="btn-groups">
                        <Search
                            allowClear
                            value={searchValue}
                            placeholder="请输入搜索关键字"
                            onSearch={this.handleSearch}
                            onChange={this.handleChange}
                            style={{ width: 200 }}
                            maxLength={32}
                        />
                        <TableHeaderSel
                            headers={headers} 
                            setTableHeaders={setOriginTableHeader}
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

RightOriginTable.propTypes = {
    getOriginTableList: PropTypes.func.isRequired,
    changeTableHeader: PropTypes.func.isRequired,
    setOriginTableHeader: PropTypes.func.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    // store中
    headers: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    headerShow: PropTypes.array.isRequired,
    currentDataSource: PropTypes.object.isRequired,
    searchValue: PropTypes.string.isRequired,
}

export default RightOriginTable
