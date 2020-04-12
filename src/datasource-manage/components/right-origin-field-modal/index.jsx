/**
 * 功能: 原始表字段弹框内容
 * 作者: tanglimei
 * 日期: 2020.02.06
 */
import {
    React,
    PureComponent,
    PropTypes,
    classNames,
} from 'framework/Util'
import { Button, Tooltip } from 'antd'
import dialog from 'dialog'
import TableTransfer from '@/components/table-transfer'
import TableHeaderSel from '@/components/table-header-change'
import MessageModal from '../right-origin-field-message'
import './scss/index.scss'

class OriginFieldModal extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [], // 表格数据
            status: 0 // 是否同步成功的状态值,status=0，未同步；status=1同步完成；status=2正在同步；
        }
    }

    componentDidMount() {
        this.getTableList()
    }

    // 获取表格
    getTableList = () => {
        const { getOriginFieldList, tableId } = this.props
        getOriginFieldList({ 
            params: { tableId }
        }).then(res => {
            if (res.statusCode === 200){
                const { data: { fields, status } } = res
                
                const dataSource = this.setSampleData(fields)

                this.setState({ 
                    status,
                    dataSource,
                })
            }
        })
    }

    // 处理样例数据数组
    setSampleData = data => {
        const dataSource = data.map(item => {
            const addSampleData = { ...item }
            const { sampleData } = item
            sampleData.forEach((smItem, index) => {
                addSampleData[`sample${index + 1}`] = smItem
            })
            return addSampleData
        })
        return dataSource
    }

    // 手动同步
    handleClick = () => {
        const { syncClick, tableId } = this.props
        syncClick({ 
            params: { tableId }
        }).then(res => {
            if (res.statusCode === 200){
                const { data: { fields, status } } = res
                if (status === 1){
                    const dataSource = this.setSampleData(fields)
                    
                    this.setState({ 
                        dataSource,
                        status
                    })
                } else {
                    dialog.open({
                        title: '提示',
                        width: 400,
                        content: <MessageModal />
                    })
                }
            }
        })
    }

    formatHeader = () => {
        const { headerShow } = this.props
       
        const cols = headerShow.map(item => {
            // 原始表名称可点击
            if (item.en === 'label'){
                return {
                    ...item,
                    render: (text, record, index) => ( 
                        text ? (
                            <span className={classNames('tag-item', ['purple', 'orange', 'green'][index % 3])}>
                                <Tooltip title={text} placement="topLeft">{text}</Tooltip>
                            </span>
                        ) : null
                    )
                }
            }
            return { ...item }
        })
        
        return cols
    }

    render() {
        const {
            headers, 
            setOriginFieldHeader, 
            changeTableHeader, 
        } = this.props
        const { dataSource, status } = this.state

        const tableInfo = {
            dataSource,
            headers: this.formatHeader(),
            showPage: false,
            noShowHeaderDesc: true,
            scroll: { x: 1800, y: 300 },
            // columnsWidth: { label: 150 }
        }

        const tags = dataSource.map(item => item.label)
        const tagUnique = [...new Set(tags)]

        return (
            <div styleName="origin-field">
                <div className="top">
                    <div className="title">原始表标签</div>
                    <div className="tag-bx">
                        {tagUnique.length > 0 && tagUnique.map((item, index) => (
                            item ? (
                                <span
                                    key={item} 
                                    className={classNames('tag-item', ['purple', 'orange', 'green'][index % 3])}
                                >{item}
                                </span>
                            ) : null
                        ))}
                    </div>
                    
                    {status !== 1
                        && (
                            <div className="sync-box">
                                同步失败, 您可以手动
                                <Button type="link" onClick={this.handleClick} className="sync-btn">同步</Button>
                                本表
                            </div>
                        )}
                    
                </div>
                <div className="btns">
                    <TableHeaderSel 
                        headers={headers} 
                        setTableHeaders={setOriginFieldHeader}
                        changeTableHeader={changeTableHeader} 
                    />
                </div>
                <div className="table-box">
                    <TableTransfer {...tableInfo} />
                </div>
            </div>
        )
    }
}

OriginFieldModal.propTypes = {
    getOriginFieldList: PropTypes.func.isRequired,
    changeTableHeader: PropTypes.func.isRequired,
    setOriginFieldHeader: PropTypes.func.isRequired,
    tableId: PropTypes.number.isRequired,
    syncClick: PropTypes.func.isRequired,
    // store中
    headers: PropTypes.array.isRequired,
    headerShow: PropTypes.array.isRequired,
}


export default OriginFieldModal
