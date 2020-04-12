/**
 * 功能: 表格header的转换
 * 作者: tanglimei
 * 日期: 2020.02.05
 */
import {
    React,
    PropTypes,
} from 'framework/Util'
import { Tooltip } from 'antd'
import CommonTable from '@/components/table'
// import './scss/index.scss'

const TableHeaderFormat = function ({ 
    dataSource,
    headers,
    columnsWidth,
    noShowHeaderDesc,
    ...others
}) { 
    const setHeader = () => {
        const column = []
        if (headers.length < 1) return column
        headers.forEach((item, index) => {
            const items = { ...item }
    
            const { cn, en, tableConfDesc } = item
            items.title = () => (
                <div className="header-column" key={`title-${en}`}>
                    <span className="header-text"><Tooltip title={cn}>{cn}</Tooltip></span>
                    {!noShowHeaderDesc && (
                        <Tooltip title={tableConfDesc}>
                            <span className="desc-tooltip fa fa-question-circle-o" />
                        </Tooltip>
                    )}
                </div>
            )
            items.key = en
            items.dataIndex = en
            
            // 表格宽度设置
            if (columnsWidth[en]) {
                items.width = columnsWidth[en]
            }
            
            // 所有不可编辑-不据返回数据的定
            items.render = items.render || (text => (
                <span className="td-text">
                    <Tooltip title={text} placement="topLeft">{text}</Tooltip>
                </span>
            ))
            column[index] = items
        })
        
        return column
    }
    const header = setHeader()

    const tableInfo = {
        body: dataSource,
        header,
        notSort: true,
    }

    return (
        <CommonTable 
            data={tableInfo}
            {...others}
        />
    )
}

/**
 * dataSource 数据
 * headers 后台给的headers
 * columnsWidth 列宽特殊设置{id:200}
 * noShowHeaderDesc 是否不展示表头描述
 */
TableHeaderFormat.propTypes = {
    dataSource: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    columnsWidth: PropTypes.object,
    noShowHeaderDesc: PropTypes.bool,
}

TableHeaderFormat.defaultProps = {
    columnsWidth: {}, 
    noShowHeaderDesc: false
}

export default TableHeaderFormat
